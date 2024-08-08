const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const botaoIniciar = document.querySelector('.btn-start');
const clouds = document.querySelector('.clouds');
const divJogo = document.querySelector('.game-board');
const contador = document.querySelector('.contador')
const audio = document.querySelector('.audio-jump')
const pontuacao = document.createElement('p')

let loop;
let pontos = 0

const jump = () => {
    mario.classList.add('jump');
    audio.play()
    pontos++
    contador.textContent = pontos


    setTimeout(() => {
        mario.classList.remove('jump');
    }, 450);
};

const startGame = () => {
    mario.src = 'images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
    mario.style.animation = '';
    
    pipe.style.animation = '';
    pipe.style.display = 'block';
    pipe.style.left = '';

    clouds.style.animation = '';

    divJogo.classList.remove('overlay');

    pipe.classList.add('pipe-animation');
    clouds.classList.add('clouds-animation');

    botaoIniciar.style.display = 'none';


    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clouds.style.animation = 'none';
            divJogo.classList.add('overlay');
            botaoIniciar.style.display = 'block';
            botaoIniciar.textContent = 'Jogar de novo';

           
            pontuacao.classList.add('pontuacaoTotal')
            pontuacao.textContent = `sua pontuação foi: ${pontos}`
            divJogo.appendChild(pontuacao)
            pontos = 0
            contador.textContent = pontos

            clearInterval(loop);
        }

    }, 10);

    

    document.addEventListener('keydown', jump);
    
};

botaoIniciar.addEventListener('click', () => {
    if (loop) {
        clearInterval(loop); 
    }
    if(divJogo.contains(pontuacao)){
        divJogo.removeChild(pontuacao)
    }
    startGame(); 
});

