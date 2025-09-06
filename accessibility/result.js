const myScore = document.getElementById("my-score");
const savedScore = localStorage.getItem("score");
const toggleDiv = document.querySelector(".toggle-div")
const body = document.getElementById("body")
myScore.innerHTML = savedScore;

toggleDiv.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
