let displayValue = '0';
let currentOperator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    currentOperator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperator && waitingForSecondOperand) {
        currentOperator = operator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperator) {
        const result = performCalculation(currentOperator, firstOperand, parseFloat(displayValue));
        displayValue = String(result);
        firstOperand = result;
    }

    currentOperator = operator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function performCalculation(operator, a, b) {
    if (isNaN(a) || isNaN(b)) return;

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : 'Error';
        default:
            return b;
    }
}

function handleBackspace() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
    updateDisplay();
}

function handleEqual() {
    if (currentOperator && !waitingForSecondOperand) {
        displayValue = String(performCalculation(currentOperator, firstOperand, parseFloat(displayValue)));
        currentOperator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.innerText);
        } else if (button.classList.contains('operator')) {
            appendOperator(button.innerText);
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        } else if (button.classList.contains('backspace')) {
            handleBackspace();
        } else if (button.classList.contains('equal')) {
            handleEqual();
        }
    });
});

updateDisplay();
