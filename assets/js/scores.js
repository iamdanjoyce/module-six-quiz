
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
  