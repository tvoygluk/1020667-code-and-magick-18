'use strict';

(function () {
  window.setup = {
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    getRandomArrayElement: function (someArray) {
      return someArray[Math.floor(Math.random() * someArray.length)];
    },
    setupElement: document.querySelector('.setup')
  };

  var makeFullName = function (name, surname) {
    return name + ' ' + surname;
  };

  var similarListElement = window.setup.setupElement.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var makeMocks = function () {
    var MOCKS_LENGTH = 4;
    var mocksArray = [];

    for (var i = 0; i < MOCKS_LENGTH; i++) {
      var mockObj = {
        name: makeFullName(window.setup.getRandomArrayElement(window.setup.WIZARD_NAMES), window.setup.getRandomArrayElement(window.setup.WIZARD_SURNAMES)),
        coatColor: window.setup.getRandomArrayElement(window.setup.COAT_COLORS),
        eyesColor: window.setup.getRandomArrayElement(window.setup.EYES_COLOR)
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
  window.setup.setupElement.querySelector('.setup-similar').classList.remove('hidden');
})();
