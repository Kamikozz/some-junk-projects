/* eslint-disable */
function reverse(source) {
    if (typeof source !== "string") {
        source = new String(source);
    }
    var reversedValue = "";
    for (var i = source.length - 1; i >= 0; i--) {
        reversedValue += source[i];
    }
    return +reversedValue;
}

function isPrime(N) {
    // Trial division isPrime() https://habr.com/ru/post/133037/
    for (var d = 2; d <= Math.sqrt(N); d++) {
        if (N % d === 0) {
            return false;
        }
    }
    return true;
}

function backwardsPrime(start, stop) {
    var N = start < 10 ? 10 : start;
    var result = [];
    for (; N <= stop; N++) {
        if (!isPrime(N)) continue;
        var reversed = reverse(N);
        if (reversed === N) continue;
        if (isPrime(reversed)) {
            result.push(N);
        }
    }
    return result;
}

console.log(backwardsPrime(100, 390));