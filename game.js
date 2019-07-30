var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSounds(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  level++;

  $("#level-title").text("level " + level);

  playSounds(randomChosenColor);
}

function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer (currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else {
    playSounds("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key To Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}
