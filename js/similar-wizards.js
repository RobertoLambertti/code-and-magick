'use strict';

(function () {
  var NUMBER_WIZARDS = 4;

  window.similarWizards = {
    createWizard: function (object) {
      var template = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item'); // Берем шаблон персонажа

      var wizardElement = template.cloneNode(true); // Кнонируем узел со всем содержимым из шаблона и записываем в переменную
      var wizardNameElement = wizardElement.querySelector('.setup-similar-label'); // Находим из клона елемент отвечающий за имя
      var wizardCoatColorElement = wizardElement.querySelector('.wizard-coat'); // Находим из клона елемент отвечающий за цвет плаща
      var wizardEyesColorElement = wizardElement.querySelector('.wizard-eyes'); // Находим из клона елемент отвечающий за цвет глаз

      wizardNameElement.textContent = object.name; // Записываем в элемент имя
      wizardCoatColorElement.style.fill = object.colorCoat; // Указываем цвет заливки для плаща
      wizardEyesColorElement.style.fill = object.colorEyes; // Указываем цвет заливки для глаз

      return wizardElement; // Возвращаем клон с нужными данными
    },

    onLoadSuccess: function (data) {
      var similarWizards = data
        .slice(0, NUMBER_WIZARDS) // Обрезаем массив до 4 карточек
        .map(window.similarWizards.createWizard); // Создаём массив элементов персонажей

      window.Util.renderElements(similarWizards, window.Map.elements.setupListElement); // Вставляем элементы персонажей в нужный контейнер
    },
  };
})();
