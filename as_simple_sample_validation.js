// use the address solutions library
var as_address_solutions_validator = require('./public/vendor/as-address-solutions-validator/dist/as-address-solutions-validator.js');

function call_as_validate_salutation(anrede) {
  var as_req = new as_address_solutions_validator.ASValidateNameRequest(
    1,                                  // VersionInput
    "de",                               // Countrycode
    anrede);                            // Anrede, die validiert werden soll

  as_address_solutions_validator.ASValidateSalutation(as_req, function (error, response) {
    if (error) {
      console.log("error response von ASValidateName: " + error.ErrorStatus + "/" + error.ErrorMessage);
    }
    else {
      // following elements are delivered in response (cf as-address-solutions-validator.js)
      // ReleaseInfo: ReleaseInfo of used Server
      // GeneralStatus: general Status (tbd)
      // ValidationCode: Validation Code 1: Element ok, 2: Not OK, but could stay here, 3: not OK should be moved
      // ValidationMessage: Message zur Validierung
      console.log('');
      console.log('==============================================');
      console.log('ReleaseInfo            : '+ response.ReleaseInfo);
      console.log('GeneralStatus          : '+ response.GeneralStatus);
      console.log('ValidationCode         : '+ response.ValidationCode);
      console.log('ValidationMessage      : '+ response.ValidationMessage);
      console.log('==============================================');
      console.log('');
    }
  });
}

call_as_validate_salutation("Dr.");

// other examples
// call_as_validate_firstname("Woflgang");
//call_as_validate_firstname("Schmidt");
//call_as_validate_firstname("Dr. Angela Merkel, Pastorin");
