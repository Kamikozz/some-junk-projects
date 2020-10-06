/* eslint-disable */

// long gcd01(long a, long b) {
//     long nod = 1L;
//     for (long i = a; i > 0; i--) {
//         if (a % i == 0 && b % i == 0) {
//             nod = i;
//             break;
//         }
//     }
//     return nod;
// }
var z = 0;
function gcd01(a, b) {
    var nod = undefined;
    for (var i = b; i > 0; i--) {
        console.log(i);
        z++;
        if (a % i === 0 && b % i === 0) {
            nod = i;
            break;
        }
    }
    return nod;
}

console.log("nod: ", gcd01(196,195), z);