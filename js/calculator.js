const OPERATORS = ['add', 'subtract', 'multiply', 'divide'];

let buffer = null;
let register = null;
let opCode = null;

let numberButtons = document.querySelectorAll('.number-button');
let operatorButtons = document.querySelectorAll('.operator-button');
let clearButton = document.querySelector('#c-button');
// let allClearButton = document.querySelector('#ac-button');
let evaluateButton = document.querySelector('#evaluate-button')
let decimalButton = document.querySelector('#decimal-button');
let negateButton = document.querySelector('#negate-button');

initiateCalc();

function initiateCalc() {
    numberButtons.forEach(button => {
        button.addEventListener('click', appendDigit);
    });
    operatorButtons.forEach(button => button.addEventListener('click', setOpCode));
    clearButton.addEventListener('click', clear);
    // allClearButton.addEventListener('click', clearAll);
    evaluateButton.addEventListener('click', evaluate);
    decimalButton.addEventListener('click', addDecimal);
    negateButton.addEventListener('click', negate);
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
    if (buffer === null) buffer = '0.';
    if (buffer.includes('.')) return;
    
    buffer += '.';

    updateDisplay(buffer);
}

function updateDisplay(output) {
    let display = document.querySelector('#display');
    display.value = output;
}

function clear() {
    buffer = null;

    updateDisplay('0');
}

function clearAll() {
    buffer = null;
    register = null;
    op = null;

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
    if (buffer !== null) {
        let result = operate(opCode, register, buffer);

    register = result;
    buffer = null;

    updateDisplay(result);
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