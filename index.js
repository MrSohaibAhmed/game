// Snake Game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 30;
let direction;
const snake = [];

snake[0] = { x: 10 * boxSize, y: 10 * boxSize };

let food = {
  x: Math.floor(Math.random() * 20) * boxSize,
  y: Math.floor(Math.random() * 20) * boxSize,
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode === 38 && direction !== "DOWN") {
    direction = "UP";
  } else if (event.keyCode === 39 && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode === 40 && direction !== "UP") {
    direction = "DOWN";
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "black" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= boxSize;
  if (direction === "UP") snakeY -= boxSize;
  if (direction === "RIGHT") snakeX += boxSize;
  if (direction === "DOWN") snakeY += boxSize;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * boxSize,
      y: Math.floor(Math.random() * 20) * boxSize,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);
}

const game = setInterval(draw, 100);
