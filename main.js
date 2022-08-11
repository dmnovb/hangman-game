const words = ["sausage",
    "outside",
    "generate",
    "single",
    "inappropriate",
    "conversation",
    "bait",
    "knock",
    "aunt"]

let answer = ''
let maxWrongAnswers = 6;
let mistakes = 0
let guessed = []
let wordStatus = null;

function generateRandomWord() {
    answer = words[Math.floor(Math.random()*words.length)]
}
 
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter): null    
    
    if(answer.indexOf(chosenLetter) >= 0) {
        guessedWord()
        checkIfGameWon()
     
    }
    else {
        mistakes++
        checkIfGameLost()
        updateMistakes()
        updatePicture()
    }
    
}
function createButtons() {
    let buttons = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
        `
        <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttons
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
     
    document.getElementById('word').innerHTML = wordStatus;
  }

function checkIfGameLost() {
    if (mistakes === maxWrongAnswers) {
        document.getElementById("word").innerHTML = "the word was " + answer
        document.getElementById("keyboard").innerHTML = "you lost"
    }
}

function checkIfGameWon() {
    if( wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You win"
    }
}

function updatePicture() {
    document.getElementById("hangmanPicture").src = "./images/" + mistakes + ".jpg"
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes
}

function reset() {
    mistakes = 0
    guessed = [] 
    document.getElementById("hangmanPicture").src = "./images/0.jpg"
    generateRandomWord();
    guessedWord();
    updateMistakes();
    createButtons()
}

document.getElementById('maxWrongAnswers').innerHTML = maxWrongAnswers

generateRandomWord()
createButtons()
guessedWord()