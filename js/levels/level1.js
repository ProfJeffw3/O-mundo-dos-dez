function setupLevel1() {
    const game = document.getElementById('game');

    // Verificar se o fundo já foi adicionado
    let background = document.getElementById('background');
    if (!background) {
        background = document.createElement('div');
        background.id = 'background';
        game.appendChild(background);
    }
    background.style.background = 'url(../assets/imagens/background.jpg) no-repeat center center';
    background.style.backgroundSize = 'cover';
    background.style.width = '100%';
    background.style.height = '100%';

    // Criar e posicionar o personagem (macaco)
    let character = document.getElementById('character');
    if (!character) {
        character = document.createElement('div');
        character.id = 'character';
        game.appendChild(character);
    }
    character.style.bottom = '0px'; // Alinhado ao fundo do jogo
    character.style.left = '100px';  // Posição inicial do personagem

    // Criar o obstáculo (pássaro)
    let obstacle = document.getElementById('obstacle');
    if (!obstacle) {
        obstacle = document.createElement('div');
        obstacle.id = 'obstacle';
        game.appendChild(obstacle);
    }
    obstacle.style.top = '0px'; // Posição inicial do obstáculo (no céu)
    obstacle.style.left = '800px'; // Posição inicial do obstáculo
    moveObstacle(obstacle);

    // Criar bananas
    spawnBananas(10); // Número de bananas para este nível

    // Atualizar o placar e o cronômetro
    document.getElementById('score').innerText = `Bananas: 0/10`;
    document.getElementById('timer').innerText = `Tempo: 10:00`;
}

function moveObstacle(obstacle) {
    const interval = setInterval(() => {
        const currentLeft = parseInt(obstacle.style.left, 10);
        if (currentLeft <= 0) {
            clearInterval(interval);
            obstacle.remove();
        } else {
            obstacle.style.left = `${currentLeft - 5}px`;
        }

        if (checkCollision(obstacle, document.getElementById('character'))) {
            gameOver();
        }
    }, 50);
}

function spawnBananas(number) {
    for (let i = 0; i < number; i++) {
        spawnBanana();
    }
}

function spawnBanana() {
    const game = document.getElementById('game');
    const banana = document.createElement('div');
    banana.className = 'banana';
    banana.style.top = `${Math.random() * (game.clientHeight - 32)}px`;
    banana.style.left = `${Math.random() * (game.clientWidth - 32)}px`;
    game.appendChild(banana);
}

// Apenas chamar setupLevel1 ao carregar o nível