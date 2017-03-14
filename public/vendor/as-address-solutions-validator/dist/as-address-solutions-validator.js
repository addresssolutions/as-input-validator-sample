
var credentials = require('./as-credentials.js');

var as_language_pack = require('./as-language-pack.js');

var xmlrpc = require('xmlrpc');
var client_convert = xmlrpc.createClient({ host: credentials.addsol.host,
                                           port: credentials.addsol.port,
                                           path: '/'})

function generate_status_message(countrycode, message_number) {
    if (countrycode == 'de') {
      if (message_number == 0) return as_language_pack.conversion_messages_de.status0;
      else if (message_number == 1) return as_language_pack.conversion_messages_de.status1;
      else if (message_number == 2) return as_language_pack.conversion_messages_de.status2;
      else if (message_number == 3) return as_language_pack.conversion_messages_de.status3;
      else if (message_number == 4) return as_language_pack.conversion_messages_de.status4;
      else if (message_number == 5) return as_language_pack.conversion_messages_de.status5;
      else if (message_number == 6) return as_language_pack.conversion_messages_de.status6;
      else if (message_number == 7) return as_language_pack.conversion_messages_de.status7;
      else if (message_number == 8) return as_language_pack.conversion_messages_de.status8;
      else if (message_number == 9) return as_language_pack.conversion_messages_de.status9;
      else if (message_number == 901) return as_language_pack.error_messages_de.status901;
      else if (message_number == 902) return as_language_pack.error_messages_de.status902;
    }
    else if (countrycode == 'gb') {
      if (message_number == 0) return as_language_pack.conversion_messages_gb.status0;
      else if (message_number == 1) return as_language_pack.conversion_messages_gb.status1;
      else if (message_number == 2) return as_language_pack.conversion_messages_gb.status2;
      else if (message_number == 3) return as_language_pack.conversion_messages_gb.status3;
      else if (message_number == 4) return as_language_pack.conversion_messages_gb.status4;
      else if (message_number == 5) return as_language_pack.conversion_messages_gb.status5;
      else if (message_number == 6) return as_language_pack.conversion_messages_gb.status6;
      else if (message_number == 7) return as_language_pack.conversion_messages_gb.status7;
      else if (message_number == 8) return as_language_pack.conversion_messages_gb.status8;
      else if (message_number == 9) return as_language_pack.conversion_messages_gb.status9;
      else if (message_number == 901) return as_language_pack.error_messages_gb.status901;
      else if (message_number == 902) return as_language_pack.error_messages_gb.status902;
    }
    else if (countrycode == 'fr') {
      if (message_number == 0) return as_language_pack.conversion_messages_fr.status0;
      else if (message_number == 1) return as_language_pack.conversion_messages_fr.status1;
      else if (message_number == 2) return as_language_pack.conversion_messages_fr.status2;
      else if (message_number == 3) return as_language_pack.conversion_messages_fr.status3;
      else if (message_number == 4) return as_language_pack.conversion_messages_fr.status4;
      else if (message_number == 5) return as_language_pack.conversion_messages_fr.status5;
      else if (message_number == 6) return as_language_pack.conversion_messages_fr.status6;
      else if (message_number == 7) return as_language_pack.conversion_messages_fr.status7;
      else if (message_number == 8) return as_language_pack.error_mconversion_messages_frssages_fr.status8;
      else if (message_number == 9) return as_language_pack.conversion_messages_fr.status9;
      else if (message_number == 901) return as_language_pack.error_messages_fr.status901;
      else if (message_number == 902) return as_language_pack.error_messages_fr.status902;
    }
}

function generate_salutation(countrycode, gender) {
  if (countrycode == 'de') {
    if (gender == 'm') return as_language_pack.salutations_de.mr;
    else if (gender == 'f') return as_language_pack.salutations_de.mrs;
  }
  else if (countrycode == 'gb') {
    if (gender == 'm') return as_language_pack.salutations_gb.mr;
    else if (gender == 'f') return as_language_pack.salutations_gb.mrs;
  }
  else if (countrycode == 'fr') {
    if (gender == 'm') return as_language_pack.salutations_fr.mr;
    else if (gender == 'f') return as_language_pack.salutations_fr.mrs;
  }
}

