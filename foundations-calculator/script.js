let firstNum = parseInt(prompt(`Enter the first number`,0));
let operator = prompt(`Enter the operator (+, -, *, /)`,`+`);
let secondNum = parseInt(prompt(`Enter the second number`,0));


function add(sum) {
    return sum.reduce((total, currVal) => total + currVal, 0);
}

function subtract(minus) {
    return minus.reduce((total, currVal) => total - currVal, 0);
}

function multiply(times) {
    return times.reduce((total, currVal) => total * currVal, 1);
}

function divide(division) {
    return division.reduce((total, currVal) => total / currVal);
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