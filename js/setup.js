'use strict';

// (function () {
//   var URL = 'https://js.dump.academy/code-and-magick/data';

//   window.load = function (onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.addEventListener('load', function () {
//       if (xhr.status === 200) {
//         onSuccess(xhr.response);
//       } else {
//         onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
//       }
//     });
//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//     });

//     xhr.timeout = 10000; // 10s

//     xhr.open('GET', URL);
//     xhr.send();
//   };
// })();


(function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

})();


(function () {

//   var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
//   var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var getRandomArrayElement = function (someArray) {
    return someArray[Math.floor(Math.random() * someArray.length)];
  };
  var setupElement = document.querySelector('.setup');

//   var makeFullName = function (name, surname) {
//     return name + ' ' + surname;
//   };

//   var similarListElement = setupElement.querySelector('.setup-similar-list');

//   var similarWizardTemplate = document.querySelector('#similar-wizard-template')
//   .content
//   .querySelector('.setup-similar-item');

//   var makeMocks = function () {
//     var MOCKS_LENGTH = 4;
//     var mocksArray = [];

//     for (var i = 0; i < MOCKS_LENGTH; i++) {
//       var mockObj = {
//         name: makeFullName(getRandomArrayElement(WIZARD_NAMES), getRandomArrayElement(WIZARD_SURNAMES)),
//         coatColor: getRandomArrayElement(COAT_COLORS),
//         eyesColor: getRandomArrayElement(EYES_COLOR)
//       };

//       mocksArray.push(mockObj);
//     }

//     return mocksArray;
//   };

//   var wizards = makeMocks();

//   var renderWizard = function (wizard) {
//     var wizardElement = similarWizardTemplate.cloneNode(true);

//     wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
//     wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//     wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

//     return wizardElement;
//   };

//   window.load.loadFun(window.load.URL, addFragmentToLayout(wizards));

//   var addFragmentToLayout = function (mocks) {
//     var fragment = document.createDocumentFragment();

//     for (var i = 0; i < mocks.length; i++) {
//       fragment.appendChild(renderWizard(mocks[i]));
//     }
//     similarListElement.appendChild(fragment);
//     setupElement.querySelector('.setup-similar').classList.remove('hidden');
//   };

//   addFragmentToLayout(wizards);

  window.setup = {
    // WIZARD_NAMES: WIZARD_NAMES,
    // WIZARD_SURNAMES: WIZARD_SURNAMES,
    COAT_COLORS: COAT_COLORS,
    EYES_COLOR: EYES_COLOR,
    getRandomArrayElement: getRandomArrayElement,
    setupElement: setupElement
  };
})();
