var https = require('https'); // usually at top of file

var fs = require('fs');

var express = require('express');
var favicon = require('serve-favicon');

var app = express();
app.use(favicon(__dirname + '/public/img/favicon.ico'));

var credentials = require('./public/vendor/as-address-solutions-validator/dist/as-credentials.js');

var as_language_pack = require('./public/vendor/as-address-solutions-validator/dist/as-language-pack.js');

var as_address_solutions_validator = require('./public/vendor/as-address-solutions-validator/dist/as-address-solutions-validator.js');

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

var xmlrpc = require('xmlrpc');
var client = xmlrpc.createClient({ host: 'localhost', port: 9009, path: '/'})


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// ports can be changed here
// to use standard ports 80 and 443 the server must be started with root permission (or sudo)
app.set('port', process.env.PORT || 9001);
app.set('sslport', process.env.PORT || 9002);

app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));

app.use(express.static(__dirname + '/public'));

//app.use(require('body-parser')());
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// flash message middleware
app.use(function(req, res, next){
	// if there's a flash message, transfer
	// it to the context, then clear it
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});


// just to show objects in console.log
function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};


// get the countrycode from http header
function getCountrycodeFromHeader (headerStr)
{
  if (headerStr == '') headerStr = 'de';

  var ccpos = headerStr.toLowerCase().indexOf('countrycodeinput=');
  if (ccpos != -1) {
    var countrycode = headerStr.substring(ccpos+17, ccpos+19).toLowerCase();
  }
  else {
    var countrycode = 'de';
  }
  return countrycode;
}


// conpare two strings and return
// 1: if they are identical case sensitive
// 2: identical case insensitive
// 3: second str is part of firstname case sensitive
// 4: second str is part of firstname case insensitive
function getCompareStrings(StrOutput, StrInput)
{
  //console.log('response.NumberOfResults:'+response.NumberOfResults+' ZIPOut:'+response.AddressResponse[0].ZIPOutput+' ZIPIn:'+req.query.ZIPInput)
  var check = -1;
  if ((StrInput == '') || (StrOutput == '')) check = -1;
  else if (StrOutput == StrInput) check = 1;
  else if (StrOutput.toLowerCase() == StrInput.toLowerCase()) check = 2;
  else if (StrOutput.indexOf(StrInput) != -1) check = 3;
  else if (StrOutput.toLowerCase().indexOf(StrInput.trim().toLowerCase()) != -1) check = 4;
  else if (StrInput.trim().toLowerCase().indexOf(StrOutput.trim().toLowerCase()) != -1) check = 5;
  return check;
}


// routes
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/address_validation_mask', function(req, res) {
    //console.log('req in app.get /address_validation_mask:' + simpleStringify(req.query))
    var v_name_elements = {salutation: req.query.SalutationInput, title: req.query.TitleInput, firstname: req.query.FirstnameInput, lastname: req.query.LastnameInput};
    var v_address_elements = {zip: req.query.ZIPInput, city: req.query.CityInput, street: req.query.StreetInput, hnr: req.query.HnrInput, hnradd: req.query.HnrAddInput}
    var v_countrycode = '' + req.query.CountrycodeInput;

    if ( (v_countrycode.toLowerCase() == 'gb') || (v_countrycode.toLowerCase() == 'us') ){
      var v_various_text = as_language_pack.various_text_gb;
      var v_buttons = as_language_pack.buttons_gb;
      var v_selectalble_salutations = [{key: as_language_pack.salutations_gb.mr},
                                       {key: as_language_pack.salutations_gb.mrs}];
      var v_field_titles = as_language_pack.field_titles_gb;
      var v_error_messages = as_language_pack.error_messages_gb;
    }
    else if (v_countrycode.toLowerCase() == 'fr'){
      var v_various_text = as_language_pack.various_text_fr;
      var v_buttons = as_language_pack.buttons_fr;
      var v_selectalble_salutations = [{key: as_language_pack.salutations_fr.mr},
                                       {key: as_language_pack.salutations_fr.mrs}];
      var v_field_titles = as_language_pack.field_titles_fr;
      var v_error_messages = as_language_pack.error_messages_fr;
    }
    else {
      var v_various_text = as_language_pack.various_text_de;
      var v_buttons = as_language_pack.buttons_de;
      var v_selectalble_salutations = [{key: as_language_pack.salutations_de.mr},
                                       {key: as_language_pack.salutations_de.mrs}];
      var v_field_titles = as_language_pack.field_titles_de;
      var v_error_messages = as_language_pack.error_messages_de;
    }

    res.render('address_validation_mask', {
      Countrycode: v_countrycode.toLowerCase(),
      VariousText: v_various_text,
      NameElements: v_name_elements,
      AddressElements: v_address_elements,
      MyButtons: v_buttons,
      SelectableSalutations: v_selectalble_salutations,
      FieldTitles: v_field_titles,
      StatusMessages: v_error_messages
    });
});


