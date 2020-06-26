'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  function selectRandomElementColor(element, input, colorArray, cssProperty) {
    var randomColor = colorArray[window.Util.getRandomNumber(0, colorArray.length)]; // Генерируем случайный цвет из массива, переданного аргуметом

    element.style[cssProperty] = randomColor; // Выставляем цвет элементу из аргумента
    input.value = randomColor; // Записываем цвет в скрытое поле
  }

  function onSetupEscPress(evt) {
    if (evt.code === 'Escape' && !(window.Map.elements.setupNameFieldElement === document.activeElement)) {
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
    var fieldValueLength = window.Map.elements.setupNameFieldElement.value.length;

    if (window.Map.elements.setupNameFieldElement.validity.valueMissing) {
      window.Map.elements.setupNameFieldElement.setCustomValidity('Бэггинс, ты ли это?');
    } else if (fieldValueLength < MIN_NAME_LENGTH) {
      window.Map.elements.setupNameFieldElement.setCustomValidity('Дабавляй букавки. Ещё ' + (MIN_NAME_LENGTH - fieldValueLength) + ' симв.');
    } else if (fieldValueLength > MAX_NAME_LENGTH) {
      window.Map.elements.setupNameFieldElement.setCustomValidity('Уберай букавки. Нужно убрать ' + (MAX_NAME_LENGTH - fieldValueLength) + ' симв.');
    } else {
      window.Map.elements.setupNameFieldElement.setCustomValidity('');
    }
  }

  function onCoatClick() {
    selectRandomElementColor(window.Map.elements.setupWizardCoatElement, window.Map.elements.coatInputElement, window.Map.wizardsData.COAT_COLORS, 'fill');
  }

  function onEyesClick() {
    selectRandomElementColor(window.Map.elements.setupWizardEyesElement, window.Map.elements.eyesInputElement, window.Map.wizardsData.EYES_COLORS, 'fill');
  }

  function onFireballClick() {
    selectRandomElementColor(window.Map.elements.setupFireballElement, window.Map.elements.fireballInputElement, window.Map.wizardsData.FIREBALL_COLORS, 'backgroundColor');
  }

  function openSetup() {
    window.Map.elements.setupElement.classList.remove('hidden');

    window.addEventListener('keydown', onSetupEscPress); // Добавляем обработчик закрытия при нажатие Esc
    window.Map.elements.setupCloseButtonElement.addEventListener('click', onSetupCloseClick); // Добавляем обработчик закрытия при клике на крестик
    window.Map.elements.setupCloseButtonElement.addEventListener('keydown', onSetupCloseEnter); // Добавляем обработчик закрытия при нажатии Enter на крестике

    window.Map.elements.setupNameFieldElement.addEventListener('input', onNameFieldValidation); // Добавляем проверку имени при вводе
    window.Map.elements.setupNameFieldElement.addEventListener('submit', onNameFieldValidation); // Добавляем проверку имени при отправке

    window.Map.elements.setupWizardCoatElement.addEventListener('click', onCoatClick); // Добавляем обработчик клика на плащ
    window.Map.elements.setupWizardEyesElement.addEventListener('click', onEyesClick); // Добавляем обработчик клика на злаза
    window.Map.elements.setupFireballElement.addEventListener('click', onFireballClick); // Добавляем обработчик клика на шар
  }

  function closeSetup() {
    window.Map.elements.setupElement.classList.add('hidden');

    window.removeEventListener('keydown', onSetupEscPress); // Удаляем обработчик закрытия при нажатие Esc
    window.Map.elements.setupCloseButtonElement.removeEventListener('click', onSetupCloseClick); // Удаляем обработчик закрытия при клике на крестик
    window.Map.elements.setupCloseButtonElement.removeEventListener('keydown', onSetupCloseEnter); // Удаляем обработчик закрытия при нажатии Enter на крестике

    window.Map.elements.setupNameFieldElement.removeEventListener('input', onNameFieldValidation); // Удаляем проверку имени при вводе
    window.Map.elements.setupNameFieldElement.removeEventListener('submit', onNameFieldValidation); // Удаляем проверку имени при отправке

    window.Map.elements.setupWizardCoatElement.removeEventListener('click', onCoatClick); // Удаляем обработчик клика на плащ
    window.Map.elements.setupWizardEyesElement.removeEventListener('click', onEyesClick); // Удаляем обработчик клика на злаза
    window.Map.elements.setupFireballElement.removeEventListener('click', onFireballClick); // Удаляем обработчик клика на шар
  }

  function hangHandlers() {
    // Открытие окна настроек кликом по иконке
    window.Map.elements.setupOpenButtonElement.addEventListener('click', function () {
      openSetup();
    });

    // Открытие окна настроек клавишей Enter
    window.Map.elements.setupOpenIconElement.addEventListener('keydown', function (evt) {
      if (evt.code === 'Enter') {
        openSetup();
      }
    });
  }

  window.Util.renderElements(window.similarWizards, window.Map.elements.setupListElement); // Вставляем элементы персонажей в нужный контейнер
  window.Map.elements.setupSimilarElement.classList.remove('hidden'); // Показываем похожих персонажей

  hangHandlers(); // Вешаем все обработчики
})();
