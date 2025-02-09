const ctx = main.getContext("2d", { alpha: false });

ctx.lineWidth = 10;
ctx.strokeStyle = "lightgrey";
ctx.fillStyle = "lightgrey";

ctx.font = "36px monospace";
/**
 * Objects
 */
const paddle = {
    width: 40,
    height: 200,
};

const left = {
    x: 80,
    y: 360,
};

const right = {
    x: main.width - 120,
    y: 360,
};

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
let speed = 2

/**
 * Update
 */
function update(timestamp) {
    if (keys.has("ArrowUp")) {
        if (left.y > 0) {
            left.y -= frameTime + speed
        }
        
    }

    if (keys.has("ArrowDown")) {
        if (left.y < PADDLE_MAX_Y)
        left.y += frameTime + speed
    }

    if (keys.has("w")) {
        if (right.y > 0) {
            right.y -= frameTime + speed
        }
        
    }

    if (keys.has("s")) {
        if (right.y < PADDLE_MAX_Y) {
            right.y += frameTime + speed
        }
    }
}

/**
 * Draw
 */
function draw() {
    ctx.clearRect(0, 0, main.width, main.height);

    ctx.fillRect(left.x, left.y, paddle.width, paddle.height);
    ctx.fillRect(right.x, right.y, paddle.width, paddle.height);

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
