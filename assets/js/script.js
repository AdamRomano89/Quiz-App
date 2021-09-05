// Quiz App

// Setup Vars | Elements
var timerEl = document.querySelector(".top-header .timer");
var quizInfo = document.querySelector(".info");
var startQuiz = document.querySelector("#start-quiz");
var quizApp = document.querySelector(".quiz-app");
var questionsArea = document.querySelector(".questions");
var answersArea = document.querySelector(".answers");
var nextQuestion = document.querySelector("#next-question");
var allDone = document.querySelector(".all-done");
var score1 = document.querySelector(".all-done .score");
var inputElm = document.querySelector(".all-done input");
var submitForm = document.querySelector(".all-done button");
var finalResults = document.querySelector(".final-result");
var score2 = document.querySelector(".final-score");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear");
var showHighScoreBtn = document.querySelector(".top-header a");
var highScoreDiv = document.querySelector(".high-scores");
var date = moment().format("MMMM Do YYYY, h:mm:ss a");

var questions = [
  {
    question: "What is HTML stands for?",
    answer_1: "JS",
    answer_2: "Hyper Text",
    answer_3: "Css",
    answer_4: "Coding",
    right: "Hyper Text",
  },
  {
    question: "What is Css stands for?",
    answer_1: "JS",
    answer_2: "Cascadeing Style sheet",
    answer_3: "Css",
    answer_4: "Coding",
    right: "Cascadeing Style sheet",
  },
  {
    question: "What is JS stands for?",
    answer_1: "JavaScript",
    answer_2: "js",
    answer_3: "Css",
    answer_4: "Coding",
    right: "JavaScript",
  },
];

// JSON => JavaSCript Object Notation
startQuiz.addEventListener("click", showQuizApp);

function showQuizApp() {
  // Hide the Quiz Info Area
  quizInfo.style.display = "none";
  // Show Quiz App Area
  quizApp.style.display = "block";
  // Show Next Button
  nextQuestion.style.display = "none";

  startTimer(100);
}

var currentQ = 0;
var score = 0;
var sec;
var timer;

function viewQuestions() {
  addQuestions(questions[currentQ], questions.length); // Call Function
  nextQuestion.onclick = function () {
    // get the right answer
    var right = questions[currentQ].right;
    currentQ++;

    checkAnswer(right);

    questionsArea.innerHTML = "";
    answersArea.innerHTML = "";

    addQuestions(questions[currentQ], questions.length);
  };
}

viewQuestions();

function addQuestions(q, questionsCount) {
  if (currentQ < questionsCount) {
    // create question
    var questionTitle = document.createElement("h2"); // <h2></h2>
    var text = document.createTextNode(q.question); // "What is HTML ...."
    questionTitle.appendChild(text); // <h2>What is HTML ....</h2>
    questionsArea.appendChild(questionTitle);

    // create answers
    for (var i = 0; i < 4; i++) {
      // console.log(i + 1);
      var divEl = document.createElement("div"); // <div></div>
      divEl.className = "answer";
      divEl.id = "answer_" + (i + 1);
      var answerTxt = document.createTextNode(q["answer_" + (i + 1)]);
      divEl.appendChild(answerTxt); // <div class="answer" id="answer_1">JS</div>
      answersArea.appendChild(divEl);
    }

    // Select Any Answer
    selectAnswer(q);

    nextQuestion.style.display = "none";
  } else {
    quizApp.style.display = "none";
    allDone.style.display = "block";
    nextQuestion.style.display = "none";

    score1.innerHTML = "You answers " + score + " from " + questionsCount;
    clearInterval(timer);
    timerEl.innerHTML = 0;
  }
}

function checkAnswer(right) {
  var allAnswers = document.querySelectorAll(".answer");
  var answer;
  for (var i = 0; i < allAnswers.length; i++) {
    if (allAnswers[i].getAttribute("class").includes("selected-answer")) {
      answer = allAnswers[i].textContent;
    }
  }
  if (right == answer) {
    score++;
  } else {
    sec = sec - 3;
  }
}

function startTimer(time) {
  sec = time;
  timer = setInterval(function () {
    timerEl.innerHTML = sec;
    sec--;
    if (sec < 0) {
      quizApp.style.display = "none";
      allDone.style.display = "block";
      nextQuestion.click();
      score1.innerHTML = "You answers " + score + " from 3";
      nextQuestion.style.display = "none";
      clearInterval(timer);
    }
  }, 1000);
}

function selectAnswer(q) {
  var answersDivs = document.querySelectorAll(".answer");
  for (var x = 0; x < answersDivs.length; x++) {
    answersDivs[x].onclick = function () {
      answersDivs.forEach(function (i) {
        i.classList.remove("selected-answer");
        i.classList.add("disabled");
      });
      this.classList.add("selected-answer");
      answersDivs.forEach(function (i) {
        if (i.textContent == q.right) {
          console.log("enter Here !!");
          var correct = "<span class='correct'> correct </span>";
          i.innerHTML += correct;
        } else {
          var incorrect = "<span class='incorrect'> incorrect </span>";
          i.innerHTML += incorrect;
        }
      });
      nextQuestion.style.display = "block";
    };
  }
}

submitForm.addEventListener("click", showFinalScreen);

function showFinalScreen() {
  var theValueOfInput = inputElm.value;
  allDone.style.display = "none";
  finalResults.style.display = "block";
  goBackBtn.style.display = "block";
  score2.innerHTML =
    "Your name is " +
    "<strong>" +
    theValueOfInput +
    "</strong>" +
    " and your score is " +
    "<strong>" +
    score +
    "</strong>" +
    " on " +
    "<strong>" +
    date +
    "</strong>";
}

goBackBtn.addEventListener("click", function () {
  window.location.reload();
});

showHighScoreBtn.addEventListener("click", function () {
  quizApp.style.display = "none";
  allDone.style.display = "none";
  quizInfo.style.display = "none";
  nextQuestion.style.display = "none";
  finalResults.style.display = "none";
  highScoreDiv.style.display = "block";
  goBackBtn.style.display = "block";
  clearInterval(timer);
  timerEl.innerHTML = "";
});
