document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const backgroundAudio = document.getElementById('background-audio');
    const gameOverAudio = document.getElementById('game-over-audio');

    startButton.addEventListener('click', () => {
        startGame(backgroundAudio);
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            jump();
        }
    });
});

function startGame(backgroundAudio) {
    hideElement('start-screen');
    showElement('game');
    backgroundAudio.pause();
    initializeGame();
}

function hideElement(id) {
    document.getElementById(id).style.display = 'none';
}

function showElement(id) {
    document.getElementById(id).style.display = 'block';
}

let score = 0;
let level = 1;
let bananasToCollect = 10;
let timerInterval;
let bananaSpeed = 2;
let obstacleSpeed = 2;

function initializeGame() {
    score = 0;
    level = 1;
    bananasToCollect = 10;
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = '10:00';

    startTimer();
    loadLevel(level);
}

function loadLevel(levelNumber) {
    const game = document.getElementById('game');

    // Clear previous bananas and obstacles
    document.querySelectorAll('.banana, .obstacle').forEach(element => {
        element.remove();
    });

    // Adjust speeds based on level
    bananaSpeed = 2 + (levelNumber - 1) * 0.5;
    obstacleSpeed = 2 + (levelNumber - 1) * 0.5;

    // Create bananas and obstacles
    for (let i = 0; i < levelNumber * 2; i++) {
        createBanana(game);
        createObstacle(game);
    }

    moveElements();
}

function createBanana(game) {
    const banana = document.createElement('div');
    banana.classList.add('banana');
    banana.style.right = '-50px'; // Start off-screen
    banana.style.bottom = `${Math.random() * 300 + 100}px`; // Random height
    game.appendChild(banana);
}

function createObstacle(game) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.right = '-150px'; // Start off-screen
    game.appendChild(obstacle);
}

function moveElements() {
    function update() {
        checkCollision();
        checkBananaCollection();
        moveBananas();
        moveObstacles();
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function moveBananas() {
    document.querySelectorAll('.banana').forEach(banana => {
        let currentRight = parseInt(window.getComputedStyle(banana).right);

        if (currentRight < window.innerWidth) {
            banana.style.right = (currentRight + bananaSpeed) + 'px';
        } else {
            banana.style.right = '-50px'; // Reset position
        }
    });
}

function moveObstacles() {
    document.querySelectorAll('.obstacle').forEach(obstacle => {
        let currentRight = parseInt(window.getComputedStyle(obstacle).right);

        if (currentRight < window.innerWidth) {
            obstacle.style.right = (currentRight + obstacleSpeed) + 'px';
        } else {
            obstacle.style.right = '-150px'; // Reset position
        }
    });
}

function checkCollision() {
    const character = document.getElementById('character');
    const obstacles = document.querySelectorAll('.obstacle');

    const characterRect = character.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            characterRect.right > obstacleRect.left &&
            characterRect.left < obstacleRect.right &&
            characterRect.bottom > obstacleRect.top &&
            characterRect.top < obstacleRect.bottom
        ) {
            gameOver();
        }
    });
}

function checkBananaCollection() {
    const character = document.getElementById('character');
    const bananas = document.querySelectorAll('.banana');

    const characterRect = character.getBoundingClientRect();

    bananas.forEach(banana => {
        const bananaRect = banana.getBoundingClientRect();

        if (
            characterRect.right > bananaRect.left &&
            characterRect.left < bananaRect.right &&
            characterRect.bottom > bananaRect.top &&
            characterRect.top < bananaRect.bottom
        ) {
            // Increment score and check for level completion
            score++;
            document.getElementById('score').innerText = score;

            if (score >= bananasToCollect) {
                level++;
                if (level > 10) {
                    showElement('congratulations');
                    hideElement('game');
                } else {
                    bananasToCollect += 10; // Increase target for next level
                    loadLevel(level);
                }
            }

            // Move banana off-screen
            banana.style.right = '-50px';
        }
    });
}

function jump() {
    const character = document.getElementById('character');
    if (!character.classList.contains('jump')) {
        character.classList.add('jump');
        setTimeout(() => {
            character.classList.remove('jump');
        }, 500);
    }
}

function startTimer() {
    let timeRemaining = 600; // 10 minutes in seconds

    timerInterval = setInterval(() => {
        timeRemaining--;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(timerInterval);
    hideElement('game');
    showElement('game-over');
    playAudio(document.getElementById('game-over-audio'));
}