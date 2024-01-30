/* Objects: Wins, Losses, and Ties counters */
let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
};

console.log(JSON.parse(localStorage.getItem('score')));
displayCurrentScores();
/*
Lets the user throw a rock, paper, or scissor depending on which button they click.
Lets computer compete against the user by randomly choosing rock, paper, or scissors
*/
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resetButton = document.getElementById("reset-score");

rockButton.addEventListener("click", () => buttonFunctions("rock"));
paperButton.addEventListener("click", () => buttonFunctions("paper"));
scissorsButton.addEventListener("click", () => buttonFunctions("scissors"));
resetButton.addEventListener("click", resetScore);

function buttonFunctions(choice) {
    changePlayerAvatar(choice);
    computerThinks(choice);
}

function changePlayerAvatar(choice) {
    const playerRock = document.getElementById("player-rock");
    const playerScissors = document.getElementById("player-scissors");
    const playerPaper = document.getElementById("player-paper");
    const playerAvatar = document.getElementById("player");

    if (choice == "rock") {
        playerAvatar.src = playerRock.src;
    } else if (choice == "paper") {
        playerAvatar.src = playerPaper.src;
    } else if (choice == "scissors") {
        playerAvatar.src = playerScissors.src;
    }

    returnUserAvatar();
}

function displayCurrentScores() {
    document.getElementById('wins').innerHTML = "Wins: " + score.wins;
    document.getElementById('losses').innerHTML = "Losses: " + score.losses;
    document.getElementById('ties').innerHTML = "Ties: " + score.ties;
}


function computerThinks(choice) {
    const computersNumber = Math.random();
    let result = '';
    let computerShoots = '';
    let userChoice = choice;

    if (computersNumber >= 0 && computersNumber < 1 / 3) {
        computerShoots = 'rock';
        let computerRock = document.getElementById('computer-rock');
        let computerAvatar = document.getElementById('enemy');
        computerAvatar.src = computerRock.src;
        // Return img to original img
        returnComputerAvatar();
    } else if (computersNumber >= 0 && 2 / 3 < computersNumber >= 1 / 3) {
        computerShoots = 'paper';
        let computerPaper = document.getElementById('computer-paper');
        let computerAvatar = document.getElementById('enemy');
        computerAvatar.src = computerPaper.src;
        // Return img to original img
        returnComputerAvatar();
    } else if (computersNumber >= 0 && 3 >= computersNumber > 2 / 3) {
        computerShoots = 'scissors';
        let computerScissors = document.getElementById('computer-scissors');
        let computerAvatar = document.getElementById('enemy');
        computerAvatar.src = computerScissors.src;
        returnComputerAvatar();
    }

    console.log(`Computer thinks and chooses: ${computerShoots}.`);

    if (computerShoots === userChoice) {
        result = 'Tie.';
        displayResult(result);
    } else if ((computerShoots === 'paper' && userChoice === 'rock') || (computerShoots === 'rock' && userChoice === 'scissors') || (computerShoots === 'scissors' && userChoice === 'paper')) {
        result = 'You lose.';
        displayResult(result);
    } else if ((computerShoots === 'rock' && userChoice === 'paper') || (computerShoots === 'paper' && userChoice === 'scissors') || (computerShoots === 'scissors' && userChoice === 'rock')) {
        result = 'You win.';
        displayResult(result);
    }
    saveResults(result);
    console.log(`You picked ${userChoice}. Computer picked ${computerShoots}. ${result}.
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`);
}

function saveResults(result) {
    switch (result) {
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
    displayCurrentScores();
    localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    displayCurrentScores();
}

function returnComputerAvatar() {
    setTimeout(function () {
        computerAvatar = document.getElementById('enemy');
        computerAvatar.src = "src/computer.png";
        console.log("Computer variable returned to normal img.");
    }, 3000);
}

function returnUserAvatar() {
    setTimeout(function () {
        playerAvatar = document.getElementById('player');
        playerAvatar.src = "src/thonk.webp";
        console.log("User Variable returned to normal img.");
    }, 3000);
}

function displayResult(result) {
    youWin = document.getElementById('winResult');
    youLose = document.getElementById('loseResult');
    youTied = document.getElementById('tieResult');
    setTimeout(function () {
        switch (result) {
            case 'You win.':
                youWin.style.display = "block";
                youLose.style.display = "none";
                youTied.style.display = "none";
                break;
            case 'You lose.':
                youLose.style.display = "block";
                youWin.style.display = "none";
                youTied.style.display = "none";
                break;
            case 'Tie.':
                youTied.style.display = "block";
                youWin.style.display = "none";
                youLose.style.display = "none";
            default:
                console.log('There has been an error in the game.');
        }
    }, 1000);
}