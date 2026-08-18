/*
=========================================================
FraktionsFinder 1848
script.js
Version 2.0
=========================================================

Diese Datei arbeitet mit:
- questions.js  -> const questions
- fraktionen.js -> const factions
- index.html    -> vorhandene IDs und Screens

Wichtig:
Die Auswertung verwendet keine künstliche "50-%-Basis" mehr.
Stattdessen wird die tatsächliche Nähe zwischen der Antwort
(-1 / 0 / +1) und der politischen Position der Fraktion
(-3 bis +3) berechnet.

Antworten:
+1 = Stimme zu
 0 = Neutral
-1 = Stimme nicht zu
=========================================================
*/

"use strict";

/* =======================================================
   KONFIGURATION
======================================================= */

const APP_CONFIG = {
    version: "2.0",
    animationDuration: 260,
    resultAnimationDuration: 900,
    storageKey: "fraktionsfinder1848-last-result",
    enableLocalStorage: true,
    enableKeyboard: true
};


/* =======================================================
   DOM-ELEMENTE
======================================================= */

const DOM = {
    startScreen: document.getElementById("start-screen"),
    quizScreen: document.getElementById("quiz-screen"),
    resultScreen: document.getElementById("result-screen"),
    profileScreen: document.getElementById("profile-screen"),

    startButton: document.getElementById("start-btn"),
    restartButton: document.getElementById("restart-btn"),
    backButton: document.getElementById("back-btn"),

    questionText: document.getElementById("question-text"),
    questionCounter: document.getElementById("question-counter"),
    progress: document.getElementById("progress"),

    yesButton: document.getElementById("btn-yes"),
    neutralButton: document.getElementById("btn-neutral"),
    noButton: document.getElementById("btn-no"),

    winnerCard: document.getElementById("winner-card"),
    winnerName: document.getElementById("winner-name"),
    winnerPercent: document.getElementById("winner-percent"),
    winnerDescription: document.getElementById("winner-description"),

    wingCard: document.getElementById("wing-card"),
    wingName: document.getElementById("wing-name"),
    wingDescription: document.getElementById("wing-description"),

    politicalAxis: document.getElementById("political-axis"),
    axisCard: document.getElementById("axis-card"),

    historyCard: document.getElementById("history-card"),
    historyText: document.getElementById("history-text"),

    rankingList: document.getElementById("ranking-list"),

    profileTitle: document.getElementById("profile-title"),
    profileContent: document.getElementById("profile-content")
};


/* =======================================================
   ANWENDUNGSZUSTAND
======================================================= */

const state = {
    currentQuestion: 0,
    answers: [],
    results: [],
    winner: null,
    isRunning: false,
    isLocked: false,
    lastScreen: null
};


/* =======================================================
   FRAGE- UND FRAKTIONSDATEN PRÜFEN
======================================================= */

