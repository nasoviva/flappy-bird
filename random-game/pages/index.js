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

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    y -= 15;
  }
});

let enemy = [];

enemy[0] = {
  x: canvas.width,
  y: 0,
};

function draw() {
  context.drawImage(background, 0, 0, 700, 512);
  context.drawImage(enemyUp, 200, 0);
  context.drawImage(enemyBottom, 200, enemyUp.height + gap);
  context.drawImage(floor, 0, canvas.height - floor.height, 700, 512);
  context.drawImage(bird, x, y);

  y += 1;

  if (y === canvas.height - floor.height - bird.height) {
    location.reload();
  }

  requestAnimationFrame(draw);
}

enemyBottom.onload = draw;
