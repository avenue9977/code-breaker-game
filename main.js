/*jshint esversion: 6 */

let gameNumber,
    guess = document.getElementById('your-guess'),
    submit = document.getElementById('submit-guess'),
    results = document.getElementById('results'),
    code = document.getElementById('code'),
    alert = $('#warning'),
    turns = 0,
    correct = 0;

// generate random 4 digits number

function randomNumberGenerator() {
  let number = Math.floor(Math.random() * 10000).toString();
  if (number.length < 4) {
    number = '0' + number;
  }
  return number;
}

// store the game number

gameNumber = randomNumberGenerator();

function answerSubmit() {

  // get input data
  let userInput = guess.value;

  // validate users input
  if (userInput == '' || userInput.length > 4 || userInput.length < 4) {
    // show warning
    alert.addClass('show');

  } else {

    // hide warning if shown
    alert.removeClass('show');

    // compare input data
    let html = '<div class="row"><div class="col-sm-6">' + userInput + '</div><div class="col-sm-6">';

    for (var i = 0; i < 4; i++) {
      if (userInput.charAt(i) == gameNumber.charAt(i)) {
        html += '<i class="fas fa-check" style="color: #9EBF5C"></i>';
        correct++;
      } else if (gameNumber.indexOf(userInput.charAt(i)) > -1 ) {
        html += '<i class="fas fa-retweet" style="color: #EFAC19"></i>';
      } else {
        html += '<i class="fas fa-times" style="color: #E84545"></i>';
      }

      // if the 4 digits match player wins
      if (correct == 4) {
        code.style.color = "#9EBF5C";
        code.textContent = userInput;
      }
    }
    html += '</div></div><hr>';

  // display result
    turns++;
    console.log(turns);
    results.innerHTML += html;
  }


}
