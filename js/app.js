const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('.header');
const levelButtons = document.querySelector('.levels');




// values
let ballX = canvas.width / 2;
let ballY = canvas.height - 40;
let dx = 1;
let dy = -1;
const ballRadius = 10;
const paletteHeight = 20;
const paletteWidth = 150;
let paletteX = (canvas.width - paletteWidth) / 2;
let left = false;
let right = false;
let paint = false;
let count = 0;


//functions

const createButton = (level) => {
    const element = document.createElement('button');
    element.className = 'level';
    element.textContent = level;
    element.style.cursor = 'pointer';
    levelButtons.appendChild(element);
    header.textContent = "Choose a level"
    element.addEventListener('click', (e) => {;

        const level = parseInt(element.textContent);
        element.classList.add('active');
        levelButtons.style.pointerEvents = "none";
        dx = dx * level;
        dy = dx * level;
        start();

    })}

function start() {
    draw();
    header.textContent = "Punkty: 0";
    button.style.pointerEvents = "none";
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f15151';
    ctx.stroke();
    ctx.fill();
};

function drawPalette() {
    ctx.beginPath();
    ctx.rect(paletteX, canvas.height - paletteHeight, paletteWidth, paletteHeight);
    ctx.fillStyle = '#f15151';
    ctx.fill();
    ctx.closePath();

}


function draw() {
    paint = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(draw);
    drawBall();
    drawPalette();
    ballX += dx;
    ballY += dy;

    if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
        dx = -dx;
    }
    if (ballY + dy < ballRadius) {
        dy = -dy;
    } else if (ballY + dy > canvas.height - 2*ballRadius) {

        if (ballX> paletteX && ballX < paletteX + paletteWidth) {
            dy = -dy;
            header.textContent = 'Punkty:' + count++;

        } else {
            header.textContent = "The end. Try again";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(reload, 1000);

        }
    }


    if (right) {
        paletteX += 7;
        if (paletteX + paletteWidth > canvas.width) {
            paletteX = canvas.width - paletteWidth
        };
    } else if (left) {
        paletteX -= 7;
        if (paletteX < 0) {
            paletteX = 0
        }
    }
}

//Move the pallete

const keyDown = function keyDown(e) {
    if (e.keyCode == '39') {
        right = true;
    }
    if (e.keyCode == '37') {
        left = true;
    }
};


const keyUp = function keyUp(e) {
    if (e.keyCode == 39) {
        right = false;
    }
    if (e.keyCode == 37) {
        left = false;
    }

};


function reload() {
    location.reload(true);
};


// Create a level buttons
createButton(1);
createButton(2);
createButton(3);


// eventlisteners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);