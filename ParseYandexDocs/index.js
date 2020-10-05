const fs = require('fs');
const cheerio = require('cheerio');

const file = fs.readFileSync('file.html');

const $ = cheerio.load(file);
const tds = $('td').filter((idx, el) => {
    return el.parent.parent.parent.parent.attribs['class'] !== 'doc-c doc-c-table';
});

let curValue;
let res = [];

tds.each((idx, el) => {
    switch (el.attribs['headers']) {
        case 'regions__entry__11 ':
        case 'regions__entry__13 ':
            if (el.children[0]) curValue = el.children[0].data;
            break;
        case 'regions__entry__12 ':
        case 'regions__entry__14 ':
            if (el.children[0]) {
                res.push({
                    name: el.children[0].data,
                    value: curValue
                });
            }
            break;
    }
});

res.sort((a, b) => {
    return a['value'] - b['value'];
});

let alphabet = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'i',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sch',
    'ъ': '',
    'ы': 'i',
    'ь': '',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
    ' ': '_'
}

res = res.map((val) => {
    return {
        name: transliterate(val.name),
        nameLocale: val.name,
        value: val.value
    }
});

res.forEach((val) => {
    //console.log(`{ "${val['nameLocale']}", ${val['value']} },`); // for C/C++
    console.log(
        `<option value="${val['value']}">${val['nameLocale']}</option>`); // for JS

    // <option value="Красноярск">Красноярск</option>
    //     <option value="nexus 5x">Nexus 5X</option>
    //     <option value="galaxy s7">Galaxy S7</option>
});

// res.forEach((val) => {
//     console.log(`${val['name']} = ${val['value']},`);
// });

function transliterate(str) {
    return str.toLowerCase().split('').map((char) => {
        return alphabet[char];
    }).join('').toUpperCase();
}