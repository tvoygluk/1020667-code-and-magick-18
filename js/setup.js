'use strict';

(function () {
  var WISARDS_LIMIT = 4;



  // var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  // var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];





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

  var renderAllWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var shuffledWizards = wizards.sort(function () {
      return Math.random() - 0.5;
    });

    for (var i = 0; i < WISARDS_LIMIT; i++) {
      fragment.appendChild(renderWizard(shuffledWizards[i]));
    }
    // similarListElement.remove();
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);

    setupElement.querySelector('.setup-similar').classList.remove('hidden');
  };



  // var wizardElement = document.querySelector('.setup-wizard');

  // var wizardCoatElement = wizardElement.querySelector('.wizard-coat');


  // wizardCoatElement.addEventListener('click', function () {
  //   var newColor = getRandomElement(COAT_COLORS);
  //   this.style.fill = newColor;
  // });


  // var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  // wizardEyesElement.addEventListener('click', function () {
  //   var newColor = getRandomElement(EYES_COLORS);
  //   this.style.fill = newColor;
  // });



  var coatColor;
  var eyesColor;
  var wizards = [];
  var getRandomElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };
  var updateWizards = function () {
    // renderAllWizards(wizards);
    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    renderAllWizards(sameCoatWizards);
  };


  // var wizardElement = document.querySelector('.setup-wizard');

  // var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  // wizardCoatElement.addEventListener('click', function () {
  //   var newColor = getRandomElement(COAT_COLORS);
  //   this.style.fill = newColor;
  //   coatColor = newColor;
  //   updateWizards();
  // });

  // var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  // wizardEyesElement.addEventListener('click', function () {
  //   var newColor = getRandomElement(EYES_COLORS);
  //   this.style.fill = newColor;
  //   eyesColor = newColor;
  //   updateWizards();
  // });




  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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
    window.backend.save(sentData, errorHandler, new FormData(form));
    evt.preventDefault();
  };

  form.addEventListener('submit', onSubmitForm);

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    getRandomElement: getRandomElement,
    setupElement: setupElement,
    coatColor: coatColor,
    eyesColor: eyesColor,
    updateWizards: updateWizards
  };
})();










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
    var randomElement = window.setup.getRandomElement(catalogue);
    if (fireballTrigger) {
      wizardPart.style.background = randomElement;
    }
    wizardPart.style.fill = randomElement;
    window.setup.updateWizards();
    return randomElement;
  };

  var addWizardLookToInput = function (wizardPart, inputElement, fireballTrigger) {
    inputElement[0].value = fireballTrigger ? codeRgbToHex(wizardPart.style.background) : wizardPart.style.fill;
  };

  var setupMyCharacter = function (wizardPart, catalogue, inputElement, fireballTrigger) {
    var someThing = makeRandomWizardLook(wizardPart, catalogue, fireballTrigger);
    addWizardLookToInput(wizardPart, inputElement, fireballTrigger);
    return someThing;
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
    window.setup.coatColor = setupMyCharacter(coat, window.setup.COAT_COLORS, coatInput);
  });


  eyes.addEventListener('click', function () {
    window.setup.eyesColor = setupMyCharacter(eyes, window.setup.EYES_COLORS, eyesInput);
  });

})();