app.post('/address_validation_mask', function(req, res, next) {
  //console.log('req in app.post /address_validation_mask:' + simpleStringify(req.body))
  if(req.xhr || req.accepts('json,html')==='json'){
    if (req.body.Action == 'ASZ') {
      var as_req = new as_address_solutions_validator.ASAutosuggestRequest(
        1,                           // VersionInput
        req.body.CountrycodeInput,   // Countrycode de/nl/gb/fr/ch/nn
        req.body.ZIPInput,           // PLZ
        req.body.CityInput,          // City
        req.body.StreetInput,        // Street
        req.body.MaxResults);

      as_address_solutions_validator.ASAutosuggest(as_req, function (error, response) {
        //console.log("response von ASAutosuggest: " + error + "/" + response);
        if (error) {
          //console.log("error response von ASAutosuggest: " + error.ErrorStatus + "/" + error.ErrorMessage);
          res.sendStatus(error.ErrorStatus);
        }
        else {
          // we need to write a status <> 200 to recognize the message in bootstrap-validator
          //console.log('response of as_address_solutions_validator.ASAutosuggest: ' + simpleStringify(response.AddressResponse[0])+ simpleStringify(response.AddressResponse[1]));
          res.send(response);
        }
      });
    }

    else if (req.body.Action == 'VA') {
      var as_req = new as_address_solutions_validator.ASValidateAddressRequest(
        1,                           // VersionInput
        req.body.CountrycodeInput,   // Countrycode de/nl/gb/fr/ch/nn
        req.body.ZIPInput,           // PLZ
        req.body.CityInput,          // City
        req.body.StreetInput,        // Street
        req.body.HnrInput,           // Hnr
        req.body.HnrAddInput,           // Hnr
        req.body.MaxResults);

      // console.log("request far ASValidateAddress: " + simpleStringify(as_req));

      as_address_solutions_validator.ASValidateAddress(as_req, function (error, response) {
        //console.log("response von ASConvertName: " + error + "/" + response);
        if (error) {
          //console.log("error response von ASValidateAddress: " + error.ErrorStatus + "/" + error.ErrorMessage);
          res.sendStatus(error.ErrorStatus);
        }
        else {
          //console.log('response of as_address_solutions_validator.ASValidateAddress: ' + simpleStringify(response.AddressResponse[0])+ simpleStringify(response.AddressResponse[1]));
          res.send(response);
        }
      });
    }
    else if (req.body.Action == 'VN') {
      var as_req = new as_address_solutions_validator.ASConvertNameRequest(
        1,                          // VersionInput
        req.body.CountrycodeInput,   // Countrycode de/nl/gb/fr/ch/nn
        req.body.SalutationInput,   // Anrede
        req.body.TitleInput,        // Titel
        req.body.FirstnameInput,    // Vorname
        req.body.LastnameInput);    // Nachname

      // console.log('client-ip: '+ req.ip);
      // console.log(JSON.stringify(req.body, null, 2));

      as_address_solutions_validator.ASConvertName(as_req, function (error, response) {
        //console.log("response von ASConvertName: " + error + "/" + response);
        if (error) {
          //console.log("error response von ASConvertName: " + error.ErrorStatus + "/" + error.ErrorMessage);
          res.sendStatus(error.ErrorStatus);
        }
        else {
          return res.json(response);
        }
      });
    }
  }
  else { // on submit
    var redirectStr = '/address_validation_mask?CountrycodeInput='+req.body.CountrycodeInput+
                      '&SalutationInput='+req.body.SalutationInput+
                      '&TitleInput='+req.body.TitleInput+
                      '&FirstnameInput='+req.body.FirstnameInput+
                      '&LastnameInput='+req.body.LastnameInput+
                      '&ZIPInput='+req.body.ZIPInput+
                      '&CityInput='+req.body.CityInput+
                      '&StreetInput='+req.body.StreetInput+
                      '&HnrInput='+req.body.HnrInput+
                      '&HnrAddInput='+req.body.HnrAddInput;
    res.redirect(redirectStr);
  }
});


