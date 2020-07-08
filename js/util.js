'use strict';

(function () {
  window.Util = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    renderElements: function (elements, container, insertBefore) {
      var fragment = document.createDocumentFragment(); // Создаём фрагмент

      if (Array.isArray(elements)) {
        elements.forEach(function (item) {
          fragment.appendChild(item); // Вставляем во фрагмент элементы из массива
        });
      } else {
        fragment.appendChild(elements); // Вставляем во фрагмент элемент
      }

      if (insertBefore) {
        container.insertBefore(fragment, insertBefore);
      } else {
        container.appendChild(fragment); // Вставляем фрагмент в разметку
      }
    },
  };
})();
