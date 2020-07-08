'use strict';

(function () {
  var TIMEOUT = 2000;
  var errorPopupElement = document.querySelector('.error-popup');
  var errorTextElement = errorPopupElement.querySelector('.error-popup-text');
  var errorCloseElement = errorPopupElement.querySelector('.error-popup-close');

  function onPopupCloseClick(evt) {
    evt.preventDefault();

    errorPopupElement.classList.add('hidden');
    errorCloseElement.removeEventListener('click', onPopupCloseClick);
  }

  window.backend = {
    onError: function (message) {
      errorCloseElement.addEventListener('click', onPopupCloseClick);

      errorTextElement.textContent = message;
      errorPopupElement.classList.remove('hidden');
    },

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
        onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    },

    save: function (url, data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