app.get('/as_validate_title', function (req, res) {

  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASValidateNameRequest(
    1,                           // VersionInput
    countrycode_in,  // Countrycode de/nl/gb/fr/ch/nn
    req.query.TitleInput);       // Titel

  as_address_solutions_validator.ASValidateTitle(as_req, function (error, response) {
    //console.log("response von ASValidateTitle: " + error + "/" + response);
    if (error) {
      //console.log("error response von ASValidateTitle: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      if (response.ValidationCode != '1') {
        res.writeHead(490, response.ValidationMessage);
      }
      else {
        res.writeHead(200, response.ValidationMessage);
      }
      res.send();
    }
  });
});


app.get('/as_validate_firstname', function (req, res) {

  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASValidateNameRequest(
    1,                           // VersionInput
    countrycode_in,  // Countrycode de/nl/gb/fr/ch/nn
    req.query.FirstnameInput);        // Titel

  as_address_solutions_validator.ASValidateFirstname(as_req, function (error, response) {
    //console.log("response von ASValidateFirstname: " + error + "/" + response);
    if (error) {
      //console.log("error response von ASValidateFirstname: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      if (response.ValidationCode != '1') {
        res.writeHead(490, response.ValidationMessage);
      }
      else {
        res.writeHead(200, response.ValidationMessage);
      }
      res.send();
    }
  });
});


app.get('/as_validate_lastname', function (req, res) {
  //console.log('req in app.get /as_validate_lastname:' + JSON.stringify(req.headers['referer'].toLowerCase()))
  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASValidateNameRequest(
    1,                           // VersionInput
    countrycode_in,  // Countrycode de/nl/gb/fr/ch/nn
    req.query.LastnameInput);        // Titel

  as_address_solutions_validator.ASValidateLastname(as_req, function (error, response) {
    //console.log("response von ASValidateLastname: " + error + "/" + response);
    if (error) {
      //console.log("error response von ASValidateLastname: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      if (response.ValidationCode != '1') {
        res.writeHead(490, response.ValidationMessage);
      }
      else {
        res.writeHead(200, response.ValidationMessage);
      }
      res.send();
    }
  });
});


