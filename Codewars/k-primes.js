/* eslint-disable */
function countKprimes(k, start, nd) {
    let qwe = 0;
    if (k === 1) {
        var primes = [];
        for (var N = 2; N <= nd; N++) {
            // Trial division isPrime() https://habr.com/ru/post/133037/
            var primeValue = true;
            for (var d = 2; d <= Math.sqrt(N); d++) {
                qwe++;
                if (N % d === 0) {
                    primeValue = !primeValue;
                    break;
                }
            }
            if (primeValue) {
                primes.push(N);
            }
        }
        console.log(qwe, primes.length)
        return primes;
    }
    var primes = countKprimes(1, start, nd);
    var result = [];
    for (var N = start; N <= nd; N++) {
        if (N < 2) N = 2;
        var dividers = [];
        for (var value = N; value > 1;) {
            for (var i = 0; i < primes.length; i++) {
                if (value % primes[i] === 0) {
                    dividers.push(primes[i]);
                    value /= primes[i];
                    break;
                }
            }
        }
        if (dividers.length === k) {
            result.push(N);
        }
    }
    return result;
}

function puzzle(s) {
    var list1primes = countKprimes(1, 0, s);
    var list3primes = countKprimes(3, 0, s);
    var list7primes = countKprimes(7, 0, s);
    var counter = 0;
    var curValue = 0;
    for (var indexA = 0; indexA < list1primes.length; indexA++) {
        for (var indexB = 0; indexB < list3primes.length; indexB++) {
            for (var indexC = 0; indexC < list7primes.length; indexC++) {
                curValue = list1primes[indexA] + list3primes[indexB] + list7primes[indexC];
                if (curValue === s) {
                    counter++;
                }

            }
        }
    }
    return counter;
}

countKprimes(1, 2, 2000000);

// console.log(countKprimes(1400, 10000000, 100001000));

// var chai = require("chai");
// var assert = require("assert");

// function testing(actual, expected) {
//     assert.equal(actual.toString(), expected.toString());
// }



// describe("Basic tests", function () {
//     it("countKprimes(1, 2, 100)", function () {
//         testing(countKprimes(1, 2, 100), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]);
//     })

//     it("countKprimes(2, 0, 100)", function () {
//         testing(countKprimes(2, 0, 100), [4, 6, 9, 10, 14, 15, 21, 22, 25, 26, 33, 34, 35, 38, 39, 46, 49, 51,
//             55, 57, 58, 62, 65, 69, 74, 77, 82, 85, 86, 87, 91, 93, 94, 95]);
//     })
//     it("countKprimes(3, 0, 100)", function () {
//         testing(countKprimes(3, 0, 100), [8, 12, 18, 20, 27, 28, 30, 42, 44, 45, 50, 52, 63, 66, 68, 70, 75, 76,
//             78, 92, 98, 99]);
//     })
//     it("countKprimes(5, 1000, 1100)", function () {
//         testing(countKprimes(5, 1000, 1100), [1020, 1026, 1032, 1044, 1050, 1053, 1064, 1072, 1092, 1100]);
//     })
//     it("countKprimes(5, 500, 600)", function () {
//         testing(countKprimes(5, 500, 600), [500, 520, 552, 567, 588, 592, 594]);
//     })

//     it("puzzle(138)", function () {
//         assert.equal(puzzle(138), 1);
//     })
//     it("puzzle(143)", function () {
//         assert.equal(puzzle(143), 2);
//     })
//     it("puzzle(1380)", function () {
//         assert.equal(puzzle(1380), 344);
//     })
//     it("countKprimes(1400, 10000000, 100001000)", function () {
//         testing(countKprimes(20, 7000000, 10050000), [10000096, 10000152, 10000165, 10000200]);
//     })
// })
