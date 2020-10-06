/* eslint-disable */
// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/access-multi-dimensional-arrays-with-indexes
// Setup
//var myArray = [1, [1, 2, [8,[1,[2]]],3], [4, 5, 6], [7, 8, 9], [[10, [6, 8], 11, 12], 13, 14]];
var myArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [[10, 11, [0, 8], 12], 13, 14]];
function findDeep(str, arr, obj, i) {
    var strVal = "" + obj;
    if (strVal.indexOf(str) === -1) return arr;
    arr.push(i);
    if (obj.constructor === Array) {
        obj.forEach(function (obj, i) {
            findDeep(str, arr, obj, i);
        });
    }
    return arr;
}

function findall(str, obj) {
    var pos = -1, arr = [];
    while ((pos = obj.indexOf(str, pos + 1)) !== -1) {
        arr.push(pos);
    }
    return arr;
}

// Only change code below this line.
var myData = myArray.forEach(function (v, i, obj) {
    i || console.log("Obj:\n", obj);
    console.log("Iteration No." + i, "target: ", v);
    var resultStr = findDeep("8", [], v, i).reduce(function (prev, v) {
        return prev + '[' + v + ']';
    }, '');
    console.log(resultStr);
});