app.get('/as_validate_zip', function (req, res) {
  //console.log('req.headers in /as_validate_zip: ' + simpleStringify(req.headers));
  // get the countrycode from header info
  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASAutosuggestRequest(
    1,                           // VersionInput
    countrycode_in,              // Countrycode de/nl/gb/fr/ch/nn
    req.query.ZIPInput,
    "",                          // City
    "",
    10);                         // Street

  as_address_solutions_validator.ASAutosuggest(as_req, function (error, response) {
    //console.log("response von ASAutosuggest: " + error + "/" + response);
    if (error) {
      //console.log("error response von ASAutosuggest: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      if (response.NumberOfResults == 0) var check = 0;
      else var check = getCompareStrings(response.AddressResponse[0].ZIPOutput, req.query.ZIPInput);

      if (check != 1)
      {
        // just to show how countrycode could be handled
        if ( (countrycode_in == 'gb') || (countrycode_in == 'us') ) {
          if (check == -1) res.writeHead(490, 'ZIP unknown');
          else if (check == 0) res.writeHead(490, 'ZIP incorrect');
          else if (check == 2) res.writeHead(490, 'upper/lower different');
          else if (check == 3) res.writeHead(490, 'ZIP incomplete');
          else if (check == 4) res.writeHead(490, 'ZIP incomplete and upper/lower different');
        }
        else if (countrycode_in == 'fr') {
          if (check == -1) res.writeHead(490, 'code postal inconnu');
          else if (check == 0) res.writeHead(490, 'code postal pas correct');
          else if (check == 2) res.writeHead(490, 'majuscules/minuscules différemment');
          else if (check == 3) res.writeHead(490, 'code postal incomplète');
          else if (check == 4) res.writeHead(490, 'code postal incomplète et majuscules/minuscules différemment');
        }
        else {
          if (check == -1) res.writeHead(490, 'PLZ unbekannt');
          else if (check == 0) res.writeHead(490, 'PLZ nicht korrekt');
          else if (check == 2) res.writeHead(490, 'Groß-/Kleinschreibung unterschiedlich');
          else if (check == 3) res.writeHead(490, 'PLZ unvollständig');
          else if (check == 4) res.writeHead(490, 'PLZ unvollständig und Groß-/Kleinschreibung unterschiedlich');
        }
      }
      else {
        res.writeHead(200, 'ok');
      }
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      res.send();
    }
  });
});


app.get('/as_validate_city', function (req, res) {
  //console.log('req.headers in /as_validate_city: ' + simpleStringify(req.headers));
  // get the countrycode from header info
  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASAutosuggestRequest(
    1,                           // VersionInput
    countrycode_in,              // Countrycode de/nl/gb/fr/ch/nn
    "",                          // ZIP
    req.query.CityInput,
    "",                          // Street
    10);

  as_address_solutions_validator.ASAutosuggest(as_req, function (error, response) {
    //console.log("response von ASAutosuggest: " + error + "/" + response);
    if (error) {
      //console.log("error response von ASAutosuggest: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      if (response.NumberOfResults == 0) var check = 0;
      else var check = getCompareStrings(response.AddressResponse[0].CityOutput, req.query.CityInput);
      if (check != 1)
      {
        // just to show how countrycode could be handled
        if ( (countrycode_in == 'gb') || (countrycode_in == 'us') ) {
          if (check == -1) res.writeHead(490, 'city unknown');
          else if (check == 0) res.writeHead(490, 'city incorrect');
          else if (check == 2) res.writeHead(490, 'upper/lower different');
          else if (check == 3) res.writeHead(490, 'city incomplete');
          else if (check == 4) res.writeHead(490, 'city incomplete and upper/lower different');
        }
        else if (countrycode_in == 'fr') {
          if (check == -1) res.writeHead(490, 'nom de ville inconnu');
          else if (check == 0) res.writeHead(490, 'nom de ville pas correct');
          else if (check == 2) res.writeHead(490, 'majuscules/minuscules différemment');
          else if (check == 3) res.writeHead(490, 'nom de ville incomplète');
          else if (check == 4) res.writeHead(490, 'nom de ville incomplète et majuscules/minuscules différemment');
        }
        else {
          if (check == -1) res.writeHead(490, 'Ort unbekannt');
          else if (check == 0) res.writeHead(490, 'Ort nicht korrekt');
          else if (check == 2) res.writeHead(490, 'Groß-/Kleinschreibung unterschiedlich');
          else if (check == 3) res.writeHead(490, 'Ort unvollständig');
          else if (check == 4) res.writeHead(490, 'Ort unvollständig und Groß-/Kleinschreibung unterschiedlich');
        }
      }
      else {
        res.writeHead(200, 'ok');
      }
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      res.send();
    }
  });
});



