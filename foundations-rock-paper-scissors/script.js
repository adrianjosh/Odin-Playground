const choices = ["rock","paper","scissors"];
let humanScore = 0;
let computerScore = 0;

let userInput;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
    for(i = 0; i < choices.length; i++) { 
        if (userInput === choices[i]) {
            console.log(`Picked ${userInput}`);
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
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);

    console.log(`Your score = ${humanScore}, Computer score = ${computerScore}`);
    if(humanScore >= 5) {
        alert("You won the game!!");
        resetGame();
    } else if (computerScore >= 5) {
        alert("You lost the game!!");
        resetGame();
    }
}

function resetGame() {
    alert("Play Again!");

    humanScore = 0;
    computerScore = 0;
}

let btn1 = document.querySelector("#button-container");
btn1.addEventListener("click", (event) =>{
    let target = event.target;

    switch(target.id) {
        case 'rock':
            userInput = target.id;
            playGame();
            break;
        case 'paper':
            userInput = target.id;
            playGame();
            break;
        case 'scissors':
            userInput = target.id;
            playGame();
            break;
    }
    

});