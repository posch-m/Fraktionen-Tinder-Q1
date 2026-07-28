/*
========================================================
FraktionsFinder 1848
script.js
Teil 1
========================================================
*/

"use strict";

/* ============================================
   DOM-ELEMENTE
============================================ */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const profileScreen = document.getElementById("profile-screen");

const startBtn = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const progressBar = document.getElementById("progress");

const yesBtn = document.getElementById("btn-yes");
const neutralBtn = document.getElementById("btn-neutral");
const noBtn = document.getElementById("btn-no");

const wingName = document.getElementById("wing-name");
const wingDescription = document.getElementById("wing-description");

const politicalAxis = document.getElementById("political-axis");

const winnerName = document.getElementById("winner-name");
const winnerPercent = document.getElementById("winner-percent");
const winnerDescription = document.getElementById("winner-description");

const historyText = document.getElementById("history-text");

const rankingList = document.getElementById("ranking-list");

const restartBtn = document.getElementById("restart-btn");

const profileTitle = document.getElementById("profile-title");
const profileContent = document.getElementById("profile-content");
const backBtn = document.getElementById("back-btn");


/* ============================================
   QUIZSTATUS
============================================ */

let currentQuestion = 0;

let scores = {};

let ranking = [];

let winner = null;


/* ============================================
   STARTWERTE
============================================ */

function initializeScores() {

    scores = {};

    Object.keys(factions).forEach(key => {

        scores[key] = 0;

    });

}


/* ============================================
   BILDSCHIRME
============================================ */

function showScreen(screen) {

    startScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    profileScreen.classList.add("hidden");

    screen.classList.remove("hidden");

}


/* ============================================
   QUIZ STARTEN
============================================ */

function startQuiz() {

    initializeScores();

    currentQuestion = 0;

    showScreen(quizScreen);

    loadQuestion();

}


/* ============================================
   FRAGE LADEN
============================================ */

function loadQuestion() {

    const question = questions[currentQuestion];

    questionText.textContent = question.text;

    questionCounter.textContent =
        `Frage ${currentQuestion + 1} von ${questions.length}`;

    updateProgress();

}


/* ============================================
   FORTSCHRITT
============================================ */

function updateProgress() {

    const percent =
        ((currentQuestion) / questions.length) * 100;

    progressBar.style.width = percent + "%";

}


/* ============================================
   BUTTONS
============================================ */

startBtn.addEventListener("click", startQuiz);

yesBtn.addEventListener("click", () => {

    answerQuestion("yes");

});

neutralBtn.addEventListener("click", () => {

    answerQuestion("neutral");

});

noBtn.addEventListener("click", () => {

    answerQuestion("no");

});

restartBtn.addEventListener("click", startQuiz);

backBtn.addEventListener("click", () => {

    showScreen(resultScreen);

});/* ============================================
   ANTWORT AUSWERTEN
============================================ */

function answerQuestion(answer) {

    const question = questions[currentQuestion];

    Object.keys(question.weights).forEach(key => {

        const value = question.weights[key];

        switch (answer) {

            case "yes":
                scores[key] += value;
                break;

            case "neutral":
                scores[key] += value / 2;
                break;

            case "no":
                scores[key] -= value;
                break;

        }

    });

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        finishQuiz();

    } else {

        loadQuestion();

    }

}


/* ============================================
   MAXIMALPUNKTE
============================================ */

function calculateMaximumScore() {

    let max = 0;

    questions.forEach(question => {

        Object.values(question.weights).forEach(value => {

            max += Math.abs(value);

        });

    });

    return max;

}


/* ============================================
   RANKING BERECHNEN
============================================ */

function calculateRanking() {

    const maxScore = calculateMaximumScore();

    ranking = [];

    Object.keys(scores).forEach(id => {

        const faction = factions[id];

        const rawScore = scores[id];

        const percent = Math.max(
            0,
            Math.round(((rawScore + maxScore) / (2 * maxScore)) * 100)
        );

        ranking.push({

            id: id,

            name: faction.name,

            wing: faction.wing,

            ideology: faction.ideology,

            color: faction.color,

            shortDescription: faction.shortDescription,

            description: faction.description,

            representatives: faction.representatives,

            positions: faction.positions,

            score: rawScore,

            percent: percent

        });

    });

    ranking.sort((a, b) => b.percent - a.percent);

    winner = ranking[0];

}


/* ============================================
   QUIZ BEENDEN
============================================ */

function finishQuiz() {

    progressBar.style.width = "100%";

    calculateRanking();

    renderResults();

    showScreen(resultScreen);

}


/* ============================================
   ERGEBNISSE
============================================ */

function renderResults() {

    renderWing();

    renderAxis();

    renderWinner();

    renderHistory();

    renderRanking();

}


/* ============================================
   SIEGER
============================================ */

function renderWinner() {

    winnerName.textContent = winner.name;

    winnerPercent.textContent =
        winner.percent + " % Übereinstimmung";

    winnerDescription.textContent =
        winner.shortDescription;

}/* ============================================
   POLITISCHER FLÜGEL
============================================ */

