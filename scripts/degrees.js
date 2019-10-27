/*
File created 10/26/2019 by Sharon Qiu
Degree/radians conversions
*/

var display = "0";

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/20/2019 by Sri Ramya Dandu: Button enable/disable
// Edited 10/22/2019 by Sri Ramya Dandu: Added formatting for repeating values 
// Edited 10/23/2019 by Sri Ramya Dandu: Enable/disable buttons
// Updates the display after new calculations.
function updateDisplay() {

    var calculated = display;
    // Only one pi allowed!
    if (display.indexOf('&#960;') != -1){
        document.getElementById('pi').disabled = true;
        if (display[display.length - 1] == '&#960;'){
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

    if (from != to){
        if (from == "Degrees"){
            calculated = degree_to_radians();
        }else{
            calculated = radians_to_degrees();
        }
    }

    document.getElementById("displayTo").innerHTML = calculated;
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
    var degree = parseFloat(display);
    return (degree * 180) / Math.PI;
}

// Created 10/26/2019 by Sharon Qiu
// Converts radians to degrees
function radians_to_degrees() {
    var degree = 0;
    //pi exists here
    if (display.indexOf("&#960;") != -1){
        var splitVal = display.split("&#960;");
        //implicit that pi exists in display. Since formula is radians *(180/pi) can ignore pi.
        degree = splitVal.reduce((product, next) => {return product * next}) * 180;
    }else{
        degree = (parseFloat(display) * 180)/Math.PI;
    }
    return degree;
}

// Created 10/26/2019 by Sharon Qiu
// it's pi
function piPress(){
    if (display[display.length - 1] != '.'){
        display += "&#960;";
    }
    updateDisplay();
}