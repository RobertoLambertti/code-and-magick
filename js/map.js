'use strict';

(function () {
  var setupElement = document.querySelector('.setup');

  window.Map = {
    elements: {
      setupElement: setupElement,
      setupOpenButtonElement: document.querySelector('.setup-open'),
      setupOpenIconElement: document.querySelector('.setup-open-icon'),
      setupCloseButtonElement: setupElement.querySelector('.setup-close'),
      setupNameFieldElement: setupElement.querySelector('.setup-user-name'),
      setupSimilarElement: setupElement.querySelector('.setup-similar'),
      setupListElement: setupElement.querySelector('.setup-similar-list'),
      setupUploadElement: setupElement.querySelector('.upload'),

      setupWizardCoatElement: setupElement.querySelector('.setup-wizard .wizard-coat'),
      setupWizardEyesElement: setupElement.querySelector('.setup-wizard .wizard-eyes'),
      setupFireballElement: setupElement.querySelector('.setup-fireball-wrap'),

      setupFormElement: setupElement.querySelector('.setup-wizard-form'),
      coatInputElement: setupElement.querySelector('input[name=coat-color]'),
      eyesInputElement: setupElement.querySelector('input[name=eyes-color]'),
      fireballInputElement: setupElement.querySelector('input[name=fireball-color]'),
    },

    wizardsData: {
      NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
      SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
      COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
      EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
      FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    },
  };
})();
