/* eslint-disable */
// также можно посылать запрос на печать по API https://fs1.e.lanbook.com/api/book/118648/print/1/10
var limit = 141;
for (var i = 1; i <= limit; i++) {
    var xhr = new XMLHttpRequest();
    var url = 'https://fs1.e.lanbook.com/api/book/118648/page/' + i + '/img';
    xhr.open('GET', url, false); // асинхронно почему-то не работало
    xhr.send();
    if (xhr.status != 200) {
        console.error(xhr.status + ': ' + xhr.statusText);
    } else {
        var res = xhr.responseText;
        var encodedUri = encodeURI('data:image/svg+xml;base64,' + btoa(res));
        var link = document.createElement("a");
        var filename = i + '.svg';
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        //document.querySelector('svg').appendChild(link);
        document.body.appendChild(link);
        link.click(); // This will download the data file named "my_data.csv".
    }
}

