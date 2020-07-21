'use strict';

(function () {
  var NUMBER_WIZARDS = 4;

  var setupListElement = window.Map.elements.setupListElement;

  var coatInputElement = window.Map.elements.coatInputElement;
  var eyesInputElement = window.Map.elements.eyesInputElement;

  function onLoadSuccess(data) {
    window.wizardsData = data; // Запишем данные с сервера
    updateWizards();
  }

  function createWizard(object) {
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
  }

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatInputElement.value) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesInputElement.value) {
      rank += 1;
    }

    return rank;
  }

  function comparatorNames(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    }
    return 0;
  }

  function updateWizards() {
    var similarWizards = window.wizardsData
      .slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (!rankDiff) {
          comparatorNames(left, right);
        }
        return rankDiff;
      })
      .slice(0, NUMBER_WIZARDS)
      .map(createWizard);

    setupListElement.innerHTML = '';
    window.Util.renderElements(similarWizards, setupListElement);
  }

  window.similarWizards = {
    onLoadSuccess: onLoadSuccess,
    update: updateWizards,
  };
})();