app.get('/as_validate_street', function (req, res) {
  //console.log('req.headers in /as_validate_street: ' + simpleStringify(req.headers));
  // get the countrycode from header info
  countrycode_in = getCountrycodeFromHeader(req.headers['referer']);

  var as_req = new as_address_solutions_validator.ASAutosuggestRequest(
    1,                           // VersionInput
    countrycode_in,              // Countrycode de/nl/gb/fr/ch/nn
    req.query.ZIPInput,                          // ZIP
    req.query.CityInput,                          // City
    req.query.StreetInput,
    10);

  as_address_solutions_validator.ASAutosuggest(as_req, function (error, response) {
    //console.log("response von ASAutosuggest in as_validate_street: " + error + "/" + simpleStringify(response));
    if (error) {
      //console.log("error response von ASAutosuggest: " + error.ErrorStatus + "/" + error.ErrorMessage);
      res.sendStatus(error.ErrorStatus);
    }
    else {
      if (response.NumberOfResults == 0) var check = -1;
      else var check = getCompareStrings(response.AddressResponse[0].StreetOutput, req.query.StreetInput);
      //console.log('ceck: '+ check + '['+response.AddressResponse[0].StreetOutput+'/'+req.query.StreetInput+']');
      if (check != 1)
      {
        // just to show how countrycode could be handled
        if ( (countrycode_in == 'gb') || (countrycode_in == 'us') ) {
          if (check == -1) res.writeHead(490, 'street unknown');
          else if (check == 0) res.writeHead(490, 'street incorrect');
          else if (check == 2) res.writeHead(490, 'upper/lower different');
          else if (check == 3) res.writeHead(490, 'incomplete');
          else if (check == 4) res.writeHead(490, 'incomplete and upper/lower different');
          else if (check == 5) res.writeHead(490, 'contains unknown elements (housenumber?)');
        }
        else if (countrycode_in == 'fr') {
          if (check == -1) res.writeHead(490, 'nom de rue inconnu');
          else if (check == 0) res.writeHead(490, 'nom de rue pas correct');
          else if (check == 2) res.writeHead(490, 'majuscules/minuscules différemment');
          else if (check == 3) res.writeHead(490, 'incomplète');
          else if (check == 4) res.writeHead(490, 'incomplète et majuscules/minuscules différemment');
          else if (check == 4) res.writeHead(490, 'elements inconnu (numéro)');
        }
        else {
          if (check == -1) res.writeHead(490, 'Straße unbekannt');
          else if (check == 0) res.writeHead(490, 'Straße nicht korrekt');
          else if (check == 2) res.writeHead(490, 'Groß-/Kleinschreibung unterschiedlich');
          else if (check == 3) res.writeHead(490, 'Straße unvollständig');
          else if (check == 4) res.writeHead(490, 'Straße unvollständig und Groß-/Kleinschreibung unterschiedlich');
          else if (check == 5) res.writeHead(490, 'enthält unbekannte Elemente (Hausnummer?)');
        }
      }
      else {
        res.writeHead(200, 'ok');
      }
      // we need to write a status <> 200 to recognized the message in bootstrap-validator
      res.send();
    }
  });
});


// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Server started in ' + app.get('env') + ' mode on port ' + app.get('port') + ' (no ssl/https)');
  console.log('press Ctrl-C to terminate.');
});

// uncomment following lines for using ssl certificate
// change the location/name of private key and certificate as needed!!!
//var options = {
  //key: fs.readFileSync(__dirname + '/ssl/manandtime_private_key.pem'),
  //cert: fs.readFileSync(__dirname + '/ssl/manandtime_signed_certificate.crt')
//}

//var httpsServer = https.createServer(options, app);

//httpsServer.listen(app.get('sslport'), function(){
//  console.log('Server started in ' + app.get('env') + ' mode on port ' + app.get('sslport') + ' (running in secure mode with ssl/https)');
//});
//});
