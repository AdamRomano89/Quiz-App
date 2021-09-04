// Quiz App

// Setup Vars | Elements
var timer = document.querySelector(".top-header .timer");
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
var finalResults = document.querySelector(".final-results");
var score2 = document.querySelector(".final-score");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear");

// JSON => JavaSCript Object Notation
startQuiz.addEventListener("click", showQuizApp);

function showQuizApp() {
  // Hide the Quiz Info Area
  quizInfo.style.display = "none";
  // Show Quiz App Area
  quizApp.style.display = "block";
  // Show Next Button
  nextQuestion.style.display = "block";
}

function viewQuestions() {
  // Send Request and Get Data
  var http = new XMLHttpRequest();

  //   readyState  حالة الركوست
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // responseText "[{},{}]"
      var questions = JSON.parse(this.responseText); // [{} , {}, {}]
      addQuestions(questions[0], questions.length); // Call Function
    }
  };

  // Send Request
  //   http.open("GET", "https://jsonplaceholder.typicode.com/posts");
  http.open("GET", "questions.json");
  http.send();
}

viewQuestions();

function addQuestions(q, questionsCount) {
  console.log(q); // {answer_1,answer_2,question}
  console.log(questionsCount);

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
  var answersDivs = document.querySelectorAll(".answer");
  for (var x = 0; x < answersDivs.length; x++) {
    answersDivs[x].onclick = function () {
      this.classList.add("selected-answer");
    };
  }
}
