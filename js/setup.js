'use strict';

var wizardsData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
};

var setup = {
  element: document.querySelector('.setup'),
  similarElement: document.querySelector('.setup-similar'),
  listElement: document.querySelector('.setup-similar-list'),
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWizard() {
  var randomName = wizardsData.NAMES[getRandomNumber(0, wizardsData.NAMES.length)]; // Случайно выбираем имя из массива и записываем в переменную
  var randomSurname = wizardsData.SURNAMES[getRandomNumber(0, wizardsData.SURNAMES.length)]; // Случайно выбираем фамилию из массива и записываем в переменную
  var randomCoatColor = wizardsData.COAT_COLORS[getRandomNumber(0, wizardsData.COAT_COLORS.length)]; // Случайно выбираем цвет плаща из массива и записываем в переменную
  var randomEyesColor = wizardsData.EYES_COLORS[getRandomNumber(0, wizardsData.EYES_COLORS.length)]; // Случайно выбираем цвет глаз из массива и записываем в переменную

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

function renderWizards(arrayElements, container) {
  var fragment = document.createDocumentFragment(); // Создаём фрагмент

  for (var wizard = 0; wizard < arrayElements.length; wizard++) {
    fragment.appendChild(arrayElements[wizard]); // Вставляем во фрагмент элементы из массива
  }

  container.appendChild(fragment); // Вставляем фрагмент в разметку
}

setup.element.classList.remove('hidden'); // Показываем попап редактирования персонажа

var wizards = getWizards(4); // Создаём массив с данными персонажей
var wizardsElements = wizards.map(createWizard); // Создаём массив элементов персонажей
renderWizards(wizardsElements, setup.listElement); // Вставляем элементы персонажей в нужный контейнер

setup.similarElement.classList.remove('hidden'); // Показываем блок с похожими персонажами
