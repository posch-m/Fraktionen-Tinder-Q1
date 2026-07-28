/*
========================================================
FraktionsFinder 1848
script.js
Teil 1 von 4
Initialisierung
========================================================
*/

/* -----------------------------------------------------
   DOM-Elemente
----------------------------------------------------- */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const profileScreen = document.getElementById("profile-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const backButton = document.getElementById("back-btn");

const questionText = document.getElementById("question-text");

const yesButton = document.getElementById("yes-btn");
const neutralButton = document.getElementById("neutral-btn");
const noButton = document.getElementById("no-btn");

const progressBar = document.getElementById("progress");
const questionCounter = document.getElementById("question-counter");

/* -----------------------------------------------------
   Ergebnisfelder
----------------------------------------------------- */

const wingName = document.getElementById("wing-name");
const wingDescription = document.getElementById("wing-description");

const politicalAxis =
    document.getElementById("political-axis");

const winnerName =
    document.getElementById("winner-name");

const winnerPercent =
    document.getElementById("winner-percent");

const winnerDescription =
    document.getElementById("winner-description");

const historyText =
    document.getElementById("history-text");

const rankingList =
    document.getElementById("ranking-list");

const profileTitle =
    document.getElementById("profile-title");

const profileContent =
    document.getElementById("profile-content");

/* -----------------------------------------------------
   Quizstatus
----------------------------------------------------- */

let currentQuestion = 0;

let quizFinished = false;

let ranking = [];

let winner = null;

/* -----------------------------------------------------
   Punktestand
----------------------------------------------------- */

const scores = {};

Object.keys(factions).forEach(id => {

    scores[id] = 0;

});

/* -----------------------------------------------------
   Quiz starten
----------------------------------------------------- */

function startQuiz(){

    resetQuiz();

    showScreen(quizScreen);

    loadQuestion();

}

/* -----------------------------------------------------
   Bildschirm wechseln
----------------------------------------------------- */

function showScreen(screen){

    startScreen.classList.add("hidden");

    quizScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    profileScreen.classList.add("hidden");

    screen.classList.remove("hidden");

}

/* -----------------------------------------------------
   Frage laden
----------------------------------------------------- */

function loadQuestion(){

    const question =
        questions[currentQuestion];

    if(!question){

        finishQuiz();

        return;

    }

    questionText.textContent =
        question.text;

    updateProgress();

}

/* -----------------------------------------------------
   Fortschrittsanzeige
----------------------------------------------------- */

function updateProgress(){

    const percentage =
        (currentQuestion / questions.length) * 100;

    progressBar.style.width =
        percentage + "%";

    questionCounter.textContent =
        (currentQuestion + 1) +
        " / " +
        questions.length;

}

/* -----------------------------------------------------
   Quiz zurücksetzen
----------------------------------------------------- */

function resetQuiz(){

    currentQuestion = 0;

    quizFinished = false;

    ranking = [];

    winner = null;

    Object.keys(scores).forEach(id=>{

        scores[id]=0;

    });

    progressBar.style.width = "0%";

}

/* -----------------------------------------------------
   Hilfsfunktionen
----------------------------------------------------- */

function clamp(value,min,max){

    return Math.max(min,Math.min(max,value));

}

function percentage(value,max){

    if(max===0){

        return 0;

    }

    return Math.round((value/max)*100);

}

/* -----------------------------------------------------
   EventListener
----------------------------------------------------- */

startButton.addEventListener(

    "click",

    startQuiz

);

restartButton.addEventListener(

    "click",

    ()=>{

        showScreen(startScreen);

        resetQuiz();

    }

);

backButton.addEventListener(

    "click",

    ()=>{

        showScreen(resultScreen);

    }

);

yesButton.addEventListener(

    "click",

    ()=>answerQuestion("yes")

);

neutralButton.addEventListener(

    "click",

    ()=>answerQuestion("neutral")

);

noButton.addEventListener(

    "click",

    ()=>answerQuestion("no")

);

/* -----------------------------------------------------
   Tastatursteuerung
----------------------------------------------------- */

document.addEventListener(

    "keydown",

    event=>{

        if(quizScreen.classList.contains("hidden")){

            return;

        }

        if(event.key==="1"){

            answerQuestion("yes");

        }

        if(event.key==="2"){

            answerQuestion("neutral");

        }

        if(event.key==="3"){

            answerQuestion("no");

        }

    }

);

/*
========================================================
Ende Teil 1
========================================================
*//* ========================================================
   Teil 2
   Antworten auswerten und Quiz abschließen
======================================================== */

/* --------------------------------------------------------
   Antwort verarbeiten
-------------------------------------------------------- */

function answerQuestion(answer){

    if(quizFinished){
        return;
    }

    const question = questions[currentQuestion];

    evaluateWeights(question, answer);

    currentQuestion++;

    if(currentQuestion >= questions.length){

        finishQuiz();

        return;

    }

    loadQuestion();

}

/* --------------------------------------------------------
   Gewichtungen auswerten
-------------------------------------------------------- */

function evaluateWeights(question, answer){

    Object.entries(question.weights).forEach(([id,value])=>{

        let points = value;

        switch(answer){

            case "yes":

                points = value;

                break;

            case "neutral":

                points = Math.round(value / 2);

                break;

            case "no":

                points = value * (-1);

                break;

        }

        scores[id] += points;

    });

}

/* --------------------------------------------------------
   Maximale Punktzahl bestimmen
-------------------------------------------------------- */

function calculateMaximumScore(){

    let max = 0;

    questions.forEach(question=>{

        Object.values(question.weights).forEach(value=>{

            max += Math.abs(value);

        });

    });

    return max;

}

/* --------------------------------------------------------
   Ranking berechnen
-------------------------------------------------------- */

function calculateRanking(){

    ranking = [];

    const maxScore = calculateMaximumScore();

    Object.entries(factions).forEach(([id,data])=>{

        const percent = percentage(

            scores[id] + maxScore,

            maxScore * 2

        );

        ranking.push({

            id:id,

            score:scores[id],

            percent:percent,

            ...data

        });

    });

    ranking.sort((a,b)=>{

        return b.percent-a.percent;

    });

    winner = ranking[0];

}

/* --------------------------------------------------------
   Quiz abschließen
-------------------------------------------------------- */

function finishQuiz(){

    quizFinished = true;

    progressBar.style.width="100%";

    calculateRanking();

    showScreen(resultScreen);

    renderResults();

}

/* --------------------------------------------------------
   Ergebnisse anzeigen
-------------------------------------------------------- */

function renderResults(){

    renderWinner();

    renderWing();

    renderAxis();

    renderHistory();

    renderRanking();

}/* ========================================================
   Teil 3
   Ergebnisdarstellung
======================================================== */

/* --------------------------------------------------------
   Siegerkarte
-------------------------------------------------------- */

function renderWinner(){

    if(!winner){
        return;
    }

    winnerName.textContent =
        winner.name;

    winnerPercent.textContent =
        winner.percent + " % Übereinstimmung";

    winnerDescription.textContent =
        winner.shortDescription;

    const card =
        document.getElementById("winner-card");

    if(card){

        card.style.background = winner.color;

        card.style.color = "#ffffff";

    }

}

/* --------------------------------------------------------
   Politischen Flügel aus ideology ableiten
-------------------------------------------------------- */

function renderWing(){

    if(!winner){
        return;
    }

    let title = winner.ideology;
    let description = "";

    const ideology =
        winner.ideology.toLowerCase();

    if(ideology.includes("konservativ")){

        description =
        "Diese Fraktion vertrat überwiegend konservative Positionen und setzte auf Stabilität, eine konstitutionelle Monarchie und einen vorsichtigen politischen Wandel.";

    }else if(ideology.includes("liberal")){

        description =
        "Diese Fraktion gehörte zum liberalen Spektrum und trat besonders für Freiheitsrechte, Rechtsstaatlichkeit und eine nationale Einigung ein.";

    }else if(
        ideology.includes("demokrat")
    ){

        description =
        "Diese Fraktion verfolgte demokratische Reformen und wollte die politische Mitbestimmung der Bevölkerung deutlich ausbauen.";

    }else if(
        ideology.includes("radikal")
    ){

        description =
        "Diese Fraktion gehörte zum radikaldemokratischen Lager und war bereit, tiefgreifende gesellschaftliche Veränderungen durchzusetzen.";

    }else{

        description =
        winner.shortDescription;

    }

    wingName.textContent = title;

    wingDescription.textContent = description;

}

/* --------------------------------------------------------
   Politische Achse
-------------------------------------------------------- */

function renderAxis(){

    politicalAxis.innerHTML = "";

    const bar = document.createElement("div");

    bar.className = "axis";

    bar.innerHTML = `

        <div class="axis-radikal"></div>
        <div class="axis-demokratisch"></div>
        <div class="axis-liberal"></div>
        <div class="axis-konservativ"></div>

    `;

    const marker = document.createElement("div");

    marker.className = "axis-marker";

    let position = 50;

    const ideology =
        winner.ideology.toLowerCase();

    if(ideology.includes("radikal")){

        position = 12;

    }else if(
        ideology.includes("demokrat")
    ){

        position = 35;

    }else if(
        ideology.includes("liberal")
    ){

        position = 65;

    }else if(
        ideology.includes("konservativ")
    ){

        position = 88;

    }

    marker.style.left =
        position + "%";

    marker.innerHTML =
        "<span>" + winner.name + "</span>";

    const labels =
        document.createElement("div");

    labels.className =
        "axis-labels";

    labels.innerHTML = `

        <span>Radikal</span>
        <span>Demokratisch</span>
        <span>Liberal</span>
        <span>Konservativ</span>

    `;

    politicalAxis.appendChild(bar);

    politicalAxis.appendChild(marker);

    politicalAxis.appendChild(labels);

}

/* --------------------------------------------------------
   Historische Einordnung
-------------------------------------------------------- */

function renderHistory(){

    historyText.textContent =
        winner.description;

}

/* --------------------------------------------------------
   Ranking
-------------------------------------------------------- */

function renderRanking(){

    rankingList.innerHTML = "";

    ranking.forEach((entry,index)=>{

        const item =
            document.createElement("div");

        item.className =
            "ranking-item";

        item.innerHTML = `

            <div class="ranking-label">

                <strong>

                    ${index+1}. ${entry.name}

                </strong>

                <span>

                    ${entry.percent} %

                </span>

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

        item.addEventListener(

            "click",

            ()=>{

                openProfile(entry.id);

            }

        );

        rankingList.appendChild(item);

    });

}

/* --------------------------------------------------------
   Profil öffnen
-------------------------------------------------------- */

function openProfile(id){

    const faction =
        factions[id];

    if(!faction){

        return;

    }

    profileTitle.textContent =
        faction.name;

    profileContent.innerHTML = `

        <h2>${faction.name}</h2>

        <p>

            ${faction.description}

        </p>

        <h3>Ideologie</h3>

        <p>

            ${faction.ideology}

        </p>

        <h3>Bekannte Vertreter</h3>

        <ul>

            ${faction.representatives
                .map(name=>`<li>${name}</li>`)
                .join("")}

        </ul>

        <h3>Politische Positionen</h3>

        <ul>

            ${faction.positions
                .map(item=>`<li>${item}</li>`)
                .join("")}

        </ul>

    `;

    showScreen(profileScreen);

}

/* ========================================================
   Ende Teil 3
======================================================== *//* ========================================================
   Teil 4
   Animationen, Hilfsfunktionen und Abschluss
======================================================== */

/* --------------------------------------------------------
   Fortschrittsbalken animieren
-------------------------------------------------------- */

function animateProgress(){

    progressBar.animate(

        [

            {
                transform: "scaleX(.98)"
            },

            {
                transform: "scaleX(1)"
            }

        ],

        {

            duration: 180,

            easing: "ease-out"

        }

    );

}

/* --------------------------------------------------------
   Ergebniskarten animieren
-------------------------------------------------------- */

function animateResults(){

    const cards = document.querySelectorAll(

        ".result-card"

    );

    cards.forEach((card,index)=>{

        card.style.opacity = "0";

        card.style.transform = "translateY(20px)";

        setTimeout(()=>{

            card.style.transition = ".45s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        },index*120);

    });

}

/* --------------------------------------------------------
   Profil schließen
-------------------------------------------------------- */

function closeProfile(){

    showScreen(resultScreen);

}

/* --------------------------------------------------------
   Rangliste sortieren (Sicherheit)
-------------------------------------------------------- */

function sortRanking(){

    ranking.sort((a,b)=>{

        if(b.percent===a.percent){

            return b.score-a.score;

        }

        return b.percent-a.percent;

    });

}

/* --------------------------------------------------------
   Ergebnisse aktualisieren
-------------------------------------------------------- */

function refreshResults(){

    sortRanking();

    winner = ranking[0];

    renderWinner();

    renderWing();

    renderAxis();

    renderHistory();

    renderRanking();

}

/* --------------------------------------------------------
   Karten weich einblenden
-------------------------------------------------------- */

function fadeIn(element){

    element.style.opacity = "0";

    element.style.transition = ".4s";

    requestAnimationFrame(()=>{

        element.style.opacity = "1";

    });

}

/* --------------------------------------------------------
   Gesamtes Ergebnis anzeigen
-------------------------------------------------------- */

function displayResults(){

    refreshResults();

    animateResults();

    fadeIn(resultScreen);

}

/* --------------------------------------------------------
   Ergebnis exportieren
-------------------------------------------------------- */

function createResultText(){

    return `

FraktionsFinder 1848

Beste Übereinstimmung:

${winner.name}

Übereinstimmung:

${winner.percent} %

Ideologie:

${winner.ideology}

Kurzbeschreibung:

${winner.shortDescription}

`;

}

/* --------------------------------------------------------
   In Zwischenablage kopieren
-------------------------------------------------------- */

async function copyResult(){

    try{

        await navigator.clipboard.writeText(

            createResultText()

        );

        console.log(

            "Ergebnis kopiert."

        );

    }

    catch(error){

        console.warn(error);

    }

}

/* --------------------------------------------------------
   Debugmodus
-------------------------------------------------------- */

function printScores(){

    console.table(scores);

}

/* --------------------------------------------------------
   Neustart
-------------------------------------------------------- */

function restartQuizCompletely(){

    resetQuiz();

    showScreen(startScreen);

}

/* --------------------------------------------------------
   Resize-Handler
-------------------------------------------------------- */

window.addEventListener(

    "resize",

    ()=>{

        if(

            !resultScreen.classList.contains(

                "hidden"

            )

        ){

            renderAxis();

        }

    }

);

/* --------------------------------------------------------
   Initialisierung
-------------------------------------------------------- */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        showScreen(startScreen);

    }

);

/* --------------------------------------------------------
   Überschreiben von finishQuiz
-------------------------------------------------------- */

const originalFinishQuiz = finishQuiz;

finishQuiz = function(){

    originalFinishQuiz();

    displayResults();

};

/* --------------------------------------------------------
   Überschreiben von updateProgress
-------------------------------------------------------- */

const originalUpdateProgress = updateProgress;

updateProgress = function(){

    originalUpdateProgress();

    animateProgress();

};

/* --------------------------------------------------------
   Buttons ergänzen
-------------------------------------------------------- */

if(restartButton){

    restartButton.addEventListener(

        "click",

        restartQuizCompletely

    );

}

if(backButton){

    backButton.addEventListener(

        "click",

        closeProfile

    );

}

/* --------------------------------------------------------
   Tastenkürzel
-------------------------------------------------------- */

document.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Escape"){

            if(

                !profileScreen.classList.contains(

                    "hidden"

                )

            ){

                closeProfile();

            }

        }

        if(event.key==="r"){

            if(

                !resultScreen.classList.contains(

                    "hidden"

                )

            ){

                restartQuizCompletely();

            }

        }

    }

);

/* ========================================================
   Ende script.js
======================================================== */