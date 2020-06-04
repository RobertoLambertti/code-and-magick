'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var wizardsFragment = document.createDocumentFragment();

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

var wizards = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getArrayWizards(quantity) {
  for (var i = 0; i < quantity; i++) {
    wizards[i] = {}; // Создаём пустые массивы
  }
}

function getRandomWizards() {
  for (var i = 0; i < wizards.length; i++) {
    var randomName = wizardsData.NAMES[getRandomNumber(0, wizardsData.NAMES.length)]; // Случайно выбираем имя из массива и записываем в переменную
    var randomSurname = wizardsData.SURNAMES[getRandomNumber(0, wizardsData.SURNAMES.length)]; // Случайно выбираем фамилию из массива и записываем в переменную
    var randomCoatColor = wizardsData.COAT_COLORS[getRandomNumber(0, wizardsData.COAT_COLORS.length)]; // Случайно выбираем цвет плаща из массива и записываем в переменную
    var randomEyesColor = wizardsData.EYES_COLORS[getRandomNumber(0, wizardsData.EYES_COLORS.length)]; // Случайно выбираем цвет глаз из массива и записываем в переменную

    wizards[i] = {
      name: randomName + ' ' + randomSurname, // Создаём ключ и записываем под ним результат генерации случайного имени
      coatColor: randomCoatColor, // Создаём ключ и записываем под ним результат генерации случайного цвета плаща
      eyesColor: randomEyesColor, // Создаём ключ и записываем под ним результат генерации случайного цвета глаз
    };
  }
}

function getCreateWizards(template, fragment) {
  for (var wizard = 0; wizard < wizards.length; wizard++) {
    var wizardElement = template.cloneNode(true); // Кнонируем узел со всем содержимым и записываем в переменную
    var wizardNameElement = wizardElement.querySelector('.setup-similar-label'); // Находим из клона елемент отвечающий за имя
    var wizardCoatColorElement = wizardElement.querySelector('.wizard-coat'); // Находим из клона елемент отвечающий за цвет плаща
    var wizardEyesColorElement = wizardElement.querySelector('.wizard-eyes'); // Находим из клона елемент отвечающий за цвет глаз

    wizardNameElement.textContent = wizards[wizard].name; // Записываем в элемент имя
    wizardCoatColorElement.style.fill = wizards[wizard].coatColor; // Указываем цвет заливки для плаща
    wizardEyesColorElement.style.fill = wizards[wizard].eyesColor; // Указываем цвет заливки для глаз

    fragment.appendChild(wizardElement); // Вставляем в конец фрагмента одного персонажа
  }
}

function getRenderWizards(container) {
  container.appendChild(wizardsFragment); // Вставляем фрагмент в разметку
}

setup.element.classList.remove('hidden'); // Показываем попап редактирования персонажа

getArrayWizards(4); // Генерируем массив из четырёх персонажей
getRandomWizards(); // Генерируем случайные данные для персонажей
getCreateWizards(similarWizardTemplate, wizardsFragment); // Создаём персонажей из шаблона во фрагменте
getRenderWizards(setup.listElement); // Рендрим персонажей в нужном конейнере

setup.similarElement.classList.remove('hidden'); // Показываем блок с похожими персонажами
