document.getElementById('start-button').addEventListener('click', startGame);

function startGame(){

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    loadLevel(1);

}

function loadLevel(levelNumber){

    document.getElementById('game').innerHTML = '';

    const script = document.createElement('script');
    script.src = `js/levels/level${levelNumber}.js`;
    document.body.appendChild(script);
}

function showMessage(message){
    const gameContainer = document.getElementById('game');
    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    gameContainer.appendChild(messageDiv);
}

function gameOver(){
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('game-over').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    }, 10000);
}