// contains all questions and question info
var pageContents = [
  {
    boldText: "The Great JavaScript Quiz",
    regularText: "Are you ready to find out how well you know JavaScript? If so, hit the button below to dive into the challenge of your life!\xa0 You have 75 seconds to make it through - but choose wisely.\xa0 Incorrect answers will deduct 15 seconds of your time (and score)!\xa0 Prove your intellect by achieving a High Score!\xa0 GOOD LUCK!",
    buttonCount: 1,
    btn1: "Start quiz!"
  },

  {
    boldText: "A regular Number in Javascript is a ___.",
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
    boldText: "Which of the following is NOT a Javascript IDE?",
    regularText: "",
    buttonCount: 4,
    btn1: "Atom",

    // There is an "Apache NetBeans", but not "NetBeats". Felt pretty sneaky on this one
    btn2: "Apache NetBeats",
    btn3: "Brackets",
    btn4: "Eclipse",
    rightAnswer: "btn2"
  },

  {
    boldText: "Which of these programming languages are generally considered harder to learn than JavaScript?",
    regularText: "",
    buttonCount: 4,
    btn1: "Python",
    btn2: "Visual BASIC",
    btn3: "C++",
    btn4: "Ruby",
    rightAnswer: "btn3"
  },

  {
    boldText: "___ percent of all websites use Javascript.",
    regularText: "",
    buttonCount: 4,
    btn1: "98.6%",
    btn2: "100%",
    btn3: "99.8%",
    btn4: "72%",
    rightAnswer: "btn1"
  },

  {
    boldText: "Which of the following is NOT a statement in Javascript?",
    regularText: "",
    buttonCount: 4,
    btn1: "do...while",
    btn2: "for await...of",
    btn3: "goto",
    btn4: "for...of",
    rightAnswer: "btn3"
  },

  {
    boldText: "Who created Javascript?",
    regularText: "",
    buttonCount: 4,
    btn1: "Bjarne Stroustrup",
    btn2: "Dennis Ritchie",
    btn3: "James Gosling",
    btn4: "Brendan Eich",
    rightAnswer: "btn4"
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

// element/class variables
var body = document.querySelector("body");
var seconds = document.querySelector(".seconds");
var quiz = document.querySelector(".quiz");
var boldText = document.querySelector(".bold-text");
var regularText = document.querySelector(".regular-text");
var buttons = document.querySelector(".buttons");
var highScores = JSON.parse(localStorage.getItem("highScores"));

// index numbers where special things happen
const START = 0;
const SUBMIT_HIGH_SCORE = pageContents.length - 2;
const HIGH_SCORES = pageContents.length - 1;

// this quiz is a state machine
var quizState = START;

var currentQuestion = {};
var points = 0;
var currentTimer;
var secondsLeft;

// clears variables, resets styling for main menu
function startOver() {
  quizState = START;
  currentQuestion = {};
  points = 0;

  quiz.setAttribute("style", "display: flex");
  buttons.setAttribute("style", "display: block");
  regularText.setAttribute("style", "text-align: center");

  updatePage();
}

// this function was mostly written by Gary
function startTimer() {
  currentTimer = setInterval(function () {

    secondsLeft -= 1;
    document.querySelector(".seconds").textContent = secondsLeft;

    if (secondsLeft === 0)
      endGame(true);

  }, 1000);
}

// displays custom YOU LOSE screen if time runs out, clears variables for the next run
function endGame(lose) {
  if (lose) {
    if (quizState !== SUBMIT_HIGH_SCORE) {
      quizState = SUBMIT_HIGH_SCORE;
      updatePage();
    }

    quiz.setAttribute("style", "display: flex");
    regularText.setAttribute("style", "text-align: center");
    document.querySelector("form").style.display = "none";

    boldText.textContent = "YOU LOSE";
    regularText.textContent = "You achieved a score of ZERO.\xa0 You don't get to enter a High Score.\xa0 Maybe you'll have better luck next time, but I doubt it.";
    document.querySelector("#btn1").textContent = "Look at High Scores of other people who did better than you";
  }
  else
    points = secondsLeft;

  clearInterval(currentTimer);
  currentTimer = undefined;
  secondsLeft = 0;
  document.querySelector(".seconds").textContent = secondsLeft;
}

// main update function
function updatePage(goToNextPage = false) {
  if (goToNextPage)
    quizState++;

  currentQuestion = pageContents[quizState];

  updateText();
  updateButtons();
  updateElements();
  updateStyle();
}

// loads new text
function updateText() {
  boldText.textContent = currentQuestion.boldText;
  regularText.textContent = currentQuestion.regularText;
}

// button update handler
function updateButtons() {
  eraseButtons();
  addButtons(currentQuestion.buttonCount);
}

// adds/removes elements as needed
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

// some quiz states require different styling
function updateStyle() {
  if (quizState === SUBMIT_HIGH_SCORE) {
    regularText.setAttribute("style", "text-align: start");
  }
  else if (quizState === HIGH_SCORES) {
    buttons.setAttribute("style", "display: flex");
    quiz.setAttribute("style", "display: inline");
  }
}

// adds elements for high score submit and high score pages
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

// removes temporary elements as needed
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

// erases all button elements on page update
function eraseButtons() {
  for (var i = 1; i <= 4; i++) {
    var button = document.querySelector("#btn" + i);

    if (button !== null)
      button.remove();
  }
}

// adds required number of buttons on page update
function addButtons(buttonCount) {
  for (var i = 1; i <= buttonCount; i++) {
    var newBtn = document.createElement("button");

    newBtn.setAttribute("id", "btn" + i);
    newBtn.textContent = currentQuestion["btn" + i];
    buttons.append(newBtn);
  }
}

// answer handler function
function onAnswer(answer) {

  // updatePage will change currentQuestion.rightAnswer so I save it here
  var rightAnswer = currentQuestion.rightAnswer;

  updatePage(true);
  checkAnswer(answer, rightAnswer);
  checkGameStatus();
}

// validates answer, penalizes time on wrong answer
function checkAnswer(answer, rightAnswer) {
  var correct = (answer === rightAnswer);

  addFeedback(correct);

  if (!correct)
    deductTime(15);
}

// ends game if time has run out due to penalties or player reaches submit high score screen
function checkGameStatus() {
  if (secondsLeft <= 0)
    endGame(true);
  else if (quizState === SUBMIT_HIGH_SCORE)
    endGame(false);
}

// adds feedback element after player selects an answer
function addFeedback(correct) {
  var answerFeedback = document.createElement("div");

  answerFeedback.setAttribute("class", "answer-feedback");

  if (correct)
    answerFeedback.textContent = "Correct!";
  else
    answerFeedback.textContent = "Wrong!";

  quiz.appendChild(answerFeedback);
}

// reduces time remaining
function deductTime(val) {
  secondsLeft -= val;
}

// jumps directly to high score screen
function displayHighScores() {
  quizState = HIGH_SCORES;
  updatePage();
}

// creates new high score object, adds it to global array
function addHighScore() {
  var highScore = {
    initials: document.querySelector("input").value,
    score: points
  };

  // if nothing was loaded out of localStorage, change variable to an array
  if (highScores === null)
    highScores = [];

  // don't save high score if player didn't enter initials, or if their score is zero
  if (highScore.initials === "" || highScore.score === 0)
    return;

  highScores.push(highScore);
}

// adds highScores variable to localStorage
function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// clears both global variable and localStorage
function eraseHighScores() {
  highScores = [];
  saveHighScores();
}

// click event handler
function handleClick(e) {

  // button 1 click handling
  if (e.target.matches("#btn1")) {
    if (quizState === START) {
      secondsLeft = 76;
      quiz.setAttribute("style", "display: inline");
      updatePage(true);
      startTimer();
    }
    else if (quizState === SUBMIT_HIGH_SCORE) {
      addHighScore();
      saveHighScores();
      updatePage(true);
    }
    else if (quizState === HIGH_SCORES) {
      startOver();
    }
    else {
      onAnswer(e.target.getAttribute("id"));
    }
  }

  // button 2 click handling
  else if (e.target.matches("#btn2")) {
    if (quizState === HIGH_SCORES) {
      eraseHighScores();
      removeElements("high-scores");
    }
    else {
      onAnswer(e.target.getAttribute("id"));
    }
  }

  // button 3 click handling
  else if (e.target.matches("#btn3")) {
    onAnswer(e.target.getAttribute("id"));
  }

  // button 4 click handling
  else if (e.target.matches("#btn4")) {
    onAnswer(e.target.getAttribute("id"));
  }

  // "View High Scores" upper left text click handling
  else if (e.target.matches(".high-scores-link")) {
    if (quizState !== HIGH_SCORES) {
      displayHighScores();
      endGame(false);
    }
  }
}

// I added this to prevent "Enter" on the Submit High Score box from reloading the page - also it allows "Enter" to function normally when "Submit" button is selected
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

// initializes main menu style and content
startOver();

// click handler
body.addEventListener("click", handleClick);

// very specific use case keydown handler
body.addEventListener("keydown", handleKeydown);
