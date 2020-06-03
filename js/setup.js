'use strict';

var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizardsFragment = document.createDocumentFragment();

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = {
  ELEMENT: document.querySelector('.setup'),
  ELEMENT_SIMULAR: document.querySelector('.setup-similar'),
  LIST_ELEMENT: document.querySelector('.setup-similar-list'),
};

var wizards = [
  {
    name: getRandomName(), // Записываем результат генерации случайного имени
    coatColor: getRandomCoatColor(), // Записываем результат генерации случайного света плаща
    eyesColor: getRandomEyesColor(), // Записываем результат генерации глучайного цвет глаз
  },
  {
    name: getRandomName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor(),
  },
  {
    name: getRandomName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor(),
  },
  {
    name: getRandomName(),
    coatColor: getRandomCoatColor(),
    eyesColor: getRandomEyesColor(),
  },
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomName() {
  var randomName = NAMES[getRandomNumber(0, NAMES.length)]; // Случайно выбираем имя из массива и записываем в переменную
  var randomSurname = SURNAMES[getRandomNumber(0, SURNAMES.length)]; // Случайно выбираем фамилию из массива и записываем в переменную

  return randomName + ' ' + randomSurname; // Возвращаем комбинацию имени и фамилии
}

function getRandomCoatColor() {
  var randomCoatColor = COAT_COLOR[getRandomNumber(0, COAT_COLOR.length)]; // Случайно выбираем цвет плаща из массива и записываем в переменную
  return randomCoatColor; // Возвращаем цвет плаща
}

function getRandomEyesColor() {
  var randomEyesColor = EYES_COLOR[getRandomNumber(0, EYES_COLOR.length)]; // Случайно выбираем цвет глаз из массива и записываем в переменную
  return randomEyesColor; // Возвращаем цвет глаз
}

function getRenderWizard(wizard) {
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true); // Кнонируем узел со всем содержимым и записываем в переменную
  var wizardNameElement = wizardElement.querySelector('.setup-similar-label'); // Находим из клона елемент отвечающий за имя и записываем в переменную
  var wizardCoatColorElement = wizardElement.querySelector('.wizard-coat'); // Находим из клона елемент отвечающий за цвет плаща и записываем в переменную
  var wizardEyesColorElement = wizardElement.querySelector('.wizard-eyes'); // Находим из клона елемент отвечающий за цвет глаз и записываем в переменную

  wizardNameElement.textContent = wizards[wizard].name; // Записываем в элемент имя
  wizardCoatColorElement.style.fill = wizards[wizard].coatColor; // Указываем цвет заливки для плаща
  wizardEyesColorElement.style.fill = wizards[wizard].eyesColor; // Указываем цвет заливки для глаз

  return wizardElement; // Возвращаем одного персонажа
}

setup.ELEMENT.classList.remove('hidden'); // Показываем попап редактирования персонажа

for (var wizard = 0; wizard < wizards.length; wizard++) {
  wizardsFragment.appendChild(getRenderWizard(wizard)); // Вставляем в конец фрагмента одного персонажа на каждой итерации
}

setup.LIST_ELEMENT.appendChild(wizardsFragment); // Вставляем фрагмент в разметку
setup.ELEMENT_SIMULAR.classList.remove('hidden'); // Показываем блок с похожими персонажами
