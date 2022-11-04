
let questionsData = [
    {
        text: "What is the capital of France?",
        answers: [
            { text: "Paris", isCorrect: true },
            { text: "London", isCorrect: false },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false }
        ],
    },
    {
        text: "What is the capital of Germany?",
        answers: [
            { text: "Paris", correct: false },
            { text: "London", correct: false },
            { text: "Berlin", correct: true },
            { text: "Madrid", correct: false }
        ],
    },
    {
        text: "What is the capital of Spain?",
        answers: [
            { text: "Paris", isCorrect: false },
            { text: "London", isCorrect: false },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: true }
        ],
    },
    {
        text: "What is the capital of England?",
        answers: [
            { text: "Paris", isCorrect: false },
            { text: "London", isCorrect: true },
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false }
        ],
    },
];

let questions = [];
let score = 0, answeredQuestions = 0;
let appContainer = document.getElementById('questions-container');
let startBtn = document.getElementById('start-btn');
let scoreContainer = document.getElementById('score-container');
scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;

function randomizeQuestions(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

randomizeQuestions(questionsData);

for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
        text: questionsData[i].text,
        answers: questionsData[i].answers,
    });

    questions.push(question);
}

startBtn.onclick = (ev) => {
    if (!document.querySelector('.question.popup.active')) {
        appContainer.appendChild(questions[0].create());
        questions[0].html.classList.add('popup');
        questions[0].html.classList.add('active');
    }
};



document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
      }, 100);
    } else {
        let currentQuestion = document.querySelector('.question.popup.active');
        currentQuestion.classList.add('fadeout');
        setTimeout(() => {
            appContainer.removeChild(currentQuestion);
            appContainer.appendChild(questions[answeredQuestions].create());
            questions[answeredQuestions].html.classList.add('popup');
            questions[answeredQuestions].html.classList.add('active');
        }, 1000);
    }
});
  
  console.log(questions, questionsData);
  