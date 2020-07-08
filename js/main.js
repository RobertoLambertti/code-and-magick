'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/code-and-magick/data';

  var onWizardsSuccess = window.similarWizards.onLoadSuccess;
  var onError = window.backend.onError;

  window.backend.load(LOAD_URL, onWizardsSuccess, onError);
  window.Map.elements.setupSimilarElement.classList.remove('hidden'); // Показываем похожих персонажей

  window.dialog.hangHandlers(); // Вешаем все обработчики для диалогового окна
})();
