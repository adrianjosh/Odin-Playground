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
            row.style.border = "1px solid black";
            row.addEventListener("mouseover", () => {
                row.setAttribute("style", "background-color: black; border: 1px solid black");
            });

            column.appendChild(row);
        }
        container.appendChild(column);
    }
}

function clearCanvas() {
    let rows = document.getElementsByClassName("row");
    for(let row of rows) {
        row.style.backgroundColor = "White";
    }
}

btnClear.addEventListener("click", clearCanvas);

//Runs when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {
    createDiv();
}, false);