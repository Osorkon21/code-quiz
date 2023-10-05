// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// HOMEWORK TIPS

//
// 1. Be thinking about how an array of objects might be very useful here
// 2. Use functions to control the overflow flow of things
// 3. No questions/answers in the HTML
// 4. How can we generate each new question and its answers on demand
// 5. How can we keep track of which question is on-screen
// 6. Get the quiz to work with 1-2 questions
// 7. Make the timer value very high to begin with
// 8. Console.log whatever you need for testing
//

// Best practices for state management - save to external data whenever anything changes u need to save

// This is applicable to the HW

/*
  1. Check for saved state
  2. Put any saved state we have into memory (global variable)
  3. Anytime state changes:
     - Update local storage w/ new state
*/

// var appData;   // single source of truth

// function start() {
//   appData = JSON.parse(localStorage.getItem("appData"));
// }

// function saveChanges() {
//   localStorage.setItem("appData", JSON.stringify(appData));
// }

// function userGetsQuestionCorrect() {
//   appData.user.points += 50;
//   saveChanges();
// }

// var li4 = document.createElement("li");
// li4.textContent = "Cupcakes 🧁 ";
// body.appendChild(favoriteEl);
// h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");

const START = -1;
const HIGH_SCORES = 999;

var body = document.querySelector("body");
var highScores = document.querySelector(".high-scores");
var seconds = document.querySelector(".seconds");
var quiz = document.querySelector(".quiz");
var boldText = document.querySelector(".bold-text");
var regularText = document.querySelector(".regular-text");
var buttons = document.querySelector("buttons");

var startContent = [
  {
    boldText: "The Great JavaScript Quiz",
    regularText: "Are you ready to find out how well you know JavaScript? If so, hit the button below to dive into the challenge of your life! You have 75 seconds to make it through - but choose wisely.Incorrect answers will deduct 15 seconds of your time! Prove your intellect by achieving a High Score! GOOD LUCK!",
    buttonCount: 1,
    btn1: "Start quiz!"
  }
];

var questions = [
  {
    boldText: "What is a regular Number?",
    regularText: "",
    buttonCount: 4,
    btn1: "64-bit integer",
    btn2: "32-bit floating point number",
    btn3: "32-bit integer",
    btn4: "double precision floating point number",
    rightAnswer: "#btn4"
  },

  {
    boldText: "Which of these programming languages has the least in common with JavaScript?",
    regularText: "",
    buttonCount: 4,
    btn1: "Dart",
    btn2: "Haxe",
    btn3: "Haskell",
    btn4: "Opa",
    rightAnswer: "#btn3"
  }
];

// var highScoreContent= [ {} ]

var quizState = START;
var currentQuestion = {};
var points = 0;
var secondsLeft = 0;

function setToStart() {

}

body.addEventListener("click", handleClick);

function handleClick(e) {

  if (e.target.matches("#btn1")) {
    if (quizState === START) {
      quizState++;
      secondsLeft = 75;
      nextQuestion();
    }
    else if (quizState === HIGH_SCORES) {
      quizState = START;

      // handle high score purple button #1 (go to beginning) here
    }
    else {
      quizState++;
      nextQuestion();
      // handle quiz question button #1 here (add checkIfRight function)
    }
  }
  else if (e.target.matches("#btn2")) {
    if (quizState === HIGH_SCORES) {
      // handle high score purple button #2 (erase high scores) here
    }
    else {
      // handle quiz question button #2 here
    }
  }
  else if (e.target.matches("#btn3")) {
    // handle quiz question button #3 here
  }
  else if (e.target.matches("#btn4")) {
    // handle quiz question button #4 here
  }
  else if (e.target.matches(".high-scores")) {
    displayHighScores(false);

    // add text to elements, add and style as needed
  }
}

function nextQuestion() {

  // done with questions, go to high scores
  if (questions[quizState] === undefined)
    displayHighScores(true);
  else { // next question exists
    console.log("question exists");

    currentQuestion = questions[quizState];
    eraseButtons();
    addButtons(currentQuestion.buttonCount);
  }
}

function eraseButtons() {
  for (var i = 1; i <= 4; i++) {
    var button = document.querySelector("#btn" + i);

    // if button exists, delete it
    if (button !== null)
      button.remove();
  }
}

function addButtons(buttonCount) {
  for (var i = 1; i <= buttonCount; i++) {
    var newBtn = document.createElement("button");
    var btnText = "";

    newBtn.setAttribute("id", "btn" + i);
    btnText = getBtnText(i);
  }
}

function getBtnText(buttonNum) {
  if (buttonNum === 1)
    return currentQuestion.btn1;
  else if (buttonNum === 2)
    return currentQuestion.btn2;
  else if (buttonNum === 3)
    return currentQuestion.btn3;
  else
    return currentQuestion.btn4;
}

function displayHighScores(gameFinished) {

  if (!gameFinished)
    points = 0;

  resetVars();
  quizState = HIGH_SCORES;
}

function resetVars() {

  currentQuestion = {};
  secondsLeft = 0;
}
// var answerFeedback = document.createElement("div");

// answerFeedback.setAttribute("class", "answer-feedback");

// answerFeedback.textContent = "Correct!";

// quiz.appendChild(answerFeedback);
// quiz.setAttribute("style", "display:inline;");

setToStart();
