/* eslint-disable */
ffunction rot13(str) { // LBH QVQ VG!
  var end = 'Z'.charCodeAt(0),
      start = 'A'.charCodeAt(0);
  // ROT13 = A[A [0] + 13 - alphabet.length] 
  return str.split('').map(function (char, i) {
      if (char >= 'A' && char <= 'Z') {
          if (char.charCodeAt(0) - start - 13 > 0) {
              console.log(char, String.fromCharCode(char.charCodeAt(0) - 13));
              return String.fromCharCode(char.charCodeAt(0) - 13);
          } else {
              return String.fromCharCode(char.charCodeAt(0) + 13);
          }
      }
  }).join('');
}

// Change the inputs below to test
console.log(rot13("ASERR PBQR PNZC"));