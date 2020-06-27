'use strict';

(function () {
  var NUMBER_WIZARDS = 4;

  function getWizard() {
    var randomName = window.Map.wizardsData.NAMES[window.Util.getRandomNumber(0, window.Map.wizardsData.NAMES.length)]; // Случайно выбираем имя из массива и записываем в переменную
    var randomSurname = window.Map.wizardsData.SURNAMES[window.Util.getRandomNumber(0, window.Map.wizardsData.SURNAMES.length)]; // Случайно выбираем фамилию из массива и записываем в переменную
    var randomCoatColor = window.Map.wizardsData.COAT_COLORS[window.Util.getRandomNumber(0, window.Map.wizardsData.COAT_COLORS.length)]; // Случайно выбираем цвет плаща из массива и записываем в переменную
    var randomEyesColor = window.Map.wizardsData.EYES_COLORS[window.Util.getRandomNumber(0, window.Map.wizardsData.EYES_COLORS.length)]; // Случайно выбираем цвет глаз из массива и записываем в переменную

    return {
      name: randomName + ' ' + randomSurname, // Создаём ключ и записываем под ним результат генерации случайного имени
      coatColor: randomCoatColor, // Создаём ключ и записываем под ним результат генерации случайного цвета плаща
      eyesColor: randomEyesColor, // Создаём ключ и записываем под ним результат генерации случайного цвета глаз
    };
  }

  function getWizards(quantity) {
    var wizards = []; // Создаём массив

    for (var wizard = 0; wizard < quantity; wizard++) {
      wizards.push(getWizard()); // Заполняем массив персонажами
    }

    return wizards; // Возвращаем массив
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
    wizardCoatColorElement.style.fill = object.coatColor; // Указываем цвет заливки для плаща
    wizardEyesColorElement.style.fill = object.eyesColor; // Указываем цвет заливки для глаз

    return wizardElement; // Возвращаем клон с нужными данными
  }

  var wizards = getWizards(NUMBER_WIZARDS); // Создаём массив с данными персонажей

  window.similarWizards = wizards.map(createWizard); // Создаём массив элементов персонажей
})();


