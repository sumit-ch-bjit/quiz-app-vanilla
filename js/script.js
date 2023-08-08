const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Madrid", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: "Nitrogen"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        answer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Saturn", "Jupiter", "Neptune"],
        answer: "Jupiter"
    },
    {
        question: "What is the national flower of Japan?",
        options: ["Tulip", "Rose", "Cherry Blossom", "Daisy"],
        answer: "Cherry Blossom"
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
        answer: "Albert Einstein"
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1912", "1905", "1920", "1931"],
        answer: "1912"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Melbourne", "Sydney", "Canberra", "Perth"],
        answer: "Canberra"
    },
    {
        question: "What is the chemical symbol for the element gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        answer: "Au"
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["Mars", "Mercury", "Venus", "Uranus"],
        answer: "Venus"
    }
];

const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const startOverButton = document.getElementById("start-over");

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionElement.textContent = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("label");
        optionElement.innerHTML = `
      <input type="radio" name="option" value="${option}">
      ${option}
    `;
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const answer = selectedOption.value;
    if (answer === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    submitButton.style.display = "none";
    resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
    startOverButton.style.display = "block";
}

function startOver() {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.textContent = "";
    startOverButton.style.display = "none";
    displayQuestion(currentQuestionIndex);
    submitButton.style.display = "block";
}

submitButton.addEventListener("click", checkAnswer);
startOverButton.addEventListener("click", startOver);

displayQuestion(currentQuestionIndex);