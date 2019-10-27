/*
File created 10/26/2019 by Sharon Qiu
Edited 10/20/2019 by Sharon Qiu
Degree/radians conversions
*/

var display = "0";
var lastButtonOperator = false;
var buttonState = true;

// Created 10/26/2019 by Sharon Qiu
// Updates the display after new calculations.
function updateDisplay() {

    var calculated = display;
    // Only one pi allowed!
    if (display.indexOf('&#960;') != -1){
        document.getElementById('pi').disabled = true;
        if (display[display.length - 1] == ';'){
            document.getElementById('dot').disabled = true;
        }else{
            document.getElementById('dot').disabled = false;
        }
    }else{
        document.getElementById('pi').disabled = false;
        document.getElementById('dot').disabled = false;
    }

    document.getElementById("displayFrom").innerHTML = display;

    from = document.getElementById("convertFrom").value;
    to = document.getElementById("convertTo").value;


    console.log(from)
    console.log(to)
    if (from != to){
        if (from == "Degrees"){
            calculated = degree_to_radians();
            document.getElementById('pi').disabled = true;
        }else{
            calculated = radians_to_degrees();
            if (display.indexOf("&#960;") == -1){
                document.getElementById('pi').disabled = false ;
            }
        }
    } else if (from == "Degrees" && to == "Degrees") {
        if (display.indexOf('&#960;') != -1) {
            calculated = "invalid input! Degrees cannot have pi values.";
            display = "0";
        }
        document.getElementById('pi').disabled = true;
    }

    document.getElementById("displayTo").innerHTML = calculated;
    document.getElementById("displayFrom").innerHTML = display;
}

// Created 10/21/19 by David Wing
// handles numbers pressed on calc and updates display
function numberPress(symbol) {
    if (!isNaN(symbol)) {
        if (display == "0") {
            display = symbol;
        } else {
            display += symbol;
        }
    }
    updateDisplay();
}

// Created 10/26/2019 by Sharon Qiu
// Converts degrees to radians
function degree_to_radians() {
    if (display.indexOf("&#960;") != -1) {
        display = "0";
        return "Invalid input! Input has been cleared.";
    }else{
        var degree = parseFloat(display);
    }
    return (degree * Math.PI) / 180;
}


// Created 10/26/2019 by Sharon Qiu
// Converts radians to degrees
function radians_to_degrees() {
    var degree = 0;
    //pi exists here
    if (display.indexOf("&#960;") != -1){
        var splitVal = display.split("&#960;");
        console.log(splitVal);
        degree = (splitVal.reduce((product, next) => {
            if (product == ""){
                product = 1;
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
                if (display.indexOf("&#960;") != -1){
                    display = display.substr(0, display.length - 6);
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
