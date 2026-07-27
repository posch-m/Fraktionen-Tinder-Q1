/*
========================================================
FraktionsFinder 1848
script.js
Version 1.0
========================================================
*/

// ===============================
// App-Zustand
// ===============================

const state = {

    currentQuestion: 0,

    scores: {
        casino: 0,
        wuerttembergerhof: 0,
        landsberg: 0,
        augsburgerhof: 0,
        westendhall: 0,
        deutscherhof: 0,
        donnersberg: 0,
        cafemilani: 0
    }

};


// ===============================
// Elemente
// ===============================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const profileScreen = document.getElementById("profile-screen");

const startButton = document.getElementById("start-btn");

const yesButton = document.getElementById("btn-yes");
const neutralButton = document.getElementById("btn-neutral");
const noButton = document.getElementById("btn-no");

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");

const progress = document.getElementById("progress");


// ===============================
// Events
// ===============================

startButton.addEventListener("click", startQuiz);

yesButton.addEventListener("click", () => answerQuestion(1));
neutralButton.addEventListener("click", () => answerQuestion(0));
noButton.addEventListener("click", () => answerQuestion(-1));


// ===============================
// Quiz starten
// ===============================

function startQuiz(){

    resetScores();

    state.currentQuestion = 0;

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    profileScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

}


// ===============================
// Frage anzeigen
// ===============================

function showQuestion(){

    const question = questions[state.currentQuestion];

    questionText.textContent = question.text;

    questionCounter.textContent =
        `Frage ${state.currentQuestion + 1} von ${questions.length}`;

    progress.style.width =
        `${((state.currentQuestion + 1) / questions.length) * 100}%`;

}


// ===============================
// Antwort auswerten
// ===============================

function answerQuestion(answer){

    const question = questions[state.currentQuestion];

    Object.keys(question.weights).forEach(faction => {

        state.scores[faction] +=
            question.weights[faction] * answer;

    });

    state.currentQuestion++;

    if(state.currentQuestion >= questions.length){

        showResults();

        return;

    }

    showQuestion();

}


// ===============================
// Punkte zurücksetzen
// ===============================

function resetScores(){

    Object.keys(state.scores).forEach(faction =>{

        state.scores[faction]=0;

    });

}