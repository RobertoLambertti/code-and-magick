'use strict';

var NUMBER_WIZARDS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var setupElement = document.querySelector('.setup');
var setupOpenButtonElement = document.querySelector('.setup-open');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupCloseButtonElement = setupElement.querySelector('.setup-close');
var setupNameFieldElement = setupElement.querySelector('.setup-user-name');
var setupSimilarElement = setupElement.querySelector('.setup-similar');
var setupListElement = setupElement.querySelector('.setup-similar-list');

var setupWizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
var setupFireballElement = setupElement.querySelector('.setup-fireball-wrap');

var coatInputElement = setupElement.querySelector('input[name=coat-color]');
var eyesInputElement = setupElement.querySelector('input[name=eyes-color]');
var fireballInputElement = setupElement.querySelector('input[name=fireball-color]');

var wizardsData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* Функции похожих персонажей
============================================= */

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

/* Функции управление Setup
============================================= */

function selectRandomElementColor(element, input, colorArray, cssProperty) {
  var randomColor = colorArray[getRandomNumber(0, colorArray.length)]; // Генерируем случайный цвет из массива, переданного аргуметом

  element.style[cssProperty] = randomColor; // Выставляем цвет элементу из аргумента
  input.value = randomColor; // Записываем цвет в скрытое поле
}

function onSetupEscPress(evt) {
  if (evt.code === 'Escape' && !(setupNameFieldElement === document.activeElement)) {
    closeSetup();
  }
}

function onSetupCloseClick() {
  closeSetup();
}

function onSetupCloseEnter(evt) {
  if (evt.code === 'Enter') {
    closeSetup();
  }
}

function onNameFieldValidation() {
  var fieldValueLength = setupNameFieldElement.value.length;

  if (setupNameFieldElement.validity.valueMissing) {
    setupNameFieldElement.setCustomValidity('Бэггинс, ты ли это?');
  } else if (fieldValueLength < MIN_NAME_LENGTH) {
    setupNameFieldElement.setCustomValidity('Дабавляй букавки. Ещё ' + (MIN_NAME_LENGTH - fieldValueLength) + ' симв.');
  } else if (fieldValueLength > MAX_NAME_LENGTH) {
    setupNameFieldElement.setCustomValidity('Уберай букавки. Нужно убрать ' + (MAX_NAME_LENGTH - fieldValueLength) + ' симв.');
  } else {
    setupNameFieldElement.setCustomValidity('');
  }
}

function onCoatClick() {
  selectRandomElementColor(setupWizardCoatElement, coatInputElement, wizardsData.COAT_COLORS, 'fill');
}

function onEyesClick() {
  selectRandomElementColor(setupWizardEyesElement, eyesInputElement, wizardsData.EYES_COLORS, 'fill');
}

function onFireballClick() {
  selectRandomElementColor(setupFireballElement, fireballInputElement, wizardsData.FIREBALL_COLORS, 'backgroundColor');
}

function openSetup() {
  setupElement.classList.remove('hidden');

  window.addEventListener('keydown', onSetupEscPress); // Добавляем обработчик закрытия при нажатие Esc
  setupCloseButtonElement.addEventListener('click', onSetupCloseClick); // Добавляем обработчик закрытия при клике на крестик
  setupCloseButtonElement.addEventListener('keydown', onSetupCloseEnter); // Добавляем обработчик закрытия при нажатии Enter на крестике

  setupNameFieldElement.addEventListener('input', onNameFieldValidation); // Добавляем проверку имени при вводе
  setupNameFieldElement.addEventListener('submit', onNameFieldValidation); // Добавляем проверку имени при отправке

  setupWizardCoatElement.addEventListener('click', onCoatClick); // Добавляем обработчик клика на плащ
  setupWizardEyesElement.addEventListener('click', onEyesClick); // Добавляем обработчик клика на злаза
  setupFireballElement.addEventListener('click', onFireballClick); // Добавляем обработчик клика на шар
}

function closeSetup() {
  setupElement.classList.add('hidden');

  window.removeEventListener('keydown', onSetupEscPress); // Удаляем обработчик закрытия при нажатие Esc
  setupCloseButtonElement.removeEventListener('click', onSetupCloseClick); // Удаляем обработчик закрытия при клике на крестик
  setupCloseButtonElement.removeEventListener('keydown', onSetupCloseEnter); // Удаляем обработчик закрытия при нажатии Enter на крестике

  setupNameFieldElement.removeEventListener('input', onNameFieldValidation); // Удаляем проверку имени при вводе
  setupNameFieldElement.removeEventListener('submit', onNameFieldValidation); // Удаляем проверку имени при отправке

  setupWizardCoatElement.removeEventListener('click', onCoatClick); // Удаляем обработчик клика на плащ
  setupWizardEyesElement.removeEventListener('click', onEyesClick); // Удаляем обработчик клика на злаза
  setupFireballElement.removeEventListener('click', onFireballClick); // Удаляем обработчик клика на шар
}

function hangHandlers() {
  // Открытие окна настроек кликом по иконке
  setupOpenButtonElement.addEventListener('click', function () {
    openSetup();
  });

  // Открытие окна настроек клавишей Enter
  setupOpenIconElement.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
      openSetup();
    }
  });
}

/* Конечные вызовы
============================================= */

var wizards = getWizards(NUMBER_WIZARDS); // Создаём массив с данными персонажей
var wizardsElements = wizards.map(createWizard); // Создаём массив элементов персонажей
renderWizards(wizardsElements, setupListElement); // Вставляем элементы персонажей в нужный контейнер

setupSimilarElement.classList.remove('hidden'); // Показываем похожих персонажей

hangHandlers(); // Вешаем все обработчики
