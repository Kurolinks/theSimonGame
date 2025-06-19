var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// $("body").click(function(){nextSequence()});

// Key press to start game
$("body").keydown(function(){nextSequence()});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});


// Game Function
function nextSequence() {
    // random number btw 0 and 3
    var randomNumber = Math.floor((Math.random()) * 4);

    // pick colour from array and add to gamePattern array
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Make effect on buttons
    $("#" + randomChosenColour)
        .fadeOut(100).fadeIn(100)
        .fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level += 1;
    $("#level-title").text("Level " + level);
}

 function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// add pressed class
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
    $("#" + currentColour).removeClass('pressed');
}, 100);

}