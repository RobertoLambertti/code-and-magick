'use strict';

(function () {
  var SAVE_URL = 'https://javascript.pages.academy/code-and-magick';

  var setupElement = window.Map.elements.setupElement;
  var setupFormElement = window.Map.elements.setupFormElement;
  var setupCloseButtonElement = window.Map.elements.setupCloseButtonElement;
  var setupNameFieldElement = window.Map.elements.setupNameFieldElement;

  var setupWizardCoatElement = window.Map.elements.setupWizardCoatElement;
  var setupWizardEyesElement = window.Map.elements.setupWizardEyesElement;
  var setupFireballElement = window.Map.elements.setupFireballElement;
  var setupUploadElement = window.Map.elements.setupUploadElement;

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

  function onSetupSubmit(evt) {
    evt.preventDefault();
    var data = new FormData(setupFormElement);

    window.backend.save(SAVE_URL, data, closeSetup, window.backend.onError);
  }

  function openSetup() {
    setupElement.classList.remove('hidden');

    window.addEventListener('keydown', onSetupEscPress); // Добавляем обработчик закрытия при нажатие Esc
    setupCloseButtonElement.addEventListener('click', onSetupCloseClick); // Добавляем обработчик закрытия при клике на крестик
    setupCloseButtonElement.addEventListener('keydown', onSetupCloseEnter); // Добавляем обработчик закрытия при нажатии Enter на крестике

    setupFormElement.addEventListener('submit', onSetupSubmit); // Добавляем обработчик отправки формы

    setupNameFieldElement.addEventListener('input', window.wizardSettings.onNameFieldValidation); // Добавляем проверку имени при вводе
    setupNameFieldElement.addEventListener('submit', window.wizardSettings.onNameFieldValidation); // Добавляем проверку имени при отправке

    setupWizardCoatElement.addEventListener('click', window.wizardSettings.onCoatClick); // Добавляем обработчик клика на плащ
    setupWizardEyesElement.addEventListener('click', window.wizardSettings.onEyesClick); // Добавляем обработчик клика на злаза
    setupFireballElement.addEventListener('click', window.wizardSettings.onFireballClick); // Добавляем обработчик клика на шар
    setupUploadElement.addEventListener('mousedown', window.dialogMove.onSetupMove); // Добавляем обработчик перемещения окна
  }

  function closeSetup() {
    window.Map.elements.setupElement.classList.add('hidden');

    window.removeEventListener('keydown', onSetupEscPress); // Удаляем обработчик закрытия при нажатие Esc
    setupCloseButtonElement.removeEventListener('click', onSetupCloseClick); // Удаляем обработчик закрытия при клике на крестик
    setupCloseButtonElement.removeEventListener('keydown', onSetupCloseEnter); // Удаляем обработчик закрытия при нажатии Enter на крестике

    setupFormElement.addEventListener('submit', onSetupSubmit); // Удаляем обработчик отправки формы

    setupNameFieldElement.removeEventListener('input', window.wizardSettings.onNameFieldValidation); // Удаляем проверку имени при вводе
    setupNameFieldElement.removeEventListener('submit', window.wizardSettings.onNameFieldValidation); // Удаляем проверку имени при отправке

    setupWizardCoatElement.removeEventListener('click', window.wizardSettings.onCoatClick); // Удаляем обработчик клика на плащ
    setupWizardEyesElement.removeEventListener('click', window.wizardSettings.onEyesClick); // Удаляем обработчик клика на злаза
    setupFireballElement.removeEventListener('click', window.wizardSettings.onFireballClick); // Удаляем обработчик клика на шар
    setupUploadElement.removeEventListener('mousedown', window.dialogMove.onSetupMove); // Удаляем обработчик перемещения окна
  }

  window.dialog = {
    hangHandlers: function () {
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
    },
  };
})();
