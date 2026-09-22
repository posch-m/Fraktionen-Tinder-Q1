/*
=========================================================
FraktionsFinder 1848
script.js – Version 5.1
=========================================================
*/

"use strict";


/* =======================================================
   APP-ZUSTAND
======================================================= */

const app = {
    questionIndex: 0,
    answers: [],
    results: [],
    winner: null,
    locked: false,
    running: false
};


/* =======================================================
   DOM
======================================================= */

function $(id) {
    return document.getElementById(id);
}

const el = {
    startScreen: $("start-screen"),
    quizScreen: $("quiz-screen"),
    resultScreen: $("result-screen"),
    profileScreen: $("profile-screen"),

    startBtn: $("start-btn"),
    restartBtn: $("restart-btn"),
    backBtn: $("back-btn"),

    questionText: $("question-text"),
    questionCounter: $("question-counter"),
    progress: $("progress"),

    yesBtn: $("btn-yes"),
    neutralBtn: $("btn-neutral"),
    noBtn: $("btn-no"),

    wingCard: $("wing-card"),
    wingName: $("wing-name"),
    wingDescription: $("wing-description"),

    axisCard: $("axis-card"),
    politicalAxis: $("political-axis"),

    winnerCard: $("winner-card"),
    winnerName: $("winner-name"),
    winnerPercent: $("winner-percent"),
    winnerDescription: $("winner-description"),

    historyCard: $("history-card"),
    historyText: $("history-text"),

    rankingList: $("ranking-list"),

    profileTitle: $("profile-title"),
    profileContent: $("profile-content")
};


/* =======================================================
   VALIDIERUNG
======================================================= */

function dataIsAvailable() {
    return (
        typeof questions !== "undefined" &&
        Array.isArray(questions) &&
        questions.length > 0 &&
        typeof factions !== "undefined" &&
        factions !== null &&
        typeof factions === "object" &&
        Object.keys(factions).length > 0
    );
}


/* =======================================================
   SCREEN-MANAGEMENT
======================================================= */

