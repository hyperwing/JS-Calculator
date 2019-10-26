/*
File created 10/26/2019 by Sharon Qiu
Degree/radians conversions
*/

var pi = Math.pi;
// Created 10/26/2019 by Sharon Qiu
// Converts degrees to radians
function degree_to_radians(){
    
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/20/2019 by Sri Ramya Dandu: Button enable/disable
// Edited 10/22/2019 by Sri Ramya Dandu: Added formatting for repeating values 
// Edited 10/23/2019 by Sri Ramya Dandu: Enable/disable buttons
// Updates the display after new calculations.
function updateDisplay() {
    document.getElementById("displayFrom").innerHTML = display;

    from = Number(document.getElementById("convertFrom").value);
    to = Number(document.getElementById("convertTo").value);

    if (display.charAt(display.length - 1) == '.') { // on decimal entry
        callFunctions(display + '0', from, to); //appends temporary 0 for display purposes
    } else {
        callFunctions(display, from, to);
    }

    // Ensures correct input of . and -
    if (display.indexOf('.') != -1) {
        document.getElementById("dot").disabled = true;
    } else {
        document.getElementById("dot").disabled = false;
    }

    if (display.indexOf('-') != -1 || (display.length >= 1 && display != '0')) {
        document.getElementById("neg").disabled = true;
    } else {
        document.getElementById("neg").disabled = false;
    }
}

// Created 10/21/2019 by Sri Ramya Dandu
// Edited 10/22/2019 by Sri Ramya Dandu: Modified calling functions and display 
// Edited 10/22/2019 by Sri Ramya Dandu: Changed argument list and identifies negative numbers
// Edited 10/23/2019 by Sri Ramya Dandu: Checks for valid input 
// Input: splitNum is an array such that splitNum[0] is the whole number and splitNum[1] is fraction
//        to is the base to convert to and from is the base to convert from 
function callFunctions(display, from, to) {

    if (!isValidInput(display, from)) {
        document.getElementById("displayTo").innerHTML = 'Invalid Input!'
    } else {
        var actualDisplay = display;
        if (display.charAt(0) == '-') {
            display = display.substring(1);
        }
        splitNum = wholeFracSplit(display);
        decimal = "";
        // no conversion required 
        if (from == to) {
            document.getElementById("displayTo").innerHTML = actualDisplay;
        } else if (from == 10) { // converting from decimal to a different base 
            document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(splitNum, to), actualDisplay.charAt(0) == '-');
        } else { // converting from a base != decimal 
            getBaseToDecimal(splitNum, from);
            // if converting to decimal 
            if (to == 10) {
                document.getElementById("displayTo").innerHTML = decimal;
            } else { // if converting to a base != decimal, converts decimal to that base 
                document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(wholeFracSplit(decimal), to), actualDisplay.charAt(0) == '-');
            }
        }
    }
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

function onPiPress(){
    display
}