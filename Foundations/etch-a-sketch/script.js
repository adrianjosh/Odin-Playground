const container = document.querySelector(".container")
const btnResize = document.querySelector("#grid-size");
const btnClear = document.querySelector("#clear-canvas");

function createDiv(size = 16) {
    for(let i = 0; i < size; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < size; j++) {
            let row = document.createElement("div");
            row.classList.add("row");
            row.addEventListener("mouseover", () => {
                row.setAttribute("style", "background-color: black;");
            });

            column.appendChild(row);
        }
        container.appendChild(column);
    }
}

function resizeCanvas() {
    let userInput = prompt("Enter the desired grid size between 1 - 100");

    while(true){
        if(userInput < 1 || userInput > 100) {
            userInput = prompt("Enter the desired grid size between 1 - 100");
        } else {
            break;
        }
    }
    removeGrid();
    createDiv(userInput);
}

function clearCanvas() {
    const rows = document.getElementsByClassName("row");
    for(let row of rows) {
        row.style.backgroundColor = "White";
    }
}

function removeGrid() {
    while(container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

//Runs when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {
    createDiv();
    btnClear.addEventListener("click", clearCanvas);
    btnResize.addEventListener("click", resizeCanvas);
}, false);