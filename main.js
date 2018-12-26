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
        const hr = document.createElement('hr');
        results.append(html);
        results.append(hr);

        // check if results win
        if (isWining()) {
            winTheGame();
        }
    }
}

const displayResults = (userInput, gameNumber) => {
    const row = document.createElement('div');
    row.classList.add('row');

    const leftColumn = document.createElement('div');
    leftColumn.classList.add('col-sm-6');
    leftColumn.innerHTML = userInput.join('');

    const rightColumn = document.createElement('div');
    rightColumn.classList.add('res', 'col-sm-6');

    for (const [i, char] of gameNumber.entries()) {
        if (char === userInput[i]) {
            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('check');
            icon.textContent = 'check';
            rightColumn.appendChild(icon);
        } else if (userInput.includes(char)) {
            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('refresh');
            icon.textContent = 'refresh';
            rightColumn.appendChild(icon);
        } else {
            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.classList.add('again');
            icon.textContent = 'close';
            rightColumn.appendChild(icon);
        }
    }

    row.appendChild(leftColumn);
    row.appendChild(rightColumn);
    return row;
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