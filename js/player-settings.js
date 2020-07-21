'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  function selectRandomElementColor(element, input, colorArray, cssProperty) {
    var randomColor = colorArray[window.Util.getRandomNumber(0, colorArray.length)]; // Генерируем случайный цвет из массива, переданного аргуметом

    element.style[cssProperty] = randomColor; // Выставляем цвет элементу из аргумента
    input.value = randomColor; // Записываем цвет в скрытое поле
  }

  var onEyesChange = window.debounce(function () {
    window.similarWizards.update();
  });

  var onCoatChange = window.debounce(function () {
    window.similarWizards.update();
  });

  window.wizardSettings = {
    onCoatClick: function () {
      selectRandomElementColor(window.Map.elements.setupWizardCoatElement, window.Map.elements.coatInputElement, window.Map.wizardsData.COAT_COLORS, 'fill');
      onEyesChange();
    },

    onEyesClick: function () {
      selectRandomElementColor(window.Map.elements.setupWizardEyesElement, window.Map.elements.eyesInputElement, window.Map.wizardsData.EYES_COLORS, 'fill');
      onCoatChange();
    },

    onFireballClick: function () {
      selectRandomElementColor(window.Map.elements.setupFireballElement, window.Map.elements.fireballInputElement, window.Map.wizardsData.FIREBALL_COLORS, 'backgroundColor');
    },

    onNameFieldValidation: function () {
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
  };
})();
