/* eslint-disable */
function convertToRoman(num) {
    var roman = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 20: 'XX', 30: 'XXX', 40: 'XL', 50: 'L', 60: 'LX', 70: 'LXX', 80: 'LXXX', 90: 'XC', 100: 'C', 200: 'CC', 300: 'CCC', 400: 'CD', 500: 'D', 600: 'DC', 700: 'DCC', 800: 'DCCC', 900: 'CM', 1000: 'M'
    }
    var res = '';
    // num / ... | 0 - equals Math.floor()
    var thousands = num / 1000 | 0;
    var hundreds = (num - thousands * 1000) / 100 | 0;
    var tens = (num - thousands * 1000 - hundreds * 100) / 10 | 0;
    var ones = num % 10;
    while (thousands > 0) {
        res += roman[1000];
        thousands--;
    }
    if (hundreds) res += roman[hundreds * 100];
    if (tens) res += roman[tens * 10];
    if (ones) res += roman[ones];
    return res;
}

console.log(convertToRoman(3999));