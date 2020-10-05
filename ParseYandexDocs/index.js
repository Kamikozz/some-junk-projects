const fs = require('fs');
const cheerio = require('cheerio');
const transliterate = require('./transliterate');

const UNPARSED_RAW_HTML_DOCS_FILEPATH = 'file.html';

const parseHtml = (fileName) => {
  const file = fs.readFileSync(fileName);
  return cheerio.load(file);
};

const $ = parseHtml(UNPARSED_RAW_HTML_DOCS_FILEPATH);

const getTds = () => {
  return $('td').filter((idx, el) => {
    return el.parent.parent.parent.parent.attribs['class'] !== 'doc-c doc-c-table';
  });
};

const tds = getTds();

let curValue;
let result = [];

tds.each((idx, el) => {
  const [firstChild] = el.children;

  switch (el.attribs['headers']) {
    case 'regions__entry__11 ':
    case 'regions__entry__13 ':
      if (firstChild) curValue = firstChild.data;
      break;
    case 'regions__entry__12 ':
    case 'regions__entry__14 ':
      if (firstChild) {
        result.push({
          name: firstChild.data,
          value: curValue
        });
      }
      break;
    default: break;
  }
});

result.sort(({value: valueA}, {value: valueB}) => valueA - valueB);

result = result.map(({ value, name }) => {
  return {
    name: transliterate(name),
    nameLocale: name,
    value
  }
});

result.forEach(({ nameLocale, value }) => {
  // console.log(`{ "${nameLocale}", ${value} },`); // for C/C++
  console.log(`<option value="${value}">${nameLocale}</option>`); // for JS
});

// result.forEach((item) => {
//     console.log(`${item['name']} = ${item['value']},`);
// });
