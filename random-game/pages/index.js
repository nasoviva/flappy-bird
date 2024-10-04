const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const bird = new Image();
bird.src = "../assets/images/bird.png";

const background = new Image();
background.src = "../assets/images/background.png";

const floor = new Image();
floor.src = "../assets/images/floor.png";

const enemyUp = new Image();
enemyUp.src = "../assets/images/enemyUp.png";

const enemyBottom = new Image();
enemyBottom.src = "../assets/images/enemyBottom.png";

const music = new Audio();
music.src = "../assets/audio/music.mp3";

const win = new Audio();
win.src = "../assets/audio/win.mp3";

const lose = new Audio();
lose.src = "../assets/audio/lose.mp3";

const score_add = new Audio();
score_add.src = "../assets/audio/score.mp3";

let scores = [];
localStorage.setItem("scores", JSON.stringify(scores));
let savedScores = JSON.parse(localStorage.getItem("scores"));

let x = 100;
let y = 10;
let score = 0;
const gap = 100;
const result = document.querySelector(".result");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
let isGameRunning = false;

let enemy = [];
enemy[0] = {
  x: canvas.width,
  y: 0,
};

function updateScoreTable() {
  const scoreArr = document.querySelectorAll("td");

  for (let i = 0; i < savedScores.length; i++) {
    scoreArr[i + 1].textContent = savedScores[i];
  }
}

function addScore(newScore) {
  savedScores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(savedScores));
  if (savedScores.length > 10) {
    savedScores.shift();
    localStorage.setItem("scores", JSON.stringify(savedScores));
  }
  updateScoreTable();
}

function start() {
  isGameRunning = true;
  music.currentTime = 0;
  score = 0;
  y = 10;
  enemy = [{ x: canvas.width, y: 0 }];
  startButton.classList.remove("open");
  stopButton.classList.add("open");
  draw();
}

function stop() {
  isGameRunning = false;
  music.pause();
  startButton.classList.add("open");
  stopButton.classList.remove("open");
}

function restart() {
  addScore(score);
  if (score < 20) {
    lose.play();
  } else {
    win.play();
  }
  music.currentTime = 0;
  score = 0;
  y = 10;
  enemy = [{ x: canvas.width, y: 0 }];
  startButton.classList.add("open");
  stopButton.classList.remove("open");
  stop();
}

updateScoreTable();

function draw() {
  if (!isGameRunning) {
    return;
  }
  context.drawImage(background, 0, 0, 700, 512);
  for (let i = 0; i < enemy.length; i += 1) {
    context.drawImage(enemyUp, enemy[i].x, enemy[i].y);
    context.drawImage(
      enemyBottom,
      enemy[i].x,
      enemy[i].y + enemyUp.height + gap,
    );

    enemy[i].x -= 1;

    if (enemy[i].x === x - enemyUp.width) {
      score++;
      score_add.play();
    }

    if (
      y >= canvas.height - floor.height - bird.height ||
      y === 0 ||
      score === 20 ||
      (x >= enemy[i].x - bird.width &&
        x <= enemy[i].x + enemyUp.width &&
        (y <= enemy[i].y + enemyUp.height ||
          y >= enemy[i].y + enemyUp.height - bird.height + gap))
    ) {
      restart();
    }
  }
  context.drawImage(floor, 0, canvas.height - floor.height, 700, 512);
  context.drawImage(bird, x, y);

  y += 1;
  
  result.textContent = "Score: " + score;

  if (isGameRunning) {
    requestAnimationFrame(draw);
  }
}

enemyBottom.onload = draw;

startButton.addEventListener("click", () => {
  if (!music.playing) {
    music.play();
  }
  start();
});

stopButton.addEventListener("click", () => {
  stop();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    y -= 15;
  }
});
