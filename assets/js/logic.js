document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("start");
  var questionsDiv = document.getElementById("questions");
  var endScreenDiv = document.getElementById("end-screen");
  var timerSpan = document.getElementById("time");
  var finalScoreSpan = document.getElementById("final-score");
  var initialsInput = document.getElementById("initials");
  var submitButton = document.getElementById("submit");
  var feedbackDiv = document.getElementById("feedback");
  var highScoresLink = document.querySelector(".scores a");

  var currentQuestionIndex = 0;
  var time = 0;
  var timerInterval;

  var correctSound = new Audio("./assets/sfx/correct.wav");
  var incorrectSound = new Audio("./assets/sfx/incorrect.wav");

  function startQuiz() {
    startButton.style.display = "none";
    questionsDiv.classList.remove("hide");
    startTimer();
    showQuestion();
  }

  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = currentQuestion.question;

    var choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, index) {
      var button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function () {
        handleAnswer(choice);
      });
      choicesDiv.appendChild(button);
    });
  }

  function handleAnswer(selectedAnswer) {
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      feedbackDiv.textContent = "Correct!";
      playSound(correctSound);
    } else {
      feedbackDiv.textContent = "Incorrect!";
      playSound(incorrectSound);
      time -= 10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      time++;
      timerSpan.textContent = time;

      if (time >= 60) {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerInterval);
    questionsDiv.classList.add("hide");
    endScreenDiv.classList.remove("hide");
    finalScoreSpan.textContent = time;
    saveHighScore();
  }

  function saveHighScore() {
    submitButton.addEventListener("click", function () {
      var initials = initialsInput.value.trim();
      if (initials !== "") {
        var scoreData = {
          initials: initials,
          score: time,
        };

        var existingScores = JSON.parse(localStorage.getItem("highScores")) || [];
        existingScores.push(scoreData);
        existingScores.sort(function (a, b) {
          return b.score - a.score;
        });
        localStorage.setItem("highScores", JSON.stringify(existingScores));
        window.location.href = "highscores.html";
      }
    });
  }

  highScoresLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "highscores.html";
  });

  startButton.addEventListener("click", startQuiz);
});
