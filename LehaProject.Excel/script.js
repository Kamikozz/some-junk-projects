let table = document.getElementById('table');
let thead = document.getElementsByTagName('thead');

// можно либо table.onclick
// либо table.addEventListener()
table.addEventListener('click', function (event) {
  // // Тут даже можно получить индексы элементов
  //console.log(event.target.cellIndex);
  // console.log(event.target.parentNode.rowIndex);

  let cell = event.target;
  if (!cell) return;
  if (cell.nodeName === 'INPUT') return;
  if (cell.nodeName === 'TD') {
    // console.log(event);
    // console.log(event.target);
    // в случае, если кликнули по ячейке
    // создаем <input>
    let input = document.createElement('input');
    input.setAttribute('type', 'text');

    // значение берем из <td>
    input.setAttribute('value', cell.innerText);

    // по дефолту <input> берет размер 20, что не совсем адаптивненько
    // поэтому, 1. по каждому клику, смотрим, какой колонке относится
    // ячейка, 2. берем её клиентскую ширину
    // 3. ставим её только что созданному <input>
    const columns = thead[0].children[0].children;
    input.style.width = columns[cell.cellIndex].clientWidth - 2 + 'px';

    // ПРИМЕЧАНИЕ: 
    // -2, ЛЕХ, это для того, чтобы убрать бордюры/рамки, потому что 
    // они и справа и слева по 1 px, можешь убрать -2 и увидеть разницу

    // изменяем стиль курсора
    input.style.cursor = 'text';

    // заменяем ячейку таблицы <td> на <input>
    cell.replaceWith(input);

    // устанавливаем фокус в него
    input.focus();
    
    // устанавливаем курсор в конец строки
    input.setSelectionRange(input.value.length, input.value.length);

    // добавляем обработчики событий
    input.addEventListener('keypress', saveChangesOnEnter);
    input.addEventListener('blur', saveChangesOnBlur);

    // обработчик события 'Enter' внутри ячейки
    function saveChangesOnEnter(event) {
      if (event.key === 'Enter') {
        // при вводе Enter автоматически срабатывает 
        // событие потери фокуса, поэтому мы удаляем его обработчик
        input.removeEventListener('blur', saveChangesOnBlur);

        // find row & col indices
        // call - функция нативного JavaScript для передачи контекста
        // короче, без него, у тебя при вызове функции 
        // не передастся this и все сломается
        // АГА-ДА, это классический жабаскрепд :)
        const indexes = findIndexes.call(this);

        saveChanges();
        syncWithServer(event, indexes);
      }
    }
    // обработчик события потери фокуса ячейки (input)
    function saveChangesOnBlur(event) {
      // find row & col indices
      // call - функция нативного JavaScript для передачи контекста
      // короче, без него, у тебя при вызове функции 
      // не передастся this и все сломается
      // АГА-ДА, это классический жабаскрепд :)
      const indexes = findIndexes.call(this);

      saveChanges();
      syncWithServer(event, indexes);
    }

    // вынес в одну функцию, все равно функционал обработчик одинаковый
    function saveChanges() {
      // копируем текст из <input value=''> в <td>
      cell.innerText = input.value;
      // возвращаем исходный стиль курсора
      input.style.cursor = '';
      // возвращаем ячейку таблицы <td>
      input.replaceWith(cell);
    }

    // поиск индексов элементов в таблице
    // RETURN объект со свойствами 'rowIndex' & 'colIndex'
    function findIndexes() {
      for (let i = 0; i < this.parentNode.children.length; i++) {
        if (this.parentNode.children[i] === this) {
          return {
            rowIndex: this.parentNode.sectionRowIndex,
            colIndex: i
          };
        }
      }
    }

    function syncWithServer(event, indexes) {
      // 1. Создаём новый объект XMLHttpRequest
      let xhr = new XMLHttpRequest();

      // 2. Создаем JSON файл с данными, требуемыми на сервере
      // для успешного обновления данных
      const body = JSON.stringify({
        old_value: event.target.defaultValue,
        new_value: event.target.value,
        col_name: thead[0].children[0].children[indexes.colIndex].innerText,
        col_id: indexes.colIndex,
        row_id: indexes.rowIndex
      });
      console.log('JSON on client:', JSON.parse(body));

      // 3. Конфигурируем его: асинхронный POST-запрос на URL
      xhr.open('POST', 'http://localhost:5000/callback', true);

      // 4. Выставляем заголовки
      xhr.setRequestHeader('Content-Type', 'application/json');

      // 5. Отсылаем запрос
      xhr.send(body);

      // 6. Если код ответа сервера не 200, то ошибка
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
          console.log(xhr.status + ': ' + xhr.statusText);
        } else {
          console.log(xhr.responseText);
        }
      });
    }
  }
});
