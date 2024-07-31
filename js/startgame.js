document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-button');
    const backgroundAudio = document.getElementById('background-audio');

    // Tentar tocar o áudio ao carregar a página
    backgroundAudio.play().catch(error => {
        console.log('Playback prevented:', error);

        // Adicionar um listener para tocar o áudio quando o usuário interagir com a página
        document.body.addEventListener('click', () => {
            backgroundAudio.play().catch(err => console.log('Playback prevented again:', err));
        }, { once: true });
    });

    startButton.addEventListener('click', () => {
        startGame(backgroundAudio);
    });
});

function startGame(backgroundAudio) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Pausar o áudio de fundo
    backgroundAudio.pause();
    loadLevel(1);
}

function loadLevel(levelNumber) {
    document.getElementById('game').innerHTML = '';

    const script = document.createElement('script');
    script.src = `js/levels/level${levelNumber}.js`;
    document.body.appendChild(script);
}

function showMessage(message) {
    const gameContainer = document.getElementById('game');
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    gameContainer.appendChild(messageDiv);
}

function gameOver() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    }, 10000);
}