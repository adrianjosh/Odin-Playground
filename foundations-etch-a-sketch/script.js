const container = document.querySelector(".container")

function createDiv(gridSize = 16) {
    for(let i = 0; i < gridSize; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < gridSize; j++) {
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

//Runs when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {
    createDiv();
}, false);