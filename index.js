const ctx = main.getContext("2d", { alpha: false });

ctx.lineWidth = 10;
ctx.strokeStyle = "lightgrey";
ctx.fillStyle = "lightgrey";

ctx.font = "50px monospace";
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

const test = {x:0,y:0}
/**
 * Input
 */
keys = new Set()
function onKeyDown (event) { keys.add(event.key);}
document.addEventListener("keydown", onKeyDown) 

function onKeyUp (event) { keys.delete(event.key)}
document.addEventListener("keyup", onKeyUp) 

/**
 * Update
 */
function update(){ 
console.log(keys)
    if (keys.has("ArrowUp")) {
        left.y -= 5
    }

    if (keys.has("ArrowDown") ) {
        left.y += 5
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
let start = 0;
let reset = 10;
function step (timestamp) {
    const delta = timestamp - start;
    if (delta > reset) {
        start += reset;
        update()
        draw()

        ctx.fillText( `start ${start} timestamp: ${Math.floor(timestamp)} delta: ${Math.floor(delta)}`, 50, 50)        
    }

    requestAnimationFrame(step)
};

window.requestAnimationFrame(step)
