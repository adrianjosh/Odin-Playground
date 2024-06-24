const choices = ["rock","paper","scissors"];
let humanScore = 0;
let computerScore = 0;
let playerChoice;

let score = document.querySelector(".score");
let message = document.querySelector(".announcer");
let playerChoiceImg = document.querySelector("#player-choice");
let computerChoiceImg = document.querySelector("#computer-choice");
let btn1 = document.querySelector("#button-container");
let reset = document.querySelector(".reset-button");

reset.addEventListener("click", resetGame);

btn1.addEventListener("click", (event) =>{
    let target = event.target;
    if (humanScore < 5 && computerScore < 5 ){
        switch(target.id) {
            case 'rock':
                playerChoice = target.id;
                playGame();
                break;
            case 'paper':
                playerChoice = target.id;
                playGame();
                break;
            case 'scissors':
                playerChoice = target.id;
                playGame();
                break;
        }
    
    }
});

function getComputerChoice() {
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];

    if (computerChoice === "rock"){
        computerChoiceImg.src = "resources/Rock(flipped).png";
    } else if (computerChoice === "paper"){
        computerChoiceImg.src = "resources/Paper(flipped).png";
    } else {
        computerChoiceImg.src = "resources/Scissor(scissor).png";
    }
    return computerChoice;
}

function getHumanChoice() {
    if (playerChoice === "rock"){
        playerChoiceImg.src = "resources/Rock.png";
    } else if (playerChoice === "paper"){
        playerChoiceImg.src = "resources/Paper.png";
    } else {
        playerChoiceImg.src = "resources/Scissor.png";
    }
    return playerChoice;
}

function playRound(humanChoice, computerChoice) {
    if( (humanChoice === "rock" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "rock")
    ) {
        message.textContent = "YOU LOST! :(";
        ++computerScore;
    } else if (humanChoice === computerChoice) {
        message.textContent = "IT'S A TIE :/ ";
    } else if (humanChoice === undefined) {
        alert("That's an invalid choice!");
    } else {
        message.textContent = "YOU WON! :)";
        ++humanScore;
    }

    displayScore();

    if(humanScore === 5) {
        message.textContent = "YOU JUST WON THE GAME!!!";
    } else if (computerScore === 5) {
        message.textContent = "YOU LOST THE GAME!!!";
    }
}

function displayScore() {
    score.textContent = `${humanScore} : ${computerScore}`;
}

function playGame() {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    message.textContent = "LET'S PLAY!";
    computerChoiceImg.src = "resources/question-mark.svg";
    playerChoiceImg.src = "resources/question-mark.svg";
    displayScore();
}