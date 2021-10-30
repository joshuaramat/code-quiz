const { time } = require("console");
const { choices } = require("yargs");

var question = document.querySelector('#question');
var questionNumber = 0;
var options = Array.from(document.querySelectorAll('.option-text'));
var progress = document.querySelector('#progress');
var timer = document.querySelector('.timer');
var duration = 60;

var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        option: [
            'Booleans',
            'Numbers',
            'Strings',
            'Alerts'
        ],
        answer: 'Alerts'
    },
    {
        question: 'Arrays in JavaScript can be used to store ___.',
        option: [
            'Other Arrays',
            'Booleans',
            'Numbers and Strings',
            'All of the Above'
        ],
        answer: 'All of the Above'
    },
    {
        question: 'The condition in an if/else statement is enclosed with ___',
        option: [
            'Parenthesis',
            'Square Brackets',
            'Quotes',
            'Curly Brackets'
        ],
        answer: 'Curly Brackets'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        option: [
            'Terminal/Bash',
            'console log',
            'JavaScript',
            'For Loops'
        ],
        answer: 'console log'
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables',
        option: [
            'Parenthesis',
            'Square Brackets',
            'Quotes',
            'Curly Brackets'
        ],
        answer: 'Quotes'
    },
    
]
console.log(choices[0].innerHTML)

function start() {
    var counter = setInterval(function() {
        if (time >= 0) {
            timer.textContent = time
            time--;
        } else {
            timer.textContent = '';
            clearInterval(counter);
        }
    }, 1000);
}
start()

function endQuiz() {
    clearInterval(time);
    localStorage.setItem('score')
    window,location.replace('../highscore.html');
}

function quizStart () {
    question.innerHTML = questions[0].question
    for (var i = 0; i < options.length; i++) {
        options[i].innerHTML = questions[0].option[i]
    }
}

function nextQuestion() {
    options.forEach(option => {
        option.addEventListener('click', e => {
            if (questionNumber !== 5) {
                console.log(e.target.innerHTML)
                if (e.target.innerHTML === questions[questionNumber].answer) {
                    console.log('Correct!')
                    questionNumber = questionNumber + 1;
                    question.innerHTML = questions[questionNum].question
                    for (var i = 0; i < options.length; i++) {
                        options[i].innerHTML = questions[questionNumber].option[i]
                    }
                    console.log(time)
                } else {
                    console.log('Wrong!')
                    questionNumber = questionNumber + 1;
                    question.innerHTML = questions[questionNumber].question
                    for (var i = 0; i < options.length; i++) {
                        options[i].innerHTML = questions[questionNumber].option[i]
                        time -= 5;
                        console.log(time)
                    }
                }
            } else {
                if (e.target.innerHTML === questions[questionNumber].answer) {
                    console.log('Correct!')
                    endQuiz();
                    window.location.replace('../highscore.html')
                }
            }
        })
    })
}

quizStart();
nextQuestion();