function validateData() {
    const errors = [];

    if (
        typeof questions === "undefined" ||
        !Array.isArray(questions) ||
        questions.length === 0
    ) {
        errors.push("questions.js wurde nicht korrekt geladen.");
    }

    if (
        typeof factions === "undefined" ||
        typeof factions !== "object" ||
        factions === null ||
        Object.keys(factions).length === 0
    ) {
        errors.push("fraktionen.js wurde nicht korrekt geladen.");
    }

    if (
        typeof questions !== "undefined" &&
        Array.isArray(questions)
    ) {
        questions.forEach((question, index) => {
            if (!question || typeof question.text !== "string") {
                errors.push(`Frage ${index + 1} besitzt keinen gültigen Text.`);
            }

            if (!question || typeof question.weights !== "object") {
                errors.push(`Frage ${index + 1} besitzt keine gültigen weights.`);
            }
        });
    }

    if (
        typeof factions !== "undefined" &&
        typeof factions === "object" &&
        factions !== null
    ) {
        Object.keys(factions).forEach(key => {
            const faction = factions[key];

            if (!faction.name) {
                errors.push(`Fraktion "${key}" besitzt keinen Namen.`);
            }

            if (!faction.color) {
                errors.push(`Fraktion "${key}" besitzt keine Farbe.`);
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}


/* =======================================================
   HILFSFUNKTION: DOM
======================================================= */

function domAvailable() {
    return Object.values(DOM).every(element => element !== null);
}


/* =======================================================
   SCREEN-MANAGEMENT
======================================================= */

function hideAllScreens() {
    DOM.startScreen.classList.add("hidden");
    DOM.quizScreen.classList.add("hidden");
    DOM.resultScreen.classList.add("hidden");
    DOM.profileScreen.classList.add("hidden");
}


function showScreen(screen) {
    if (!screen) {
        return;
    }

    state.lastScreen = screen;

    hideAllScreens();

    screen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =======================================================
   QUIZ INITIALISIEREN
======================================================= */

function resetState() {
    state.currentQuestion = 0;
    state.answers = [];
    state.results = [];
    state.winner = null;
    state.isRunning = false;
    state.isLocked = false;
}


/* =======================================================
   QUIZ STARTEN
======================================================= */

function startQuiz() {
    resetState();

    state.isRunning = true;

    clearResultScreen();

    showScreen(DOM.quizScreen);

    updateProgress(0);

    loadQuestion(0);

    focusAnswerButtons();
}


/* =======================================================
   FRAGE LADEN
======================================================= */

function loadQuestion(index) {
    if (!Array.isArray(questions) || !questions[index]) {
        finishQuiz();
        return;
    }

    state.currentQuestion = index;

    const question = questions[index];

    animateQuestionChange(() => {
        DOM.questionText.textContent = question.text;
    });

    updateQuestionCounter();

    updateProgress(index / questions.length);

    enableAnswerButtons();
}


/* =======================================================
   FRAGENANIMATION
======================================================= */

function animateQuestionChange(callback) {
    DOM.questionText.style.opacity = "0";

    window.setTimeout(() => {
        callback();

        requestAnimationFrame(() => {
            DOM.questionText.style.opacity = "1";
        });
    }, 120);
}


/* =======================================================
   FRAGEZÄHLER
======================================================= */

function updateQuestionCounter() {
    const number = state.currentQuestion + 1;
    const total = questions.length;

    DOM.questionCounter.textContent = `Frage ${number} von ${total}`;
}


/* =======================================================
   FORTSCHRITTSBALKEN
======================================================= */

function updateProgress(fraction) {
    const safeFraction = Math.max(0, Math.min(1, fraction));

    DOM.progress.style.width = `${safeFraction * 100}%`;
}


/* =======================================================
   ANTWORTBUTTONS
======================================================= */

function enableAnswerButtons() {
    state.isLocked = false;

    DOM.yesButton.disabled = false;
    DOM.neutralButton.disabled = false;
    DOM.noButton.disabled = false;
}


function disableAnswerButtons() {
    state.isLocked = true;

    DOM.yesButton.disabled = true;
    DOM.neutralButton.disabled = true;
    DOM.noButton.disabled = true;
}


function focusAnswerButtons() {
    window.setTimeout(() => {
        DOM.yesButton.focus();
    }, 250);
}


/* =======================================================
   ANTWORT VERARBEITEN
======================================================= */

function submitAnswer(value, button) {
    if (!state.isRunning || state.isLocked) {
        return;
    }

    disableAnswerButtons();

    animateAnswer(button);

    state.answers[state.currentQuestion] = value;

    window.setTimeout(() => {
        const nextIndex = state.currentQuestion + 1;

        if (nextIndex >= questions.length) {
            finishQuiz();
        } else {
            loadQuestion(nextIndex);
            focusAnswerButtons();
        }
    }, APP_CONFIG.animationDuration);
}


/* =======================================================
   ANTWORTANIMATION
======================================================= */

function animateAnswer(button) {
    if (!button || typeof button.animate !== "function") {
        return;
    }

    button.animate(
        [
            {
                transform: "scale(1)",
                opacity: "1"
            },
            {
                transform: "scale(0.97)",
                opacity: "0.82"
            },
            {
                transform: "scale(1)",
                opacity: "1"
            }
        ],
        {
            duration: 220,
            easing: "ease-out"
        }
    );
}


/* =======================================================
   QUIZ BEENDEN
======================================================= */

function finishQuiz() {
    state.isRunning = false;

    disableAnswerButtons();

    updateProgress(1);

    calculateResults();

    renderResults();

    saveLastResult();

    window.setTimeout(() => {
        showScreen(DOM.resultScreen);
        animateWinnerCard();
    }, 180);
}


/* =======================================================
   NEUE MATCH-BERECHNUNG
=======================================================

   Die Gewichte in questions.js liegen zwischen -3 und +3.

   -3 = starke Ablehnung der Aussage
   -2 = deutliche Ablehnung
   -1 = leichte Ablehnung
    0 = keine klare Position
   +1 = leichte Zustimmung
   +2 = deutliche Zustimmung
   +3 = starke Zustimmung

   Die Antwort des Nutzers wird auf -1 / 0 / +1 normiert.

   Für jede Frage wird anschließend die Distanz zwischen
   Nutzerposition und Fraktionsposition berechnet.

   Das Ergebnis ist eine echte Übereinstimmung:
   100 % = sehr gute Übereinstimmung
    50 % = mittlere Übereinstimmung
     0 % = maximale Gegensätzlichkeit

   Anders als die alte Formel entsteht 50 % NICHT mehr
   automatisch aus dem Rohscore jeder Fraktion.
======================================================= */

function calculateResults() {
    const factionKeys = Object.keys(factions);

    const results = factionKeys.map(key => {
        const faction = factions[key];

        const calculation = calculateFactionMatch(key);

        return {
            key,
            faction,
            score: calculation.score,
            percent: calculation.percent,
            answeredWeight: calculation.answeredWeight
        };
    });

    results.sort(compareResults);

    state.results = results;
    state.winner = results[0] || null;
}


/* =======================================================
   MATCH EINER FRAKTION
======================================================= */

function calculateFactionMatch(factionKey) {
    let weightedMatch = 0;
    let totalWeight = 0;

    questions.forEach((question, index) => {
        const answer = normalizeAnswer(state.answers[index]);
        const factionWeight = Number(question.weights[factionKey] ?? 0);

        const importance = Math.abs(factionWeight);

        if (importance === 0) {
            return;
        }

        const normalizedFactionPosition = factionWeight / 3;

        /*
         * Distanz:
         * Antwort +1 und Fraktion +1  -> 0 Distanz
         * Antwort -1 und Fraktion -1  -> 0 Distanz
         * Antwort  0                  -> mittlere Distanz
         * gegensätzliche Position     -> hohe Distanz
         */
        const distance = Math.abs(
            answer - normalizedFactionPosition
        ) / 2;

        const match = 1 - distance;

        weightedMatch += match * importance;
        totalWeight += importance;
    });

    if (totalWeight === 0) {
        return {
            score: 0,
            percent: 50,
            answeredWeight: 0
        };
    }

    const percent = Math.round(
        (weightedMatch / totalWeight) * 100
    );

    return {
        score: weightedMatch,
        percent: clamp(percent, 0, 100),
        answeredWeight: totalWeight
    };
}


/* =======================================================
   ANTWORT NORMALISIEREN
======================================================= */

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
   ERGEBNIS-SORTIERUNG
======================================================= */

function compareResults(a, b) {
    if (b.percent !== a.percent) {
        return b.percent - a.percent;
    }

    return b.score - a.score;
}


/* =======================================================
   ERGEBNISSE DARSTELLEN
======================================================= */

function renderResults() {
    if (!state.winner) {
        return;
    }

    renderWing(state.winner);
    renderPoliticalAxis(state.results);
    renderWinner(state.winner);
    renderHistory(state.winner);
    renderRanking(state.results);
}


/* =======================================================
   POLITISCHER FLÜGEL
======================================================= */

function renderWing(result) {
    if (!DOM.wingName || !DOM.wingDescription) {
        return;
    }

    const faction = result.faction;

    DOM.wingName.textContent = faction.wing || faction.ideology || faction.name;

    DOM.wingDescription.textContent =
        buildWingDescription(faction, result);

    if (DOM.wingCard) {
        DOM.wingCard.style.borderTop =
            `6px solid ${faction.color}`;
    }
}


function buildWingDescription(faction, result) {
    const wing = faction.wing || "politische Gruppierung";
    const ideology = faction.ideology || "ohne nähere ideologische Bezeichnung";

    return `Dein Ergebnis ordnet dich dem ${wing} zu. Deine stärkste Übereinstimmung besteht mit ${faction.name} (${result.percent} %). Die Fraktion wird im FraktionsFinder als ${ideology} eingeordnet.`;
}


/* =======================================================
   POLITISCHE ACHSE
======================================================= */

/*
 * Die Achse dient ausschließlich der visuellen Einordnung
 * innerhalb der acht im FraktionsFinder verwendeten
 * Fraktionen. Sie ist keine historische Messskala.
 */
const AXIS_POSITIONS = {
    donnersberg: 8,
    deutscherhof: 22,
    westendhall: 37,
    augsburgerhof: 50,
    cafemilani: 62,
    landsberg: 72,
    wuerttembergerhof: 84,
    casino: 94
};


function calculateAxisPosition(results) {
    let numerator = 0;
    let denominator = 0;

    results.forEach(result => {
        const position = AXIS_POSITIONS[result.key];

        if (typeof position !== "number") {
            return;
        }

        const weight = Math.max(result.percent, 1);

        numerator += position * weight;
        denominator += weight;
    });

    if (denominator === 0) {
        return 50;
    }

    return clamp(
        Math.round(numerator / denominator),
        5,
        95
    );
}


function getAxisLabel(position) {
    if (position < 20) {
        return "radikaldemokratisch";
    }

    if (position < 42) {
        return "demokratisch";
    }

    if (position < 65) {
        return "liberal-demokratisch";
    }

    if (position < 82) {
        return "liberal-konservativ";
    }

    return "konservativ-liberal";
}


function renderPoliticalAxis(results) {
    if (!DOM.politicalAxis) {
        return;
    }

    const position = calculateAxisPosition(results);
    const label = getAxisLabel(position);

    DOM.politicalAxis.innerHTML = `
        <div class="axis">
            <div class="axis-radikal"></div>
            <div class="axis-demokratisch"></div>
            <div class="axis-liberal"></div>
            <div class="axis-konservativ"></div>
        </div>

        <div class="axis-labels">
            <span>Radikaldemokratisch</span>
            <span>Demokratisch</span>
            <span>Liberal</span>
            <span>Konservativ</span>
        </div>

        <div
            class="axis-marker"
            style="left:${position}%"
            aria-label="Einordnung: ${escapeHTML(label)}"
        >
            <span>${escapeHTML(label)}</span>
        </div>
    `;

    if (DOM.axisCard) {
        DOM.axisCard.dataset.axisPosition = String(position);
    }
}


/* =======================================================
   HISTORISCHE EINORDNUNG
======================================================= */

function renderHistory(result) {
    if (!DOM.historyText) {
        return;
    }

    const faction = result.faction;

    DOM.historyText.textContent =
        buildHistoryText(faction, result);

    if (DOM.historyCard) {
        DOM.historyCard.style.borderLeftColor =
            faction.color;
    }
}


function buildHistoryText(faction, result) {
    const representatives =
        Array.isArray(faction.representatives) &&
        faction.representatives.length
            ? faction.representatives.slice(0, 3).join(", ")
            : "verschiedene Abgeordnete";

    const positions =
        Array.isArray(faction.positions) &&
        faction.positions.length
            ? faction.positions.slice(0, 3).join(", ")
            : "ihre politischen Ziele";

    return `Dein Ergebnis weist die größte Übereinstimmung mit der Fraktion ${faction.name} auf (${result.percent} %). ${faction.description} Zu den im FraktionsFinder hinterlegten zentralen Positionen gehören insbesondere ${positions}. Als Vertreter sind unter anderem ${representatives} angegeben.`;
}


/* =======================================================
   SIEGERKARTE
======================================================= */

function renderWinner(result) {
    const faction = result.faction;

    DOM.winnerName.textContent = faction.name;

    DOM.winnerPercent.textContent =
        `${result.percent} % Übereinstimmung`;

    DOM.winnerDescription.textContent =
        faction.shortDescription;

    /*
     * Die Farbe wird direkt gesetzt.
     * Zusätzlich werden Farbvariablen gesetzt, damit
     * zukünftige CSS-Regeln die Fraktionsfarbe verwenden
     * können.
     */
    DOM.winnerCard.style.backgroundColor = faction.color;
    DOM.winnerCard.style.color = getReadableTextColor(
        faction.color
    );

    DOM.winnerCard.dataset.faction = result.key;
}


/* =======================================================
   SIEGERANIMATION
======================================================= */

function animateWinnerCard() {
    if (!DOM.winnerCard || typeof DOM.winnerCard.animate !== "function") {
        return;
    }

    DOM.winnerCard.animate(
        [
            {
                opacity: 0,
                transform: "translateY(12px) scale(0.98)"
            },
            {
                opacity: 1,
                transform: "translateY(0) scale(1)"
            }
        ],
        {
            duration: APP_CONFIG.resultAnimationDuration,
            easing: "cubic-bezier(.2,.8,.2,1)"
        }
    );
}


/* =======================================================
   RANKING DARSTELLEN
======================================================= */

function renderRanking(results) {
    DOM.rankingList.innerHTML = "";

    results.forEach((result, index) => {
        const item = createRankingItem(result, index);

        DOM.rankingList.appendChild(item);
    });
}


/* =======================================================
   RANKING-ELEMENT
======================================================= */

function createRankingItem(result, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "ranking-item";
    wrapper.dataset.faction = result.key;
    wrapper.setAttribute("role", "button");
    wrapper.setAttribute(
        "aria-label",
        `${result.faction.name}: ${result.percent} Prozent Übereinstimmung`
    );
    wrapper.tabIndex = 0;

    const label = document.createElement("div");
    label.className = "ranking-label";

    const name = document.createElement("strong");
    name.textContent = `${index + 1}. ${result.faction.name}`;

    const percent = document.createElement("span");
    percent.textContent = `${result.percent} %`;

    label.appendChild(name);
    label.appendChild(percent);

    const bar = document.createElement("div");
    bar.className = "bar";

    const fill = document.createElement("div");
    fill.className = "bar-fill";

    fill.style.backgroundColor = result.faction.color;
    fill.style.width = "0%";

    bar.appendChild(fill);

    wrapper.appendChild(label);
    wrapper.appendChild(bar);

    wrapper.addEventListener("click", () => {
        openProfile(result.key);
    });

    wrapper.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile(result.key);
        }
    });

    window.setTimeout(() => {
        requestAnimationFrame(() => {
            fill.style.width = `${result.percent}%`;
        });
    }, 60 + index * 70);

    return wrapper;
}


/* =======================================================
   FRAKTIONSPROFIL ÖFFNEN
======================================================= */

function openProfile(key) {
    const faction = factions[key];

    if (!faction) {
        return;
    }

    DOM.profileTitle.textContent = faction.name;

    DOM.profileTitle.style.color = faction.color;

    DOM.profileContent.innerHTML = buildProfileHTML(
        faction
    );

    showScreen(DOM.profileScreen);
}


/* =======================================================
   PROFIL HTML
======================================================= */

function buildProfileHTML(faction) {
    const representatives = Array.isArray(
        faction.representatives
    )
        ? faction.representatives
        : [];

    const positions = Array.isArray(faction.positions)
        ? faction.positions
        : [];

    const representativesHTML = representatives
        .map(person => `<li>${escapeHTML(person)}</li>`)
        .join("");

    const positionsHTML = positions
        .map(position => `<li>${escapeHTML(position)}</li>`)
        .join("");

    return `
        <p class="profile-ideology">
            <strong>Ideologische Einordnung:</strong>
            ${escapeHTML(faction.ideology || "Keine Angabe")}
        </p>

        <h3>Über die Fraktion</h3>

        <p>
            ${escapeHTML(faction.description || "")}
        </p>

        <h3>Bekannte Vertreter</h3>

        <ul>
            ${representativesHTML || "<li>Keine Angabe</li>"}
        </ul>

        <h3>Typische Positionen</h3>

        <ul>
            ${positionsHTML || "<li>Keine Angabe</li>"}
        </ul>
    `;
}


/* =======================================================
   ZURÜCK ZUM ERGEBNIS
======================================================= */

function backToResults() {
    if (!state.results.length) {
        showScreen(DOM.startScreen);
        return;
    }

    showScreen(DOM.resultScreen);
}


/* =======================================================
   QUIZ NEUSTARTEN
======================================================= */

function restartQuiz() {
    resetState();

    clearResultScreen();

    showScreen(DOM.startScreen);
}


/* =======================================================
   ERGEBNISSE ZURÜCKSETZEN
======================================================= */

function clearResultScreen() {
    DOM.winnerName.textContent = "";
    DOM.winnerPercent.textContent = "";
    DOM.winnerDescription.textContent = "";

    if (DOM.wingName) DOM.wingName.textContent = "";
    if (DOM.wingDescription) DOM.wingDescription.textContent = "";
    if (DOM.politicalAxis) DOM.politicalAxis.innerHTML = "";
    if (DOM.historyText) DOM.historyText.textContent = "";

    DOM.winnerCard.style.backgroundColor = "";
    DOM.winnerCard.style.color = "";

    DOM.rankingList.innerHTML = "";

    DOM.profileTitle.textContent = "";
    DOM.profileContent.innerHTML = "";

    DOM.progress.style.width = "0%";

    DOM.questionCounter.textContent =
        `Frage 1 von ${questions.length}`;
}


/* =======================================================
   KEYBOARD-STEUERUNG
======================================================= */

function handleKeyboard(event) {
    if (!APP_CONFIG.enableKeyboard) {
        return;
    }

    if (!state.isRunning) {
        return;
    }

    if (state.isLocked) {
        return;
    }

    switch (event.key) {
        case "1":
        case "ArrowLeft":
            submitAnswer(1, DOM.yesButton);
            break;

        case "2":
        case "ArrowDown":
            submitAnswer(0, DOM.neutralButton);
            break;

        case "3":
        case "ArrowRight":
            submitAnswer(-1, DOM.noButton);
            break;

        default:
            break;
    }
}


/* =======================================================
   LOCAL STORAGE
======================================================= */

function saveLastResult() {
    if (!APP_CONFIG.enableLocalStorage) {
        return;
    }

    if (!state.winner) {
        return;
    }

    try {
        const data = {
            timestamp: Date.now(),
            winnerKey: state.winner.key,
            winnerPercent: state.winner.percent,
            results: state.results.map(result => ({
                key: result.key,
                percent: result.percent
            }))
        };

        localStorage.setItem(
            APP_CONFIG.storageKey,
            JSON.stringify(data)
        );
    } catch (error) {
        console.warn(
            "Das letzte Ergebnis konnte nicht gespeichert werden.",
            error
        );
    }
}


/* =======================================================
   LETZTES ERGEBNIS LESEN
======================================================= */

function getLastResult() {
    if (!APP_CONFIG.enableLocalStorage) {
        return null;
    }

    try {
        const raw = localStorage.getItem(
            APP_CONFIG.storageKey
        );

        if (!raw) {
            return null;
        }

        return JSON.parse(raw);
    } catch (error) {
        console.warn(
            "Das gespeicherte Ergebnis konnte nicht gelesen werden.",
            error
        );

        return null;
    }
}


/* =======================================================
   LETZTES ERGEBNIS LÖSCHEN
======================================================= */

function clearLastResult() {
    if (!APP_CONFIG.enableLocalStorage) {
        return;
    }

    try {
        localStorage.removeItem(
            APP_CONFIG.storageKey
        );
    } catch (error) {
        console.warn(
            "Das gespeicherte Ergebnis konnte nicht gelöscht werden.",
            error
        );
    }
}


/* =======================================================
   FARBKONTRAST
======================================================= */

function getReadableTextColor(hexColor) {
    const rgb = hexToRGB(hexColor);

    if (!rgb) {
        return "#ffffff";
    }

    const luminance =
        (0.299 * rgb.r) +
        (0.587 * rgb.g) +
        (0.114 * rgb.b);

    return luminance > 160
        ? "#222222"
        : "#ffffff";
}


/* =======================================================
   HEX -> RGB
======================================================= */

function hexToRGB(hex) {
    if (typeof hex !== "string") {
        return null;
    }

    const clean = hex.replace("#", "");

    if (clean.length !== 6) {
        return null;
    }

    const value = parseInt(clean, 16);

    if (Number.isNaN(value)) {
        return null;
    }

    return {
        r: (value >> 16) & 255,
        g: (value >> 8) & 255,
        b: value & 255
    };
}


/* =======================================================
   HTML ESCAPEN
======================================================= */

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =======================================================
   ZAHL BEGRENZEN
======================================================= */

function clamp(value, min, max) {
    return Math.min(
        Math.max(value, min),
        max
    );
}


/* =======================================================
   ERGEBNIS-INFORMATIONEN
======================================================= */

function getWinner() {
    return state.winner;
}


function getResults() {
    return [...state.results];
}


function getAnswer(index) {
    return state.answers[index] ?? 0;
}


/* =======================================================
   DETAILLIERTE MATCH-INFORMATION
======================================================= */

function getQuestionMatch(questionIndex, factionKey) {
    const question = questions[questionIndex];

    if (!question || !factions[factionKey]) {
        return null;
    }

    const answer = normalizeAnswer(
        state.answers[questionIndex]
    );

    const factionWeight =
        Number(question.weights[factionKey] ?? 0);

    const normalizedFactionPosition =
        factionWeight / 3;

    const distance =
        Math.abs(
            answer - normalizedFactionPosition
        ) / 2;

    const match =
        1 - distance;

    return {
        answer,
        factionWeight,
        normalizedFactionPosition,
        match: Math.round(match * 100)
    };
}


/* =======================================================
   FRAGEN MIT STÄRKSTER AUSWIRKUNG
======================================================= */

function getMostImportantQuestions(factionKey) {
    if (!factions[factionKey]) {
        return [];
    }

    return questions
        .map((question, index) => ({
            index,
            text: question.text,
            importance: Math.abs(
                Number(question.weights[factionKey] ?? 0)
            )
        }))
        .filter(item => item.importance > 0)
        .sort((a, b) => b.importance - a.importance);
}


/* =======================================================
   PROFIL ÜBER RANKING ÖFFNEN
======================================================= */

function openTopProfile() {
    if (state.winner) {
        openProfile(state.winner.key);
    }
}


/* =======================================================
   EVENTS REGISTRIEREN
======================================================= */

function registerEvents() {
    DOM.startButton.addEventListener(
        "click",
        startQuiz
    );

    DOM.restartButton.addEventListener(
        "click",
        restartQuiz
    );

    DOM.backButton.addEventListener(
        "click",
        backToResults
    );

    DOM.yesButton.addEventListener(
        "click",
        () => submitAnswer(1, DOM.yesButton)
    );

    DOM.neutralButton.addEventListener(
        "click",
        () => submitAnswer(0, DOM.neutralButton)
    );

    DOM.noButton.addEventListener(
        "click",
        () => submitAnswer(-1, DOM.noButton)
    );

    document.addEventListener(
        "keydown",
        handleKeyboard
    );
}


/* =======================================================
   STARTSEITE-TASTATUR
======================================================= */

function handleStartKeyboard(event) {
    if (
        event.key === "Enter" &&
        !DOM.startScreen.classList.contains("hidden")
    ) {
        startQuiz();
    }
}


/* =======================================================
   ESC ZUM ZURÜCKKEHREN
======================================================= */

function handleEscape(event) {
    if (event.key !== "Escape") {
        return;
    }

    if (
        !DOM.profileScreen.classList.contains("hidden")
    ) {
        backToResults();
    }
}


/* =======================================================
   ACCESSIBILITY
======================================================= */

function improveAccessibility() {
    DOM.yesButton.setAttribute(
        "aria-label",
        "Ich stimme der Aussage zu"
    );

    DOM.neutralButton.setAttribute(
        "aria-label",
        "Ich bin bei der Aussage neutral"
    );

    DOM.noButton.setAttribute(
        "aria-label",
        "Ich stimme der Aussage nicht zu"
    );

    DOM.questionText.setAttribute(
        "aria-live",
        "polite"
    );

    DOM.winnerPercent.setAttribute(
        "aria-live",
        "polite"
    );

    DOM.rankingList.setAttribute(
        "aria-label",
        "Rangliste der Fraktionen"
    );
}


/* =======================================================
   FEHLERANZEIGE
======================================================= */

function showDataError(errors) {
    console.error(
        "FraktionsFinder konnte nicht vollständig gestartet werden:"
    );

    errors.forEach(error => {
        console.error(error);
    });

    if (DOM.questionText) {
        DOM.questionText.textContent =
            "Beim Laden des FraktionsFinders ist ein Fehler aufgetreten.";
    }
}


/* =======================================================
   STARTINITIALISIERUNG
======================================================= */

function initializeApp() {
    if (!domAvailable()) {
        console.error(
            "FraktionsFinder: Mindestens ein benötigtes HTML-Element fehlt."
        );
        return;
    }

    const validation = validateData();

    if (!validation.valid) {
        showDataError(validation.errors);
        return;
    }

    registerEvents();

    document.addEventListener(
        "keydown",
        handleStartKeyboard
    );

    document.addEventListener(
        "keydown",
        handleEscape
    );

    improveAccessibility();

    resetState();

    showScreen(DOM.startScreen);

    console.info(
        `FraktionsFinder 1848 v${APP_CONFIG.version} geladen.`
    );

    console.info(
        `${questions.length} Fragen und ${Object.keys(factions).length} Fraktionen erkannt.`
    );
}


/* =======================================================
   DEBUG-HILFSFUNKTIONEN
======================================================= */

window.FraktionsFinder = {
    getWinner,
    getResults,
    getAnswer,
    getQuestionMatch,
    getMostImportantQuestions,
    openProfile,
    openTopProfile,
    clearLastResult
};


/* =======================================================
   APP STARTEN
======================================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeApp,
        { once: true }
    );
} else {
    initializeApp();
}


/* =======================================================
   ENDE
=========================================================

   FraktionsFinder 1848
   Version 2.0

   Die Anwendung verwendet ausschließlich die in
   questions.js und fraktionen.js vorhandenen Daten.

======================================================= */
