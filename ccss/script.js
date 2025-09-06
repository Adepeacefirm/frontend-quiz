const questionNumberCount = document.getElementById("question-number-count");
const questionEl = document.getElementById("question-element");
const progressBar = document.getElementById("progress-bar");
const optionsDiv = document.getElementById("options-div");
const options = document.querySelectorAll(".options");
const submitBtn = document.getElementById("submit-btn");
const errorDiv = document.getElementById("error-div");
const newQuestionEl = document.getElementById("new-question-element");
const labels = ["A", "B", "C", "D"];
const body = document.getElementById("body");
const toggleDiv = document.querySelector(".toggle-div");

let data;

const fetchData = async () => {
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("Response not okay");
    }
    data = await res.json();
    console.log(data);
    startQuiz();
  } catch (error) {
    console.log(error);
  }
};

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  questionEl.style.display = "block";
  progressBar.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  submitBtn.innerHTML = "Next Question";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = data.questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionNumberCount.innerHTML = questionNo;
  questionEl.innerHTML = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerHTML = `<span class="option-labels">${labels[index]}</span> ${option}`;
    button.classList.add("options");
    optionsDiv.appendChild(button);

    button.addEventListener("click", () => {
      if (option === currentQuestion.answer) {
        button.classList.add("correct");
        score++;
        if (!button.querySelector("img")) {
          button.innerHTML += `<img src="../images/icon-correct.svg" alt="">`;
        }
      } else {
        button.classList.add("wrong");
        if (!button.querySelector("img")) {
          button.innerHTML += `<img src="../images/icon-incorrect.svg" alt="">`;
        }
      }
      Array.from(optionsDiv.children).forEach((button) => {
        if (button.innerText.includes(currentQuestion.answer)) {
          button.classList.add("correct");
          if (!button.querySelector("img")) {
            button.innerHTML += `<img src="../images/icon-correct.svg" alt="">`;
          }
        }
        button.disabled = true;
      });
    });
  });
  if (questionNo == 10) {
    submitBtn.textContent = "Submit Quiz";
  }
  updateProgressBar();
};

const resetState = () => {
  optionsDiv.innerHTML = "";
};

const showScore = () => {
  localStorage.setItem("score", score);
  window.location.href = "./result.html";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < data.questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

optionsDiv.addEventListener("click", (e) => {
  if (e.target.closest(".options")) {
    optionsDiv
      .querySelectorAll(".options")
      .forEach((btn) => btn.classList.remove("selected"));
    e.target.closest(".options").classList.add("selected");
    errorDiv.classList.add("hidden");
  }
});

const updateProgressBar = () => {
  const progress = ((currentQuestionIndex + 1) / data.questions.length) * 100;
  progressBar.style.width = `${progress}%`;
};

submitBtn.addEventListener("click", () => {
  if (currentQuestionIndex < data.questions.length) {
    const selected = optionsDiv.querySelector(".selected");

    if (!selected) {
      errorDiv.classList.remove("hidden");
      return;
    }
    handleNextButton();
  } else {
    startQuiz();
  }
});

fetchData();

toggleDiv.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
