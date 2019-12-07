

// ----use this as example for hiding the start btn and starting the next div------//
var startbtnEl = document.querySelector("#start-btn");
var qaEl = document.querySelector("#qa")
var questionsEl = document.querySelector("#questions-asked");
var answersEl = document.getElementById("answers");
var answerl = document.querySelector("ul")
var qCount = 0;
console.log(questions);

var totalSeconds = 60;
var secondsElapsed = 0;
var interval;
var timeLeft;

var tremaningEl = document.getElementById("tremaining")

//------create funciton to grab user input-----//
var userForm = document.querySelector(".user-form");
var userInput = document.querySelector("#user-input");
var user = [];

// // ------------set and calculate time ---------------------------//

function startTime() {
  interval = setInterval(function () {
    secondsElapsed++;
    renderTimeLeft();
  }, 1000);
};
function calcTimeLeft() {
  var timeLeft;
  timeLeft = totalSeconds - secondsElapsed;
  return timeLeft;
}
function stopTimer() {
  secondsElapsed = 0;
  clearInterval(interval);
}
function renderTimeLeft() {
  tremaningEl.textContent = calcTimeLeft();
  if (secondsElapsed >= totalSeconds) {
    alert("Times up!");
    stopTimer();
    //   endGame(); //define this too!!
  }
}

//-------start timer and trigger Q&A, also start the calculation and render of the timer----//
startbtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  qaEl.classList.remove("hide");
  startbtnEl.classList.add("hide");
  renderqa();
  startTime();
  renderTimeLeft();
});
//-------Render Questions and Answers----//
function renderqa() {
  questionsEl.innerHTML = "";
  answersEl.innerHTML = "";

  questionsEl.textContent = questions[qCount].title;

  for (var i = 0; i < questions[qCount].choices.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = "<button class='btn-primary btn-lg mb-2'>" + questions[qCount].choices[i] + "</button>";
    answersEl.appendChild(li);

  }

  qCount++;

  console.log(qCount);
  if (qCount >= questions.length) {
    console.log("hello");
    qaEl.classList.add("hide");
    answersEl.classList.add("hide");
    userForm.classList.remove("hide");

  }

}


//------Checking answers----------------------------//
answerl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (event.target.innerHTML !== questions[qCount -1].answer) {
    console.log(questions[qCount].answer);
    console.log(event.target.innerHTML);
    console.log("wrong");
  } else if (event.target.innerHTML === questions[qCount -1].answer) {
    console.log(questions[qCount].answer);
    console.log("right")
  };
});

//------store user imput-----//

function storeUser() {
  // Stringify and set "user" key in localStorage to todos array
  localStorage.setItem("user", JSON.stringify(user));
  console.log(JSON.stringify(user));
  console.log(user);
}

// When form is submitted...
userForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("submit btn")
  var userText = userInput.value.trim();
  user.push(userText);

  storeUser();
});

//------create funciton to grab user Answers-----//



// //-----event listeners-------//
answersEl.addEventListener("click", renderqa);
