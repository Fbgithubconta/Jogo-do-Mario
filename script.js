const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const game_board = document.querySelector('.game-board');
const reset = document.querySelector('.reset');
const scoreDisplay = document.querySelector('.score');
let score = 0;
let pipeSpeed = 5; // velocidade inicial dos canos
let gameRunning = true;

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump'); // Faz o pulo
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500); // Remove o pulo após 500ms
    }
};

// Função para acelerar a velocidade conforme a pontuação e o tempo
const updateGameSpeed = () => {
    if (score % 5 === 0 && score > 0) { // A cada 5 pontos
        pipeSpeed += 0.5; // Aumenta a velocidade do cano
    }

    // Acelera os canos ao longo do tempo (a cada 10 segundos)
    setTimeout(() => {
        if (gameRunning) {
            pipeSpeed += 0.5; // Aumenta a velocidade do cano
        }
    }, 10000); // Ajusta o tempo (10 segundos)
};

let lastFrameTime = 0;

const loop = (timestamp) => {
    if (!gameRunning) return;

    // Calcular o tempo entre os quadros (FPS)
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    const mario_position = +window.getComputedStyle(mario).bottom.replace('px', ''); // Pega a posição da Mario
    const pipe_position = pipe.offsetLeft; // Pega a posição do cano

    // Acelera o cano conforme a pontuação
    updateGameSpeed();

    // Colisão
    if (pipe_position <= 120 && pipe_position > 0 && mario_position < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipe_position}px`;
        mario.src = 'img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        reset.style.display = 'flex';
        gameRunning = false;
        return;
    }

    pipe.style.left = `${pipe_position - pipeSpeed}px`; // Atualiza a posição do cano com a nova velocidade

    if (pipe_position <= 0) {
        pipe.style.left = '100%'; // Reseta a posição do cano
    }

    // Solicita o próximo quadro (ciclo de animação)
    requestAnimationFrame(loop);
};

// Atualiza a pontuação
const updateScore = () => {
    score++;
    scoreDisplay.innerText = `Pontuação: ${score}`;
};

// Atualiza a pontuação em intervalos regulares (100ms)
setInterval(updateScore, 100);

game_board.addEventListener('touchstart', jump);
document.addEventListener('keydown', jump);

// Começa o loop de animação
requestAnimationFrame(loop);
