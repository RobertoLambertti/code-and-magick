'use strict';

(function () {
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

  function openSetup() {
    window.Map.elements.setupElement.classList.remove('hidden');

    window.addEventListener('keydown', onSetupEscPress); // Добавляем обработчик закрытия при нажатие Esc
    window.Map.elements.setupCloseButtonElement.addEventListener('click', onSetupCloseClick); // Добавляем обработчик закрытия при клике на крестик
    window.Map.elements.setupCloseButtonElement.addEventListener('keydown', onSetupCloseEnter); // Добавляем обработчик закрытия при нажатии Enter на крестике

    window.Map.elements.setupNameFieldElement.addEventListener('input', window.wizardSettings.onNameFieldValidation); // Добавляем проверку имени при вводе
    window.Map.elements.setupNameFieldElement.addEventListener('submit', window.wizardSettings.onNameFieldValidation); // Добавляем проверку имени при отправке

    window.Map.elements.setupWizardCoatElement.addEventListener('click', window.wizardSettings.onCoatClick); // Добавляем обработчик клика на плащ
    window.Map.elements.setupWizardEyesElement.addEventListener('click', window.wizardSettings.onEyesClick); // Добавляем обработчик клика на злаза
    window.Map.elements.setupFireballElement.addEventListener('click', window.wizardSettings.onFireballClick); // Добавляем обработчик клика на шар
    window.Map.elements.setupUploadElement.addEventListener('mousedown', window.dialogMove.onSetupMove); // Добавляем обработчик перемещения окна
  }

  function closeSetup() {
    window.Map.elements.setupElement.classList.add('hidden');

    window.removeEventListener('keydown', onSetupEscPress); // Удаляем обработчик закрытия при нажатие Esc
    window.Map.elements.setupCloseButtonElement.removeEventListener('click', onSetupCloseClick); // Удаляем обработчик закрытия при клике на крестик
    window.Map.elements.setupCloseButtonElement.removeEventListener('keydown', onSetupCloseEnter); // Удаляем обработчик закрытия при нажатии Enter на крестике

    window.Map.elements.setupNameFieldElement.removeEventListener('input', window.wizardSettings.onNameFieldValidation); // Удаляем проверку имени при вводе
    window.Map.elements.setupNameFieldElement.removeEventListener('submit', window.wizardSettings.onNameFieldValidation); // Удаляем проверку имени при отправке

    window.Map.elements.setupWizardCoatElement.removeEventListener('click', window.wizardSettings.onCoatClick); // Удаляем обработчик клика на плащ
    window.Map.elements.setupWizardEyesElement.removeEventListener('click', window.wizardSettings.onEyesClick); // Удаляем обработчик клика на злаза
    window.Map.elements.setupFireballElement.removeEventListener('click', window.wizardSettings.onFireballClick); // Удаляем обработчик клика на шар
    window.Map.elements.setupUploadElement.removeEventListener('mousedown', window.dialogMove.onSetupMove); // Удаляем обработчик перемещения окна
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
    }
  };
})();
