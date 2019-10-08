'use strict';

(function () {
  var WISARDS_LIMIT = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var getRandomArrayElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };
  var setupElement = document.querySelector('.setup');
  setupElement.classList.remove('hidden');

  var similarListElement = setupElement.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    var shuffledWizards = wizards.sort(function () {
      return Math.random() - 0.5;
    });

    for (var i = 0; i < WISARDS_LIMIT; i++) {
      fragment.appendChild(renderWizard(shuffledWizards[i]));
    }
    similarListElement.appendChild(fragment);

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: purple;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var form = setupElement.querySelector('.setup-wizard-form');

  var sentData = function () {
    setupElement.classList.add('hidden');
  };

  var onSubmitForm = function (evt) {
    window.backend.save(new FormData(form), sentData, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', onSubmitForm);

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLOR: EYES_COLOR,
    getRandomArrayElement: getRandomArrayElement,
    setupElement: setupElement
  };
})();
