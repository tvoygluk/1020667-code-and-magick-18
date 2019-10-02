'use strict';

(function () {
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var userNameInput = window.setup.setupElement.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var codeRgbToHex = function (rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  };

  var makeRandomWizardLook = function (wizardPart, catalogue, fireballTrigger) {
    var randomElement = window.setup.getRandomArrayElement(catalogue);
    if (fireballTrigger) {
      wizardPart.style.background = randomElement;
    }
    wizardPart.style.fill = randomElement;
  };

  var addWizardLookToInput = function (wizardPart, inputElement, fireballTrigger) {
    inputElement[0].value = fireballTrigger ? codeRgbToHex(wizardPart.style.background) : wizardPart.style.fill;
  };

  var setupMyCharacter = function (wizardPart, catalogue, inputElement, fireballTrigger) {
    makeRandomWizardLook(wizardPart, catalogue, fireballTrigger);
    addWizardLookToInput(wizardPart, inputElement, fireballTrigger);
  };

  var setupPlayer = document.querySelector('.setup-player');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var coat = setupPlayer.querySelector('.wizard-coat');
  var eyes = setupPlayer.querySelector('.wizard-eyes');
  var fireballInput = document.getElementsByName('fireball-color');
  var coatInput = document.getElementsByName('coat-color');
  var eyesInput = document.getElementsByName('eyes-color');

  fireball.addEventListener('click', function () {
    setupMyCharacter(fireball, FIREBALL_COLOR, fireballInput, true);
  });

  coat.addEventListener('click', function () {
    setupMyCharacter(coat, window.setup.COAT_COLORS, coatInput);
  });

  eyes.addEventListener('click', function () {
    setupMyCharacter(eyes, window.setup.EYES_COLOR, eyesInput);
  });
})();
