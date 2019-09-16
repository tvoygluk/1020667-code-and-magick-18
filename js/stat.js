// Задача
// В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window, со следующими параметрами:
// ctx — канвас на котором рисуется игра.
// names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имён формируется случайным образом.
// times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.
// Эта функция будет вызываться каждый раз когда игрок проходит уровень. Чтобы успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.
// При вызове этой функции на канвас ctx должны быть выведены следующие элементы:

// 1. Белое облако с координатами [100, 10] высотой 270px и шириной 420px. Облако может быть как правильным многоугольником,
// нарисованным методом fillRect, так и неправильным нарисованным с помощью методов beginPath, moveTo, closePath, fill и других.
// 2. Под облаком должна располагаться тень: многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7)
// (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
// ---------------------TODO---------------------
// 3. На облаке должен быть отрисован текст сообщения ’Ура вы победили!\nСписок результатов:’
// с помощью метода fillText. Текст должен быть набран шрифтом PT Mono размером 16px.
// ---------------------____---------------------
// Обратите внимание. Особенностью отрисовки текста на канвасе является то, что он не поддерживает перенос, поэтому каждая новая строчка должна быть отрисована новым вызовом метода fillText или strokeText.
// После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:

// 4. Высота гистограммы 150px.

// 5.  Ширина колонки 40px.

// Расстояние между колонками 50px.

// Цвет колонки игрока Вы rgba(255, 0, 0, 1).

// Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.

// Обратите внимание. В rgba последний параметр — это прозрачность, а не насыщенность. Поэтому для задания цвета колонок других игроков нужно использовать hsl.
// Обратите внимание. Функцию отрисовки статистики вызывать не надо. Её будет вызывать непосредственно сама игра из файла js/game.js.
// Обратите внимание. Время прохождения игры должно быть округлено к целому числу.
// Ниже показан пример, как может выглядеть экран успешного прохождения уровня.

// 'use strict';

// var CLOUD_WIDTH = 420;
// var CLOUD_HEIGHT = 270;
// var CLOUD_X = 100;
// var CLOUD_Y = 10;
// var GAP = 10;
// var FONT_GAP = 15;
// var TEXT_WIDTH = 50;
// var BAR_HEIGHT = 20;
// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

// var renderCloud = function (ctx, x, y, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
// };

// var getMaxElement = function (arr) {
//   var maxElement = arr[0];

//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] > maxElement) {
//       maxElement = arr[i];
//     }
//   }

//   return maxElement;
// };

// window.renderStatistics = function (ctx, players, times) {
//   renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
//   renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

//   ctx.fillStyle = '#000';

//   var maxTime = getMaxElement(times);

//   for (var i = 0; i < players.length; i++) {
//     ctx.fillText(players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
//     ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
//   }
// };

'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
// var TEXT_WIDTH = 50;
// var BAR_HEIGHT = 20;
// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;
var BAR_WIDTH = 40;
var barHeight = 150 - (4 * GAP) - (2 * FONT_GAP);
var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, textSizeAndFont, color) {
  ctx.fillStyle = color || '#000';
  ctx.font = textSizeAndFont || '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  var maxTime = getMaxElement(times);
  var BIG_BOTTOM_GAP = CLOUD_HEIGHT - (2 * GAP) - FONT_GAP;

  for (var i = 0; i < players.length; i++) {
    // renderText(ctx, players[i], CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
    // renderRect(ctx, CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT, 'blue');
    renderText(ctx, players[i], CLOUD_X + (GAP * 3) + ((GAP * 4) + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    renderRect(ctx, CLOUD_X + (GAP * 3) + ((GAP * 4) + BAR_WIDTH) * i, BIG_BOTTOM_GAP - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime, 'blue');
  }
};
