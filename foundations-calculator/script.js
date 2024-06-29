const display = document.querySelector(".display h1");
const clearBtn = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const operands = document.querySelectorAll(".operand")
const operators = document.querySelectorAll(".operator");


let firstNum = null;
let operator = null;
let secondNum = null;
let tempDisplayValue = null;
let displayValue = "0";

operands.forEach(button => {
    button.addEventListener("click", () => {
        if (displayValue === "0") {
            displayValue = button.value;
        } else {
            displayValue += button.value;
        }
        checkNumberOrder();
        updateDisplay(displayValue);
    })
});

decimal.addEventListener("click", () => {
    if (tempDisplayValue !== null) {
        displayValue = tempDisplayValue;
        tempDisplayValue = null;
    }
    
    if (!displayValue.includes(".")) {
        displayValue += decimal.value;
        updateDisplay(displayValue);
    }
});

sign.addEventListener("click", () => {
    if (tempDisplayValue !== null) {
        displayValue = tempDisplayValue;
        tempDisplayValue = null;
    }
    if (displayValue !== "0") {
        displayValue *= (-1);
        displayValue = `${displayValue}`;
    }
    checkNumberOrder();
    updateDisplay(displayValue);
});

operators.forEach(button => {
    button.addEventListener("click", () => {
        if ((firstNum !== null && secondNum !== null) && operator !== null) {
            calculate();
            operator = button.value;;
            return;
        }

        if (operator !== null) {
            operator = button.value;
            return;
        } else if (operator === null && firstNum !== null) {
            operator = button.value;
            updateDisplay("0");
        }
    })
});

clearBtn.addEventListener("click", () => {
    firstNum = null;
    operator = null;
    secondNum = null;
    tempDisplayValue = null;
    updateDisplay("0");
});

equals.addEventListener("click", () => {
    if ((firstNum !== null && secondNum !== null) && operator !== null) {
        calculate();
        operator = null;
    }
});

function checkNumberOrder() {
    if (operator === null) {
        firstNum = displayValue;
    } else {
        secondNum = displayValue;
    }
}

function calculate() {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    let finalAns = `${operate()}`;
    updateDisplay(finalAns);
    tempDisplayValue = finalAns;
    displayValue = "0";
    secondNum = null;
}

function updateDisplay(value) {
    displayValue = value;

    if(value === null) {
        display.innerText = 0;
    } else {
        display.innerText = displayValue;
    }
}

function add(sum) {
    const totalValue = sum.reduce((total, currVal) => total + currVal, 0);
    firstNum = totalValue;
    return totalValue;
}

function subtract(minus) {
    const totalValue = minus.reduce((total, currVal) => total - currVal);
    firstNum = totalValue;
    return totalValue;
}

function multiply(times) {
    const totalValue = times.reduce((total, currVal) => total * currVal, 1);
    firstNum = totalValue;
    return totalValue;
}

function divide(division) {
    const totalValue = division.reduce((total, currVal) => total / currVal);
    firstNum = totalValue;
    return totalValue;
}

function operate() {
    const numContainer = [firstNum,secondNum];
    if (operator === `+`) {
        return add(numContainer);
    } else if (operator === `-`) {
        return subtract(numContainer);
    } else if (operator === `*`) {
        return multiply(numContainer);
    } else if (operator === `/`) {
        return divide(numContainer);
    }
    
}

//Runs when the DOM is ready
window.addEventListener("DOMContentLoaded", function() {
    updateDisplay("0");
}, false);
