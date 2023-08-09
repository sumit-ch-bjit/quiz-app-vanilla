///selects the dom elements to which other elements will be added
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const startOverButton = document.getElementById("start-over");
const timeDisplay = document.querySelector(".time");

///two variables to keep currentQuestionIndex and maintain score
let currentQuestionIndex = 0;
let score = 0;
let questions = []; // stores the questions coming from api
let timer;

function startTimer() {
  let secondsRemaining = 10; // Set the initial time (in seconds)

  timer = setInterval(() => {
    if (secondsRemaining <= 0) {
      clearInterval(timer); // Clear the interval when time is up
      handleTimeUp();
    } else {
      // Update the timer display
      timeDisplay.textContent = secondsRemaining;
      secondsRemaining--;
    }
  }, 1000); // 1000 milliseconds = 1 second
}

function stopTimer() {
  clearInterval(timer);
}

//loads the question from a json-server api
async function loadQuestions() {
  try {
    const response = await fetch("http://localhost:3001/questions");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading questions:", error);
    return []; // returns empty array if no questions found
  }
}

// calls loadQuestions and if questions found
//calls displayQuestions
async function initializeQuiz() {
  const loadedQuestions = await loadQuestions();
  if (loadedQuestions.length > 0) {
    // questions loaded
    questions = loadedQuestions;
    displayQuestion(currentQuestionIndex); /// displayQuestion is invoked with currentQuestionIndex
  } else {
    console.error("No questions found."); // prints error message to the console
  }
}

// adds elements from options in the questions array and appends to optionsElement
function displayQuestion(questionIndex) {
  // startTimer();
  const question = questions[questionIndex];
  questionElement.textContent = question.question;

  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    // for every option in the options array
    const optionElement = document.createElement("label"); // a option element is created
    ///string literals to add elements to optionElement
    optionElement.innerHTML = `
      <input type="radio" name="option" value="${option}">
      ${option}
    `;
    optionsElement.appendChild(optionElement); // child elements are added to the optionsElements
  });

  timeDisplay.textContent = 10; // Reset time to 10 seconds
  startTimer();
}

function handleTimeUp() {
  stopTimer(); // Clear the timer
  checkAnswer();
}

/// checks the answers and increases score
///displays the next question
//until the current question index is less than question array's length
function checkAnswer() {
  stopTimer();
  //query selector selects the input element that has the name 'option' and the value is checked
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    handleTimeUp();
    return;
  }

  const answer = selectedOption.value; /// gets the value of selected elements
  if (answer === questions[currentQuestionIndex].answer) {
    score++;
    //if selected answer matches the answer in questions array -- increase the score
  }

  currentQuestionIndex++; // increase current question index by 1 to load next question
  if (currentQuestionIndex < questions.length) {
    // if current question index less than the question length
    displayQuestion(currentQuestionIndex); // calls displayQuestion for the next question
  } else {
    showResult();
  }
  // clearInterval(timer);
}

// shows the total value of score and
//makes other elements empty and not displayed on the screen
function showResult() {
  questionElement.textContent = "";
  optionsElement.innerHTML = "";
  submitButton.style.display = "none";
  resultElement.textContent = `Your total score: ${score} out of ${questions.length}`;
  startOverButton.style.display = "block";
}

//starts the quiz from beginning with zero score
function startOver() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.textContent = "";
  startOverButton.style.display = "none";
  displayQuestion(currentQuestionIndex);
  submitButton.style.display = "block";
}

//add two event handlers to submitButton and startOverButton
submitButton.addEventListener("click", checkAnswer);
startOverButton.addEventListener("click", startOver);

//initializes the quiz
initializeQuiz();
