const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const game_board = document.querySelector('.game-board')
const reset = document.querySelector('.reset')
const scoreDisplay = document.querySelector('.score')
let score = 0;
const jump = () => {
    mario.classList.add('jump')//Faz o pulo
    setTimeout(()=>{
        mario.classList.remove('jump')
    },500)//Remove o pulo
}

//Colisão
const loop = setInterval(()=>{
    const mario_position = +window.getComputedStyle(mario).bottom.replace('px', '');//Pega propriedades da img
    const pipe_position = pipe.offsetLeft;
    console.log(pipe_position)

    if(pipe_position<=120 && pipe_position>0 && mario_position<80){
        pipe.style.animation = 'none'
        pipe.style.left = `${pipe_position}px`
        mario.src = 'img/game-over.png'
        mario.style.width= '75px'
        mario.style.marginLeft = '50px'
        reset.style.display ='flex'
        clearInterval(loop)
        clearInterval(updateScore); // Para o score ao terminar o jogo
    }

}, 10)

const updateScore = setInterval(() => {
    score++;
    scoreDisplay.innerText = `Pontuação: ${score}`;
  }, 100); // Atualiza a cada 100ms

game_board.addEventListener('touchstart', jump);
document.addEventListener('keydown', jump)

