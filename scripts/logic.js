/*
File created 10/27/2019 by Neel Mansukhani
Edited 10/29/2019 by Neel Mansukhani
*/
var calculations = [];
var display = "0";
var lastButtonOperator = false;
var openParenthesisCount = 0;
var lastNotIndex = -1;

// Created 10/27/2019 by Neel Mansukhani
// Edited 10/29/2019 by Neel Mansukhani
// Handles number press events.
function onNumberPress(symbol) {
    display = symbol;
    lastButtonOperator = false;
    updateDisplay();
}

// Created 10/29/2019 by Neel Mansukhani
// Handles clear press events.
function onClearPress(symbol) {
    if(symbol == "C") {
        calculations = [];
        lastNotIndex = -1;
    }
    display = "0";  
    updateDisplay();
}

// Created 10/29/2019 by Neel Mansukhani
// Handles delete press events.
function onDeletePress() {
    if(display == "1") {
        display = "0";
    }
    updateDisplay();
}

// Created 10/29/2019 by Neel Mansukhani
// Handles equal press events.
function onEqualsPress() {
    if(isOperator(calculations[calculations.length - 1]) || calculations[calculations.length - 1] == '(') {
        calculations.push(display);
    }
    while(openParenthesisCount > 0) {
        calculations.push(')');
        openParenthesisCount--;
    }
    display = calculate(calculations);
    calculations = [];
    updateDisplay();
}

// Created 10/27/2019 by Neel Mansukhani
// Edited 10/29/2019 by Neel Mansukhani
// Updates display based on changes to display and calculations.
function updateDisplay() {
    document.getElementById("display").innerHTML = display;
    document.getElementById("calculations").innerHTML = calculations.toString().replace(/,/g, " ");
}

// Created 10/29/2019 by Neel Mansukhani
// Handles not operator press events.
function onNotOperatorPress() {
    if(lastNotIndex == -1) {
        if(calculations[calculations.length - 1] == ')') {
            lastNotIndex = calculations.lastIndexOf('(');
            calculations.splice(lastNotIndex, 0, '!');
        } else {
                if(isNaN(calculations[calculations.length - 1])) {
                    calculations.push(parseFloat(display));
                }
                calculations.splice(lastNotIndex, 0, '!');
                lastNotIndex = calculations.lastIndexOf('!');
        }
    } else {
        calculations.splice(lastNotIndex, 1);
        lastNotIndex = -1;
    }
    lastButtonOperator = true;
    updateDisplay();
}

// Created 10/29/2019 by Neel Mansukhani
// Handles logical operator press events not including the not operator.
function onLogicalOperatorPress(operator) {
    if (isOperator(calculations[calculations.length - 1]) && lastButtonOperator) {
        calculations[calculations.length - 1] = operator;
    } else {
        if(isNaN(calculations[calculations.length - 1]) && calculations[calculations.length - 1] != ')') {
            calculations.push(parseFloat(display));
        }
        calculations.push(operator);
    }
    lastButtonOperator = true;
    lastNotIndex = -1;
    updateDisplay();
}

// Created 10/29/2019 by Neel Mansukhani
// Handles parenthesis press events.
function onParenthesisPress(symbol) {
    if(symbol == '(' && calculations[calculations.length - 1] != ')' && isNaN(calculations[calculations.length - 1])) {
        calculations.push(symbol);
        openParenthesisCount++;
    } else if(openParenthesisCount > 0){
        if(calculations[calculations.length - 1] == '(' || isOperator(calculations[calculations.length - 1])) {
            calculations.push(parseFloat(display));
        }
        calculations.push(symbol);
        openParenthesisCount--;
    }
    lastNotIndex = -1;
    updateDisplay();
}

// Created 10/27/2019 by Neel Mansukhani
// Edited 10/29/2019 by Neel Mansukhani: Removed not operator
// Returns whether or not input is an operator.
function isOperator(input) {
    return input == "&&" || input == "||" || input == "==";
}

// Created 10/29/2019 by Neel Mansukhani
// Returns result of logical operations of value1 and value2 based on the given operator.
function doLogic(value1, value2, operator) {
    switch (operator) {
        case "&&":
            value = Number(value1 && value2);
            break;
        case "||":
            value = Number(value1 || value2);
            break;
        case "==":
            value = Number(value1 == value2);
            break;
        default:
            break;
    }
    return value;
}

// Created 10/29/2019 by Neel Mansukhani
// Returns calculated value of logical operations stored in arr.
function calculate(arr) {
    let i = 0;
    let value1 = 0;
    let value2 = null;
    let closeIndex = 0;
    while(i < arr.length) {
        if(arr[i] == '(') {
            closeIndex = findCloseIndex(arr, i + 1);
            value1 = calculate(arr.slice(i + 1,closeIndex));
            i = closeIndex + 1;
        } else if(isOperator(arr[i])) {
            operator = arr[i];
            if(!isNaN(arr[i + 1])) {
                value2 = arr[i + 1];
                i += 2;
            } else if(arr[i+1] == '!') {
                if(arr[i+2] == '(') {
                    closeIndex = findCloseIndex(arr, i + 3);
                    value2 = calculate(arr.slice(i + 3,closeIndex));
                    i = closeIndex + 1;
                } else {
                    value2 = arr[i+2];
                    i += 3;
                }
                value2 = 1 - value2;
            } else {
                closeIndex = findCloseIndex(arr, i + 2);
                value2 = calculate(arr.slice(i + 2,closeIndex));
                i = closeIndex + 1;
            }
            value1 = doLogic(value1,value2,operator);
        } else if(arr[i] == '!') {
            if(arr[i+1] == '(') {
                closeIndex = findCloseIndex(arr, i + 2);
                value1 = calculate(arr.slice(i + 2,closeIndex));
                i = closeIndex + 1;
            } else {
                value1 = arr[i+1];
                i += 2;
            }
            value1 = 1 - value1;
        } else if (arr[i] == ')') {
            i += 1;
        } else {
            value1 = arr[i];
            i += 1;
        }
    }
    return value1;
}
// Created 10/29/2019 by Neel Mansukhani
// Given an array arr where the first index is an open parenthesis, it finds the index of the associated close parenthesis.
function findCloseIndex(arr, startIndex) {
    arr = arr.slice(startIndex);
    var openParens = 1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == ')') {
            openParens--;
            if(openParens == 0) {
                return i + startIndex;
            }
        }
        if(arr[i] == '(') {
            openParens++;
        }
    }
}