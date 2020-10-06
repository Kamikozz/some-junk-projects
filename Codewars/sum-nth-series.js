/* eslint-disable */
function SeriesSum(n) {
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += 1/(1+3*i)
    }
    console.log(sum.toFixed(2));
}

SeriesSum(2);
SeriesSum(1);
SeriesSum(5);
SeriesSum(4000000);