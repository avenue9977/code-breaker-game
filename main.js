/*jshint esversion: 6 */

let gameNumber,
    guess = document.getElementById('your-guess'),
    submit = document.getElementById('submit-guess'),
    results = document.getElementById('results'),
    hiddenCode = document.getElementById('code'),
    playAgainButton = document.getElementById('again'),
    inputForm = document.getElementById('input-form'),
    answers = document.getElementsByClassName('res'),
    success = document.getElementById('success'),
    warning = document.getElementById('warning'),
    gameOverWarning = document.getElementById('game-over'),
    turns = 0;

// initialize the game number
gameNumber = generateFourRandomNumbers();

function startTheGame() {

    // get input data
    let userInput = guess.value;

    // validate users input
    if (userInput === '' || userInput.length > 4 || userInput.length < 4) {
        // show warning
        warning.classList.add('show');

    } else {
        // hide warning if shown
        warning.classList.remove('show');

        html = displayResults(userInput, gameNumber);

        // display result
        results.innerHTML += html;

        //count the turns
        turns++;

        if (turns >= 10) {
            gameOver();
        }

        // check if results win
        if (isWining()) {
            winTheGame();
        }

    }
}

// generate random 4 digits 
// returns String
function generateFourRandomNumbers() {
    let number = Math.floor(Math.random() * 10000).toString();
    if (number.length < 4) {
        number = '0' + number;
    }
    return number;
}

// display the results to the user
// returns String
function displayResults(userInput, gameNumber) {
    let html = '<div class="row"><div class="col-sm-6">' + userInput + '</div><div class="res col-sm-6">';

    for (var i = 0; i < 4; i++) {
        if (userInput.charAt(i) == gameNumber.charAt(i)) {
            html += '<i class="fas fa-check correct"></i>';
        } else if (gameNumber.indexOf(userInput.charAt(i)) > -1) {
            html += '<i class="fas fa-retweet"></i>';
        } else {
            html += '<i class="fas fa-times"></i>';
        }
    }

    html += '</div></div><hr>';
    return html;
}

// is the submited number equal to the game number
// returns boolean
function isWining() {
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

function gameOver() {
    gameOverWarning.classList.remove('hide');
    gameOverWarning.classList.add('show');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    inputForm.classList.add('hide');
    code.style.animationName = "none";
    hiddenCode.style.color = "#dc3545";
    hiddenCode.textContent = gameNumber;
    submit.disabled = true;
}

function winTheGame() {
    inputForm.classList.add('hide');
    success.classList.add('show');
    success.classList.remove('hide');
    playAgainButton.classList.remove('hide');
    playAgainButton.classList.add('show');
    code.style.animationName = "none";
    hiddenCode.style.color = "#9EBF5C";
    hiddenCode.textContent = gameNumber;
}

playAgainButton.addEventListener('click', function() {
    window.location.reload();
});

submit.addEventListener('click', startTheGame);