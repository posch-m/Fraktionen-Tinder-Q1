const app = {
    currentQuestion: 0,
    answers: [],
    results: []
};

function normalizeAnswer(answer) {
    if (answer === 1 || answer === "yes") return 1;
    if (answer === -1 || answer === "no") return -1;
    return 0;
}

function calculateFaction(key) {
    let earned = 0;
    let maximum = 0;

    questions.forEach((question, index) => {
        const answer = normalizeAnswer(app.answers[index]);
        const factionWeight = Number(question.weights[key] ?? 0);
        const importance = Math.abs(factionWeight);

        if (importance === 0) {
            return;
        }

        // Positive Fraktionsposition: Zustimmung passt.
        // Negative Fraktionsposition: Ablehnung passt.
        const agreement = factionWeight > 0
            ? (answer + 1) / 2
            : (1 - answer) / 2;

        earned += agreement * importance;
        maximum += importance;
    });

    if (maximum === 0) {
        return { percent: 0, score: 0 };
    }

    return {
        percent: Math.round((earned / maximum) * 100),
        score: earned
    };
}

function calculateResults() {
    const results = [];

    Object.keys(fraktions).forEach(key => {
        const result = calculateFaction(key);

        results.push({
            key: key,
            ...result
        });
    });

    results.sort((a, b) => {
        if (b.percent !== a.percent) {
            return b.percent - a.percent;
        }

        return b.score - a.score;
    });

    return results;
}

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.add("active");
    }
}

function startQuiz() {
    app.currentQuestion = 0;
    app.answers = [];

    showScreen("quiz-screen");
    showQuestion();
}

function showQuestion() {
    const question = questions[app.currentQuestion];

    if (!question) {
        showResults();
        return;
    }

    document.getElementById("question-text").textContent = question.text;

    document.getElementById("progress").style.width =
        `${((app.currentQuestion + 1) / questions.length) * 100}%`;

    document.getElementById("question-counter").textContent =
        `Frage ${app.currentQuestion + 1} von ${questions.length}`;
}

function answerQuestion(answer) {
    app.answers[app.currentQuestion] = answer;

    app.currentQuestion++;

    if (app.currentQuestion >= questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    app.results = calculateResults();

    const winner = app.results[0];
    const faction = fraktions[winner.key];

    document.getElementById("wing-name").textContent =
        faction.wing || "";

    document.getElementById("wing-description").textContent =
        faction.wingDescription || "";

    document.getElementById("political-axis").textContent =
        faction.ideology || "";

    document.getElementById("winner-name").textContent =
        faction.name;

    document.getElementById("winner-percent").textContent =
        `${winner.percent}%`;

    document.getElementById("winner-description").textContent =
        faction.description;

    document.getElementById("history-text").textContent =
        faction.history || "";

    const rankingList = document.getElementById("ranking-list");

    rankingList.innerHTML = "";

    app.results.forEach((result, index) => {
        const factionData = fraktions[result.key];

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="ranking-position">${index + 1}.</span>
            <span class="ranking-name">${factionData.name}</span>
            <span class="ranking-percent">${result.percent}%</span>
        `;

        rankingList.appendChild(li);
    });

    showScreen("result-screen");
}

function restartQuiz() {
    app.currentQuestion = 0;
    app.answers = [];
    app.results = [];

    showScreen("start-screen");
}

function showProfile(key) {
    const faction = fraktions[key];

    if (!faction) {
        return;
    }

    document.getElementById("profile-title").textContent =
        faction.name;

    document.getElementById("profile-content").innerHTML = `
        <h3>${faction.wing || ""}</h3>
        <p>${faction.description || ""}</p>
        <h4>Vertreter</h4>
        <p>${(faction.representatives || []).join(", ")}</p>
        <h4>Positionen</h4>
        <ul>
            ${(faction.positions || [])
                .map(position => `<li>${position}</li>`)
                .join("")}
        </ul>
    `;

    showScreen("profile-screen");
}

function goBack() {
    showScreen("result-screen");
}

document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("btn-yes");
    const neutralButton = document.getElementById("btn-neutral");
    const noButton = document.getElementById("btn-no");
    const restartButton = document.getElementById("restart-btn");
    const backButton = document.getElementById("back-btn");

    if (yesButton) {
        yesButton.addEventListener("click", () => {
            answerQuestion(1);
        });
    }

    if (neutralButton) {
        neutralButton.addEventListener("click", () => {
            answerQuestion(0);
        });
    }

    if (noButton) {
        noButton.addEventListener("click", () => {
            answerQuestion(-1);
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", restartQuiz);
    }

    if (backButton) {
        backButton.addEventListener("click", goBack);
    }

    document.querySelectorAll("[data-faction]").forEach(element => {
        element.addEventListener("click", () => {
            showProfile(element.dataset.faction);
        });
    });
});
