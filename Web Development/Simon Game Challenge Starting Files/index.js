function ColorHolder(colorSequence) {
  this.colorSequence = colorSequence;
}

function StatHolder(clickCount) {
  this.clickCount = clickCount;
}

function LevelHolder(level) {
  this.level = level;
}

function newPattern() {
  var colorIdx = Math.floor(Math.random() * 4);
  return colorIdx;
}

function addNewPattern(colorHolder, colorIdx) {
  colorHolder.colorSequence.push(colorIdx);
}

function selectButton(colorIdx) {
  blinkButton($("#" + idxToColor(colorIdx)));
  playSound(colorIdx);
}

function colorToIdx(buttonColor) {
  var colorMap = { green: 0, red: 1, blue: 2, yellow: 3 };
  return colorMap[buttonColor];
}
function idxToColor(colorIdx) {
  var colorMap = { 0: "green", 1: "red", 2: "blue", 3: "yellow" };
  return colorMap[colorIdx];
}

function playSound(colorIdx) {
  var color = idxToColor(colorIdx);
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function flashButton(button) {
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}

function blinkButton(button) {
  button
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function setupPattern(colorHolder) {
  var curColorIdx = newPattern();
  addNewPattern(colorHolder, curColorIdx);
  setTimeout(selectButton, 1000, curColorIdx);
}

function checkPattern(colorIdx, colorHolder, statHolder, levelHolder) {
  if (window.gameIsOver === false) {
    if (colorIdx === colorHolder.colorSequence[statHolder.clickCount]) {
      statHolder.clickCount++;
      if (statHolder.clickCount == colorHolder.colorSequence.length) {
        setupPattern(colorHolder);
        levelHolder.level++;
        nextLevel(levelHolder.level);
        statHolder.clickCount = 0;
      }
    } else {
      window.gameIsOver = true;
      colorHolder.colorSequence = [];
      statHolder.clickCount = 0;
      levelHolder.level = 0;
      gameOver();
    }
  } else {
    initialize();
    setupPattern(colorHolder, statHolder);
    window.gameIsOver = false;
  }
}

function initialize() {
  $("#level-title").text("Press A Key to Start");
}

function gameOver() {
  var audio = new Audio("souds/wrong.mp3");
  audio.play();
  $("#level-title").text("Game Over! Press Any Key To Reset");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function nextLevel(level) {
  $("#level-title").text("Level " + level);
}

var colorSequence = [];
var colorHolder = new ColorHolder(colorSequence);
var clickCount = 0;
var statHolder = new StatHolder(clickCount);
var level = 0;
var levelHolder = new LevelHolder(level);
var gameIsOver = true;

$(".btn").click(function(e) {
  var input = $(e.target);
  var curColorID = input.attr("id");
  if (window.gameIsOver === false) {
    playSound(colorToIdx(curColorID));
    flashButton(input);
  }
  checkPattern(
    colorToIdx(curColorID),
    window.colorHolder,
    window.statHolder,
    window.levelHolder
  );
});
