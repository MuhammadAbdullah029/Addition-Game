let num1 = 0;
let num2 = 0;
let options = [];
let score = 0;
let timeLeft = 7;
let gameTime = 0;
let timerInterval, gameInterval;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const gameTimeEl = document.getElementById('game-time');
const audio = document.getElementById('beep-sound');

function generateQuestion() {
  num1 = Math.floor(Math.random() * 100);
  num2 = Math.floor(Math.random() * 100);
  const correctAnswer = num1 + num2;

  const wrongOption1 = correctAnswer + Math.floor(Math.random() * 20) + 1;
  const wrongOption2 = correctAnswer - Math.floor(Math.random() * 20) + 1;

  options = [correctAnswer, wrongOption1, wrongOption2]
    .sort(() => Math.random() - 0.5);

  questionEl.textContent = `${num1} + ${num2} = ?`;
  optionsEl.innerHTML = '';

  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(option));
    optionsEl.appendChild(button);
  });

  feedbackEl.textContent = '';
  resetTimer();
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = num1 + num2;

  if (selectedAnswer === correctAnswer) {
    score++;
    feedbackEl.textContent = '😄';
  } else {
    feedbackEl.textContent = '😢';
  }

  scoreEl.textContent = `Score: ${score}`;
  setTimeout(generateQuestion, 1000);
}

function startGame() {
  generateQuestion();
  gameInterval = setInterval(() => {
    gameTime++;
    if (gameTime >= 60) {
      audio.play();
    }
    gameTimeEl.textContent = `Game Time: ${gameTime} seconds`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 5;
  timerEl.textContent = `Time Left: ${timeLeft} seconds`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      generateQuestion();
    }
  }, 1000);
}

// Start the game on load
startGame();
