const container = document.querySelector(".container")


function createDiv(gridSize = 16) {
    for(let i = 0; i < gridSize; i++) {
        let column = document.createElement("div");
        column.classList.add("column");
        for (let j = 0; j < gridSize; j++) {
            let row = document.createElement("div");
            row.classList.add("row");
            row.style.border = "1px solid black";
            column.appendChild(row);
        }
        container.appendChild(column);
    }
}