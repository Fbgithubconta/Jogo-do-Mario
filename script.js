const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const game_board = document.querySelector('.game-board');
const reset = document.querySelector('.reset');
const scoreDisplay = document.querySelector('.score');
let score = 0;
let gameRunning = true;

const jump = () => {
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};

let pipeSpeed = 5;

const gameLoop = () => {
  if (!gameRunning) return;

  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const pipePosition = pipe.offsetLeft;

  // Atualiza posição do pipe manualmente
  pipe.style.left = ${pipePosition - pipeSpeed}px;

  if (pipePosition <= 0) {
    pipe.style.left = '100%';
    score++; // Atualiza pontuação ao passar o cano
    scoreDisplay.innerText = Pontuação: ${score};
  }

  if (pipePosition <= 110 && pipePosition > 0 && marioPosition < 60) {
    gameRunning = false;
    pipe.style.animation = 'none';
    mario.src = 'img/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    reset.style.display = 'flex';
  }

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

game_board.addEventListener('touchstart', jump);
document.addEventListener('keydown', jump);
