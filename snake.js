const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let d;

function setup() {
    snake = [];
    snake[0] = { x: 10 * scale, y: 10 * scale };
    food = { x: Math.floor(Math.random() * columns) * scale, y: Math.floor(Math.random() * rows) * scale };
    d = { x: 0, y: 0 };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);

    // Draw snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Move snake
    let headX = snake[0].x + d.x;
    let headY = snake[0].y + d.y;

    // Check collision with walls or self
    if (headX >= canvas.width || headX < 0 || headY >= canvas.height || headY < 0 || collision(headX, headY, snake)) {
        setup();
        return;
    }

    // Check if snake eats food
    if (headX === food.x && headY === food.y) {
        food = { x: Math.floor(Math.random() * columns) * scale, y: Math.floor(Math.random() * rows) * scale };
    } else {
        snake.pop();
    }

    snake.unshift({ x: headX, y: headY });
}

function collision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].x === x && array[i].y === y) {
            return true;
        }
    }
    return false;
}

function keyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (d.y === 0) {
                d = { x: 0, y: -scale };
            }
            break;
        case 'ArrowDown':
            if (d.y === 0) {
                d = { x: 0, y: scale };
            }
            break;
        case 'ArrowLeft':
            if (d.x === 0) {
                d = { x: -scale, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (d.x === 0) {
                d = { x: scale, y: 0 };
            }
            break;
    }
}

document.addEventListener('keydown', keyDown);

setup();
setInterval(draw, 100);
