/* eslint-disable */
var dict = ["sand", "water", "fish", "sun"];
function sumOfABeach(str) {
    var count = 0;
    str = str.toLowerCase();
    for (var i = 0; i < dict.length; i++) {
        var re = new RegExp(dict[i], 'g');
        var foundArr = str.match(re);
        if (foundArr) {
            count += foundArr.length;
        }
    }
    return count;
}

console.log(sumOfABeach("WAtErSlIde"));
console.log(sumOfABeach("GolDeNSanDyWateRyBeaChSuNN"));
console.log(sumOfABeach("gOfIshsunesunFiSh"));
console.log(sumOfABeach("cItYTowNcARShoW"));