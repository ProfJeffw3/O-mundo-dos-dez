// Adiciona um listener para o evento 'DOMContentLoaded', que é disparado quando o HTML foi completamente carregado e analisado
document.addEventListener('DOMContentLoaded', (event) => {
    // Seleciona o botão de início e o áudio de fundo pelo id
    const startButton = document.getElementById('start-button');
    const backgroundAudio = document.getElementById('background-audio');

    // Tenta tocar o áudio de fundo quando a página carrega
    backgroundAudio.play().catch(error => {
        console.log('Playback prevented:', error);

        // Se o áudio não puder ser reproduzido devido a restrições de autoplay, adiciona um listener para tocar o áudio quando o usuário clicar na página
        document.body.addEventListener('click', () => {
            backgroundAudio.play().catch(err => console.log('Playback prevented again:', err));
        }, { once: true }); // O listener será removido após o primeiro clique
    });

    // Adiciona um listener para o botão de início que chama a função startGame quando o botão é clicado
    startButton.addEventListener('click', () => {
        startGame(backgroundAudio);
    });

    // Adiciona um listener para o evento de teclado que verifica se a tecla pressionada é a barra de espaço ('Space') e chama a função jump se for
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            jump();
        }
    });
});

// Função que inicia o jogo
function startGame(backgroundAudio) {
    // Esconde a tela de início e mostra o contêiner do jogo
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Pausa o áudio de fundo
    backgroundAudio.pause();
    // Carrega o nível 1 do jogo
    loadLevel(1);
    resetPositions();
}

// Função que carrega o conteúdo e scripts específicos de um nível
function loadLevel(levelNumber) {
    // Atualiza o conteúdo HTML do contêiner do jogo para incluir seções para plano de fundo, personagem e obstáculo
    document.getElementById('game').innerHTML = `
        <section id="background"></section>
        <section id="character"></section>
        <section id="obstacle"></section>
    `;

    // Cria um novo elemento de script para carregar o script do nível específico
    const script = document.createElement('script');
    script.src = `js/levels/level${levelNumber}.js`;
    document.body.appendChild(script); // Adiciona o script ao corpo do documento
}

// Função que faz o personagem pular
function jump() {
    const character = document.getElementById('character');
    // Adiciona a animação de pulo ao personagem
    character.style.animation = 'jump 500ms ease-out';
    // Remove a animação após a duração da animação
    setTimeout(() => {
        character.style.animation = '';
    }, 500);
}

// Função que verifica continuamente se há colisão entre o personagem e o obstáculo
const loop = setInterval(() => {
    const character = document.getElementById('character');
    const obstacle = document.getElementById('obstacle');

    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    console.log('Character Rect:', characterRect);
    console.log('Obstacle Rect:', obstacleRect);

    // Verifica se há uma colisão entre o personagem e o obstáculo
    if (obstacleRect.right > characterRect.left && 
        obstacleRect.left < characterRect.right && 
        obstacleRect.bottom > characterRect.top && 
        obstacleRect.top < characterRect.bottom) {
        console.log('Collision detected');
        gameOver();
    }
}, 20); // Executa a verificação a cada 20 milissegundos

// Função que exibe uma mensagem no contêiner do jogo
function showMessage(message) {
    const gameContainer = document.getElementById('game');
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message; // Define o texto da mensagem
    gameContainer.appendChild(messageDiv); // Adiciona a mensagem ao contêiner do jogo
}

// Função que lida com o fim do jogo
function gameOver() {
    // Esconde o contêiner do jogo e mostra a tela de game over
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';
    clearInterval(loop); // Para o loop ao detectar colisão

    // Após 10 segundos, esconde a tela de game over e mostra a tela de início
    setTimeout(() => {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
        // Reinicia o jogo
        resetGame();
    }, 10000);
}

// Função que reinicia o jogo
function resetGame() {
    // Mostra a tela de início e esconde o contêiner do jogo
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
    // Pode adicionar lógica adicional de reinício aqui, se necessário
}

// Função que reinicia as posições dos elementos
function resetPositions() {
    const character = document.getElementById('character');
    const obstacle = document.getElementById('obstacle');
    character.style.left = '50px';
    character.style.top = '300px';
    obstacle.style.left = '600px';
    obstacle.style.top = '300px';
}