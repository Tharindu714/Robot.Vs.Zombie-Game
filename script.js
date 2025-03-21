var runsound = new Audio("run.mp3");
var jumpsound = new Audio("jump.mp3");
var deadsound = new Audio("Die Sound Effect.mp3");
var backgroundsound = new Audio("Commando - Mission 1 Theme.mp3");
var lostsound = new Audio("won.mp3");

/*index */

var menu = document.getElementById(menu);

var menu2 = document.getElementById(menu2);

var game = document.getElementById(game);

function clickStart() {
    window.location = "choose.html";

}
function backToIndex() {
    window.location = "index.html";

}
function goToTown() {
    window.location = "town.html";
}

function goToDessert() {
    window.location = "dessert.html";
}
function goToGrave() {
    window.location = "graveyard.html";
}
function goToHotel() {
    window.location = "hotel.html";
}

function goToPrison() {
    window.location = "prison.html";
}
function backToChooseFromLocation() {
    window.location = "choose.html";
}
function townStart() {
    window.location = "town.html";
}
function dessertStart() {
    window.location = "dessert.html";
}
function graveStart() {
    window.location = "graveyard.html";
}
function hotelStart() {
    window.location = "hotel.html";
}
function prisonStart() {
    window.location = "prison.html";
}


function KeyCheck(event) {
    var keycode = event.which;

    if (keycode == 13) { //Enter
        if (runWorker == 0) {
            runWorker = setInterval(run, 100);
            runsound.play();
            backgroundsound.play();

            backgroundWorker = setInterval(background, 100);
            scoreWorker = setInterval(updateScore, 300);
            boxWorker = setInterval(moveBoxes, 100);
        }
    }

    if (keycode == 32) {  //Space
        if (jumpWorker == 0) {
            clearInterval(runWorker);
            runsound.pause();

            jumpWorker = setInterval(jump, 100);
            jumpsound.play();

        }
    }
}
var runImgNumber = 0;
var runWorker = 0;

function run() {
    runImgNumber = runImgNumber + 1;

    if (runImgNumber == 10) {
        runImgNumber = 1;
    }

    document.getElementById("robo").src = "Run (" + runImgNumber + ").png";
}

var backgroundPositionX = 0;
var backgroundWorker = 0;
backgroundsound.play();

function background() {
    backgroundPositionX = backgroundPositionX - 20;

    document.getElementById("canvas").style.backgroundPositionX = backgroundPositionX + "px";
}

var jumpImgNumber = 1;
var jumpWorker = 0;

var roboMarginTop = 280;

function jump() {
    if (jumpImgNumber <= 5) {
        roboMarginTop = roboMarginTop - 60;
        document.getElementById("robo").style.marginTop = roboMarginTop + "px";
    }

    if (jumpImgNumber >= 6) {
        roboMarginTop = roboMarginTop + 60;
        document.getElementById("robo").style.marginTop = roboMarginTop + "px";
    }

    jumpImgNumber = jumpImgNumber + 1;

    if (jumpImgNumber == 11) {
        jumpImgNumber = 1;
        clearInterval(jumpWorker);
        runWorker = setInterval(run, 100);
        runsound.play();
        jumpWorker = 0;
    }

    if (backgroundWorker == 0) {
        backgroundWorker = setInterval(background, 100);
    }

    if (scoreWorker == 0) {
        scoreWorker = setInterval(updateScore, 300);
    }

    if (boxWorker == 0) {
        boxWorker = setInterval(moveBoxes, 100);
    }
    document.getElementById("robo").src = "Jump (" + jumpImgNumber + ").png";
}

var score = 0;
var scoreWorker = 0;

function updateScore() {
    score = score + 5;

    if (score >= 500) {
        runsound.pause();
        jumpsound.pause();


        clearInterval(runWorker);
        runWorker = -1;

        clearInterval(jumpWorker);
        jumpWorker = -1;

        clearInterval(backgroundWorker);
        backgroundWorker = -1;


        clearInterval(boxWorker);
        boxWorker = -1;

        window.location = "won.html";

    }

    document.getElementById("score").innerHTML = score;
}

var bml = 300;

function createboxes() {
    for (var i = 0; i < 50; i++) {

        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 11) {
            bml = bml + 600;
        }

        if (i > 21) {
            bml = bml + 400;
        }

        if (i > 20) {
            bml = bml + 350;
        }


        box.style.marginLeft = bml + "px";

        document.getElementById("canvas").appendChild(box);
    }
}

var boxWorker = 0;

function moveBoxes() {
    for (var i = 0; i < 50; i++) {

        var box1 = document.getElementById("box" + i);
        var current = getComputedStyle(box1).marginLeft;
        var newcurrent = parseInt(current) - 20;

        box1.style.marginLeft = newcurrent + "px";

        // alert(newcurrent);
        // 60 -160

        if (newcurrent >= 60 & newcurrent <= 160) {



            if (roboMarginTop > 245) {


                clearInterval(runWorker);
                runWorker = -1;
                runsound.pause();

                clearInterval(jumpWorker);
                jumpWorker = -1;
                jumpsound.pause();

                clearInterval(backgroundWorker);
                //   backgroundWorker = -1;
                backgroundsound.pause();
                lostsound.play();

                clearInterval(boxWorker);
                // boxWorker = -1;

                clearInterval(scoreWorker);
                //  scoreWorker = -1;

                deadWorker = setInterval(dead, 100);
                deadsound.play();

            }
        }
    }
}
var deadImgNumber = 1;
var deadWorker = 0;

function dead() {
    deadImgNumber = deadImgNumber + 1;

    if (deadImgNumber == 11) {
        deadImgNumber = 10;

        document.getElementById("robo").style.marginTop = "280px";
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = score;
    }

    document.getElementById("robo").src = "Dead (" + deadImgNumber + ").png";
}




function reload() {
    window.location = "choose.html";
}


