/*
File created 10/26/2019 by Sharon Qiu
Moved main functions for standard calc here.
*/

var display = "0";
var lastButtonOperator = false;
var calculations = [];
var history = [];
var buttonState = true; //Might not need to exist.
updateDisplay();
// TODO: set buttonState to true when =, CE, or C are pressed.
// TODO: make method less thicc.
// Created 10/17/2019 by Neel Mansukhani
// Edited 10/19/2019 by David Wing: added CE and C routes
// Operators handled here and updates display
function onOperatorClick(symbol) {
    if (lastButtonOperator) {
        if (symbol == ".") {
            display = "0.";
            lastButtonOperator = false;
        } else if (symbol == "+/-") {
            if (display.charAt(0) == '-') {
                display = display.substr(1);
            } else {
                display = "-" + display;
            }
        } else if (symbol == "C") {
            display = "0"
            buttonState = true;
            calculations = [];
        } else if (symbol == "CE") {
            display = "0"
            buttonState = true;
        }
    } else {
        if (symbol == "+/-" && display != "0") {
            if (display.charAt(0) == '-') {
                display = display.substr(1);
            } else {
                display = "-" + display;
            }
        } else if (symbol == "DEL") {
            if (!buttonState) {
                buttonState = true;
                display = "0"
            }
            if (display != "0") {
                display = display.substr(0, display.length - 1);
                if (display.length == 0 || display == "-") {
                    display = "0";
                }
            }
        }
    }
    updateDisplay();
}


//created by David Wing 10/21/19
// handles numbers pressed on calc and updates display
function numberPress(symbol) {
    if (lastButtonOperator) {
        if (!isNaN(symbol)) {
            buttonState = true;
            display = symbol;
            lastButtonOperator = false;
        } else {
            if (!buttonState) {
                buttonState = true;
                display = "0"
                lastButtonOperator = false;
            }
        }
    } else {
        if (!isNaN(symbol)) {
            if (!buttonState) {
                buttonState = true;
                display = "0"
            }
            if (display == "0") {
                display = symbol;
            } else {
                display += symbol;
            }
        }
    }
    updateDisplay();
}

// Created 10/20/2019 by Leah Gillespie
// Edited 10/25/2019 by Leah Gillespie: works with last thing entered being an operator
// Registers = button click and updates display
function onEqualClick() {
    //history.unshift([calculations + " =\n" + display]);
    calculations.push(parseFloat(display));
    display = calculateCalculations();
    calculations = [];
    updateDisplay();
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/20/2019 by Sri Ramya Dandu: Button enable/disable
// Edited 10/25/2019 by Leah Gillespie: included history update
// Updates the display after new calculations.
function updateDisplay() {
    document.getElementById("display").innerHTML = display;
    document.getElementById("calculations").innerHTML = calculations.toString().replace(/,/g, " ");
    document.getElementById('MC').disabled = memory.length < 1;
    document.getElementById('MR').disabled = memory.length < 1;
    document.getElementById('M').disabled = memory.length < 1;
    if (memory.length < 1) {}
    // document.getElementById("memory").innerHTML = memory;
    // document.getElementById("history").innerHTML = history.toString().replace(/,/g, " ");
    setButtonState(buttonState);
}

// Created 10/17/2019 by Neel Mansukhani
// Operation button clicks are registered here then display is updated.
function onOperationButtonClick(operation) {
    if (isOperator(calculations[calculations.length - 1]) && lastButtonOperator) {
        calculations[calculations.length - 1] = operation;
    } else {
        calculations.push(parseFloat(display));
        calculations.push(operation);
        display = calculateCalculations();
    }
    lastButtonOperator = true;
    updateDisplay();
}
// Created 10/17/2019 by Neel Mansukhani
// Edited 10/19/2019 by David Wing: added C as an operator
// Returns whether the given parameter is an operator.
function isOperator(input) {
    return input == "+" || input == "-" || input == "*" || input == "/" || input == "C" || input == "CE";
}

// Created 10/17/2019 by Neel Mansukhani
// Does all of the math in the calculations array.
function calculateCalculations() {
    var calcValue;
    if (calculations.length < 3) {
        calcValue = parseFloat(display);
    } else {
        calcValue = doMath(calculations[0], calculations[2], calculations[1]);
        if (typeof calcValue == "string") {
            return calcValue;
        }
        for (var i = 3; i < calculations.length; i++) { // TODO: Make Better
            if (i % 2 == 1) {
                operator = calculations[i];
            } else {
                calcValue = doMath(calcValue, calculations[i], operator);
                if (typeof calcValue == "string") {
                    return calcValue;
                }
            }
        }
    }
    return calcValue;
}

// Created 10/17/2019 by Neel Mansukhani
// Does math between two numbers based on the given operator.
function doMath(num1, num2, operator) {
    var value = 0;
    switch (operator) {
        case "+":
            value = num1 + num2;
            break;
        case "-":
            value = num1 - num2;
            break;
        case "*":
            value = num1 * num2;
            break;
        case "/":
            if (num2 == 0) {
                if (num1 == 0) {
                    value = "Result is undefined";
                } else {
                    value = "Cannot divide by zero";
                }
                buttonState = false;
                calculations = [];
            } else {
                value = num1 / num2;
            }
            break;
        case "C":
            value = 0;
            calculations = [];
            break;
        default:
            break;
    }
    return value;
}

// Created 10/17/2019 by Neel Mansukhani
// Disables or enables buttons as a result of divide by zero.
function setButtonState() {
    var buttons = document.getElementsByClassName("div-by-zero");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = !buttonState;
    }
}
