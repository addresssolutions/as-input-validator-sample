// use the address solutions library
var as_address_solutions_validator = require('./public/vendor/as-address-solutions-validator/dist/as-address-solutions-validator.js');

function call_as_convert_name(anrede, titel, vorname, nachname) {
  var as_req = new as_address_solutions_validator.ASConvertNameRequest(
    1,                                  // VersionInput
    "de",                               // Countrycode
    anrede,                                 // Anrede leer, soll generiert werden
    titel,                                 // Titel, leer, soll aus Gesamtnamen gezogen werden
    vorname,                                 // Vorname leer, soll aus Gesamtnamen gezogen werden
    nachname);// (Nach)name

  as_address_solutions_validator.ASConvertName(as_req, function (error, response) {
    //console.log("response von ASConvertName: " + error + "/" + response);
    if (error) {
      console.log("error response von ASConvertName: " + error.ErrorStatus + "/" + error.ErrorMessage);
    }
    else {
      // following elements are delivered in response (cf as-address-solutions-validator.js)
      // ReleaseInfo: ReleaseInfo of used Server
      // GeneralStatus: general Status (1=everything fine no conversion needed, 2=slight corrections, ...)
      // ConversionMessage: informational text to conversion
      // SalutationOutput: corrected Salutation output
      // SalutationOutputMessage: message about (wrong) content in Salution field
      // TitleOutput: see Salution
      // TitleOutputMessage
      // FirstnameOutput
      // FirstnameOutputMessage
      // LastnameOutput
      // LastnameOutputMessage
      console.log('');
      console.log('==============================================');
      console.log('ReleaseInfo            : '+ response.ReleaseInfo);
      console.log('GeneralStatus          : '+ response.GeneralStatus);
      console.log('ConversionMessage      : '+ response.ConversionMessage);
      console.log('SalutationOutput       : '+ response.SalutationOutput);
      console.log('SalutationOutputMessage: '+ response.SalutationOutputMessage);
      console.log('TitleOutput            : '+ response.TitleOutput);
      console.log('TitleOutputMessage     : '+ response.TitleOutputMessage);
      console.log('FirstnameOutput        : '+ response.FirstnameOutput);
      console.log('FirstnameOutputMessage : '+ response.FirstnameOutputMessage);
      console.log('LastnameOutput         : '+ response.LastnameOutput);
      console.log('LastnameOutputMessage  : '+ response.LastnameOutputMessage);
      console.log('==============================================');
      console.log('');
    }
  });
}


call_as_convert_name("", "", "", "dipl.-inform gustav gans, lehrer");

// other examples
//call_as_convert_name("Frau", "", "Heinz", "Maurer");
//call_as_convert_name("", "", "Schmidt", "Sabine");
