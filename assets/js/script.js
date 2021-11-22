const questions = [{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
        "JavaScript",
        "terminal/bash",
        "for loops",
        "console.log"
    ],
    answer: "console.log"
},
{
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choices: [
        "commas",
        "curly brackets",
        "quotes",
        "parenthesis"
    ],
    answer: "quotes"
},
{
    question: "Arrays in JavaScript can be used to store ___.",
    choices: [
        "numbers and strings",
        "other arrays",
        "boooleans",
        "all of the above"
    ],
    answer: "all of the above"
},
{
    question: "The condition in an if/else statement is enclosed with ___.",
    choices: [
        "quotes",
        "curly brackets",
        "parenthesis",
        "square brackets"
    ],
    answer: "parenthesis"
},
{
    question: "Commonly used data types do NOT include:",
    choices: [
        "strings",
        "boolean",
        "alerts",
        "numbers"
    ],
    answer: "alerts"
}
];

var generateBtn = document.querySelector("#btn-start")
var mainView = document.querySelector("main");
var timerEl = document.querySelector("#timer");
var highScoreList = document.querySelector("#highScoreList");
var correctWrong = document.querySelector(".correct-wrong");
var qID = 0;
var finalScore = 0;
var timeLeft = 100;
var highScore = [];

//when the start button is clicked, remove the introduction and load a question
let startQuiz = function() {
const startBtn = document.querySelector("#quiz-start")
startBtn.remove();
createQuestion(0);
startTimer();
};

// question creation
function createQuestion(questionID) {
    let firstDiv = document.createElement("div");
    let secondDiv = document.createElement("div");
    let thirdDiv = document.createElement("div");
    let fourthDiv = document.createElement("div");

    firstDiv.id = "question" + questionID;
    firstDiv.className = "container mainContainer";

    secondDiv.className = "row align-items-center";

    thirdDiv.className = "col-12 d-flex flex-column answers-button text-center align-content-center";
    thirdDiv.innerHTML = "<h2 class= 'title'</h2>" + "Question " + (questionID + 1) + ": " + "<br /><br />" + questions[questionID].question;

    fourthDiv.className = "answers-button d-flex flex-column align-items-center";

    for (ans in questions[questionID].choices) {
        let buttonEl = document.createElement("button");
        let temp = ans;
        temp++;
        buttonEl.className = "btn m-1 w-25 text-start";
        buttonEl.textContent = temp + ". " + questions[questionID].choices[ans];
        buttonEl.setAttribute("onclick", "checkAnswer(" + questionID + ",'" + questions[questionID].choices[ans] + "')");
        fourthDiv.appendChild(buttonEl);
    }

    thirdDiv.appendChild(fourthDiv);
    secondDiv.appendChild(thirdDiv);
    firstDiv.appendChild(secondDiv);
    mainView.appendChild(firstDiv);
};

function startTimer() {
    timerEl.textContent = timeLeft;
    var timeInternal = setInterval(function() {
        if (timeLeft > 0 && questions[qID] !== undefined) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else if (questions[qID] === undefined) {
            clearInterval(timeInternal);
        } else {
            clearInterval(timeInternal);
            gameOver();
        }
    }, 1000);
};

// evaluating selected answer
function checkAnswer(questionID, Answer) {
    var removeOld = document.querySelector("#question" + questionID);

    if (Answer === questions[questionID].answer) {
        correctAnswer();
        console.log("Correct");
        finalScore += 10;
    } else {
        wrongAnswer();
        console.log("Wrong");
        timeLeft -= 10;
    }

    qID++;
    if (questions[qID] === undefined) {
        gameOver();
    } else {
        removeOld.remove();
        createQuestion(qID);
    }
};

function correctAnswer() {
    let correct = document.createElement("h2");

    correct.className = "title border-top w-50 d-flex justify-content-center";
    correct.textContent = "Correct!";
    correctWrong.appendChild(correct);
    setTimeout(function() {
        correct.remove();
    }, 1100);
};

function wrongAnswer() {
    let wrong = document.createElement("h2");

    wrong.className = "title border-top w-50 d-flex justify-content-center";
    wrong.textContent = "Wrong!";
    correctWrong.appendChild(wrong);
    setTimeout(function() {
        wrong.remove();
    }, 1100);
};

// Game Over
function gameOver() {
    var current = document.querySelector(".mainContainer");
    let firstDiv = document.createElement("div");
    let secondDiv = document.createElement("div");
    let thirdDiv = document.createElement("div");
    let fourthDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let fifthDiv = document.createElement("div");
    let input = document.createElement("input");
    let submitButton = document.createElement("button");

    if (current !== null) {
        current.remove();
    }
    
    firstDiv.className = "quiz-end text-center";

    secondDiv.className = "container";
    
    thirdDiv.className = "row";
    
    fourthDiv.className = "col align-items-center";
    
    h2.className = ("text-decoration-underline")
    h2.textContent = "All done!";
    
    p.id = ("score")
    p.textContent = "Your final score is " + finalScore;
    
    fifthDiv.className = ("form-group");
   
    input.id = ("name-initials");
    input.type = ("text");
    // input.name = ("name-initials");
    input.placeholder = "Enter initials";
    
    submitButton.className = ("btn m-5");
    submitButton.innerHTML = "<span>Submit</span>";
    submitButton.setAttribute("onclick", "storeHighScore()");

    fifthDiv.appendChild(input);
    fifthDiv.appendChild(submitButton);
    fourthDiv.appendChild(h2);
    fourthDiv.appendChild(p);
    fourthDiv.appendChild(fifthDiv);
    thirdDiv.appendChild(fourthDiv);
    secondDiv.appendChild(thirdDiv);
    firstDiv.appendChild(secondDiv);
    mainView.appendChild(firstDiv);
};

// High Score handling
function storeHighScore() {
    window.location.href = "highscores.html";
    var obj = {
        name: document.querySelector("input").value,
        score: finalScore
    }
    highScore.push(obj);
    localStorage.setItem("highScore", JSON.stringify(highScore));
};

function loadHighScore() {
    var highScores = localStorage.getItem("highScore");

    if (!highScores) {
        return false;
    }
    highScores = JSON.parse(highScores);
    for (var i = 0; i < highScores.length; i++) {
        // pass each task object into the `createTaskEl()` function
        var temp = {
            name: highScores[i].name,
            score: highScores[i].score
        }
        highScore.push(temp);
    }
    highScore.sort(function(a, b) {
        return b.score - a.score;
    })
};

function clearHighScore() {
    localStorage.clear();
    location.reload();
};

function displayHighScore() {
    for (i = 0; i < highScore.length; i++) {
        let createEl = document.createElement("li");
        createEl.className = ("text-start");
        createEl.textContent = highScore[i].name + " " + highScore[i].score;
        highScoreList.appendChild(createEl);
    }
};

loadHighScore();