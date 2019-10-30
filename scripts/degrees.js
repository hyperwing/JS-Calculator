/*
File created 10/26/2019 by Sharon Qiu
Edited 10/27/2019 by Sharon Qiu
Edited 10/28/2019 by Sharon Qiu
Edited 10/30/2019 by Sharon Qiu
Degree/radians conversions
*/

var display = "0";
var lastButtonOperator = false;
var buttonState = true;

// Created 10/26/2019 by Sharon Qiu
// Edited 10/27/2019 by Sharon Qiu: Handles cases for decimal values.
// Edited 10/28/2019 by Sharon Qiu: Fixed bug where you can type multiple decimal values.
// Updates the display after new calculations.
function updateDisplay() {

    var calculated = display;

    from = document.getElementById("convertFrom").value;
    to = document.getElementById("convertTo").value;

    if (from != to) {
        if (from == "Degrees") {
            document.getElementById('pi').disabled = true;
            calculated = degree_to_radians(display);
        } else {
            calculated = radians_to_degrees(display);
            if (display.indexOf("&#960;") == -1) {
                document.getElementById('pi').disabled = false;
            }
        }
    }else if (from == "Degrees") {
        document.getElementById('pi').disabled = true;
        if (display.indexOf('&#960;') != -1) {
            window.alert("invalid input! Degrees cannot have pi values.");
            calculated = "0";
            display = "0";
        }
    } else{
        document.getElementById('pi').disabled = false;
    }

    // Only one pi allowed! also enables/re-enables decimals
    // With pi
    if (display.indexOf('&#960;') != -1) {
        document.getElementById('pi').disabled = true;
        var values = display.split('&#960;'); // check first and second values
        if (display[display.length - 1] == ';') {
            document.getElementById('dot').disabled = true;
        } //first value does not have a decimal
        else if (display.indexOf('.') != -1){
            //first value does not have a decimal
            if (((values[0].indexOf('.') == -1) && display.match(/\./g).length == 1) || display.match(/\./g).length == 2) {
                document.getElementById('dot').disabled = true;
            }else{
                document.getElementById('dot').disabled = false;
            }
        }else {
            document.getElementById('dot').disabled = false; //re-enables if no decimal yet & there is a pi.
        }
    } // Without pi
    else {
        if (display.indexOf('.') != -1) {
            if (display.match(/\./g).length == 1) {
                document.getElementById('dot').disabled = true;
                if (display[display.length - 1] == '.'){
                    document.getElementById('pi').disabled = true;
                }
            } else {
                document.getElementById('dot').disabled = false;
            }
        }else{
            document.getElementById('dot').disabled = false;
        }
    }

    document.getElementById("displayTo").innerHTML = calculated;
    document.getElementById("displayFrom").innerHTML = display;
}

// Created 10/21/19 by David Wing
// Edited 10/27/19 by Sharon Qiu: Shortened function.
// Edited 10/30/19 by Sharon Qiu: Added functionality to fit event listeners.
// handles numbers pressed on calc and updates display
function numberPress(event) {
    var targetVal = String(event.target.value);
    if (!isNaN(targetVal)) {
        if (display == "0") {
            display = targetVal;
        } else {
            display += targetVal;
        }
    }
    updateDisplay();
}

// Created 10/26/2019 by Sharon Qiu
// Converts degrees to radians
function degree_to_radians(display) {
    if (display.indexOf("&#960;") != -1) {
        window.display = "0";
        window.alert("Invalid input! You cannot have pi in degrees.");
        return "0";
    }else{
        var degree = parseFloat(display);
    }
    return (degree * Math.PI) / 180;
}

// Created 10/26/2019 by Sharon Qiu
// Edited 10/28/2019 by Sharon Qiu: Added fix so it registers -pi values.
// Converts radians to degrees
function radians_to_degrees(display) {
    var degree = 0;
    //pi exists here
    if (display.indexOf("&#960;") != -1){
        var splitVal = display.split("&#960;");
        //calculator allows like 24.1(pi)42.3, Multiplies all values together.
        degree = (splitVal.reduce((product, next) => {
            if (product == ""){
                product = 1;
            } else if (product == "-"){
                product = -1;
            }
            if (next != ""){
                product *= next
            }
            return product
        }) * 180);
    }else{
        degree = (parseFloat(display) * 180)/Math.PI;
    }
    return degree;
}

// Created 10/26/2019 by Sharon Qiu
// it's pi
function piPress(){

    if (display == 0){
        display = "&#960;";
    }
    else if (display[display.length - 1] != '.'){
        display += "&#960;";
    }
    updateDisplay();
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/19/2019 by David Wing: added CE and C routes
// Edited 10/19/2019 by Sri Ramya Dandu: Fixed decimal 
// Edited 10/30/19 by Sharon Qiu: Added functionality to fit event listeners.
// Operators handled here and updates display
function onOperatorClick(event) {
    symbol = String(event.target.value);
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
    } else if (symbol == '.') {
        display += '.';
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
                if (display[display.length-1] == ";"){
                    display = display.substr(0, display.length - ("&#960;".length));
                }else{
                    display = display.substr(0, display.length - 1);
                }
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
    updateDisplay();
}

// Created 10/26/2019 by Sharon Qiu
// Event listeners creator
function loadEvListeners(){

    //number buttons
    var numElArr = document.getElementsByName("number");
    for (var i = 0; i < numElArr.length; i++){
        numElArr[i].addEventListener('click', numberPress, false);
    }

    //pi button
    var pi = document.getElementById("pi");
    pi.addEventListener('click',piPress,false);

    //operators
    var operatorArr = document.getElementsByName("operator-button");
    for (var i = 0; i < operatorArr.length; i++) {
        operatorArr[i].addEventListener('click', onOperatorClick, false);
    }

    //form conversions
    var conversionArr = document.getElementsByName("conversion-change");
    for (var i = 0; i < conversionArr.length; i++) {
        conversionArr[i].addEventListener('change', updateDisplay, false);
    }
}
window.addEventListener('load',loadEvListeners, false)

