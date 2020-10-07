/* eslint-disable */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var xhr = new XMLHttpRequest();

var timeDelay = 1500, timeDelayOuter = 500;
xhr.open('GET', 'https://stroy-opt.com/catalog/', false);
xhr.send();
var strPage, result, lastPage = 2;
if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
} else {
    strPage = xhr.responseText;
    // Поиск последней страницы
    var rePage = /<li>(?:<a href="\/catalog\/\?.*">)?(\d*)(?:<\/a>)?<\/li>/g
    while ((result = rePage.exec(strPage)) != null) {
        lastPage = result[1];
    }

    // Получение данных с сайта
    var unparsedHtmlPages = [];
    var url = 'https://stroy-opt.com/catalog/?page_14=';
    var k;
    xhr.open('GET', 'https://stroy-opt.com/catalog/', false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        unparsedHtmlPages.push(xhr.responseText);
        k = 2;
        var timer1 = setInterval(function () {
            xhr.open('GET', url + k, false);
            xhr.send();

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                unparsedHtmlPages.push(xhr.responseText);
            }
            k++;
        }, timeDelayOuter);
        setTimeout(function () {
            clearInterval(timer1);
            // Поиск photoURL, names, itemsUrls на unparsed HTML pages;
            url = 'https://stroy-opt.com';
            var itemUrls = [], itemNames = [], itemThumbUrls = [];
            var reItemUrlsNamesThumbs = /.*<div class="product-item">\s*.*\s*.*\s*(?:.*(?:Акция|Под заказ).*\s*)?<a href="(.*)" title="(.*)"><img src="(.*)"\s/g
            for (var i = 0; i < unparsedHtmlPages.length; i++) {
                var temp = itemUrls.length;
                while ((result = reItemUrlsNamesThumbs.exec(unparsedHtmlPages[i])) != null) {
                    itemUrls.push(url + result[1]);
                    itemNames.push(result[2]);
                    itemThumbUrls.push(result[3]);
                }
            }
            console.error('Length: ' + itemUrls.length);

            // !!!!!! Получение данных с конкретной страницы товара
            var unparsedHtmlItems = [];
            i = 0;
            var timer2 = setInterval(function () {
                xhr.open('GET', itemUrls[i], false);
                xhr.send();
                if (xhr.status != 200) {
                    console.error("govno");
                    console.log(xhr.status + ': ' + xhr.statusText);
                } else {
                    // вывести результат
                    unparsedHtmlItems.push(xhr.responseText);
                }
                i++;
            }, timeDelay);
            setTimeout(function () {
                clearInterval(timer2);
                // for CSV EXPORT
                var rows = [
                    ['photoUrl', 'name', 'details', 'vendor', 'description', 'price', 'id', 'available', 'itemUrl', 'thumbnailUrl']
                ];

                for (var j = 0; j < unparsedHtmlItems.length; j++) {
                    // Поиск photoURL, price, ids, available, vendors ;
                    var photoUrl, price, id, availability, currency, vendor;
                    var re = /<div\s*class="main-image">\s*.*"(.*)"\s*alt|"price"\s*content="(.*)"\s|.*Currency"\s*content="([а-яА-ЯA-Za-z]*)"\s?.*>|Наличие:\s*(?:<strong.*>)?(.+)<\/strong>.*\s*.*>id: (.*)<\/p>|Характеристики.*\s*.*<\/span>(.*)<\/p>/g
                    var result;
                    while ((result = re.exec(unparsedHtmlItems[j])) != null) {
                        if (result[1]) {
                            photoUrl = result[1];
                        }
                        if (result[2]) {
                            price = result[2];
                        }
                        if (result[3]) {
                            currency = result[3];
                        }
                        if (result[4] || result[5]) {
                            availability = result[4];
                            id = result[5];
                        }
                        if (result[6]) {
                            vendor = result[6];
                        }
                    }

                    // Подготовка строки для поиска характеристик
                    re = /<h2>Характеристики.*\s*.*\s*(.*)<\/div>/
                    var parsedParamsStr = re.exec(unparsedHtmlItems[j]);
                    if (parsedParamsStr) {
                        parsedParamsStr = parsedParamsStr[1];
                    }
                    // Поиск options;
                    var options = [];
                    re = /<span\sclass="[\w\d]+">([а-яА-Яa-zA-Z\d\s\(\),.]+):<\/span><span\sclass="[\w\d]+">([а-яА-Яa-zA-Z\)\(\s.,\d\/\-\+_$%&]+)<\/span>/g
                    while ((result = re.exec(parsedParamsStr)) != null) {
                        options.push([result[1], result[2]]);
                    }

                    // Поиск descriptions
                    var description;
                    re = /Описание.*\s*<br\s\/>((?:(?:<[^<>\s]*>)*[^<>]*)*)/g
                    while ((result = re.exec(unparsedHtmlItems[j])) != null) {
                        description = '"' + result[1] + '"';
                    }

                    // names берется из общего списка элементов с itemUrl[], itemNames[], itemThumbUrls[]
                    rows.push([photoUrl, itemNames[j], options, vendor, description, [price, currency], id, availability, itemUrls[j], itemThumbUrls[j]])
                }

                // CSV EXPORT
                var csvContent = '';
                rows.forEach(function (rowArray) {
                    var row = rowArray.join(";"); // SEPARATOR
                    csvContent += row + "\r\n";
                });

                // make CSV file: utf-8, semicolon, ""
                fs.writeFile('file.csv', csvContent, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            }, itemUrls.length * timeDelay + timeDelay / 1.5);

        }, (lastPage - 1) * timeDelayOuter + timeDelayOuter / 1.5);
    }
}