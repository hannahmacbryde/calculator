let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

// Get all buttons and the display
const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

// Update the display with the current value
function updateDisplay() {
    display.innerText = displayValue.length > 9 ? displayValue.substring(0, 9) : displayValue;
}

// Add event listeners to buttons for click functionality
buttons.forEach(button => {
    button.addEventListener('click', () => handleInput(button.value, button.classList));
});

// Handle keyboard input
window.addEventListener('keydown', (e) => {
    const keyMap = {
        Digit0: '0', Numpad0: '0',
        Digit1: '1', Numpad1: '1',
        Digit2: '2', Numpad2: '2',
        Digit3: '3', Numpad3: '3',
        Digit4: '4', Numpad4: '4',
        Digit5: '5', Numpad5: '5',
        Digit6: '6', Numpad6: '6',
        Digit7: '7', Numpad7: '7',
        Digit8: '8', Numpad8: '8',
        Digit9: '9', Numpad9: '9',
        NumpadDecimal: '.', Period: '.',
        Slash: '/', NumpadDivide: '/',
        NumpadMultiply: '*', Minus: '-', NumpadSubtract: '-',
        Equal: '+', NumpadAdd: '+',
        Enter: '=', NumpadEnter: '=',
        Backspace: 'clear', Escape: 'clear',
    };

    const value = keyMap[e.code];
    if (value) {
        const button = document.querySelector(`button[value="${value}"]`);
        if (button) handleInput(value, button.classList);
    }
});

// Handle input from both buttons and keyboard
function handleInput(value, classes) {
    if (classes.contains('operand')) {
        handleOperand(value);
    } else if (classes.contains('operator')) {
        handleOperator(value);
    } else if (classes.contains('equals')) {
        handleEquals();
    } else if (classes.contains('decimal')) {
        handleDecimal(value);
    } else if (classes.contains('percent')) {
        handlePercent();
    } else if (classes.contains('sign')) {
        handleSign();
    } else if (classes.contains('clear')) {
        clearAll();
    }
    updateDisplay();
}

// Handle operand input
function handleOperand(operand) {
    if (displayValue === '0' || displayValue === firstOperand) {
        displayValue = operand;
    } else {
        displayValue += operand;
    }
}

// Handle operator input
function handleOperator(operator) {
    if (firstOperator && !secondOperator) {
        secondOperand = displayValue;
        result = calculate(firstOperand, secondOperand, firstOperator);
        displayValue = formatResult(result);
        firstOperand = displayValue;
        secondOperator = operator;
        displayValue += ` ${operator}`;
    } else if (firstOperator && secondOperator) {
        secondOperand = displayValue;
        result = calculate(firstOperand, secondOperand, secondOperator);
        displayValue = formatResult(result);
        firstOperand = displayValue;
        secondOperator = operator;
        displayValue += ` ${operator}`;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
        displayValue += ` ${operator}`;
    }
}

// Handle equals input
function handleEquals() {
    if (firstOperator) {
        secondOperand = displayValue;
        result = calculate(firstOperand, secondOperand, secondOperator || firstOperator);
        displayValue = formatResult(result);
        clearOperators();
    }
}

// Handle decimal input
function handleDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

// Handle percent input
function handlePercent() {
    displayValue = (parseFloat(displayValue) / 100).toString();
}

// Handle sign input
function handleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
}

// Clear all values
function clearAll() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// Perform calculation
function calculate(x, y, operator) {
    x = parseFloat(x);
    y = parseFloat(y);

    switch (operator) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': return y === 0 ? 'Error' : x / y;
        default: return x;
    }
}

// Format result to avoid overflow
function formatResult(result) {
    return parseFloat(result.toFixed(9)).toString();
}

// Clear operators after equals
function clearOperators() {
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// Initialize display
updateDisplay();