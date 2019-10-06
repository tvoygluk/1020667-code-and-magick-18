'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var getRandomArrayElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };
  var setupElement = document.querySelector('.setup');

  var makeFullName = function (name, surname) {
    return name + ' ' + surname;
  };

  var similarListElement = setupElement.querySelector('.setup-similar-list');

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
  setupElement.querySelector('.setup-similar').classList.remove('hidden');

  window.setup = {
    WIZARD_NAMES: WIZARD_NAMES,
    WIZARD_SURNAMES: WIZARD_SURNAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLOR: EYES_COLOR,
    getRandomArrayElement: getRandomArrayElement,
    setupElement: setupElement
  };
})();
