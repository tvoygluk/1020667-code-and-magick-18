'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var POPUP_START_POSITION_X = '50%';
  var POPUP_START_POSITION_Y = '80px';

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.setupElement.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (!evt.target.classList.contains('setup-user-name'))) {
      closePopup();
    }
  };

  var openPopup = function () {
    window.setup.setupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.setupElement.classList.add('hidden');
    window.setup.setupElement.style.left = POPUP_START_POSITION_X;
    window.setup.setupElement.style.top = POPUP_START_POSITION_Y;
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var dialogHandler = window.setup.setupElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.setupElement.style.top = (window.setup.setupElement.offsetTop - shift.y) + 'px';
      window.setup.setupElement.style.left = (window.setup.setupElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (drugEvt) {
          drugEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
