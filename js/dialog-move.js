'use strict';

(function () {
  window.dialogMove = {
    onSetupMove: function (evt) {
      evt.preventDefault();

      var dragged = false;

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY,
      };

      function onClickPreventDefault(evtClick) {
        evtClick.preventDefault();

        window.Map.elements.setupUploadElement.removeEventListener('click', onClickPreventDefault);
      }

      function onMouseMove(evtMove) {
        evtMove.preventDefault();

        dragged = true;

        var shift = {
          x: startCoordinates.x - evtMove.clientX,
          y: startCoordinates.y - evtMove.clientY,
        };

        startCoordinates = {
          x: evtMove.clientX,
          y: evtMove.clientY,
        };

        window.Map.elements.setupElement.style.top = (window.Map.elements.setupElement.offsetTop - shift.y) + 'px';
        window.Map.elements.setupElement.style.left = (window.Map.elements.setupElement.offsetLeft - shift.x) + 'px';
      }

      function onMouseUp(evtUp) {
        evtUp.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          window.Map.elements.setupUploadElement.addEventListener('click', onClickPreventDefault);
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };
})();
