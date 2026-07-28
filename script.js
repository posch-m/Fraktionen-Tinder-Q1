/*
=========================================================
FraktionsFinder 1848
script.js
Teil 1
Initialisierung
=========================================================
*/

"use strict";

/* =======================================================
   DOM-ELEMENTE
======================================================= */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const profileScreen = document.getElementById("profile-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const backBtn = document.getElementById("back-btn");

const questionText = document.getElementById("question-text");

const btnYes = document.getElementById("btn-yes");
const btnNeutral = document.getElementById("btn-neutral");
const btnNo = document.getElementById("btn-no");

const progress = document.getElementById("progress");
const counter = document.getElementById("question-counter");

const winnerCard = document.getElementById("winner-card");
const winnerName = document.getElementById("winner-name");
const winnerPercent = document.getElementById("winner-percent");
const winnerDescription = document.getElementById("winner-description");
const wingName = document.getElementById("wing-name");
const wingDescription = document.getElementById("wing-description");
const historyText = document.getElementById("history-text");
const politicalAxis = document.getElementById("political-axis");
const rankingList = document.getElementById("ranking-list");

const profileTitle = document.getElementById("profile-title");
const profileContent = document.getElementById("profile-content");


/* =======================================================
   GLOBALE VARIABLEN
======================================================= */

let currentQuestion = 0;

let finished = false;

let ranking = [];

let answers = [];

let scores = {};

let maxPossible = {};

const factionKeys = Object.keys(factions);


/* =======================================================
   INITIALISIERUNG
======================================================= */

function initScores(){

    scores = {};

    maxPossible = {};

    factionKeys.forEach(key=>{

        scores[key]=0;
        maxPossible[key]=0;

    });

    calculateMaximumPoints();

}


/* =======================================================
   MAXIMALPUNKTE
======================================================= */

function calculateMaximumPoints(){

    questions.forEach(question=>{

        factionKeys.forEach(key=>{

            const value = question.weights[key];

            maxPossible[key]+=Math.abs(value);

        });

    });

}


/* =======================================================
   START
======================================================= */

function init(){

    initScores();

    showScreen(startScreen);

    registerEvents();

}

document.addEventListener("DOMContentLoaded",init);


/* =======================================================
   EVENTS
======================================================= */

function registerEvents(){

    startBtn.addEventListener("click",startQuiz);

    restartBtn.addEventListener("click",restartQuiz);

    backBtn.addEventListener("click",()=>{

        showScreen(resultScreen);

    });

    btnYes.addEventListener("click",()=>{

        answerQuestion(1);

    });

    btnNeutral.addEventListener("click",()=>{

        answerQuestion(0);

    });

    btnNo.addEventListener("click",()=>{

        answerQuestion(-1);

    });

    document.addEventListener("keydown",keyboardControl);

}


/* =======================================================
   TASTATURSTEUERUNG
======================================================= */

function keyboardControl(event){

    if(quizScreen.classList.contains("hidden")){

        return;

    }

    switch(event.key){

        case "1":

            answerQuestion(1);

            break;

        case "2":

            answerQuestion(0);

            break;

        case "3":

            answerQuestion(-1);

            break;

    }

}


/* =======================================================
   BILDSCHIRME
======================================================= */

function hideAllScreens(){

    startScreen.classList.add("hidden");

    quizScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    profileScreen.classList.add("hidden");

}


function showScreen(screen){

    hideAllScreens();

    screen.classList.remove("hidden");

}


/* =======================================================
   QUIZ STARTEN
======================================================= */

function startQuiz(){

    currentQuestion=0;

    finished=false;

    answers=[];

    initScores();

    showScreen(quizScreen);

    loadQuestion();

}


/* =======================================================
   FRAGE LADEN
======================================================= */

function loadQuestion(){

    const question = questions[currentQuestion];

    questionText.style.opacity=0;

    setTimeout(()=>{

        questionText.textContent=question.text;

        questionText.style.opacity=1;

    },180);

    updateProgress();

}


/* =======================================================
   FORTSCHRITT
======================================================= */

function updateProgress(){

    const percent=((currentQuestion)/questions.length)*100;

    progress.style.width=percent+"%";

    counter.textContent=
        `Frage ${currentQuestion+1} von ${questions.length}`;

}


/* =======================================================
   BUTTONS KURZ SPERREN
======================================================= */

let clickLock=false;

function lockButtons(){

    clickLock=true;

    btnYes.disabled=true;
    btnNeutral.disabled=true;
    btnNo.disabled=true;

}

function unlockButtons(){

    clickLock=false;

    btnYes.disabled=false;
    btnNeutral.disabled=false;
    btnNo.disabled=false;

}


/* =======================================================
   ANTWORT VERARBEITEN
======================================================= */

function answerQuestion(choice){

    if(clickLock){

        return;

    }

    lockButtons();

    answers.push(choice);

    applyWeights(choice);

    setTimeout(()=>{

        nextQuestion();

        unlockButtons();

    },220);

}/* =======================================================
   PUNKTEVERGABE
======================================================= */

function applyWeights(choice){

    const question = questions[currentQuestion];

    factionKeys.forEach(key=>{

        const value = question.weights[key];

        switch(choice){

            case 1:
                scores[key]+=value;
                break;

            case 0:
                break;

            case -1:
                scores[key]-=value;
                break;

        }

    });

}


/* =======================================================
   NÄCHSTE FRAGE
======================================================= */

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion>=questions.length){

        finishQuiz();
        return;

    }

    loadQuestion();

}


