let tree = document.getElementById('tree');

tree.addEventListener('click', function (evt) {
  evt = evt || event;
  let target = evt.target || evt.srcElement;

  /* раскрыть-закрыть детей */
  let node = target.getElementsByTagName('ul')[0];
  if (!node) return; // нет детей

  // node.style.listStyleType = 'circle';
  node.style.display = node.style.display ? '' : 'none';
});

let input = document.getElementById('input-path');
input.addEventListener('keypress', function (evt) {
  evt = evt || event;

  if (evt.key === 'Enter') {
    let target = evt.target || evt.srcElement;
    //console.log(target.value);
    let res = getFiles(target.value);
    res.addEventListener('readystatechange', function () {
      if (res.readyState !== 4) return;
      if (res.status !== 200) {
        console.log(res.status + ': ' + res.statusText);
      } else {
        console.log(res.responseText);
        console.log(JSON.parse(res.responseText));
      }
    });
  }
});

let btn = document.getElementById('tree-loader');
btn.addEventListener('click', function (evt) {
  evt = evt || event;
  let target = evt.target || evt.srcElement;

  let tree = document.getElementById('tree');
  // я сделал слегка дебильно, ибо это 
  // асинхронная операция и если код ниже разместить непосредственно в функции 
  // getFiles - то ты не сможешь вернуть себе ничего в эту функцию, ибо там 
  // анонимная функция протягивать return из функции в функцию я не умею
  // можно еще засунуть функцию getFiles прямо в этот слушатель click и перед 
  // ее запуском создать массив, в который потом засунуть все данные, 
  // но ... мне кажется мой вариант более красивей

  let res;
  if (input.value) {
    res = getFiles(input.value);
  } else {
    res = getFiles();
  }
  // в моем варианте возвращается объект XMLHttpRequest, 
  // который тебе остается лишь прослушать на ответ от сервера
  //console.log('result: ', res);
  res.addEventListener('readystatechange', function () {
    if (res.readyState !== 4) return;
    if (res.status !== 200) {
      console.log(res.status + ': ' + res.statusText);
    } else {
       // D:/WebProjects/JSEPAM
      //console.log(res.responseText);
      console.log(JSON.parse(res.responseText));
    }
  });
});

function getFiles(pathname) {
  // 1. Создаём новый объект XMLHttpRequest
  let xhr = new XMLHttpRequest();

  // 2. Создаем JSON файл с данными, требуемыми на сервере
  // для успешного обновления данных
  const body = JSON.stringify({
    path: pathname ? pathname : 'C:'
  });
  console.log('JSON on client:', JSON.parse(body));

  // 3. Конфигурируем его: асинхронный POST-запрос на URL
  xhr.open('POST', 'http://localhost:5000/callback', true);

  // 4. Выставляем заголовки
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  //xhr.overrideMimeType('application/json; charset=UTF-8');

  // D:/WebProjects/JSEPAM

  // 5. Отсылаем запрос
  xhr.send(body);

  return xhr;

  // // 6. Если код ответа сервера не 200, то ошибка
  // return xhr.addEventListener('readystatechange', function () {
  //   if (xhr.readyState != 4) return 'lol';
  //   if (xhr.status != 200) {
  //     console.log(xhr.status + ': ' + xhr.statusText);
  //   } else {
  //     console.log(xhr.responseText);
  //     return xhr.responseText;
  //   }
  // });
}