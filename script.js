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

}// ===============================
// Ergebnisse berechnen
// ===============================

function showResults() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const ranking = Object.entries(state.scores)
        .sort((a, b) => b[1] - a[1]);

    const winnerKey = ranking[0][0];
    const winner = factions[winnerKey];

    document.getElementById("winner-name").textContent =
        winner.name;

    const values = ranking.map(item => item[1]);

const highest = Math.max(...values);
const lowest = Math.min(...values);

let percentage;

if (highest === lowest) {
    percentage = 50;
} else {
    percentage = Math.round(
        ((ranking[0][1] - lowest) / (highest - lowest)) * 100
    );
}

    document.getElementById("winner-percent").textContent =
        percentage + "% Übereinstimmung";

    document.getElementById("winner-description").textContent =
        winner.shortDescription;

    renderRanking(ranking);

}


// ===============================
// Ranking erzeugen
// ===============================

function renderRanking(ranking) {

    const rankingList =
        document.getElementById("ranking-list");

    rankingList.innerHTML = "";

    ranking.forEach(([key, score], index) => {

        const faction = factions[key];

        const row = document.createElement("div");

        row.className = "ranking-item";

        row.style.borderLeft =
            `8px solid ${faction.color}`;

        row.innerHTML = `
            <div class="ranking-left">
                <strong>${index + 1}. ${faction.name}</strong><br>
                <small>${faction.ideology}</small>
            </div>

            <div class="ranking-right">
                ${score} Punkte
            </div>
        `;

        row.addEventListener("click", () => {

            showProfile(key);

        });

        rankingList.appendChild(row);

    });

}


// ===============================
// Profil anzeigen
// ===============================

function showProfile(key){

    const faction = factions[key];

    resultScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");

    document.getElementById("profile-title").textContent =
        faction.name;

    document.getElementById("profile-content").innerHTML = `

        <p>${faction.description}</p>

        <h3>Politische Ausrichtung</h3>

        <p>${faction.ideology}</p>

        <h3>Zentrale Positionen</h3>

        <ul>

            ${faction.positions.map(position =>
                `<li>${position}</li>`
            ).join("")}

        </ul>

    `;

}// ===============================
// Buttons
// ===============================

const restartButton = document.getElementById("restart-btn");
const backButton = document.getElementById("back-btn");

restartButton.addEventListener("click", restartQuiz);
backButton.addEventListener("click", backToResults);


// ===============================
// Zurück zur Ergebnisseite
// ===============================

function backToResults() {

    profileScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

}


// ===============================
// Quiz neu starten
// ===============================

function restartQuiz() {

    resetScores();

    state.currentQuestion = 0;

    progress.style.width = "0%";

    resultScreen.classList.add("hidden");
    profileScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

}


// ===============================
// Tastatursteuerung
// ===============================

document.addEventListener("keydown", event => {

    if (quizScreen.classList.contains("hidden")) return;

    switch (event.key) {

        case "ArrowLeft":
            answerQuestion(-1);
            break;

        case "ArrowDown":
            answerQuestion(0);
            break;

        case "ArrowRight":
            answerQuestion(1);
            break;

    }

});


// ===============================
// Initialisierung
// ===============================

progress.style.width = "0%";