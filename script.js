// =============================
// FraktionsFinder 1848
// Version 0.1
// =============================

let currentQuestion = 0;

// Elemente

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");

const startButton = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");

const progress = document.getElementById("progress");

// -----------------------------

startButton.addEventListener("click", startQuiz);

// -----------------------------

function startQuiz(){

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    currentQuestion = 0;

    showQuestion();

}

// -----------------------------

function showQuestion(){

    const question = questions[currentQuestion];

    questionText.textContent = question.text;

    questionCounter.textContent =
        `Frage ${currentQuestion + 1} von ${questions.length}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

}