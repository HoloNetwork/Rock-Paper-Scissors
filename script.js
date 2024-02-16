let score = JSON.parse(localStorage.getItem('finalScore')) || {wins: 0, losses: 0, ties: 0};
let isAutoPlay = false;
let intervalid;

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
    main('rock');
});
document.querySelector('.js-paper-button')
.addEventListener('click', () => {
    main('paper');
});
document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
    main('scissors');
});
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {main('rock');} 
    if (event.key === 'p') {main('paper');} 
    if (event.key === 's') {main('scissors');}
});

function autoPlay() {
    if (!isAutoPlay) {
        intervalid = setInterval(() => {
            const humanMove = computerResponse();
            main(humanMove);
        }, 1000);
        isAutoPlay = true;
    } else {
        clearInterval(intervalid);
        isAutoPlay = false;
    }
}
function computerResponse() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber < 2/3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}
function main(humanMove) {
    computerMove = computerResponse();
    let result = '';

    const moveResults = {
        rock: { win: 'scissors', lose: 'paper' },
        paper: { win: 'rock', lose: 'scissors' },
        scissors: { win: 'paper', lose: 'rock' }
    };

    if (humanMove === computerMove) {
        result = 'Tie';
    } else {
        result = moveResults[humanMove] && moveResults[humanMove].win === computerMove ? 'You win' : 'You lose';
    }

    console.log(`${humanMove} ${computerMove}`)
    console.log(result);

    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('finalScore', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = `Conclusion ${result}`;
    document.querySelector('.js-move').innerHTML = 
    `Human selected <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${humanMove}-emoji.png">, 
    Computer selected <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png">`;
}
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('finalScore');
    updateScoreElement();
}
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
