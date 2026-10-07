// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answerContainer = document.getElementById('answer-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');



const quizQuestions = [

    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ],
    },

    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false }
        ],
    },

    {
        question: "How many continents are there?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ],
    },

    {
        question: "What year did World War II end?",
        answers: [
            { text: "1945", correct: true },
            { text: "1939", correct: false },
            { text: "1950", correct: false },
            { text: "1941", correct: false }
        ],
    },

    {
        question: "What planet in our solar system is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ],
    }

];


// QUIZ STATE VARS //
let currentQuestionIndex = 0;
let score = 0
let answersDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length

// event Listeners

startButton.addEventListener('click', startQuiz)
restartButton.addEventListener('click', restartQuiz)


function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
    }

    function showQuestion() {
        // reset state
        answersDisabled = false

        const currentQuestion = quizQuestions[currentQuestionIndex];

        currentQuestionSpan.textContent = currentQuestionIndex + 1;

        const progressPercentage = ((currentQuestionIndex) / quizQuestions.length) * 100;
        progressBar.style.width = progressPercentage + '%';

        questionText.textContent = currentQuestion.question

        answerContainer.innerHTML = '';

currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('answer-btn');

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct

    button.addEventListener('click', selectAnswer)

    answerContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return; // prevent multiple answers
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answerContainer.children). forEach(button => {
        if(button.dataset.correct ==="true") {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }

    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    },1000);

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;
    
    if(percentage === 100) {
        resultMessage.textContent = "Perfect Score! The knowledge is general!";
        } else if (percentage >= 80) {
        resultMessage.textContent = "Great Stuff! Well Done!";
        }else if (percentage >= 60) {
            resultMessage.textContent = "Not bad! But there's room for improvement.";
        } else if (percentage <=40) {
            resultMessage.textContent = "God Damn man! You need help.";
         } else {
            resultMessage.textContent = "Unlucky Lad, maybe next time!";
         }
        }
    }


function restartQuiz() {
    resultsScreen.classList.remove('active');
    startQuiz();
}
