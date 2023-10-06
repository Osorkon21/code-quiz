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
    regularText: "Are you ready to find out how well you know JavaScript? If so, hit the button below to dive into the challenge of your life!\xa0 You have 75 seconds to make it through - but choose wisely.\xa0 Incorrect answers will deduct 15 seconds of your time (and score)!\xa0 Prove your intellect by achieving a High Score!\xa0 GOOD LUCK!",
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
    regularText: "Submit your initials.\xa0 They will be engraved on these virtual walls for eternity!\xa0 Unless you clear your cache.",
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
var stopCounting = false;

function start() {
  quizState = START;
  currentQuestion = {};
  points = 0;

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
  updateTimer();
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
  removeElements("answer-feedback");

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

function updateStyle() {
  if (quizState === SUBMIT_HIGH_SCORE) {
    regularText.setAttribute("style", "text-align: start");
  }
  else if (quizState === HIGH_SCORES) {
    buttons.setAttribute("style", "display: flex");
  }
}

function updateTimer() {
  if (quizState === SUBMIT_HIGH_SCORE) {
    points = secondsLeft;

    console.log(points);
    stopTimer(false);
  }
}

function stopTimer(goToSubmit) {
  document.querySelector(".seconds").textContent = 0;
  secondsLeft = 0;
  stopCounting = true;

  if (goToSubmit) {
    quizState = SUBMIT_HIGH_SCORE;
    updatePage();
  }
}

function addElements(elName) {
  if (elName === "form") {
    var formAlreadyPresent = document.querySelector("form");

    if (!formAlreadyPresent) {
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
  }
  else if (elName === "high-scores") {
    var surroundingDiv = document.createElement("div");
    surroundingDiv.setAttribute("id", "high-score-container");

    for (var i = 0; i < highScores.length; i++) {
      var divEl = document.createElement("div");

      divEl.setAttribute("id", "high-score");
      divEl.textContent = `${i + 1}.\xa0 ${highScores[i].initials.toUpperCase()} - ${highScores[i].score}`;
      surroundingDiv.append(divEl);
    }

    quiz.insertBefore(surroundingDiv, buttons);
  }
}

function removeElements(elName) {
  if (elName === "form") {
    var formEl = document.querySelector("form");

    if (formEl !== null)
      formEl.remove();
  }
  else if (elName === "high-scores") {
    var containerEl = document.querySelector("#high-score-container");

    if (containerEl !== null)
      containerEl.remove();
  }
  else if (elName === "answer-feedback") {
    var answerFeedbackEl = document.querySelector(".answer-feedback");

    if (answerFeedbackEl !== null)
      answerFeedbackEl.remove();
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
    buttons.append(newBtn);
  }
}

function onAnswer(answer) {
  var rightAnswer = currentQuestion.rightAnswer;

  updatePage(true);
  checkAnswer(answer, rightAnswer);
}

function checkAnswer(answer, rightAnswer) {

  var correct = (answer === rightAnswer);

  addFeedback(correct);

  if (!correct)
    deductTime(15);
}

function addFeedback(correct) {
  var answerFeedback = document.createElement("div");

  answerFeedback.setAttribute("class", "answer-feedback");

  if (correct)
    answerFeedback.textContent = "Correct!";
  else
    answerFeedback.textContent = "Wrong!";

  quiz.appendChild(answerFeedback);
}

function deductTime(val) {
  secondsLeft -= val;

  console.log(secondsLeft);
  console.log(points);

  if (secondsLeft <= 0)
    stopTimer(true);
}

function displayHighScores() {
  quizState = HIGH_SCORES;
  updatePage();
}

function addHighScore() {
  var highScore = {
    initials: document.querySelector("input").value,
    score: points
  };

  console.log(highScore);

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
    if (quizState !== HIGH_SCORES) {
      quiz.setAttribute("style", "display: inline");
      displayHighScores();
      stopTimer(false);
    }
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
