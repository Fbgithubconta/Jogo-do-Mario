const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const game_board = document.querySelector('.game-board');
const reset = document.querySelector('.reset');

const scoreDisplay = document.createElement('h2');
scoreDisplay.classList.add('score');
game_board.appendChild(scoreDisplay);

let score = 0;
let gameRunning = true;

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition > 0 && pipePosition <= 110 && marioPosition <= 70) {
        // Colisão detectada
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        reset.style.display = 'flex';
        mario.style.marginLeft = '50px'
        gameRunning = false;
        clearInterval(scoreCounter);
        clearInterval(loop);
    }
}, 10);

const scoreCounter = setInterval(() => {
    if (gameRunning) {
        score++;
        scoreDisplay.innerText = `Pontuação: ${score}`;
    }
}, 100);

game_board.addEventListener('touchstart', jump);
document.addEventListener('keydown', jump);
