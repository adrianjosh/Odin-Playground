const choices = ["rock","paper","scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
    let userInput = prompt("are you rock? paper? or scissors?");

    if (userInput === choices[0]
        || userInput === choices[1]
        || userInput === choices[2]) {

        return userInput.toLowerCase();
    }
}

function playRound(humanChoice, computerChoice) {
    console.log(`u chose ${humanChoice}`);
    console.log(`computer chose ${computerChoice}`);
    if((humanChoice === "rock" && computerChoice === "paper")
        || (humanChoice === "paper" && computerChoice === "scissors")
        || (humanChoice === "scissors" && computerChoice === "rock")) {

        alert("You Lost!");
        ++computerScore;
    } else if (humanChoice === computerChoice) {
        alert("It's a tie!");
        
    } else if (humanChoice === undefined) {
        alert("That's an invalid choice!");
    } else {
        alert("You won!");
        ++humanScore;
    }
}

function playGame() {
    humanScore = 0;
    computerScore = 0;

    alert("Let's play Rock, Paper, Scissors!");
    
    gameRunning = true;
    while(gameRunning) {
        console.log(`Your score = ${humanScore}, Computer score = ${computerScore}`);

        if(humanScore === 5) {
            alert("You won the game!!");
            gameRunning = false;
            break;
        } else if (computerScore === 5) {
            alert("You lost the game!!");
            gameRunning = false;
            break;
        }

        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);
    }
}

playGame();