function renderWing() {

    wingName.textContent = winner.wing;
    wingDescription.textContent = winner.ideology;

}


/* ============================================
   POLITISCHE ACHSE
============================================ */

function renderAxis() {

    politicalAxis.innerHTML = "";

    const axis = document.createElement("div");
    axis.className = "axis";

    const marker = document.createElement("div");
    marker.className = "axis-marker";

    let position = 50;

    switch (winner.wing) {

        case "Konservativ-liberaler Flügel":
            position = 15;
            break;

        case "Liberales Zentrum":
            position = 40;
            break;

        case "Demokratischer Flügel":
            position = 70;
            break;

        case "Radikaldemokratischer Flügel":
            position = 90;
            break;

    }

    marker.style.left = position + "%";

    const left = document.createElement("span");
    left.className = "axis-left";
    left.textContent = "Konservativ";

    const right = document.createElement("span");
    right.className = "axis-right";
    right.textContent = "Radikaldemokratisch";

    axis.appendChild(marker);

    politicalAxis.appendChild(left);
    politicalAxis.appendChild(axis);
    politicalAxis.appendChild(right);

}


/* ============================================
   HISTORISCHE EINORDNUNG
============================================ */

function renderHistory() {

    historyText.textContent =
        winner.description;

}


/* ============================================
   RANKING
============================================ */

function renderRanking() {

    rankingList.innerHTML = "";

    ranking.forEach(entry => {

        const card = document.createElement("div");

        card.className = "ranking-item";

        card.style.borderLeft =
            "8px solid " + entry.color;

        card.innerHTML = `

            <div class="ranking-top">

                <strong>${entry.name}</strong>

                <span>${entry.percent}%</span>

            </div>

            <div class="ranking-bottom">

                ${entry.wing}

            </div>

        `;

        card.addEventListener("click", () => {

            openProfile(entry.id);

        });

        rankingList.appendChild(card);

    });

}


/* ============================================
   FRAKTIONSPROFIL
============================================ */

function openProfile(id) {

    const faction = factions[id];

    profileTitle.textContent = faction.name;

    profileContent.innerHTML = `

        <p>
            <strong>Politische Einordnung:</strong><br>
            ${faction.wing}
        </p>

        <p>
            <strong>Ideologie:</strong><br>
            ${faction.ideology}
        </p>

        <p>
            ${faction.description}
        </p>

        <h3>Bekannte Vertreter</h3>

        <ul>

            ${faction.representatives
                .map(person => `<li>${person}</li>`)
                .join("")}

        </ul>

        <h3>Zentrale Positionen</h3>

        <ul>

            ${faction.positions
                .map(position => `<li>${position}</li>`)
                .join("")}

        </ul>

    `;

    showScreen(profileScreen);

}/* ============================================
   QUIZ ZURÜCKSETZEN
============================================ */

function resetQuiz() {

    currentQuestion = 0;

    initializeScores();

    ranking = [];

    winner = null;

    progressBar.style.width = "0%";

}


/* ============================================
   QUIZ NEU STARTEN
============================================ */

restartBtn.addEventListener("click", () => {

    resetQuiz();

    startQuiz();

});


/* ============================================
   TASTATURSTEUERUNG
============================================ */

document.addEventListener("keydown", (event) => {

    if (!quizScreen.classList.contains("hidden")) {

        switch (event.key) {

            case "1":
            case "ArrowLeft":
                answerQuestion("yes");
                break;

            case "2":
            case "ArrowUp":
                answerQuestion("neutral");
                break;

            case "3":
            case "ArrowRight":
                answerQuestion("no");
                break;

        }

    }

});


/* ============================================
   KLEINE ANIMATIONEN
============================================ */

function fadeIn(element) {

    element.style.opacity = 0;

    let opacity = 0;

    const timer = setInterval(() => {

        opacity += 0.08;

        element.style.opacity = opacity;

        if (opacity >= 1) {

            clearInterval(timer);

        }

    }, 15);

}


/* ============================================
   ERGEBNISSE ANIMIEREN
============================================ */

const originalRenderResults = renderResults;

renderResults = function () {

    originalRenderResults();

    fadeIn(document.getElementById("wing-card"));
    fadeIn(document.getElementById("axis-card"));
    fadeIn(document.getElementById("winner-card"));
    fadeIn(document.getElementById("history-card"));
    fadeIn(document.getElementById("ranking-list"));

};


/* ============================================
   SICHERHEITSPRÜFUNGEN
============================================ */

if (typeof questions === "undefined") {

    console.error("questions.js wurde nicht geladen.");

}

if (typeof factions === "undefined") {

    console.error("fraktionen.js wurde nicht geladen.");

}


/* ============================================
   INITIALISIERUNG
============================================ */

initializeScores();

showScreen(startScreen);


/* ============================================
   ENDE
============================================ */