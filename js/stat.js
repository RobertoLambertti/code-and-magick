'use strict';

(function () {
  var сloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    FONT: '16px PT+Mono',
    GAP: 20,
  };

  var bar = {
    WIDTH: 40,
    MAX_HEIGHT: 150,
    GAP: 50,
    GAP_TOP: 70,
  };

  var Title = {
    RESULT: 'Ура вы победили!',
    LIST_RESULT: 'Список результатов:',
  };

  var Color = {
    BLACK: '#000',
    RED: '#f00',
  };

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

  function getRandomColorSaturation(h, l) {
    var randomNumber = Math.floor(Math.random() * 100); // Записываем в переменную случайное целое число
    return 'hsl(' + h + ',' + randomNumber + '%,' + l + '%'; // Выводим это число насыщенностью
  }

  function getMaxTime(times) {
    return Math.max.apply(null, times);
  }

  function getPlayerName(ctx, player, i, color) {
    ctx.fillStyle = color;
    ctx.fillText(player, сloud.X + сloud.GAP + (bar.WIDTH + bar.GAP) * (i - 1), NAME_GAP_TOP, bar.WIDTH + bar.GAP);
  }

  function getPlayerChart(ctx, time, player, i) {
    ctx.fillStyle = player === 'Вы' ? Color.RED : getRandomColorSaturation(240, 50); // Выбираем цвет
    ctx.fillRect(сloud.X + сloud.GAP + (bar.WIDTH + bar.GAP) * (i - 1), сloud.Y + сloud.GAP + bar.GAP_TOP + (bar.MAX_HEIGHT - (bar.MAX_HEIGHT * time / maxTime)), bar.WIDTH, (bar.MAX_HEIGHT * time) / maxTime);
  }

  function getPlayerTime(ctx, time, i, color) {
    ctx.fillStyle = color;
    ctx.fillText((time - 1), сloud.X + сloud.GAP + (bar.WIDTH + bar.GAP) * (i - 1), сloud.Y + сloud.GAP + TIME_GAP_TOP + (bar.MAX_HEIGHT - (bar.MAX_HEIGHT * time / maxTime)), bar.WIDTH + bar.GAP);
  }

  window.renderStatistics = function (ctx, players, times) {
    getRenderCloud(ctx, 'rgba(0, 0, 0, 0.7)', сloud.X + 10, сloud.Y + 10, сloud.WIDTH, сloud.HEIGHT);
    getRenderCloud(ctx, '#fff', сloud.X, сloud.Y, сloud.WIDTH, сloud.HEIGHT);

    getRenderTitle(ctx, сloud.TEXT, Color.BLACK, сloud.X + сloud.GAP, сloud.Y + сloud.GAP, Title.RESULT);
    getRenderTitle(ctx, сloud.TEXT, Color.BLACK, сloud.X + сloud.GAP, сloud.Y + сloud.GAP * 2, Title.LIST_RESULT);

    maxTime = getMaxTime(times); // Записываем максимальное число в переменную

    for (var i = 1; i <= players.length; i++) {
      var playerName = players[i - 1];
      var playerTime = Math.floor(times[i - 1]); // Записываем в переменную время челым числом

      getPlayerName(ctx, playerName, i, Color.BLACK);
      getPlayerTime(ctx, playerTime, i, Color.BLACK);
      getPlayerChart(ctx, playerTime, playerName, i);
    }
  };
})();

