const quizData = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Markup Language', 'Hyperlinks and Text Markup Language', ' Home Tool Markup Language'],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'Which of the following is not a programming language?',
    options: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
    answer: 'MySQL',
  },
  {
    question: 'Which language is used for styling web pages?',
    options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    answer: 'CSS',
  },
  {
    question: 'What does CSS stand for?',
    options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
    answer: 'Cascading Style Sheets',
  },
  {
    question: 'Which of the following is a server-side scripting language?',
    options: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    answer: 'PHP',
  },
  {
    question: 'What does FSWD stand for?',
    options: ['Full Stack Web Design', 'Frontend Software Development', 'Full Stack Web Development', 'Fast Secure Web Deployment'],
    answer: 'Full Stack Web Development',
  },
  {
    question: 'Which of the following is not a commonly used JavaScript framework or library?',
    options: ['React', 'Angular', 'Django', 'Vue.js'],
    answer: 'Django',
  },
  {
    question: 'Which database management system is commonly used in web development?',
    options: ['SQLite', 'MongoDB', 'PostgreSQL', 'All of the above'],
    answer: 'All of the above',
  },
  {
    question: 'Which of the following is a NoSQL database?',
    options: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'],
    answer: 'MongoDB'
  },
  {
    question: 'Which database management system is commonly associated with WordPress?',
    options: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite'],
    answer: 'MySQL'
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  store();
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

function restart() {
  store()
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
function getParameterByName(name, url) {
  // If URL is not provided, use the current window's URL
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, "\\$&");

  // Define a regular expression pattern to match the parameter
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");

  // Execute the regular expression on the URL
  var results = regex.exec(url);

  if (!results) return null;

  // If the parameter value is not present, return an empty string
  if (!results[2]) return '';

  // Decode the parameter value, replacing '+' with spaces
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var username = getParameterByName('username');

// If 'username' parameter exists in the URL

async function store() {
  try {
    const data1 = score * 10;
    console.log(data1)
    const response = await fetch("/store_recorde", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, score: data1 ,game:'quiz' }) // Convert JSON object to string
    });
    const data = await response;

    if (data.status === 200) {
      alert("Record stored")
    }
  }

  catch (error) {
    console.log('Error :', error);
  }
}
function testing() {
  store()
}
document.addEventListener('DOMContentLoaded', () => {

  const a1 = document.querySelector('.user');
   
  a1.addEventListener('click', (event) => {
    event.preventDefault();
    store();
    window.location.href = `../temp/profile/user.html?username=${username}`;
  });
});