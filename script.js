/*
========================================================
FraktionsFinder 1848
script.js
Teil 1 von 3
========================================================
*/


// ======================================================
// APP-STATUS
// ======================================================

const state = {

    currentQuestion: 0,

    scores: {}

};


// Alle Fraktionen automatisch übernehmen

Object.keys(factions).forEach(key => {

    state.scores[key] = 0;

});


// ======================================================
// DOM-ELEMENTE
// ======================================================

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const profileScreen = document.getElementById("profile-screen");

const startBtn = document.getElementById("start-btn");

const yesBtn = document.getElementById("btn-yes");
const neutralBtn = document.getElementById("btn-neutral");
const noBtn = document.getElementById("btn-no");

const progress = document.getElementById("progress");
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");


// ======================================================
// EVENTS
// ======================================================

startBtn.addEventListener("click", startQuiz);

yesBtn.addEventListener("click", () => answerQuestion(1));
neutralBtn.addEventListener("click", () => answerQuestion(0));
noBtn.addEventListener("click", () => answerQuestion(-1));


// ======================================================
// QUIZ STARTEN
// ======================================================

function startQuiz() {

    resetScores();

    state.currentQuestion = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    profileScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

}


// ======================================================
// FRAGE ANZEIGEN
// ======================================================

function showQuestion() {

    const question = questions[state.currentQuestion];

    questionText.style.opacity = 0;

    setTimeout(() => {

        questionText.textContent = question.text;

        questionCounter.textContent =
            `Frage ${state.currentQuestion + 1} von ${questions.length}`;

        progress.style.width =
            ((state.currentQuestion + 1) / questions.length * 100) + "%";

        questionText.style.opacity = 1;

    }, 150);

}


// ======================================================
// ANTWORT VERARBEITEN
// ======================================================

function answerQuestion(answer) {

    const question = questions[state.currentQuestion];

    Object.keys(question.weights).forEach(faction => {

        state.scores[faction] +=
            question.weights[faction] * answer;

    });

    state.currentQuestion++;

    if (state.currentQuestion >= questions.length) {

        showResults();

        return;

    }

    showQuestion();

}


// ======================================================
// PUNKTE ZURÜCKSETZEN
// ======================================================

function resetScores() {

    Object.keys(state.scores).forEach(faction => {

        state.scores[faction] = 0;

    });

}// ======================================================
// ERGEBNISSE
// ======================================================

const winnerCard = document.getElementById("winner-card");
const winnerName = document.getElementById("winner-name");
const winnerPercent = document.getElementById("winner-percent");
const winnerDescription = document.getElementById("winner-description");
const rankingList = document.getElementById("ranking-list");


// ======================================================
// ERGEBNIS BERECHNEN
// ======================================================

function showResults() {

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const ranking = calculateRanking();

    displayWinner(ranking[0]);

    displayRanking(ranking);

}


// ======================================================
// RANKING BERECHNEN
// ======================================================

function calculateRanking() {

    const values = Object.values(state.scores);

    const min = Math.min(...values);
    const max = Math.max(...values);

    const range = (max - min) || 1;

    const ranking = Object.keys(state.scores).map(key => {

        const percent = Math.round(
            ((state.scores[key] - min) / range) * 100
        );

        return {

            id: key,

            percent: percent,

            ...factions[key]

        };

    });

    ranking.sort((a, b) => b.percent - a.percent);

    return ranking;

}


// ======================================================
// SIEGER ANZEIGEN
// ======================================================

function displayWinner(winner) {

    winnerCard.style.background = winner.color;

    winnerName.textContent = winner.name;

    winnerPercent.textContent =
        winner.percent + " % Übereinstimmung";

    winnerDescription.textContent =
        winner.shortDescription;

}


// ======================================================
// RANKING ANZEIGEN
// ======================================================

function displayRanking(ranking) {

    rankingList.innerHTML = "";

    ranking.forEach(entry => {

        const item = document.createElement("div");
        item.className = "ranking-item";

        item.innerHTML = `

            <div class="ranking-label">

                <strong>${entry.name}</strong>

                <span>${entry.percent} %</span>

            </div>

            <div class="bar">

                <div
                    class="bar-fill"
                    style="
                        width:${entry.percent}%;
                        background:${entry.color};
                    ">
                </div>

            </div>

        `;

        item.addEventListener("click", () => {

            openProfile(entry.id);

        });

        rankingList.appendChild(item);

    });

}// ======================================================
// PROFILSEITE
// ======================================================

const profileTitle = document.getElementById("profile-title");
const profileContent = document.getElementById("profile-content");
const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");

let currentProfile = null;


// ======================================================
// PROFIL ÖFFNEN
// ======================================================

function openProfile(id) {

    currentProfile = id;

    const faction = factions[id];

    resultScreen.classList.add("hidden");
    profileScreen.classList.remove("hidden");

    profileTitle.textContent = faction.name;

    profileContent.innerHTML = `

        <p>${faction.description}</p>

        <h3>Politische Positionen</h3>

        <ul>

            ${faction.positions
                .map(position => `<li>${position}</li>`)
                .join("")}

        </ul>

    `;

}


// ======================================================
// ZURÜCK ZUM ERGEBNIS
// ======================================================

backBtn.addEventListener("click", () => {

    profileScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

});


// ======================================================
// QUIZ NEU STARTEN
// ======================================================

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {

    resetScores();

    state.currentQuestion = 0;

    progress.style.width = "0%";

    resultScreen.classList.add("hidden");
    profileScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

}


// ======================================================
// TASTATURSTEUERUNG
// ======================================================

document.addEventListener("keydown", event => {

    if (quizScreen.classList.contains("hidden")) {

        return;

    }

    switch (event.key) {

        case "1":
        case "ArrowLeft":
            answerQuestion(-1);
            break;

        case "2":
        case "ArrowDown":
            answerQuestion(0);
            break;

        case "3":
        case "ArrowRight":
            answerQuestion(1);
            break;

    }

});


// ======================================================
// INITIALISIERUNG
// ======================================================

progress.style.width = "0%";

questionCounter.textContent =
    `Frage 1 von ${questions.length}`;