function showScreen(screen) {

    [
        el.startScreen,
        el.quizScreen,
        el.resultScreen,
        el.profileScreen
    ].forEach(item => {

        if (item) {
            item.classList.add("hidden");
        }

    });

    if (screen) {
        screen.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =======================================================
   START
======================================================= */

function startQuiz() {

    app.questionIndex = 0;
    app.answers = [];
    app.results = [];
    app.winner = null;
    app.locked = false;
    app.running = true;

    clearResults();

    showScreen(el.quizScreen);
    loadQuestion();
}


/* =======================================================
   FRAGE LADEN
======================================================= */

function loadQuestion() {

    const question = questions[app.questionIndex];

    if (!question) {
        finishQuiz();
        return;
    }

    el.questionText.textContent = question.text;

    el.questionCounter.textContent =
        `Frage ${app.questionIndex + 1} von ${questions.length}`;

    const progress =
        app.questionIndex / questions.length * 100;

    el.progress.style.width = `${progress}%`;

    setButtonsEnabled(true);

    app.locked = false;
}


/* =======================================================
   ANTWORT
======================================================= */

function answer(value) {

    if (!app.running || app.locked) {
        return;
    }

    app.locked = true;

    setButtonsEnabled(false);

    app.answers[app.questionIndex] = value;

    const button =
        value === 1
            ? el.yesBtn
            : value === 0
                ? el.neutralBtn
                : el.noBtn;

    animateButton(button);

    window.setTimeout(() => {

        app.questionIndex++;

        if (app.questionIndex >= questions.length) {
            finishQuiz();
        } else {
            loadQuestion();
        }

    }, 220);
}


/* =======================================================
   BUTTONS
======================================================= */

function setButtonsEnabled(enabled) {

    el.yesBtn.disabled = !enabled;
    el.neutralBtn.disabled = !enabled;
    el.noBtn.disabled = !enabled;
}


function animateButton(button) {

    if (!button || !button.animate) {
        return;
    }

    button.animate(
        [
            { transform: "scale(1)" },
            { transform: "scale(.96)" },
            { transform: "scale(1)" }
        ],
        {
            duration: 180,
            easing: "ease-out"
        }
    );
}


/* =======================================================
   QUIZ ENDE
======================================================= */

function finishQuiz() {

    app.running = false;

    el.progress.style.width = "100%";

    calculateResults();

    if (!app.winner) {
        return;
    }

    renderWing();
    renderAxis();
    renderWinner();
    renderHistory();
    renderRanking();

    showScreen(el.resultScreen);
}


/* =======================================================
   MATCHING
======================================================= */

/*
Antwort:
+1 = Zustimmung
 0 = neutral
-1 = Ablehnung

Fraktionsgewicht:
+3 = starke Zustimmung
+2 = deutliche Zustimmung
+1 = leichte Zustimmung
 0 = keine klare Position
-1 = leichte Ablehnung
-2 = deutliche Ablehnung
-3 = starke Ablehnung
*/


function calculateResults() {

    const keys = Object.keys(factions);

    app.results = keys.map(key => {

        const result = calculateFaction(key);

        return {
            key,
            faction: factions[key],
            percent: result.percent,
            score: result.score
        };

    });

    app.results.sort((a, b) => {

        if (b.percent !== a.percent) {
            return b.percent - a.percent;
        }

        return b.score - a.score;
    });

    app.winner = app.results[0] || null;
}


/* =======================================================
   FRAKTIONSBERECHNUNG
======================================================= */

function calculateFaction(key) {

    let totalMatch = 0;
    let totalImportance = 0;

    questions.forEach((question, index) => {

        const answerValue = normalizeAnswer(
            app.answers[index]
        );

        const factionValue = Number(
            question.weights[key] ?? 0
        );

        const importance = Math.abs(factionValue);

        if (importance === 0) {
            return;
        }

        /*
         * Positive Fraktionsposition:
         * Zustimmung passt.
         *
         * Negative Fraktionsposition:
         * Ablehnung passt.
         *
         * Neutral liegt jeweils genau dazwischen.
         */

        const agreement = factionValue > 0
            ? (answerValue + 1) / 2
            : (1 - answerValue) / 2;

        totalMatch += agreement * importance;
        totalImportance += importance;

    });

    if (totalImportance === 0) {

        return {
            percent: 0,
            score: 0
        };

    }

    return {
        percent: Math.round(
            totalMatch / totalImportance * 100
        ),
        score: totalMatch
    };
}


function normalizeAnswer(value) {

    if (value === 1 || value === "1") {
        return 1;
    }

    if (value === -1 || value === "-1") {
        return -1;
    }

    return 0;
}


/* =======================================================
   POLITISCHER FLÜGEL
======================================================= */

function renderWing() {

    const result = app.winner;
    const faction = result.faction;

    if (el.wingName) {

        el.wingName.textContent =
            faction.wing ||
            faction.ideology ||
            faction.name;

        el.wingName.style.color =
            faction.color;
    }

    if (el.wingDescription) {

        el.wingDescription.textContent =
            `${faction.name} wird dem ${faction.wing || "politischen Spektrum"} zugeordnet. ` +
            `Die im FraktionsFinder hinterlegte ideologische Einordnung lautet ` +
            `"${faction.ideology || "keine nähere Angabe"}". ` +
            `Deine Übereinstimmung mit dieser Fraktion beträgt ${result.percent} %.`;

        el.wingDescription.style.color =
            "#2b2b2b";
    }

    if (el.wingCard) {

        el.wingCard.style.background =
            "linear-gradient(135deg,#f7f7f7,#ececec)";

        el.wingCard.style.color =
            "#2b2b2b";

        el.wingCard.style.borderTop =
            `6px solid ${faction.color}`;
    }
}


/* =======================================================
   POLITISCHE ACHSE
======================================================= */

/*
Historische Reihenfolge:

Donnersberg
→ Deutscher Hof
→ Westendhall
→ Württemberger Hof
→ Augsburger Hof
→ Landsberg
→ Casino
→ Café Milani
*/

const axisPositions = {

    donnersberg: 5,

    deutscherhof: 20,

    westendhall: 35,

    wuerttembergerhof: 48,

    augsburgerhof: 60,

    landsberg: 73,

    casino: 87,

    cafemilani: 98

};


function renderAxis() {

    if (!el.politicalAxis) {
        return;
    }

    let sum = 0;
    let weight = 0;

    app.results.forEach(result => {

        const position =
            axisPositions[result.key];

        if (typeof position !== "number") {
            return;
        }

        /*
         * Die Übereinstimmung der Fraktionen
         * bestimmt, wie stark sie die eigene
         * Position auf der Achse beeinflussen.
         */

        const resultWeight =
            Math.max(result.percent, 1);

        sum += position * resultWeight;
        weight += resultWeight;

    });

    const position =
        weight > 0
            ? clamp(
                Math.round(sum / weight),
                5,
                98
            )
            : 50;

    const label =
        axisLabel(position);


    el.politicalAxis.innerHTML = `

        <div class="axis">

            <div class="axis-radikal"></div>

            <div class="axis-demokratisch"></div>

            <div class="axis-liberal"></div>

            <div class="axis-konservativ"></div>

        </div>


        <div class="axis-labels">

            <span>Äußerste Linke</span>

            <span>Demokratische Linke</span>

            <span>Liberales Zentrum</span>

            <span>Rechtskonservativ</span>

        </div>


        <div
            class="axis-marker"
            style="left:${position}%"
        >

            <span>
                ${escapeHTML(label)}
            </span>

        </div>

    `;


    if (el.axisCard) {

        el.axisCard.style.backgroundColor =
            "#f7f7f7";

        el.axisCard.style.color =
            "#2b2b2b";
    }
}


/* =======================================================
   BEZEICHNUNG DER POLITISCHEN POSITION
======================================================= */

function axisLabel(position) {

    if (position < 13) {
        return "Äußerste Linke / radikaldemokratisch";
    }

    if (position < 28) {
        return "Demokratische Linke";
    }

    if (position < 42) {
        return "Gemäßigte Linke";
    }

    if (position < 54) {
        return "Linkes Zentrum / linksliberal";
    }

    if (position < 67) {
        return "Gemäßigt liberal / Mitte-rechts";
    }

    if (position < 80) {
        return "Liberales rechtes Zentrum";
    }

    if (position < 93) {
        return "Rechtes Zentrum / rechtsliberal";
    }

    return "Rechtskonservativ";
}


/* =======================================================
   SIEGER
======================================================= */

function renderWinner() {

    const result = app.winner;
    const faction = result.faction;

    el.winnerName.textContent =
        faction.name;

    el.winnerPercent.textContent =
        `${result.percent} % Übereinstimmung`;

    el.winnerDescription.textContent =
        faction.shortDescription;

    el.winnerCard.style.backgroundColor =
        faction.color;

    el.winnerCard.style.color =
        readableTextColor(faction.color);

    el.winnerName.style.color =
        readableTextColor(faction.color);

    el.winnerPercent.style.color =
        readableTextColor(faction.color);

    el.winnerDescription.style.color =
        readableTextColor(faction.color);
}


/* =======================================================
   HISTORISCHE EINORDNUNG
======================================================= */

function renderHistory() {

    const result = app.winner;
    const faction = result.faction;

    if (!el.historyText) {
        return;
    }

    const positions =
        Array.isArray(faction.positions)
            ? faction.positions.slice(0, 4)
            : [];

    const representatives =
        Array.isArray(faction.representatives)
            ? faction.representatives.slice(0, 3)
            : [];

    let text =
        `Deine größte Übereinstimmung besteht mit der Fraktion ` +
        `${faction.name} (${result.percent} %). `;

    text += faction.description;

    if (positions.length) {

        text +=
            ` Zu den im FraktionsFinder hinterlegten zentralen ` +
            `Positionen gehören ${positions.join(", ")}.`;
    }

    if (representatives.length) {

        text +=
            ` Als Vertreter sind unter anderem ` +
            `${representatives.join(", ")} angegeben.`;
    }

    el.historyText.textContent =
        text;

    el.historyText.style.color =
        "#2b2b2b";

    if (el.historyCard) {

        el.historyCard.style.backgroundColor =
            "#faf8f2";

        el.historyCard.style.color =
            "#2b2b2b";

        el.historyCard.style.borderLeftColor =
            faction.color;
    }
}


/* =======================================================
   RANKING
======================================================= */

function renderRanking() {

    el.rankingList.innerHTML = "";

    app.results.forEach((result, index) => {

        const item =
            document.createElement("div");

        item.className =
            "ranking-item";

        item.tabIndex = 0;


        const label =
            document.createElement("div");

        label.className =
            "ranking-label";


        const name =
            document.createElement("strong");

        name.textContent =
            `${index + 1}. ${result.faction.name}`;


        const percent =
            document.createElement("span");

        percent.textContent =
            `${result.percent} %`;


        label.appendChild(name);
        label.appendChild(percent);


        const bar =
            document.createElement("div");

        bar.className =
            "bar";


        const fill =
            document.createElement("div");

        fill.className =
            "bar-fill";

        fill.style.backgroundColor =
            result.faction.color;

        fill.style.width =
            "0%";


        bar.appendChild(fill);

        item.appendChild(label);

        item.appendChild(bar);


        item.addEventListener(
            "click",
            () => {
                openProfile(result.key);
            }
        );


        item.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openProfile(result.key);
                }

            }
        );


        el.rankingList.appendChild(item);


        window.setTimeout(() => {

            fill.style.width =
                `${result.percent}%`;

        }, 50 + index * 70);

    });
}


