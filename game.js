var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


// Key press to start game
$("body").keypress(function(){nextSequence()});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call function to check answer against sequence
    checkAnswer(userClickedPattern.length-1);
});


// Game Function
function nextSequence() {
    // reset userClickedPattern for the next level
    userClickedPattern = [];

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

function checkAnswer(currentLevel) {
    // Check if the user answer is correct or wrong
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        // if the most recent answer is right, check that the player has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {gam
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over, Press any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

