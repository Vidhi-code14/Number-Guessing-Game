let randomNumber = parseInt(Math.random() * 100 + 1); //+1 islie lia taaki number 0 na ho 

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const StartOver = document.querySelector('.resultParas');

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1

let playGame = true;
//first check game khelne ke lie available h ya nh 
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault()
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    //ye bss check krega ki value 1-100 ke beech h ya nh in short validate krega
    if (isNaN(guess)) {
        alert('Please enter a valid number.');
    } else if (guess < 1) {
        alert('Please enter a number more than 1.');
    } else if (guess > 100) {
        alert('Please enter number less than 100.');
    } else {
        prevGuess.push(guess);
        if (numGuess == 11) {
            displayGuess(guess)
            displayMessage(`Game Over!! Random Number was ${randomNumber}`)
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    //valueko guess krega ki high h ya low h
    if (guess == randomNumber) {
        displayMessage('You guessed it Right!!');
        endGame()
    } else if (guess < randomNumber) {
        displayMessage('Number is TOOOO LOW!!');
    } else if (guess > randomNumber) {
        displayMessage('Number is TOOOO HIGH!!');
    }
}

function displayGuess(guess) {
    //clean the values for the next i/p , also  previous aur remaining guesses ko update krega
    userInput.value = ''
    guessSlot.innerHTML += `${guess}   `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    //upr jo lowOrHi lia uske andr ka msg display krega
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled')
        StartOver.removeChild(p)
        playGame = true;
    })
}

function endGame() {
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id = "newGame">Start New Game</h2>`;
    StartOver.appendChild(p)
    playGame = false;
    newGame()
}


