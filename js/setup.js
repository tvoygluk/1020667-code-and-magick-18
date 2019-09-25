/*
>>>>>>>>>>>>> Открытие/закрытие окна настройки персонажа:

Окно .setup должно открываться по нажатию на блок .setup-open.
Открытие окна производится удалением класса hidden у блока

Окно .setup должно закрываться по нажатию на элемент .setup-close, расположенный внутри окна

Добавить обработчики для альтернативного ввода с клавиатуры keydown для
кнопок открытия/закрытия диалога настройки персонажа:

Когда иконка пользователя в фокусе .setup-open-icon,
то окно настройки персонажа должно открываться по нажатию кнопки ENTER
Не забудьте добавить tabindex="0" для иконки пользователя, чтобы она фокусировалась.
Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
Если фокус находится на форме ввода имени, то окно закрываться не должно.
Если окно открыто и фокус находится на кнопке закрытия окна,
то нажатие клавиши ENTER должно приводить к закрытию диалога
Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы
Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER приводит к отправке формы

>>>>>>>>>>>>> Валидация ввода имени персонажа.
Имя персонажа вводится в поле .setup-user-name. Добавьте следующие ограничения:

имя персонажа не может содержать менее 2 символов;
максимальная длина имени персонажа — 25 символов.
Для указания ограничений на ввод используйте стандартные возможности форм HTML5.

>>>>>>>>>>>>> Изменение цвета мантии персонажа по нажатию.
Цвет мантии .setup-wizard .wizard-coat должен обновляться по нажатию на неё.
Цвет мантии задаётся через изменение инлайнового CSS-свойства fill для элемента.

Цвет должен сменяться произвольным образом на один из следующих цветов:

rgb(101, 137, 164)
rgb(241, 43, 107)
rgb(146, 100, 161)
rgb(56, 159, 117)
rgb(215, 210, 55)
rgb(0, 0, 0)

>>>>>>>>>>>>> Изменение цвета глаз персонажа по нажатию.
Цвет глаз волшебника меняется по нажатию на блок .setup-wizard .wizard-eyes.

Возможные варианты цвета глаз персонажа:

black
red
blue
yellow
green

>>>>>>>>>>>>> Изменение цвета фаерболов по нажатию.
Цвет задаётся через изменение фона у блока .setup-fireball-wrap.

Возможные варианты цвета:

#ee4830
#30a8ee
#5ce6c0
#e848d5
#e6e848

Для того, чтобы на сервер отправились правильные данные, при изменении параметров персонажа должно изменяться и значение соответствующего скрытого инпута.
Форма должна отправляться на урл https://js.dump.academy/code-and-magick методом POST с типом multipart/form-data
Ограничений на алгоритм выбора цвета нет: это может быть случайный выбор, а может быть изменение цвета по порядку в списке.

*/
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
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

userNameInput.addEventListener('invalid', function (evt) {
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

