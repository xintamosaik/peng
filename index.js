console.log(main);
const ctx = main.getContext("2d", { alpha: false });
ctx.lineWidth = 10;
ctx.strokeStyle = "lightgrey";
ctx.fillStyle = "lightgrey";
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
function update() {

    test.x = Math.floor(Math.random() * 10);

    test.y = Math.floor(Math.random() * 10);
}
function draw() {
    ctx.clearRect(0, 0, main.width, main.height);
    ctx.fillRect(left.x, left.y, paddle.width, paddle.height);

    ctx.fillRect(right.x, right.y, paddle.width, paddle.height);

    ctx.fillRect(test.x,test.y,16,16); // fill in the pixel at (10,10)
}


let start = 0;
const stop = 1000;
function step (timestamp) {
    const delta = timestamp - start;
    console.log(delta, timestamp, start);
    update()
    draw()
    if (delta < stop) {
        requestAnimationFrame(step);
    }
};



window.requestAnimationFrame(step)
