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

var pageContents = [
  {
    boldText: "The Great JavaScript Quiz",
    regularText: "Are you ready to find out how well you know JavaScript? If so, hit the button below to dive into the challenge of your life! You have 75 seconds to make it through - but choose wisely. Incorrect answers will deduct 15 seconds of your time (and score)! Prove your intellect by achieving a High Score! GOOD LUCK!",
    buttonCount: 1,
    btn1: "Start quiz!"
  },

  {
    boldText: "A regular Number is a ___.",
    regularText: "",
    buttonCount: 4,
    btn1: "1. 64-bit integer",
    btn2: "2. 32-bit floating point number",
    btn3: "3. 32-bit integer",
    btn4: "4. double precision floating point number",
    rightAnswer: "btn4"
  },

  {
    boldText: "Which of these programming languages has the least in common with JavaScript?",
    regularText: "",
    buttonCount: 4,
    btn1: "1. Dart",
    btn2: "2. Haxe",
    btn3: "3. Haskell",
    btn4: "4. Opa",
    rightAnswer: "btn3"
  },

  {
    boldText: "Save your high score!",
    regularText: "Submit your initials - they will be engraved on these virtual walls for eternity! Unless you clear your cache.",
    buttonCount: 1,
    btn1: "Submit"
  },

  {
    boldText: "High Scores",
    regularText: "",
    buttonCount: 2,
    btn1: "Main Menu",
    btn2: "Erase High Scores"
  }
];

var body = document.querySelector("body");
var highScoresLink = document.querySelector(".high-scores-link");
var seconds = document.querySelector(".seconds");
var quiz = document.querySelector(".quiz");
var boldText = document.querySelector(".bold-text");
var regularText = document.querySelector(".regular-text");
var buttons = document.querySelector(".buttons");
var highScores = JSON.parse(localStorage.getItem("highScores"));

const START = 0;
const SUBMIT_HIGH_SCORE = pageContents.length - 2;
const HIGH_SCORES = pageContents.length - 1;

var quizState = START;
var currentQuestion = {};
var points = 0;
var secondsLeft = 0;

function start() {
  quizState = START;
  currentQuestion = {};
  points = 0;
  secondsLeft = 0;

  quiz.setAttribute("style", "display: flex");
  buttons.setAttribute("style", "display: block");
  regularText.setAttribute("style", "text-align: center");

  updatePage();
}

function updatePage(goToNextPage = false) {

  if (goToNextPage)
    quizState++;

  currentQuestion = pageContents[quizState];

  updateText();
  updateButtons();
  updateElements();
  updateStyle();
}

function updateText() {
  boldText.textContent = currentQuestion.boldText;
  regularText.textContent = currentQuestion.regularText;
}

function updateButtons() {
  eraseButtons();
  addButtons(currentQuestion.buttonCount);
}

function updateElements() {
  if (quizState === SUBMIT_HIGH_SCORE) {
    addElements("form");
  }
  else if (quizState === HIGH_SCORES) {
    removeElements("form");
    addElements("high-scores");
  }
  else if (quizState === START) {
    removeElements("high-scores");
  }
}

function addElements(elName) {
  if (elName === "form") {
    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    var inputEl = document.createElement("input");

    formEl.setAttribute("style", "margin-top: 10px");
    labelEl.setAttribute("for", "initials");
    inputEl.setAttribute("id", "initials");
    labelEl.textContent = "Initials: ";

    formEl.append(labelEl);
    formEl.append(inputEl);
    quiz.insertBefore(formEl, buttons);
  }
  else if (elName === "high-scores") {
    // add div for each high score in local storage, display it
  }
}

function removeElements(elName) {
  if (elName === "form") {
    var formEl = document.querySelector("form");

    if (formEl !== null)
      formEl.remove();
  }
  else if (elName === "high-scores") {
    // if (high score boxes present) erase them
  }
}

function updateStyle() {
  if (quizState === SUBMIT_HIGH_SCORE) {
    regularText.setAttribute("style", "text-align: start");
  }
  else if (quizState === HIGH_SCORES) {
    buttons.setAttribute("style", "display: flex");
  }
}

function eraseButtons() {
  for (var i = 1; i <= 4; i++) {
    var button = document.querySelector("#btn" + i);

    if (button !== null)
      button.remove();
  }
}

function addButtons(buttonCount) {
  for (var i = 1; i <= buttonCount; i++) {
    var newBtn = document.createElement("button");

    newBtn.setAttribute("id", "btn" + i);
    newBtn.textContent = currentQuestion["btn" + i];
    buttons.appendChild(newBtn);
  }
}

function onAnswer(answer) {
  console.log(answer);

  updatePage(true);
  checkAnswer(answer);
}

function checkAnswer(answer) {
  // var answerFeedback = document.createElement("div");

  // answerFeedback.setAttribute("class", "answer-feedback");

  // answerFeedback.textContent = "Correct!";

  // quiz.appendChild(answerFeedback);

  // subtract time if necessary
}

function displayHighScores(gameFinished) {

  if (!gameFinished)
    points = 0;
  else
    points = secondsLeft;

  secondsLeft = 0;
  quizState = HIGH_SCORES;
  updatePage();
}

function addHighScore() {
  var highScore = {
    initials: document.querySelector("input").value,
    score: secondsLeft
  };

  if (highScores === null)
    highScores = [];

  if (highScore.initials === "" || highScore.score === 0)
    return;

  highScores.push(highScore);
}

function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function eraseHighScores() {
  highScores = [];
  saveHighScores();
}

function handleClick(e) {

  if (e.target.matches("#btn1")) {
    if (quizState === START) {
      secondsLeft = 76;
      quiz.setAttribute("style", "display: inline");
      updatePage(true);
      // start timer
    }
    else if (quizState === SUBMIT_HIGH_SCORE) {
      addHighScore();
      saveHighScores();
      updatePage(true);
    }
    else if (quizState === HIGH_SCORES) {
      start();
    }
    else {
      onAnswer(e.target.getAttribute("id"));
    }
  }
  else if (e.target.matches("#btn2")) {
    if (quizState === HIGH_SCORES) {
      eraseHighScores();
      removeElements("high-scores");
    }
    else {
      onAnswer(e.target.getAttribute("id"));
    }
  }
  else if (e.target.matches("#btn3")) {
    onAnswer(e.target.getAttribute("id"));
  }
  else if (e.target.matches("#btn4")) {
    onAnswer(e.target.getAttribute("id"));
  }
  else if (e.target.matches(".high-scores-link")) {
    displayHighScores(false);
  }
}

function handleKeydown(e) {
  if (quizState === SUBMIT_HIGH_SCORE)
    if (e.target.matches("input"))
      if (e.key === "Enter") {
        e.preventDefault();
        addHighScore();
        saveHighScores();
        updatePage(true);
      }
}

start();

body.addEventListener("click", handleClick);
body.addEventListener("keydown", handleKeydown);
