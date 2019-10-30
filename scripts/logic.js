/*
File created 10/27/2019 by Neel Mansukhani
Edited 10/29/2019 by Neel Mansukhani
*/
var calculations = [];
var display = "0";
var lastButtonOperator = false;
var openParenthesisCount = 0;
var lastNotIndex = -1;

function onNumberPress(symbol) {
    display = symbol;
    lastButtonOperator = false;
    updateDisplay();
}
function onClearPress(symbol) {
    if(symbol == "C") {
        calculations = [];
        lastNotIndex = -1;
    }
    display = "0";  
    updateDisplay();
}

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
function updateDisplay() {
    document.getElementById("display").innerHTML = display;
    document.getElementById("calculations").innerHTML = calculations.toString().replace(/,/g, " ");
}

function onNotOperatorPress() {
    if(lastNotIndex == -1) {
        if(calculations[calculations.length - 1] == ')') {
            lastNotIndex = calculations.lastIndexOf('(');
            calculations.splice(lastNotIndex, 0, '!');
        } else {
                if(isNaN(calculations[lastNotIndex+1])) {
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
function isOperator(input) {
    return input == "&&" || input == "||" || input == "==";
}

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

function calculate(arr) {
    let i = 0;
    let value1 = 0;
    let value2 = null;
    while(i < arr.length) {
        console.log(arr)
        if(arr[i] == '(') {
            closeIndex = findCloseIndex(arr);
            value1 = calculate(arr.slice(i + 1,closeIndex));
            i = closeIndex + 1;
        } else if(isOperator(arr[i])) {
            operator = arr[i];
            if(!isNaN(arr[i + 1])) {
                value2 = arr[i + 1];
                i += 2;
            } else if(arr[i+1] == '!') {
                if(arr[i+2] == '(') {
                    closeIndex = findCloseIndex(arr);
                    value2 = calculate(arr.slice(i + 3,closeIndex));
                    i = closeIndex + 1;
                } else {
                    value2 = arr[i+2];
                    i += 3;
                }
                value2 = (value2 - 1) * (value2 - 1);
            } else {
                closeIndex = findCloseIndex(arr);
                value2 = calculate(arr.slice(i + 2,closeIndex));
                i = closeIndex + 1;                
            }
            value1 = doLogic(value1,value2,operator);
        } else if(arr[i] == '!') {
            if(arr[i+1] == '(') {
                closeIndex = findCloseIndex(arr);
                value1 = calculate(arr.slice(i + 2,closeIndex));
                i = closeIndex + 1;
            } else {
                value1 = arr[i+1];
                i += 2;
            }
            value1 = (value1 - 1) * (value1 - 1);
        } else {
            value1 = arr[i];
            i += 1;
        }
    }
    return value1;
}

function findCloseIndex(arr) {
    arr = arr.slice(1);
    var openParens = 1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == ')') {
            openParens--;
            if(openParens == 0) {
                return i + 1;
            }
        }
        if(arr[i] == '(') {
            openParens++;
        }
    }
}