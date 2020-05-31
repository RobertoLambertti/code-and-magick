'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_TEXT = '16px PT+Mono';
var GAP = 20;

var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_GAP_TOP = 70;
var BAR_YOU_COLOR = '#f00';

var NAME_GAP_TOP = 260;

var TIME_GAP_TOP = 50;

var maxTime;

function getRenderCloud(ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function getRenderTitle(ctx, font, color, x, y, text) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColorSaturation(h, l) {
  return 'hsl(' + h + ',' + getRandomNumber(0, 100) + '%,' + l + '%';
}

function getMaxTime(times) {
  return Math.max.apply(null, times);
}

function getPlayerName(ctx, player, i, color) {
  ctx.fillStyle = color;
  ctx.fillText(player, CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * (i - 1), NAME_GAP_TOP, BAR_WIDTH + BAR_GAP);
}

function getPlayerChart(ctx, time, player, i) {
  ctx.fillStyle = getRandomColorSaturation(240, 50); // Выбираем синего со случайной насыщенностью

  if (player === 'Вы') {
    ctx.fillStyle = BAR_YOU_COLOR; // Выбираем цвет из переменной
  }

  ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * (i - 1), CLOUD_Y + GAP + BAR_GAP_TOP + (BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * time / maxTime)), BAR_WIDTH, (BAR_MAX_HEIGHT * time) / maxTime);
}

function getPlayerTime(ctx, time, i, color) {
  ctx.fillStyle = color;
  ctx.fillText((time - 1), CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * (i - 1), CLOUD_Y + GAP + TIME_GAP_TOP + (BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * time / maxTime)), BAR_WIDTH + BAR_GAP);
}

window.renderStatistics = function (ctx, players, times) {
  getRenderCloud(ctx, 'rgba(0, 0, 0, 0.7)', CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  getRenderCloud(ctx, '#fff', CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  getRenderTitle(ctx, CLOUD_TEXT, '#000', CLOUD_X + GAP, CLOUD_Y + GAP, 'Ура вы победили!');
  getRenderTitle(ctx, CLOUD_TEXT, '#000', CLOUD_X + GAP, CLOUD_Y + GAP * 2, 'Список результатов:');

  maxTime = getMaxTime(times); // Записываем максимальное число в переменную

  for (var i = 1; i <= players.length; i++) {
    times[i - 1] = Math.floor(times[i - 1]); // Округляем время до целого числа

    getPlayerName(ctx, players[i - 1], i, 'black');
    getPlayerTime(ctx, times[i - 1], i, 'black');
    getPlayerChart(ctx, times[i - 1], players[i - 1], i);
  }
};
