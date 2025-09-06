const htmlQuestions = document.querySelector(".html");
const cssQuestions = document.querySelector(".css");
const javascriptQuestions = document.querySelector(".javascript");
const accessibilityQuestions = document.querySelector(".accessibility");

const toggleDiv = document.querySelector(".toggle-div");
const body = document.getElementById("body");
const subjects = document.querySelectorAll(".subjects");

localStorage.removeItem("score");

accessibilityQuestions.addEventListener("click", () => {
  window.location.href = "./accessibility/accessibility.html";
});

htmlQuestions.addEventListener("click", ()=>{
    window.location.href = "./hhtml/htmlquest.html"
})

cssQuestions.addEventListener("click", ()=>{
    window.location.href = "./ccss/cssquest.html"
})

javascriptQuestions.addEventListener("click", ()=>{
    window.location.href = "./javascript/javascript.html"
})

toggleDiv.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
//   subjects.forEach((subject)=>{
//     subject.classList.toggle("subjects-dark-mode")
//   })
});
