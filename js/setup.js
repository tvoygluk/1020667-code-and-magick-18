/*
1. Покажите блок .setup, убрав в JS-коде у него класс .hidden.
2. Создайте массив, состоящий из 4 сгенерированных JS объектов, которые будут описывать похожих персонажей. Объекты должны содержать следующие поля:
name, строка — случайно сгенерированное имя персонажа. Имя генерируется из массивов имен и фамилий: нужно случайным образом выбрать из массива имен имя, а из массива фамилий фамилию и сложить их. При желании имя и фамилию можно в случайном порядке менять местами:
Имена
Иван
Хуан Себастьян
Мария
Кристоф
Виктор
Юлия
Люпита
Вашингтон
Фамилии
да Марья
Верон
Мирабелла
Вальц
Онопко
Топольницкая
Нионго
Ирвинг
coatColor, строка — случайный цвет мантии на выбор из следующих:
rgb (101, 137, 164)
rgb (241, 43, 107)
rgb (146, 100, 161)
rgb (56, 159, 117)
rgb (215, 210, 55)
rgb (0, 0, 0)
eyesColor, строка — случайный цвет глаз персонажа на выбор из следующих:
black
red
blue
yellow
green
3. На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template создайте DOM-элементы, соответствующие случайно сгенерированным волшебникам и заполните их данными из массива:
имя персонажа name запишите как текст в блок .setup-similar-label;
цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
4. Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list. Для вставки элементов используйте DocumentFragment.
5. Покажите блок .setup-similar, удалив у него CSS-класс hidden.
*/

// Файл setup.js
'use strict';

var WIZARD_NAMES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var wizards = [
  {
    name: WIZARD_NAMES[0],
    coatColor: 'rgb(241, 43, 107)'
  },
  {
    name: WIZARD_NAMES[1],
    coatColor: 'rgb(215, 210, 55)'
  },
  {
    name: WIZARD_NAMES[2],
    coatColor: 'rgb(101, 137, 164)'
  },
  {
    name: WIZARD_NAMES[3],
    coatColor: 'rgb(127, 127, 127)'
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
