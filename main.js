/* Objects: Wins, Losses, and Ties counters */
let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
};
document.getElementById('wins').innerHTML = "Wins: " + score.wins;
document.getElementById('losses').innerHTML = "Losses: "+ score.losses;
document.getElementById('ties').innerHTML = "Ties "+ score.ties;


console.log(JSON.parse(localStorage.getItem('score')));
/*
Lets the user throw a rock, paper, or scissor depending on which button they click.
Lets computer compete against the user by randomly choosing rock, paper, or scissors
*/
document.getElementById("rock").addEventListener("click", computerThinks);
document.getElementById("paper").addEventListener("click", computerThinks);
document.getElementById("scissors").addEventListener("click", computerThinks);

function computerThinks() {
    const computersNumber = Math.random();
    let result = '';
    let computerShoots = '';
    let userChoice = this.id;

    if (computersNumber >= 0 && computersNumber < 1 / 3) {
        computerShoots = 'rock';
    } else if (computersNumber >= 0 && 2 / 3 < computersNumber >= 1 / 3) {
        computerShoots = 'paper';
    } else if (computersNumber >= 0 && 3 >= computersNumber > 2 / 3) {
        computerShoots = 'scissors';
    }

    console.log(`Computer thinks and chooses: ${computerShoots}.`);

    if (computerShoots === userChoice) {
        result = 'Tie.';
    } else if ((computerShoots === 'paper' && userChoice === 'rock') || (computerShoots === 'rock' && userChoice === 'scissors') || (computerShoots === 'scissors' && userChoice === 'paper')) {
        result = 'You lose.';
    } else if ((computerShoots === 'rock' && userChoice === 'paper') || (computerShoots === 'paper' && userChoice === 'scissors') || (computerShoots === 'scissors' && userChoice === 'rock')) {
        result = 'You win.';
    }

    saveResults(result);

    alert(`You picked ${userChoice}. Computer picked ${computerShoots}. ${result}.
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`);

}

function saveResults(result){
    switch(result) {
        case 'You win.':
            score.wins += 1;
            break;
        case 'You lose.':
            score.losses += 1;
            break;
        case 'Tie.':
            score.ties += 1;
        default:
            'There has been an error in the game.';
    }

    localStorage.setItem('score', JSON.stringify(score));
}


