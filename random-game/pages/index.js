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
  alert("Start Game?");
  document.addEventListener("keydown", () => {
    if (!music.playing) {
      music.play();
    }
  });
}

function restart() {
  addScore(score);
  music.pause();
  if (score < 20) {
    lose.play();
    alert(`Game Over! Your score: ${score}`);
  } else {
    win.play();
    alert(`You Win! Your score: ${score}`);
  }
  music.currentTime = 0;
  score = 0;
  y = 10;
  enemy = [{ x: canvas.width, y: 0 }];
  start();
}

updateScoreTable();
start();

function draw() {
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
  }
  context.drawImage(floor, 0, canvas.height - floor.height, 700, 512);
  context.drawImage(bird, x, y);

  y += 1;

  if (
    y === canvas.height - floor.height - bird.height ||
    y === 0 ||
    score === 20
  ) {
    restart();
  }
  result.textContent = "Score: " + score;
  requestAnimationFrame(draw);
}

enemyBottom.onload = draw;
music.play();

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    y -= 15;
  }
});