/* =======================================================
   QUIZ BEENDET
======================================================= */

function finishQuiz(){

    finished=true;

    progress.style.width="100%";

    calculateRanking();

    showResult();

}


/* =======================================================
   RANKING BERECHNEN
======================================================= */

function calculateRanking(){

    ranking=[];

    factionKeys.forEach(key=>{

        const raw=scores[key];

        const max=maxPossible[key];

        const percent=convertToPercent(raw,max);

        ranking.push({

            key:key,
            score:raw,
            percent:percent,
            faction:factions[key]

        });

    });

    ranking.sort((a,b)=>b.percent-a.percent);

}


/* =======================================================
   PUNKTE -> PROZENT
======================================================= */

function convertToPercent(score,max){

    const normalized=(score+max)/(2*max);

    let percent=Math.round(normalized*100);

    if(percent<0) percent=0;

    if(percent>100) percent=100;

    return percent;

}


/* =======================================================
   ERGEBNISSEITE
======================================================= */

function showResult(){

    showScreen(resultScreen);

    const winner = ranking[0];

    renderWing(winner);

    renderAxis(winner);

    renderWinner(winner);

    renderHistory(winner);

    renderRanking();

}


/* =======================================================
   SIEGER
======================================================= */

function renderWinner(result){
function renderWing(result){

    wingName.textContent = result.faction.wing;

    switch(result.faction.wing){

        case "Radikaldemokratischer Flügel":

            wingDescription.textContent =
            "Du vertrittst überwiegend radikaldemokratische Positionen und befürwortest weitreichende politische Reformen.";

            break;

        case "Demokratischer Flügel":

            wingDescription.textContent =
            "Du vertrittst demokratische Positionen und setzt auf eine stärkere Beteiligung des Volkes.";

            break;

        case "Liberales Zentrum":

            wingDescription.textContent =
            "Du stehst den liberalen Kräften der Nationalversammlung am nächsten.";

            break;

        default:

            wingDescription.textContent =
            "Du bevorzugst gemäßigte Reformen und eine konstitutionelle Monarchie.";

    }

}function renderAxis(result){

    const map = {

        "Donnersberg":12,
        "Deutscher Hof":25,
        "Westendhall":38,
        "Augsburger Hof":50,
        "Café Milani":63,
        "Landsberg":75,
        "Württemberger Hof":88,
        "Casino":96

    };

    politicalAxis.innerHTML = `

        <div class="axis">

            <div class="axis-radikal">Radikaldemokraten</div>

            <div class="axis-demokratisch">Demokraten</div>

            <div class="axis-liberal">Liberale</div>

            <div class="axis-konservativ">Konservativ-Liberale</div>

        </div>

        <div class="axis-marker" style="left:${map[result.faction.name]}%">

            ▲

            <span>Deine Position</span>

        </div>

    `;

}function renderHistory(result){

    historyText.textContent =
        "Die Mehrheit der Abgeordneten der Frankfurter Nationalversammlung gehörte dem liberalen Zentrum oder den konservativ-liberalen Fraktionen an. Demokratische und radikaldemokratische Positionen waren deutlich in der Minderheit. Dadurch wird deutlich, dass viele heutige politische Vorstellungen stärker demokratisch geprägt sind als die Mehrheitspositionen von 1848.";

}
    const faction=result.faction;

    winnerCard.style.background=faction.color;

    winnerName.textContent=faction.name;

    winnerPercent.textContent=result.percent+" % Übereinstimmung";

    winnerDescription.textContent=faction.shortDescription;

}


/* =======================================================
   RANKING
======================================================= */

function renderRanking(){

    rankingList.innerHTML="";

    ranking.forEach(result=>{

        const row=createRankingItem(result);

        rankingList.appendChild(row);

    });

}


/* =======================================================
   RANKINGELEMENT
======================================================= */

