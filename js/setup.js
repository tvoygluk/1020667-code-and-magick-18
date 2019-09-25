'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomArrayElement = function (someArray) {
  return someArray[Math.floor(Math.random() * someArray.length)];
};

var makeFullName = function (name, surname) {
  return name + ' ' + surname;
};

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var makeMocks = function () {
  var MOCKS_LENGTH = 4;
  var mocksArray = [];

  for (var i = 0; i < MOCKS_LENGTH; i++) {
    var mockObj = {
      name: makeFullName(getRandomArrayElement(WIZARD_NAMES), getRandomArrayElement(WIZARD_SURNAMES)),
      coatColor: getRandomArrayElement(COAT_COLORS),
      eyesColor: getRandomArrayElement(EYES_COLOR)
    };

    mocksArray.push(mockObj);
  }

  return mocksArray;
};

var wizards = makeMocks();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addFragmentToLayout = function (mocks, addedBlock, renderFun) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < mocks.length; i++) {
    fragment.appendChild(renderFun(mocks[i]));
  }
  addedBlock.appendChild(fragment);
};

addFragmentToLayout(wizards, similarListElement, renderWizard);
setup.querySelector('.setup-similar').classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
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

var userNameInput = setup.querySelector('.setup-user-name');

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

var setupPlayer = document.querySelector('.setup-player');

var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
var fireballInput = document.getElementsByName('fireball-color');
var makeRandomFireballColor = function () {
  fireball.style.background = getRandomArrayElement(FIREBALL_COLOR);
};
fireball.addEventListener('click', function () {
  makeRandomFireballColor();
  fireballInput[0].value = codeRgbToHex(fireball.style.background);
});

var coat = setupPlayer.querySelector('.wizard-coat');
var coatInput = document.getElementsByName('coat-color');
var makeRandomCoatColor = function () {
  coat.style = 'fill: ' + getRandomArrayElement(COAT_COLORS);
};
coat.addEventListener('click', function () {
  makeRandomCoatColor();
  coatInput[0].value = coat.style.fill;
});

var eyes = setupPlayer.querySelector('.wizard-eyes');
var eyesInput = document.getElementsByName('eyes-color');
var makeRandomEyesColor = function () {
  eyes.style = 'fill: ' + getRandomArrayElement(EYES_COLOR);
};
eyes.addEventListener('click', function () {
  makeRandomEyesColor();
  eyesInput[0].value = eyes.style.fill;
});