/* =======================================================
   PROFIL
======================================================= */

function openProfile(key) {

    const faction =
        factions[key];

    if (!faction) {
        return;
    }

    el.profileTitle.textContent =
        faction.name;

    el.profileTitle.style.color =
        faction.color;


    const representatives =
        Array.isArray(faction.representatives)
            ? faction.representatives
            : [];


    const positions =
        Array.isArray(faction.positions)
            ? faction.positions
            : [];


    el.profileContent.innerHTML = `

        <p>
            <strong>Politische Einordnung:</strong>
            ${escapeHTML(faction.wing || "")}
        </p>

        <p>
            <strong>Ideologie:</strong>
            ${escapeHTML(faction.ideology || "")}
        </p>

        <h3>Beschreibung</h3>

        <p>
            ${escapeHTML(faction.description || "")}
        </p>

        <h3>Bekannte Vertreter</h3>

        <ul>
            ${
                representatives
                    .map(
                        person =>
                            `<li>${escapeHTML(person)}</li>`
                    )
                    .join("")
            }
        </ul>

        <h3>Typische Positionen</h3>

        <ul>
            ${
                positions
                    .map(
                        position =>
                            `<li>${escapeHTML(position)}</li>`
                    )
                    .join("")
            }
        </ul>

    `;

    showScreen(el.profileScreen);
}


