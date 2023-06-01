var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var startBtn = document.getElementById("start-btn");
var pauseBtn = document.getElementById("pause-btn");
var restartBtn = document.getElementById("restart-btn");
var animationId;
var gameRunning = false;

startBtn.addEventListener("click", function () {
  if (!gameRunning) {
    gameRunning = true; 
    loop();
  }
});

pauseBtn.addEventListener("click", function () {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", function () {
  document.location.reload();
});

addEventListener("load", (event) => {
  draw();
});


var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 5;
var ballSpeedY = 5;

var paddleHeight = 80;
var paddleWidth = 10;
var leftPaddleY = canvas.height / 2 - paddleHeight / 2;


var paddleHitScore = 0;
var missedScore = 0;
var maxScore = 10;

canvas.addEventListener("mousemove", function (e) {
  leftPaddleY = e.clientY - canvas.offsetTop;
 
  if (leftPaddleY >= canvas.height - paddleHeight) {
    leftPaddleY = leftPaddleY - paddleHeight;
  }
});


function update() {
 
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX + ballRadius < 0 || ballX + ballRadius > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    paddleHitScore++;
  }

  if (ballX < 0) {
    missedScore++;
    reset();
  }

  if (ballX > canvas.width) {
    reset();
  }

  if (missedScore >= 3 || paddleHitScore == maxScore) {
    document.location.reload();
  }
}

function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 10 - 5;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFF";
  ctx.font = "15px Arial";

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  ctx.fillText("Score: " + paddleHitScore, 10, 20);
  ctx.fillText("Missed: " + missedScore, canvas.width - 70, 20);
}

function loop() {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
}
