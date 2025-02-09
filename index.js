const ctx = main.getContext("2d", { alpha: false });

ctx.lineWidth = 10;
ctx.font = "36px monospace";

const score = {
    left: 0,
    right: 0,
}

/**
 * Objects
 */
const SIDE_MARGIN = 80;

const paddle = {
    width: 40,
    height: 200,
};

const left = {
    x: SIDE_MARGIN,
    y: main.height / 2 - paddle.height / 2,
};

const right = {
    x: main.width - SIDE_MARGIN - paddle.width,
    y: main.height / 2 - paddle.height / 2,
};

const center = {
    x: main.width / 2,
    y: main.height / 2,
}

const ball = {
    width: 20,
    height: 20,
    x: center.x - 10,
    y: center.y - 10,
    dx: 1,
    dy: 1,
}

const PADDLE_MAX_Y = main.height - paddle.height;

/**
 * Input
 */
keys = new Set()
function onKeyDown(event) {
    keys.add(event.key);
}
document.addEventListener("keydown", onKeyDown)

function onKeyUp(event) {
    keys.delete(event.key)
}
document.addEventListener("keyup", onKeyUp)

/**
 * Game Loop Components
 */
let lastTime = 0;
let frameTime = 8;
let delta = 0
let speed = 8

/**
 * Update
 */
function update(timestamp) {
    if (keys.has("w")) {
        if (left.y > 0) {
            left.y -= frameTime + speed
        }
    }

    if (keys.has("s")) {
        if (left.y < PADDLE_MAX_Y)
            left.y += frameTime + speed
    }

    if (keys.has("ArrowUp")) {
        if (right.y > 0) {
            right.y -= frameTime + speed
        }
    }

    if (keys.has("ArrowDown")) {
        if (right.y < PADDLE_MAX_Y) {
            right.y += frameTime + speed
        }
    }

    ball.x += ball.dx * speed;
    ball.y += ball.dy * speed;


    if (ball.y >= (main.height - ball.height)) {
        ball.dy = -1
    }

    if (ball.y <= 0) {
        ball.dy = 1
    }

    if (ball.x >= main.width - ball.width) {
        score.left += 1
        ball.x = center.x;
        ball.y = center.y;
        ball.dx = -1
        ball.dy = 1
    }

    if (ball.x <= 0) {
        score.right += 1
        ball.x = center.x;
        ball.y = center.y;
        ball.dx = 1
        ball.dy = 1
    }

    const atLeft = (ball.x > left.x && ball.x < left.x + paddle.width)
    if (atLeft) {
        const touch = (ball.y > left.y && ball.y < left.y + paddle.height)
        if (touch) { ball.dx = 1 }
    }

    const atRight = (ball.x > right.x && ball.x < right.x + paddle.width)
    if (atRight) {
        const touch = (ball.y > right.y && ball.y < right.y + paddle.height)
        if (touch) { ball.dx = -1 }
    }

}

/**
 * Draw
 */
function draw() {
    ctx.clearRect(0, 0, main.width, main.height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, main.width, main.height);
    ctx.fillStyle = "limegreen";
    ctx.fillRect(left.x, left.y, paddle.width, paddle.height);
    ctx.fillRect(right.x, right.y, paddle.width, paddle.height);
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
    ctx.fillText(`${score.left} : ${score.right}`, main.width / 2 - 42, 40)
}

/**
 * Loop
 */
function step(timestamp) {
    delta = timestamp - lastTime;
    if (delta >= frameTime) {
        lastTime = timestamp;
        update(timestamp)
        draw()

    }

    requestAnimationFrame(step)
};

window.requestAnimationFrame(step)
