'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var GAP_BETWEEN_COLONS = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150 - 2 * GAP;
var COMMON_FONT_GAP_X = CLOUD_X + 2 * GAP;
var COMMON_FONT_GAP_Y = GAP + FONT_GAP;
var BIG_BOTTOM_GAP = CLOUD_HEIGHT - (2 * GAP) - FONT_GAP;

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

var generateColor = function () {
  return 'hsl(240, ' + Math.floor(Math.random() * 100).toString(10) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderRect(ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      'rgba(0, 0, 0, 0.7)');

  renderRect(ctx,
      CLOUD_X,
      CLOUD_Y,
      CLOUD_WIDTH,
      CLOUD_HEIGHT,
      '#fff');

  renderText(ctx,
      'Ура вы победили!',
      COMMON_FONT_GAP_X,
      1.5 * COMMON_FONT_GAP_Y);

  renderText(ctx,
      'Список результатов:',
      COMMON_FONT_GAP_X,
      2.5 * COMMON_FONT_GAP_Y);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var xCommonCoordinate = CLOUD_X + GAP_BETWEEN_COLONS + (GAP_BETWEEN_COLONS + BAR_WIDTH) * i;
    var personalHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var myColor = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : generateColor();

    renderText(ctx,
        players[i],
        xCommonCoordinate,
        CLOUD_HEIGHT - GAP);

    renderRect(ctx,
        xCommonCoordinate,
        BIG_BOTTOM_GAP - personalHeight,
        BAR_WIDTH,
        personalHeight,
        myColor);

    renderText(ctx,
        Math.round(times[i]),
        xCommonCoordinate,
        BIG_BOTTOM_GAP - personalHeight - GAP);
  }
};
