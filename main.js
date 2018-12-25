const guess = document.getElementById('your-guess');
const submit = document.getElementById('submit-guess');
const results = document.getElementById('results');
const hiddenCode = document.getElementById('code');
const playAgainButton = document.getElementById('again');
const inputForm = document.getElementById('input-form');
const answers = document.getElementsByClassName('res');
const success = document.getElementById('success');
const warning = document.getElementById('warning');
const gameOverWarning = document.getElementById('game-over');

// generate random 4 digits 
// returns Array of 4 elements
const generateFourRandomNumbers = () => {
    let number = Math.floor(Math.random() * 10000).toString();
    if (number.length < 4) {
        number = '0' + number;
    }
    return [...number];
}

// initialize the game number
const gameNumber = generateFourRandomNumbers();
let turns = 0;

const startTheGame = () => {

    turns++;

    if (turns >= 10) {
        gameOver();
    }

    // get input data
    const userInput = guess.value;
    const userInputArray = [...userInput]

    // validate users input
    if (userInput === '' || userInput.length > 4 || userInput.length < 4) {
        // show warning
        warning.classList.add('show');

    } else {
        // hide warning if shown
        warning.classList.remove('show');

        html = displayResults(userInputArray, gameNumber);

        // display result
        results.innerHTML += html;

        // check if results win
        if (isWining()) {
            winTheGame();
        }
    }
}

// display the results to the user
// returns String
const displayResults = (userInput, gameNumber) => {
    let html = `<div class="row"><div class="col-sm-6">${userInput.join('')}</div><div class="res col-sm-6">`;

    for (const [i, char] of gameNumber.entries()) {
        if (char === userInput[i]) {
            html += '<i class="material-icons check">check</i>';
        } else if (userInput.includes(char)) {
            html += '<i class="material-icons refresh">refresh</i>';
        } else {
            html += '<i class="material-icons again">close</i>';
        }
    }

    html += '</div></div><hr>';

    return html;
}

// is the submited number equal to the game number
// returns boolean
const isWining = () => {
    if (answers.length > 0) {
        var correct = 0;
        for (var i = 0; i < 4; i++) {
            // always check the last item in the answers array
            var correctAnswer = answers[answers.length - 1].children[i].className.includes("correct");

            if (correctAnswer) {
                correct++;
            }

            if (correct === 4) {
                return true;
            }
        }
        return false;
    }
}

const gameOver = () => {
    gameOverWarning.classList.remove('hide');
    gameOverWarning.classList.add('show');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    inputForm.classList.add('hide');
    code.style.animationName = "none";
    hiddenCode.style.color = "#dc3545";
    hiddenCode.textContent = gameNumber.join('');
    submit.disabled = true;
}

const winTheGame = () => {
    inputForm.classList.add('hide');
    success.classList.add('show');
    success.classList.remove('hide');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    code.style.animationName = "none";
    hiddenCode.style.color = "#9EBF5C";
    hiddenCode.textContent = gameNumber.join('');
}

playAgainButton.addEventListener('click', () => {
    window.location.reload();
});

submit.addEventListener('click', startTheGame);