function generate_hint(countrycode, hintno) {
  if (countrycode == 'de') {
    return as_language_pack.hints.de[hintno];
  }
  else if (countrycode == 'gb') {
    return as_language_pack.hints.gb[hintno];
  }
  else if (countrycode == 'fr') {
    return as_language_pack.hints.fr[hintno];
  }
}

// compare strings ignoring case, spaces, ...
function is_standardized_string (string1, string2) {
console.log('1: ['+string1+'] 2: ['+string1+']');
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();

  string1 = string1.replace(/[\ \.\(\)\-\+\&]/g, "");
  string2 = string2.replace(/[\ \.\(\)\-\+\&]/g, "");
console.log('2: ['+string1+'] 2: ['+string1+']');

  return string1 === string2;
}

module.exports = {
  ASConvertNameRequest: function(VersionInput,      // specify a certain version, currently just "1"
                                 CountrycodeInput,  // Countrycode de/nl/gb/fr/ch/nn
                                 SalutationInput,   // i.e. "Herr"
                                 TitleInput,        // i.e. "Dr."
                                 FirstnameInput,    // i.e. "Robert"
                                 LastnameInput) {   // i.e. "Wagner"
    this.VersionInput = VersionInput;
    this.CountrycodeInput = CountrycodeInput;
    this.SalutationInput = SalutationInput;
    this.TitleInput = TitleInput;
    this.FirstnameInput = FirstnameInput;
    this.LastnameInput = LastnameInput;
  },

  ASConvertNameResponse: function() {
    this.ReleaseInfo = '';              // ReleaseInfo of used Server
    this.GeneralStatus = '';            // general Status (1=everythin fine no conversion, 2=slight corrections, ...)
    this.ConversionMessage = '';        // Text about conversion
    this.SalutationOutput = '';         // corrected Salutation output
    this.SalutationOutputMessage = '';  // message about wrong content in Salution field
    this.TitleOutput = '';              // next fields same as Salution
    this.TitleOutputMessage = '';
    this.FirstnameOutput = '';
    this.FirstnameOutputMessage = '';
    this.LastnameOutput = '';
    this.LastnameOutputMessage = '';
  },

  ASConvertNameError: function() {
    this.ErrorStatus = '';              // technical error in call to ConvertBox (i.e. Network problem)
    this.ErrorMessage = '';             // info text to ErrorStatus
  },

  ASValidateNameRequest: function(VersionInput,       // specify a certain version, currently just "1"
                                 CountrycodeInput,    // Countrycode de/nl/gb/fr/ch/nn
                                 NameElementInput) {  // Salution, Title, Firstname, ...
    this.VersionInput = VersionInput;
    this.CountrycodeInput = CountrycodeInput;
    this.NameElementInput = NameElementInput;
  },

  ASValidateNameResponse: function() {
    this.ReleaseInfo = '';              // ReleaseInfo of used Server
    this.GeneralStatus = '';            // general Status (tbd)
    this.ValidationCode = '';           // Validation Code 1: Element ok, 2: Not OK, but could stay here, 3: not OK should be moved
    this.ValidationMessage = '';        // Message
  },

  ASValidateNameError: function() {
    this.ErrorStatus = '';              // technical error in call to ConvertBox (i.e. Network problem)
    this.ErrorMessage = '';             // info text to ErrorStatus
  },

  ASConvertName: function (req, callback) {
    var version_in = req.VersionInput;
    var countrycode_in = req.CountrycodeInput;
    var salutation_in = req.SalutationInput;
    var title_in = req.TitleInput;
    var firstname_in = req.FirstnameInput;
    var lastname_in = req.LastnameInput;

    var cberr = new this.ASConvertNameError();
    var cbres = new this.ASConvertNameResponse();

    // move firstname content to lastname field if this is empty
    if ((lastname_in == '') && (firstname_in != '')) {
      lastname_in = firstname_in;
      firstname_in = '';
    }
    var reqstr = credentials.addsol.id + "~" +             // AS Customer ID
                 credentials.addsol.pass + "~" +           // AS Customer Password
                 version_in + "~" +                           // function version (always 1 currently)
                 "nametab.dat~" +                 // knowledge table
                 "asrules.dat~" +                 // rules table
                 "as_user_knowledge.txt~" +       // user knowledge
                 "as_user_rules.txt~" +           // user rules
                 "~" +                            // user synonyms
                 "8~" +                           // codepage
                 countrycode_in + "~" +           // country/language code to take care about countryspecific names and deliver reult messages in according language
                 "n~" +                           // initials linked
                 "i~" +                           // data-type
                 "2~" +                           // max names
                 "n~" +                           // force upper lowercase
                 "y~" +                           // gegerate diakrtis
                 "0~" +                           // name schema
                 "1~" +                           // ID is fix=1
                 "~" +                            // gender
                 "~" +                            // SalutationInput
                 title_in + "~" +                 // TitleInput
                 "~" +                            // initials
                 firstname_in + "~" +             // Firstname
                 "~" +                            // Prefix
                 lastname_in + "~" +              // Lastname
                 "~" +                            // Suffix
                 "~" +                            // Addition
                 "~";                             // Profession

    //console.log(reqstr);

    var xmlreq = [];
    xmlreq.push(reqstr);

    client_convert.methodCall('cb.as_convert_name_xo', xmlreq, function (error, response) {
      // Results of the method response
      //console.log('response von method_call: '+response);

      // decide what do do if Servcer doesnt't respond: here -> acceppt as success
      if ((error)||(response == 'undefined')) {
        console.log('error from cb.as_convert_name_xo:', error);
        console.log('req headers from cb.as_convert_name_xo:', error.req && error.req._header);
        console.log('res code from cb.as_convert_name_xo:', error.res && error.res.statusCode);
        console.log('res body from cb.as_convert_name_xo:', error.body);

        // res.status (901).json({
        //   errorMessage: 'AS ConvertBox not available'
        // });
        cberr.ErrorStatus = 901;
        cberr.ErrorMessage = generate_status_message(countrycode_in, 901);
        callback(cberr, cbres);
        return;
      }
      else {
        // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
        var response_splitted = response.split('~');
        if (response_splitted.length < 23) {
          //res.sendStatus(902);
          cberr.ErrorStatus = 902;
          cberr.ErrorMessage = generate_status_message(countrycode_in, 902);
          callback(cberr, cbres);
          return;
        }
        else {
          if (response_splitted[0] == '0') // 0 = operation successful
          {
            cbres.ReleaseInfo = response_splitted[1]
            var rc = response_splitted[3];
            var conversion_status = response_splitted[5];
            var gender = response_splitted[6];
            cbres.SalutationOutput = response_splitted[7];
            cbres.TitleOutput = response_splitted[8];
            var initial = response_splitted[9];
            cbres.FirstnameOutput = response_splitted[10];
            // var prefix1 = response_splitted[11];
            // var prefix2 = response_splitted[12];
            cbres.LastnameOutput = response_splitted[13];
            // var lastname1 = response_splitted[14];
            // var lastname2 = response_splitted[15];
            // var suffix = response_splitted[16];
            // var Profession = response_splitted[17];
            // var address_add = response_splitted[18];
            // var address_addinfo = response_splitted[19];
            // var number = response_splitted[20];
            // var organization_name = response_splitted[21];
            // var organization_type = response_splitted[22];
            // var pattern = response_splitted[23];
            //
            cbres.GeneralStatus = '0';
            cbres.ConversionMessage = generate_status_message(countrycode_in, 0);

            //console.log('rc: ' + rc);
            if (rc === '1') {
              if (conversion_status[0] == 'O'){
                cbres.SalutationOutput = req.SalutationInput;
                cbres.TitleOutput = req.TitleInput;
                cbres.FirstnameOutput = req.FirstnameInput;
                cbres.LastnameOutput = req.LastnameInput;
                cbres.ConversionMessage = generate_status_message(countrycode_in, 9);
                cbres.GeneralStatus = '9';
              }
              else if (conversion_status[0] == 'U'){
                cbres.SalutationOutput = req.SalutationInput;
                cbres.TitleOutput = req.TitleInput;
                cbres.FirstnameOutput = req.FirstnameInput;
                cbres.LastnameOutput = req.LastnameInput;
                cbres.ConversionMessage = generate_status_message(countrycode_in, 8);
                cbres.GeneralStatus = '8';
              }
              else if ((conversion_status == 'I010008') || (conversion_status == 'I010009')){
                cbres.SalutationOutput = req.SalutationInput;
                cbres.TitleOutput = req.TitleInput;
                cbres.FirstnameOutput = req.FirstnameInput;
                cbres.LastnameOutput = req.LastnameInput;
                cbres.ConversionMessage = generate_status_message(countrycode_in, 7);
                cbres.GeneralStatus = '7';
              }
              else if (conversion_status[0] == 'I'){
                cbres.ConversionMessage = generate_status_message(countrycode_in, 1);
                cbres.GeneralStatus = '1';

                cbres.SalutationOutputMessage = '';
                cbres.TitleOutputMessage = '';
                cbres.FirstnameOutputMessage = '';
                cbres.LastnameOutputMessage = '';

                // check the gender output
                if (gender == 'm'){
                  cbres.SalutationOutput = generate_salutation(countrycode_in, 'm');
                  if (req.SalutationInput == '') {
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 0);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                    cbres.GeneralStatus = '2';
                  }
                  else if (req.SalutationInput != generate_salutation(countrycode_in, 'm')) {
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 2);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                    cbres.GeneralStatus = '3';
                  }
                }
                else if (gender == 'md'){
                  if (req.SalutationInput == generate_salutation(countrycode_in, 'm')) cbres.SalutationOutput = generate_salutation(countrycode_in, 'm');
                  else if (req.SalutationInput == generate_salutation(countrycode_in, 'f')) cbres.SalutationOutput = generate_salutation(countrycode_in, 'f');
                  else if (req.SalutationInput == '') {
                    cbres.SalutationOutput = generate_salutation(countrycode_in, 'm');
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 0);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                    cbres.GeneralStatus = '2';
                  }
                }
                else if (gender == 'f'){
                  cbres.SalutationOutput = generate_salutation(countrycode_in, 'f');
                  if (req.SalutationInput == '') {
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 0);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                    cbres.GeneralStatus = '2';
                  }
                  else if (req.SalutationInput != generate_salutation(countrycode_in, 'f')) {
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 2);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                    cbres.GeneralStatus = '3';
                  }
                }
                else if (gender == 'fd'){
                  if (req.SalutationInput == generate_salutation(countrycode_in, 'f')) cbres.SalutationOutput = generate_salutation(countrycode_in, 'f');
                  else if (req.SalutationInput == generate_salutation(countrycode_in, 'm')) cbres.SalutationOutput = generate_salutation(countrycode_in, 'm');
                  else if (req.SalutationInput == '') {
                    cbres.SalutationOutput = generate_salutation(countrycode_in, 'f');
                    cbres.SalutationOutputMessage = generate_hint(countrycode_in, 0);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                    cbres.GeneralStatus = '2';
                  }
                }
                else if (req.SalutationInput != '') {
                  cbres.SalutationOutput = req.SalutationInput;
                }

                // check the title output
                // Output filled
                if (cbres.TitleOutput != '') {
                  // no Input
                  if (req.TitleInput == '') {
                    // so it was faound in different field
                    cbres.TitleOutputMessage = generate_hint(countrycode_in, 3);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                    cbres.GeneralStatus = '3';
                  }
                  // Input was also present and differs
                  else if ( (req.TitleInput != '') && (req.TitleInput != cbres.TitleOutput) ) {
                    // if nearly same
                    if (is_standardized_string(req.TitleInput, cbres.TitleOutput)) {
                      // so it has just been standardized
                      cbres.TitleOutputMessage = generate_hint(countrycode_in, 1);
                      if (cbres.GeneralStatus != '3') {
                        cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                        cbres.general_status = '2';
                      }
                    }
                    // they were significant different
                    else {
                      // so Title has been corrected in some way
                      cbres.TitleOutputMessage = generate_hint(countrycode_in, 2);
                      cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                      cbres.general_status = '3';
                    }
                  }
                }
                // Output is empty
                else if (req.TitleInput != '') {
                  // but Input was present
                  // so content was moved to different field
                  cbres.TitleOutputMessage = generate_hint(countrycode_in, 4);
                  cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                  cbres.GeneralStatus = '3';
                }

                // take care about initials
                if (initial != '') {
                  if (cbres.FirstnameOutput != '') cbres.FirstnameOutput = cbres.FirstnameOutput + ' ' + initial;
                  else cbres.FirstnameOutput = initial;
                  cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                  cbres.GeneralStatus = '3';
                }

                // check the firstname output
                // Output filled
                if (cbres.FirstnameOutput != '') {
                  // no Input
                  if (req.FirstnameInput == '') {
                    // so it was faund in different field
                    cbres.FirstnameOutputMessage = generate_hint(countrycode_in, 3);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                    cbres.GeneralStatus = '3';
                  }

                  // Input was also present and differs
                  else if ( (req.FirstnameInput != '') && (req.FirstnameInput != cbres.FirstnameOutput) ) {
                    // if nearly same
                    if (is_standardized_string(req.FirstnameInput, cbres.FirstnameOutput)) {
                      // so it has just been standardized
                      cbres.FirstnameOutputMessage = generate_hint(countrycode_in, 1);
                      if (cbres.GeneralStatus != '3') {
                        cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                        cbres.general_status = '2';
                      }
                    }
                    // they were significant difference
                    else {
                      // so Firstname has been corrected in some way
                      cbres.FirstnameOutputMessage = generate_hint(countrycode_in, 2);
                      cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                      cbres.general_status = '3';
                    }
                  }
                }
                // Output is empty
                else if (req.FirstnameInput != '') {
                  // but Input was present
                  // so content was moved to different field
                  cbres.FirstnameOutputMessage = generate_hint(countrycode_in, 4);
                  cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                  cbres.GeneralStatus = '3';
                }

                // check the lastname output
                // Output filled
                if (cbres.LastnameOutput != '') {
                  // no Input
                  if (req.LastnameInput == '') {
                    // so it was faund in different field
                    cbres.LastnameOutputMessage = generate_hint(countrycode_in, 3);
                    cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                    cbres.GeneralStatus = '3';
                  }
                  // Input was also present and differs
                  else if ( (req.LastnameInput != '') && (req.LastnameInput != cbres.LastnameOutput) ) {
                    // if nearly same
                    if (is_standardized_string(req.LastnameInput, cbres.LastnameOutput)) {
                      // so it has just been standardized
                      cbres.LastnameOutputMessage = generate_hint(countrycode_in, 1);
                      if (cbres.GeneralStatus != '3') {
                        cbres.ConversionMessage = generate_status_message(countrycode_in, 2);
                        cbres.general_status = '2';
                      }
                    }
                    // they were significant difference
                    else {
                      // so Lastname has been corrected in some way
                      cbres.LastnameOutputMessage = generate_hint(countrycode_in, 2);
                      cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                      cbres.general_status = '3';
                    }
                  }
                }
                // Output is empty
                else if (req.LastnameInput != '') {
                  // but Input was present
                  // so content was moved to different field
                  cbres.LastnameOutputMessage = generate_hint(countrycode_in, 4);
                  cbres.ConversionMessage = generate_status_message(countrycode_in, 3);
                  cbres.GeneralStatus = '3';
                }

              } // end of Individual

              // res.function_status = 200;
              // res.function_message = 'AS ConvertBox call successful';
              callback(null, cbres);
              return;

              //
              // res.status(200).json({
              //   general_status: general_status,
              //   conversion_status: conversion_status,
              //   conversion_message: conversion_message,
              //   salutation: titulation,
              //   salutation_message: titulation_message,
              //   title: title,
              //   title_message: title_message,
              //   firstname: firstname,
              //   firstname_message: firstname_message,
              //   lastname: lastname,
              //   lastname_message: lastname_message,
              // });

            }
            // more than one person identified
            else if (rc > 1){
              cbres.GeneralStatus = '6';
              cbres.ConversionMessage = generate_status_message(countrycode_in, 6);
              cbres.SalutationOutput = req.SalutationInput;
              cbres.TitleOutput = req.TitleInput;
              cbres.FirstnameOutput = req.FirstnameInput;
              cbres.LastnameOutput = req.LastnameInput;
              callback(null, cbres);
              return;

              // res.status(200).json({
              //   general_status: general_status,
              //   conversion_status: conversion_status,
              //   conversion_message: 'Personengemeinschaft erkannt',
              //   salutation: titulation,
              //   salutation_message: '',
              //   title: title,
              //   title_message: '',
              //   firstname: firstname,
              //   firstname_message: '',
              //   lastname: lastname,
              //   lastname_message: '',
              // });
            }
          }
        }
      }
    });
  },


  ASValidateSalutation: function (req, callback) {
    var cberr = new this.ASValidateNameError();
    var cbres = new this.ASValidateNameResponse();

    var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
                 credentials.addsol.pass + "~" +  // AS Customer Password
                 req.VersionInput + "~"           // function version (always 1 currently)
                 req.CountrycodeInput + "~" +     // country/language code to take care about countryspecific names and deliver reult messages in according language
                 req.NameElementInput + "~";
    var xmlreq = [];
    xmlreq.push(reqstr);

    client_convert.methodCall('cb.as_validate_titulation_xo', xmlreq, function (error, response) {
      // Results of the method response
      //console.log('response von method_call: '+response);
      // decide what do do if Servcer doesnt't respond: here -> acceppt as success
      if ((error)||(response == 'undefined')) {
        console.log('error from cb.as_validate_titulation_xo:', error);
        cberr.ErrorStatus = 901;
        cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 901);
        callback(cberr, cbres);
        return;
      }
      else {
        // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
        var response_splitted = response.split('~');
        if (response_splitted.length < 7) {
          cberr.ErrorStatus = 902;
          cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 902);
          callback(cberr, cbres);
          return;
        }
        else {
          if (response_splitted[0] == '0') // 0 = operation successful
          {
            cbres.ReleaseInfo = response_splitted[1];
            cbres.GeneralStatus = '0';
            cbres.ValidationCode = response_splitted[4];
            cbres.ValidationMessage = response_splitted[6];
            callback(null, cbres);
            return;
          }
          else {
            cbres.GeneralStatus = '9';
            cbres.ValidationCode = '';
            cbres.ValidationMessage = '';
            callback(null, cbres);
            return;
          }
        }
      }
    });
  },

  ASValidateTitle: function (req, callback) {
    var cberr = new this.ASValidateNameError();
    var cbres = new this.ASValidateNameResponse();

    var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
                 credentials.addsol.pass + "~" +  // AS Customer Password
                 req.VersionInput + "~" +         // function version (always 1 currently)
                 req.CountrycodeInput + "~" +     // country/language code to take care about countryspecific names and deliver reult messages in according language
                 req.NameElementInput + "~";
    var xmlreq = [];
    xmlreq.push(reqstr);

    client_convert.methodCall('cb.as_validate_title_xo', xmlreq, function (error, response) {
      // Results of the method response
      //console.log('response von method_call: '+response);
      // decide what do do if Servcer doesnt't respond: here -> acceppt as success
      if ((error)||(response == 'undefined')) {
        console.log('error from cb.as_validate_title_xo:', error);
        cberr.ErrorStatus = 901;
        cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 901);
        callback(cberr, cbres);
        return;
      }
      else {
        // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
        var response_splitted = response.split('~');
        if (response_splitted.length < 7) {
          cberr.ErrorStatus = 902;
          cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 902);
          callback(cberr, cbres);
          return;
        }
        else {
          if (response_splitted[0] == '0') // 0 = operation successful
          {
            cbres.ReleaseInfo = response_splitted[1];
            cbres.GeneralStatus = '0';
            cbres.ValidationCode = response_splitted[4];
            cbres.ValidationMessage = response_splitted[6];
            callback(null, cbres);
            return;
          }
          else {
            cbres.GeneralStatus = '9';
            cbres.ValidationCode = '';
            cbres.ValidationMessage = '';
            callback(null, cbres);
            return;
          }
        }
      }
    });
  },

  ASValidateFirstname: function (req, callback) {
    var cberr = new this.ASValidateNameError();
    var cbres = new this.ASValidateNameResponse();

    var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
                 credentials.addsol.pass + "~" +  // AS Customer Password
                 req.VersionInput + "~" +         // function version (always 1 currently)
                 req.CountrycodeInput + "~" +     // country/language code to take care about countryspecific names and deliver reult messages in according language
                 req.NameElementInput + "~";
    var xmlreq = [];
    xmlreq.push(reqstr);

    client_convert.methodCall('cb.as_validate_firstname_xo', xmlreq, function (error, response) {
      // Results of the method response
      //console.log('response von method_call: '+response);
      // decide what do do if Servcer doesnt't respond: here -> acceppt as success
      if ((error)||(response == 'undefined')) {
        console.log('error from cb.as_validate_firstname_xo:', error);
        cberr.ErrorStatus = 901;
        cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 901);
        callback(cberr, cbres);
        return;
      }
      else {
        // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
        var response_splitted = response.split('~');
        if (response_splitted.length < 7) {
          cberr.ErrorStatus = 902;
          cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 902);
          callback(cberr, cbres);
          return;
        }
        else {
          if (response_splitted[0] == '0') // 0 = operation successful
          {
            cbres.ReleaseInfo = response_splitted[1];
            cbres.GeneralStatus = '0';
            cbres.ValidationCode = response_splitted[4];
            cbres.ValidationMessage = response_splitted[6];
            callback(null, cbres);
            return;
          }
          else {
            cbres.GeneralStatus = '9';
            cbres.ValidationCode = '';
            cbres.ValidationMessage = '';
            callback(null, cbres);
            return;
          }
        }
      }
    });
  },

  ASValidateLastname: function (req, callback) {
    var cberr = new this.ASValidateNameError();
    var cbres = new this.ASValidateNameResponse();

    var reqstr = credentials.addsol.id + "~" +    // AS Customer ID
                 credentials.addsol.pass + "~" +  // AS Customer Password
                 req.VersionInput + "~" +         // function version (always 1 currently)
                 req.CountrycodeInput + "~" +     // country/language code to take care about countryspecific names and deliver reult messages in according language
                 req.NameElementInput + "~";
    var xmlreq = [];
    xmlreq.push(reqstr);

    client_convert.methodCall('cb.as_validate_lastname_xo', xmlreq, function (error, response) {
      // Results of the method response
      //console.log('response von method_call: '+response);
      // decide what do do if Servcer doesnt't respond: here -> acceppt as success
      if ((error)||(response == 'undefined')) {
        console.log('error from cb.as_validate_lastname_xo:', error);
        cberr.ErrorStatus = 901;
        cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 901);
        callback(cberr, cbres);
        return;
      }
      else {
        // response has following structure: "returncode~returnmessage~number of results~validation status~validation name tpyes~validation message"
        var response_splitted = response.split('~');
        if (response_splitted.length < 7) {
          cberr.ErrorStatus = 902;
          cberr.ErrorMessage = generate_status_message(req.CountrycodeInput, 902);
          callback(cberr, cbres);
          return;
        }
        else {
          if (response_splitted[0] == '0') // 0 = operation successful
          {
            cbres.ReleaseInfo = response_splitted[1];
            cbres.GeneralStatus = '0';
            cbres.ValidationCode = response_splitted[4];
            cbres.ValidationMessage = response_splitted[6];
            callback(null, cbres);
            return;
          }
          else {
            cbres.GeneralStatus = '9';
            cbres.ValidationCode = '';
            cbres.ValidationMessage = '';
            callback(null, cbres);
            return;
          }
        }
      }
    });
  },

};