function createRankingItem(result){

    const wrapper=document.createElement("div");
    wrapper.className="ranking-item";

    const label=document.createElement("div");
    label.className="ranking-label";

    const strong=document.createElement("strong");
    strong.textContent=result.faction.name;

    const span=document.createElement("span");
    span.textContent=result.percent+" %";

    label.appendChild(strong);
    label.appendChild(span);

    const bar=document.createElement("div");
    bar.className="bar";

    const fill=document.createElement("div");
    fill.className="bar-fill";

    fill.style.background=result.faction.color;

    bar.appendChild(fill);

    wrapper.appendChild(label);
    wrapper.appendChild(bar);

    requestAnimationFrame(()=>{

        fill.style.width=result.percent+"%";

    });

    wrapper.addEventListener("click",()=>{

        openProfile(result.key);

    });

    return wrapper;

}


/* =======================================================
   PROFIL ÖFFNEN
======================================================= */

function openProfile(key){

    const faction=factions[key];

    profileTitle.textContent=faction.name;

    profileContent.innerHTML=createProfileHTML(faction);

    showScreen(profileScreen);

}/* =======================================================
   PROFILSEITE
======================================================= */

function createProfileHTML(faction){

    const representatives = faction.representatives
        .map(person => `<li>${person}</li>`)
        .join("");

    const positions = faction.positions
        .map(position => `<li>${position}</li>`)
        .join("");

    return `

        <p><strong>Politische Einordnung:</strong> ${faction.wing}</p>

        <p><strong>Ideologie:</strong> ${faction.ideology}</p>

        <h3>Beschreibung</h3>

        <p>${faction.description}</p>

        <h3>Bekannte Vertreter</h3>

        <ul>
            ${representatives}
        </ul>

        <h3>Typische Positionen</h3>

        <ul>
            ${positions}
        </ul>

    `;

}


/* =======================================================
   QUIZ NEU STARTEN
======================================================= */

function restartQuiz(){

    currentQuestion = 0;

    finished = false;

    answers = [];

    ranking = [];

    initScores();

    winnerCard.style.background = "";

    winnerName.textContent = "";

    winnerPercent.textContent = "";

    winnerDescription.textContent = "";

    rankingList.innerHTML = "";

    progress.style.width = "0%";

    counter.textContent = `Frage 1 von ${questions.length}`;

    showScreen(startScreen);

}


/* =======================================================
   HILFSFUNKTIONEN
======================================================= */

function getWinner(){

    return ranking.length > 0 ? ranking[0] : null;

}

function getFactionByKey(key){

    return factions[key];

}

function getScore(key){

    return scores[key] || 0;

}

function getPercent(key){

    const score = getScore(key);

    return convertToPercent(score, maxPossible[key]);

}


/* =======================================================
   SICHERHEITSPRÜFUNGEN
======================================================= */

function dataCheck(){

    if(typeof questions === "undefined"){

        console.error("questions.js wurde nicht geladen.");

        return false;

    }

    if(typeof factions === "undefined"){

        console.error("fraktionen.js wurde nicht geladen.");

        return false;

    }

    if(questions.length === 0){

        console.error("Keine Fragen gefunden.");

        return false;

    }

    return true;

}


/* =======================================================
   SANFTE ANIMATION
======================================================= */

function fadeElement(element, callback){

    element.style.opacity = 0;

    setTimeout(()=>{

        callback();

        element.style.opacity = 1;

    },180);

}


/* =======================================================
   BUTTONANIMATION
======================================================= */

function flashButton(button){

    button.animate([

        {
            transform:"scale(1)"
        },

        {
            transform:"scale(0.95)"
        },

        {
            transform:"scale(1)"
        }

    ],{

        duration:180

    });

}


/* =======================================================
   BUTTONS
======================================================= */

btnYes.addEventListener("click",()=>flashButton(btnYes));

btnNeutral.addEventListener("click",()=>flashButton(btnNeutral));

btnNo.addEventListener("click",()=>flashButton(btnNo));


/* =======================================================
   ENTER STARTET QUIZ
======================================================= */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Enter"){

        if(!startScreen.classList.contains("hidden")){

            startQuiz();

        }

    }

});


/* =======================================================
   ESC SCHLIESST PROFIL
======================================================= */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        if(!profileScreen.classList.contains("hidden")){

            showScreen(resultScreen);

        }

    }

});


/* =======================================================
   RANKING SORTIEREN
======================================================= */

function sortRanking(){

    ranking.sort((a,b)=>{

        if(a.percent===b.percent){

            return b.score-a.score;
        }

        return b.percent-a.percent;

    });

}


/* =======================================================
   DEBUG
======================================================= */

function printScores(){

    console.table(scores);

}

function printRanking(){

    console.table(ranking);

}


/* =======================================================
   VERSION
======================================================= */

const APP_VERSION="1.0";

console.log("FraktionsFinder 1848");

console.log("Version",APP_VERSION);


/* =======================================================
   INITIALISIERUNG
======================================================= */

window.addEventListener("load",()=>{

    if(!dataCheck()){

        alert("Fehler beim Laden der Daten.");

        return;

    }

    console.log("FraktionsFinder erfolgreich geladen.");

});