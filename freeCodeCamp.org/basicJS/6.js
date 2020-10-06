/* eslint-disable */
function telephoneCheck(str) {
    // Good luck!
    var re = /[1]?[\s\(]?\d{3}[\)]?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/
    return re.test(str);
  }
  
  console.log(telephoneCheck("555-555-5555"));