'use strict';

(function () {
  var NUMBER_WIZARDS = 4;
  var URL = 'https://javascript.pages.academy/code-and-magick/data';

  function onSimilarWizardsSuccess(data) {
    var similarWizards = data
      .slice(0, NUMBER_WIZARDS)
      .map(window.similarWizards.createWizard); // Создаём массив элементов персонажей

    window.Util.renderElements(similarWizards, window.Map.elements.setupListElement); // Вставляем элементы персонажей в нужный контейнер
  }

  function onSimilarWizardsError(message) {
    console.log(message);
  }

  window.backend.load(URL, onSimilarWizardsSuccess, onSimilarWizardsError);
  window.Map.elements.setupSimilarElement.classList.remove('hidden'); // Показываем похожих персонажей

  window.dialog.hangHandlers(); // Вешаем все обработчики для диалогового окна
})();
