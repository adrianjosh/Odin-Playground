const choices = ["rock","paper","scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
    let userInput = prompt("Are you rock? paper? or scissors?");
    for(i = 0; i < choices.length; i++) { 
        if (userInput === choices[i]) {
            return userInput.toLowerCase();
        }
    }
}

function playRound(humanChoice, computerChoice) {
    console.log(`You chose ${humanChoice}`);
    console.log(`Computer chose ${computerChoice}`);
    if( (humanChoice === "rock" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "rock")
    ) {
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

    let startMessage = confirm("Let's play Rock, Paper, Scissors?");
    if (startMessage) {
        alert("Alright here we go!");
    } else {
        alert("You cancelled the operation");
        return;
    }
    
    gameRunning = true;
    while(gameRunning) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();

        playRound(humanSelection, computerSelection);

        console.log(`Your score = ${humanScore}, Computer score = ${computerScore}`);
        if(humanScore === 5) {
            alert("You won the game!!");
            gameRunning = false;
        } else if (computerScore === 5) {
            alert("You lost the game!!");
            gameRunning = false;
        }
    }
}

playGame();