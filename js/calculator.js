const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let buffer = null;
let register = null;
let opCode = null;

let numberButtons = document.querySelectorAll('.number-button');
let operatorButtons = document.querySelectorAll('.operator-button');
let clearButton = document.querySelector('#c-button');
let evaluateButton = document.querySelector('#evaluate-button')
let decimalButton = document.querySelector('#decimal-button');
let negateButton = document.querySelector('#negate-button');
let percentageButton = document.querySelector('#percentage-button');

initiateCalc();

function initiateCalc() {
    numberButtons.forEach(button => {
        button.addEventListener('click', appendDigit);
        button.addEventListener('click', changeClearButton);
    });
    operatorButtons.forEach(button => button.addEventListener('click', setOpCode));
    clearButton.addEventListener('click', clear);
    evaluateButton.addEventListener('click', evaluate);
    decimalButton.addEventListener('click', addDecimal);
    decimalButton.addEventListener('click', changeClearButton);
    negateButton.addEventListener('click', negate);
    percentageButton.addEventListener('click', percentage);
}

function changeClearButton() {
    clearButton.textContent = 'C';
}

function appendDigit(button) {
    if (buffer === null) {
        buffer = button.target.textContent;
    } else {
        buffer = `${buffer}${button.target.textContent}`;
    }

    updateDisplay(buffer);
}

function addDecimal() {        
    if (buffer !== null && buffer.includes('.')) return;

    buffer = buffer !== null ? buffer += '.' : buffer = '0.';

    updateDisplay(buffer);
}

function updateDisplay(output) {
    let display = document.querySelector('#display');
    display.value = output;
}

function clear() {
    if (buffer !== null) {
        buffer = null;
    } else {
        buffer = null;
        register = null;
        op = null;    
    }

    clearButton.textContent = 'AC';
    updateDisplay('0');
}

function setOpCode(button) {
    if (buffer !== null) {
        register = register !== null ? operate(opCode, register, buffer) : buffer;    
        buffer = null;
    }
    
    opCode = button.target.value;
    
    updateDisplay(register);
}


function operate(operator, firstNumber, secondNumber) {
    if (!OPERATORS.includes(operator)) {
        throw `Invalid operator: ${operator} is not a valid operator.`;
    }

    switch (operator) {
        case 'add':
            return add(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
    }
}

function add(firstNumber, secondNumber) {
    return Number(firstNumber) + Number(secondNumber);
}

function subtract(firstNumber, secondNumber) {
    return Number(firstNumber) - Number(secondNumber);
}

function multiply(firstNumber, secondNumber) {
    return Number(firstNumber) * Number(secondNumber);
}

function divide(numerator, denominator) {
    return Number(numerator) / Number(denominator);
}

function evaluate() {
    if (opCode === null) {
        if (buffer === null) {
            updateDisplay('0');
        } else {
            updateDisplay(buffer);
        }
        return;
    }

    if (buffer !== null) {
        register = operate(opCode, register, buffer);
        buffer = null;

        updateDisplay(register);
    }
}

function negate() {
    if (buffer === null) {
        register = Number(register) * -1;
        updateDisplay(register);
    } else {
        buffer = Number(buffer) * -1;
        updateDisplay(buffer);
    }
}

function percentage() {
    if (opCode !== null && buffer !== null) {
        buffer = Number(buffer) * 0.01;
        updateDisplay(buffer);
    } else {
        register = Number(register) * 0.01;
        updateDisplay(register);
    }
    
}