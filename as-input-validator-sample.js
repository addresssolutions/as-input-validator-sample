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

// routes
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/address_validation_mask', function(req, res) {
    var v_name_elements = {salutation: "", title: "", firstname: "", lastname: ""};
    var v_buttons = as_language_pack.buttons_de;
    var v_selectalble_salutations = [{key: as_language_pack.salutations_de.mr},
                                     {key: as_language_pack.salutations_de.mrs}];
    var v_field_titles = as_language_pack.field_titles_de;
    var v_error_messages = as_language_pack.error_messages_de;

    res.render('address_validation_mask', {
      NameElements: v_name_elements,
      MyButtons: v_buttons,
      SelectableSalutations: v_selectalble_salutations,
      FieldTitles: v_field_titles,
      StatusMessages: v_error_messages
    });
});

app.post('/address_validation_mask', function(req, res, next) {
  if(req.xhr || req.accepts('json,html')==='json'){
    var as_req = new as_address_solutions_validator.ASConvertNameRequest(
      1,                          // VersionInput
      "de",                        // Countrycode de/nl/gb/fr/ch/nn
      req.body.SalutationInput,   // Anrede
      req.body.TitleInput,        // Titel
      req.body.FirstnameInput,    // Vorname
      req.body.LastnameInput);    // Nachname

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
});


app.get('/as_validate_title', function (req, res) {
  var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
               credentials.addsol.pass + "~" +  // AS Customer Password
               "1~" +                           // function version (always 1 currently)
               "de~" +                          // country/language code to take care about countryspecific names and deliver reult messages in according language
               req.query.TitleInput + "~";
  var xmlreq = [];
  xmlreq.push(reqstr);

  client.methodCall('cb.as_validate_title_xo', xmlreq, function (error, response) {
    // Results of the method response
    //console.log('response in title: ['+response+'] error: ['+ error + ']');

    // decide what do do if Servcer doesnt't respond: here -> acceppt as success
    if ((error)||(response == 'undefined')) {
      console.log('error from cb.as_validate_title_xo:', error);
      console.log('req headers from cb.as_validate_title_xo:', error.req && error.req._header);
      console.log('res code from cb.as_validate_title_xo:', error.res && error.res.statusCode);
      console.log('res body from cb.as_validate_title_xo:', error.body);
      res.sendStatus(901);
    }
    else {
      // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
      var response_splitted = response.split('~');
      if (response_splitted.length < 4) {
        res.sendStatus(902);
      }
      else {
        if (response_splitted[0] == '0') // 0 = operation successful
        {
          var title_val = response_splitted[3];
          var validation_message = response_splitted[5];
          //console.log('lastname_val: ' + lastname_val);
          if (title_val === '1') {
            res.sendStatus(200);
          }
          else if (title_val === '2') {
            res.writeHead(200, validation_message);
            res.send();
          }
          else if (title_val === '3') {
            res.writeHead(903, validation_message);
            res.send();
          }
          else if (title_val === '4') {
            if (response_splitted[18] == '') {
              res.writeHead(904, 'unbekannter Vorname');
            }
            else {
              res.writeHead(904, validation_message);
            }
            res.send();
          }
        }
      }
    }
  });
});


app.get('/as_validate_firstname', function (req, res) {
  var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
               credentials.addsol.pass + "~" +  // AS Customer Password
               "1~" +                           // function version (always 1 currently)
               "de~" +                          // country/language code to take care about countryspecific names and deliver reult messages in according language
               req.query.FirstnameInput + "~";
  var xmlreq = [];
  xmlreq.push(reqstr);

  client.methodCall('cb.as_validate_firstname_xo', xmlreq, function (error, response) {
    // Results of the method response
    //console.log('response in firstname: ['+response+'] error: ['+ error + ']');

    // decide what do do if Servcer doesnt't respond: here -> acceppt as success
    if ((error)||(response == 'undefined')) {
      console.log('error from cb.as_validate_firstname_xo:', error);
      console.log('req headers from cb.as_validate_firstname_xo:', error.req && error.req._header);
      console.log('res code from cb.as_validate_firstname_xo:', error.res && error.res.statusCode);
      console.log('res body from cb.as_validate_firstname_xo:', error.body);
      res.sendStatus(901);
    }
    else {
      //console.log('response in firstname is NOT undefined');
      // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
      var response_splitted = response.split('~');
      if (response_splitted.length < 4) {
        res.sendStatus(902);
      }
      else {
        if (response_splitted[0] == '0') // 0 = operation successful
        {
          var firstname_val = response_splitted[3];
          var validation_message = response_splitted[5];
          //console.log('lastname_val: ' + lastname_val);

          if (firstname_val === '1') {
            res.sendStatus(200);
          }
          else if (firstname_val === '2') {
            res.writeHead(200, validation_message);
            res.send();
          }
          else if (firstname_val === '3') {
            res.writeHead(903, validation_message);
            res.send();
          }
          else if (firstname_val === '4') {
            if (response_splitted[18] == '') {
              res.writeHead(904, 'unbekannter Vorname');
            }
            else {
              res.writeHead(904, validation_message);
            }
            res.send();
          }
        }
      }
    }
  });
});

app.get('/as_validate_lastname', function (req, res) {
  var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
               credentials.addsol.pass + "~" +  // AS Customer Password
               "1~" +                           // function version (always 1 currently)
               "de~" +                          // country/language code to take care about countryspecific names and deliver reult messages in according language
               req.query.LastnameInput + "~";
  var xmlreq = [];
  xmlreq.push(reqstr);

  client.methodCall('cb.as_validate_lastname_xo', xmlreq, function (error, response) {
    // Results of the method response
    //console.log('response in lastname: ['+response+']');

    // decide what do do if Servcer doesnt't respond: here -> acceppt as success
    if ((error)||(response == 'undefined')) {
      console.log('error from cb.as_validate_lastname_xo:', error);
      console.log('req headers from cb.as_validate_lastname_xo:', error.req && error.req._header);
      console.log('res code from cb.as_validate_lastname_xo:', error.res && error.res.statusCode);
      console.log('res body from cb.as_validate_lastname_xo:', error.body);
      res.sendStatus(901);
    }
    else {
      // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
      var response_splitted = response.split('~');
      if (response_splitted.length < 4) {
        res.sendStatus(902);
      }
      else {
        if (response_splitted[0] == '0') // 0 = operation successful
        {
          var lastname_val = response_splitted[3];
          var validation_message = response_splitted[5];
          //console.log('lastname_val: ' + lastname_val);
          if (lastname_val === '1') {
            res.sendStatus(200);
          }
          else if (lastname_val === '2') {
            res.writeHead(200, 'anderes Namenselement bleibt');
            res.send();
          }
          else if (lastname_val === '3') {
            res.writeHead(903, validation_message);
            res.send();
          }
          else if (lastname_val === '4') {
            if (response_splitted[18] == '') {
              res.writeHead(904, 'unbekannter Vorname');
            }
            else {
              res.writeHead(904, validation_message);
            }
            res.send();
          }
        }
      }
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
});

var options = {
  // uncomment following lines for using ssl certificate
  // change the location/name of private key and certificate as needed!!!
  key: fs.readFileSync(__dirname + '/ssl/private_key.pem'),
  cert: fs.readFileSync(__dirname + '/ssl/signed_certificate.crt')
}

var httpsServer = https.createServer(options, app);

httpsServer.listen(app.get('sslport'), function(){
  console.log('Server started in ' + app.get('env') + ' mode on port ' + app.get('sslport') + ' (running in secure mode with ssl/https)');
});

console.log('press Ctrl-C to terminate.');
