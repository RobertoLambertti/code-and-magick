'use strict';

(function () {
  window.backend = {
    load: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось выполнить запрос за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 2000;

      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
