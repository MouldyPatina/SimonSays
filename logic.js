let timeOut = 1500;
let colours = ['red', 'blue', 'green', 'yellow'];
let simonSays = []
let guessPos = 0;
let highScore = 0;

async function flash(colour) {
    document.getElementById(colour).classList.add("flash");
    await delay(timeOut);
    document.getElementById(colour).classList.remove("flash");
    await delay(timeOut / 5);
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function disableButtons(disable) {
    if (!disable) {
        for (const colour of colours) {
            document.getElementById(colour).removeAttribute("disabled");
        }
        document.getElementById("gameStart").removeAttribute("disabled");
        return;
    }
    for (const colour of colours) {
        document.getElementById(colour).setAttribute("disabled", "disabled");
    }
    document.getElementById("gameStart").setAttribute("disabled", "disabled");
}

async function startGame() {
    if ( guessPos != simonSays.length ){
        lostGame("You missed one, you lost");
        return;
    }
    disableButtons(true);
    simonSays.push(colours[ Math.floor(Math.random() * 4) ]);
    for (const colour of simonSays) {
        await flash(colour);
    }
    disableButtons(false);
    document.getElementById("gameStart").innerHTML = "submit guess";
    guessPos = 0;
}

function changeDifficulty() {
    let difficulty = "";
    switch(timeOut) {
        case 750:
            timeOut = 250;
            difficulty = "Hard";
            break;
        case 250:
            timeOut = 1500;
            difficulty = "Easy";
            break;
        case 1500:
            timeOut = 750;
            difficulty = "Medium";
            break;
    }
    document.getElementById("difficulty").innerHTML = "Difficulty: " + difficulty;
}

function isNext(colour) {
    let numberSays = simonSays.length;
    if (numberSays == 0) {
        return;
    } else if (guessPos < numberSays && colour == simonSays[guessPos]) {
        guessPos++;
        return;
    }
    lostGame("Incorrect guess, you lost");
}

function lostGame(message) {
    if (message == null) {
    	message = "you lost";
    }
    highScore = Math.max(highScore, simonSays.length - 1);
    window.alert(message);
    guessPos = 0;
    simonSays = [];
    document.getElementById("gameStart").innerHTML = "start game";
    document.getElementById("highScore").innerHTML = highScore;
}
