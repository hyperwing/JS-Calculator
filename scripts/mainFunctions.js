/*
File created 10/26/2019 by Sharon Qiu
Edited 10/26/2019 by Sri Ramya Dandu
Moved main functions for standard calc here.
*/

var display = "0";
var lastButtonOperator = false;
var calculations = [];
var lastHistory;
var lastButtonEquals = false;
var lastButtonHistory = false;
var changeLastNum = false;
var buttonState = true; //Might not need to exist.
// Created 10/17/2019 by Neel Mansukhani
// Edited 10/19/2019 by David Wing: added CE and C routes
// Edited 10/19/2019 by Sri Ramya Dandu: Fixed decimal 
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
    } else if (symbol == '.'){
        display += '.';
    }else {
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
        } else if (symbol == "C") {
            display = "0"
            buttonState = true;
            calculations = [];
        } else if (symbol == "CE") {
            display = "0"
            buttonState = true;
        }
    }
    lastButtonEquals = false;
    lastButtonHistory = false;
    updateDisplay();
}


//created by David Wing 10/21/19
// Edited 10/27/2019 by Leah Gillespie: adjusted to work after = is pressed
// Edited 10/29/2019 by Leah Gillespie: works with history
// handles numbers pressed on calc and updates display
function numberPress(symbol) {
    if (memoryTrigger && !lastButtonOperator) {
            memoryTrigger = false;
            buttonState = true;
            display = symbol;
    } else if(lastButtonOperator) {
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
            if (display == "0" || lastButtonEquals || lastButtonHistory) {
                display = symbol;
                if(lastButtonHistory){
                    changeLastNum = true;
                }
            } else {
                display += symbol;
            }
        }
    }
    lastButtonEquals = false;
    lastButtonHistory = false;
    updateDisplay();
}

// Created 10/20/2019 by Leah Gillespie
// Edited 10/25/2019 by Leah Gillespie: works with last thing entered being an operator
// Edited 10/26/2019 by Leah Gillespie: Added history display
// Edited 10/29/2019 by Leah Gillespie: works with history
// Registers = button click and updates display
function onEqualClick() {
    if (changeLastNum) {
        calculations.pop()
    }
    calculations.push(parseFloat(display));
    display = String(calculateCalculations());
    var button = document.createElement("button");
    button.setAttribute("onclick", "onHistoryClick(" + "\"" + calculations + "\"" + ", " + display + ")");
    var txt = document.createTextNode(calculations.toString().replace(/,/g," ") + " =\n" + display);
    button.append(txt);
    var historyList = document.getElementById("history");
    if (historyList.childElementCount === 0) {
        historyList.append(button);
    } else {
        historyList.insertBefore(button, lastHistory);
    }
    lastHistory = button;
    calculations = [];
    lastButtonEquals = true;
    lastButtonHistory = false;
    changeLastNum = false;
    updateDisplay();
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/20/2019 by Sri Ramya Dandu: Button enable/disable
// Edited 10/25/2019 by Leah Gillespie: included history update
// Edited 10/26/2019 by Sri Ramya Dandu: Fixed decimal
// Updates the display after new calculations.
function updateDisplay() {
    document.getElementById("display").innerHTML = display;
    console.log(display);
    document.getElementById("calculations").innerHTML = calculations.toString().replace(/,/g, " ");
    document.getElementById('MC').disabled = memory.length == 0 ;
    document.getElementById('MR').disabled = memory.length == 0;
    document.getElementById('M').disabled = memory.length == 0;
    if (memory.length == 0) {
        hideMemory();
    }
    if(display.indexOf('.') != -1){
        document.getElementById('dot').disabled = true;
    }

    if(document.getElementById('display-memory-list').style.display == "block"){
        document.getElementById('display-memory-list').style.display = "none"
        displayMemory();
    }

    // document.getElementById("memory").innerHTML = memory;
    setButtonState(buttonState);
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/29/2019 by Leah Gillespie: works with history
// Operation button clicks are registered here then display is updated.
function onOperationButtonClick(operation) {
    if (changeLastNum) {
        calculations.pop();
        changeLastNum = false;
    }
    if (isOperator(calculations[calculations.length - 1]) && lastButtonOperator) {
        calculations[calculations.length - 1] = operation;
    } else {
        if (!lastButtonHistory) {
            calculations.push(parseFloat(display));
        }
        calculations.push(operation);
        display = String(calculateCalculations());
    }
    lastButtonOperator = true;
    lastButtonEquals = false;
    lastButtonHistory = false;
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
    if(display.indexOf('.') != -1){
        document.getElementById('dot').disabled = true;
    }
}

// Created 10/27/2019 by Leah Gillespie
// Edited 10/29/2019 by Leah Gillespie: fixed calculation bug
function onHistoryClick(calc, disp) {
    calculations = [];
    var currNum = '';
    for (var i = 0; i < calc.length; i++) {
        if (calc.charAt(i) >= '0' && calc.charAt(i) <= '9') {
            currNum += calc.charAt(i);
        } else if (isOperator(calc.charAt(i))) {
            calculations.push(currNum);
            currNum = '';
            calculations.push(calc.charAt(i));
        }
    }
    if (currNum.length > 0) {
        calculations.push(currNum);
    }
    display = disp.toString();
    lastButtonOperator = false;
    lastButtonEquals = false;
    lastButtonHistory = true;
    updateDisplay();
}




// THIS PART WORKS history, then number - changes display to new number, doesn't change calculation
    // ALSO WORKS then equals - calculation disappears, but the last number in it is changed to the display and its all added to history
    // GOOD then number - just expands display
    // DONE then operation - replaces last number in calculation with number now in display, adds operation, updates display to calculation (not counting newest operation)
// THIS IS GOOD history, then operation - adds operation to end of calculation, then anything then everything happens as normal