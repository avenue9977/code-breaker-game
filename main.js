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

/* 
    Generate random 4 digits 
    Returns Array of 4 elements
*/
const generateFourRandomNumbers = () => {
    let number = Math.floor(Math.random() * 10000).toString();

    if (number.length < 4) number = `0${number}`;

    return [...number];
}

// Initialize the game number
const gameNumber = generateFourRandomNumbers();
let turns = 0;

const startTheGame = () => {
    turns++;

    if (turns >= 10) gameOver(); // Check for max turns exceeded

    // Get input data
    const userInput = guess.value;
    const isUserInputValid =  validateInput(userInput); // Validate user input

    if (isUserInputValid) {
        const userInputArray = [...userInput];

        // Hide warning if shown
        warning.classList.remove('show');

        // Generate HTML
        const html = genrateResultsHTML(userInputArray, gameNumber);
        const hr = document.createElement('hr');
        
        // Display result
        results.append(html);
        results.append(hr);

        // check if result is a win
        if (isWining()) winTheGame();
        
        return;
    }

    // Show warning
    warning.classList.add('show');
}

// Validates the user input
const validateInput = (input) => !(input === '' || input.length > 4 || input.length < 4);

// Generates a HTML that holds the result
const genrateResultsHTML = (userInput) => {
    if (userInput) {
        // Create <div class="row"></div>
        const row = document.createElement('div');
        row.classList.add('row');

        // Create <div class="col-sm-6">{userInput}</div>
        const leftColumn = document.createElement('div');
        leftColumn.classList.add('col-sm-6');
        leftColumn.innerHTML = userInput.join('');

        // Create <div class="res col-sm-6"></div>
        const rightColumn = document.createElement('div');
        rightColumn.classList.add('res', 'col-sm-6');

        const resultsColumn = generateResultsIconsHTML(rightColumn, userInput);

        // Adds 
        row.appendChild(leftColumn);
        row.appendChild(resultsColumn);

        return row;
    }
}

const generateResultsIconsHTML = (htmlElement, userInput) => {

    if (htmlElement && userInput && userInput.length > 0) {

        for (const [i, char] of userInput.entries()) {
            if (char === gameNumber[i]) {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('check', 'correct');
                icon.textContent = 'check';
                htmlElement.appendChild(icon);
            } else if (gameNumber.includes(char)) {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('refresh');
                icon.textContent = 'refresh';
                htmlElement.appendChild(icon);
            } else {
                const icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.classList.add('again');
                icon.textContent = 'close';
                htmlElement.appendChild(icon);
            }
        }

        return htmlElement;
    }

    return '';
}

/* 
    Is the submited number equal to the game number
    Returns boolean
*/
const isWining = () => {
    if (answers.length > 0) {
        let correct = 0;

        for (let i = 0; i < 4; i++) {
            const correctAnswer = answers[answers.length - 1].children[i].className.includes("correct"); // Always check the last item in the answers array

            if (correctAnswer) correct++;

            if (correct === 4) return true;
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