/* =======================================================
   ZURÜCK
======================================================= */

function backToResults() {
    showScreen(el.resultScreen);
}


/* =======================================================
   NEUSTART
======================================================= */

function restartQuiz() {

    app.questionIndex = 0;
    app.answers = [];
    app.results = [];
    app.winner = null;
    app.running = false;
    app.locked = false;

    clearResults();

    showScreen(el.startScreen);
}


/* =======================================================
   ERGEBNISSE LEEREN
======================================================= */

function clearResults() {

    if (el.wingName) {
        el.wingName.textContent = "";
    }

    if (el.wingDescription) {
        el.wingDescription.textContent = "";
    }

    if (el.politicalAxis) {
        el.politicalAxis.innerHTML = "";
    }

    if (el.winnerName) {
        el.winnerName.textContent = "";
    }

    if (el.winnerPercent) {
        el.winnerPercent.textContent = "";
    }

    if (el.winnerDescription) {
        el.winnerDescription.textContent = "";
    }

    if (el.historyText) {
        el.historyText.textContent = "";
    }

    if (el.rankingList) {
        el.rankingList.innerHTML = "";
    }
}


/* =======================================================
   HILFSFUNKTIONEN
======================================================= */

function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function readableTextColor(hex) {

    if (
        typeof hex !== "string" ||
        !/^#[0-9a-f]{6}$/i.test(hex)
    ) {
        return "#ffffff";
    }

    const r =
        parseInt(
            hex.slice(1, 3),
            16
        );

    const g =
        parseInt(
            hex.slice(3, 5),
            16
        );

    const b =
        parseInt(
            hex.slice(5, 7),
            16
        );

    const brightness =
        (r * 299 +
            g * 587 +
            b * 114) / 1000;

    return brightness > 155
        ? "#222222"
        : "#ffffff";
}


/* =======================================================
   KEYBOARD
======================================================= */

function keyboard(event) {

    if (
        !app.running ||
        app.locked
    ) {
        return;
    }

    switch (event.key) {

        case "1":
        case "ArrowLeft":
            answer(1);
            break;

        case "2":
        case "ArrowDown":
            answer(0);
            break;

        case "3":
        case "ArrowRight":
            answer(-1);
            break;
    }
}


/* =======================================================
   EVENTS
======================================================= */

function registerEvents() {

    el.startBtn.addEventListener(
        "click",
        startQuiz
    );

    el.restartBtn.addEventListener(
        "click",
        restartQuiz
    );

    el.backBtn.addEventListener(
        "click",
        backToResults
    );

    el.yesBtn.addEventListener(
        "click",
        () => answer(1)
    );

    el.neutralBtn.addEventListener(
        "click",
        () => answer(0)
    );

    el.noBtn.addEventListener(
        "click",
        () => answer(-1)
    );

    document.addEventListener(
        "keydown",
        keyboard
    );

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                !el.profileScreen.classList.contains("hidden")
            ) {
                backToResults();
            }

        }
    );
}


/* =======================================================
   STARTINITIALISIERUNG
======================================================= */

function init() {

    if (!dataIsAvailable()) {

        console.error(
            "FraktionsFinder: questions.js oder fraktionen.js fehlt."
        );

        return;
    }

    registerEvents();

    showScreen(el.startScreen);

    console.log(
        "FraktionsFinder 1848 – script.js v5.1 geladen."
    );
}


/* =======================================================
   ÖFFENTLICHE DEBUG-FUNKTIONEN
======================================================= */

window.FraktionsFinder = {

    getResults: () =>
        app.results,

    getWinner: () =>
        app.winner,

    getAnswers: () =>
        [...app.answers],

    renderWing,
    renderAxis,
    renderWinner,
    renderHistory,
    renderRanking
};


/* =======================================================
   START
======================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        { once: true }
    );

} else {

    init();

}