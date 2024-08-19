function updateDisplay(value) {
    const maxLength = 12;
    const currentDisplay = display.textContent;

    if (currentDisplay.length === maxLength) return;

    if (result) {
        result = null;
        if (!operator) expression.textContent = "";

        display.textContent = (value === ".") ? "0." : value;
        return;
    }

    if (currentDisplay === "0" && value !== ".") {
        display.textContent = value;
        return;
    }

    if (!(value === "." && currentDisplay.includes("."))) {
        display.textContent += value;
    }
}

function backspace () {
    if (!operator) {
        expression.textContent = "";
    }
    if (display.textContent.length == 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function updateOperator (value) {
    let operatorDisplay; 
    switch (value) {
        case '/':
            operatorDisplay = "÷";
            break;
        case '*':
            operatorDisplay = "×";
            break;
        case '+':
            operatorDisplay = "+";
            break;
        case '-':
            operatorDisplay = "-";
            break;
    }

    if (!operator) {
        operator = value;
    }

    if (!firstNumber) {
        firstNumber = parseFloat(display.textContent);
        display.textContent = "0";
        expression.textContent = firstNumber + operatorDisplay;
    } else if (operator) {
        operate();
        firstNumber = result;
        operator = value;
        display.textContent = "0";
        expression.textContent = firstNumber + operatorDisplay;
    }
}

function clearDisplay () {
    display.textContent = "0";
    expression.textContent = "";
    clearValues();
}

function getDisplayValue () {
    return parseFloat(display.textContent);
}

function clearValues () {
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

function operate () {
    if (operator) {
        secondNumber = parseFloat(display.textContent);
        expression.textContent += secondNumber + "=";
        result = (operators[operator](firstNumber, secondNumber));
        if (result === Infinity) {
            result = "Math Error"
        }
        display.textContent = result;
        clearValues();
    }
}

let operators = {
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '/': function(a, b) { return a / b },
    '*': function(a, b) { return a * b },
};
let operator; 
let firstNumber;
let secondNumber;
let result;
const expression = document.querySelector(".expression");
const display = document.querySelector(".bottomNumber");
