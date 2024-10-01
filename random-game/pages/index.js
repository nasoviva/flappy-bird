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

const bird_audio = new Audio();
bird_audio.src = "../assets/audio/bird.mp3";

const score_audio = new Audio();
score_audio.src = "../assets/audio/score.mp3";

let x = 10;
let y = 10;
let score = 0;
const gap = 100;

function draw() {
  context.drawImage(background, 0, 0, 900, 1000);
  context.drawImage(enemyUp, 100, 0);
  context.drawImage(enemyBottom, 100, 0 + enemyUp.height + gap);
  context.drawImage(floor, 0, canvas.height - floor.height, 900, 300);
  context.drawImage(bird, x, y);

  requestAnimationFrame(draw);
}

enemyBottom.onload = draw;
