/*
File created 10/20/2019 by Sri Ramya Dandu
Edited 10/21/2019 by Sri Ramya Dandu
Edited 10/22/2019 by Sri Ramya Dandu
Edited 10/23/2019 by Sri Ramya Dandu 
Edited 10/24/2019 by Sri Ramya Dandu
Edited 10/25/2019 by Sri Ramya Dandu
Edited 10/27/2019 by Sri Ramya Dandu
Edited 10/28/2019 by Sri Ramya Dandu
Edited 10/29/2019 by Sri Ramya Dandu: Added chaining to conversions object
Edited 10/30/2019 by Sri Ramya Dandu
*/

// conversion values for hex and decimal 
// conversions for numeric values - superclass 
var singleDigitConversions = {
  0:"0", 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6",
  7:"7", 8:"8", 9:"9"
};

// conversions object for alpha - subclass 
var conversionsMap = {
  10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"
};

// Object prototyping ("chaining") to represent 
// super-class/sub-class relationships between 
// conversionsMap and singleDigitConversions objects 
conversionsMap.__proto__ = singleDigitConversions;

var display = "0";

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/19/2019 by David Wing: added CE and C routes
// Edited 10/21/2019 by Sri Ramya Dandu: Modified to match new calc
// Edited 10/22/2019 by Sri Ramya Dandu: Added decimal point recoganization 
// Edited 10/27/2019 by Sri Ramya Dandu: Added +/-
// Edited 10/28/2019 by Sri Ramya Dandu: Fixed display for -0
// Number button clicks are registered here then display is updated.
function onSimpleButtonClick(event) {
  symbol = String(event.target.value);
    if (symbol == "DEL") {
        if(display != "0") {
            display = display.substr(0, display.length - 1);
            if(display.length == 0 || display == "-") {
                display = "0";
            }
        }    
    } else if (symbol == "CE") {
        display = "0"
    }  else if (symbol == "+/-") {
      if(display != "0"){ //no negative zero 
        if (display.charAt(0) == '-') {
            display = display.substr(1);
        } else{
            display = "-" + display;
        }
      }
    } else {
       if(display == "0" && symbol != '.') {
            display = symbol;
        } else { 
            display += symbol;
        }
        
    }
    updateDisplay();
}

// Created 10/17/2019 by Neel Mansukhani
// Edited 10/20/2019 by Sri Ramya Dandu: Button enable/disable
// Edited 10/22/2019 by Sri Ramya Dandu: Added formatting for repeating values 
// Edited 10/23/2019 by Sri Ramya Dandu: Enable/disable buttons
// Edited 10/27/2019 by Sri Ramya Dandu: Removed disable of negative
// Updates the display after new calculations.
function updateDisplay() {
    document.getElementById("displayFrom").innerHTML = display;

    from = Number(document.getElementById("convertFrom").value);
    to = Number(document.getElementById("convertTo").value);

    if(display.charAt(display.length-1) == '.'){ // on decimal entry
        callFunctions(display + '0',from,to); //appends temporary 0 for display purposes
    }else{
        callFunctions(display,from,to);
    }

    // repeating value css 
    if (document.getElementById("repeating") != null){
        document.getElementById("repeating").style.textDecoration = "overline";
    }

    // Ensures correct input of . and -
    if (display.indexOf('.') != -1){
        document.getElementById("dot").disabled = true;
    }else{
        document.getElementById("dot").disabled = false;
    }

    // disables buttons based on chosen form of input 
    disableInputButtons(from);
    
  }

// Created 10/28/2019 by Sri Ramya Dandu
// Edited 10/30/2019 by Sri Ramya Dandu: changed to event handling 
// disables buttons based on chosen form of input 
function disableInputButtons(from){


  //splits into number and alpha values
  var numElArr = document.getElementsByName("inputValue");
  var nums = [];
  var alpha = [];
  for (var i = 0; i < numElArr.length -1; i++){
    if (i != 6 && i<9){ // don't want to disable 1
      nums.push(numElArr[i]);
    }else if(i>8){
      alpha.push(numElArr[i]);
    }
  }

  // disable alpha buttons for non-hex input
  if(from == 10 || from == 2){
    setButtons(alpha, true);
  }else {
    setButtons(alpha, false);
  }

  // disable 1+ buttons for birnary input 
  if(from == 2){
    setButtons(nums, true);
  }else{
    setButtons(nums, false);
  }
}


// Created 10/28/2019 by Sri Ramya Dandu
// Edited 10/30/2019 by Sri Ramya Dandu: changed to event handling 
// Sets disabled property of buttons with ids in idArray to buttonState
function setButtons(valArray, buttonState){
  valArray.forEach(function(elt){
    elt.disabled = buttonState;
  })
}

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/21/2019 by Sri Ramya Dandu: Added hex values 
// Edited 10/22/2019 by Sri Ramya Dandu: Replaced Math.floor()
// Converts whole numbers from decimal to given base 
// num: string input of number
// base: the base of the new number 
function convertWholeFromDecimal(num, base){
  var conversion = "";
  num = Number(num);
  while(num > 0){
      value = conversionsMap[String(num % base)];
      conversion = value + conversion; //remainder appends as msb 
      num = (num/base) - ((num/base) %1); //integer division 
  }

  // provides output when display = 0
  if (conversion == ""){
    conversion = "0";
  }
  return conversion;
}

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/22/2019 by Sri Ramya Dandu: Replaced Math library functions 
// Converts fractions from decimal to given base. After 48+ bits the numbers 
// tend to round due to IEEE FLoating Point representations 
// num: string input of number
// base: the base of the new number 
function convertFractionFromDecimal(num, base){
    var conversion = "";
    num = Number(num);
    while(num > 0){
        tempNum = num * base;
        conversion += conversionsMap[tempNum - (tempNum % 1)]; // whole number appends as lsb
        num = tempNum % 1; //obtains fraction value 
        // check repeating for the whole string or an offset of the string 
        if ((conversion.length > 7 && isRepeating(conversion)) || (conversion.length > 11 && isRepeating(conversion.substring(4))) ){  
          num = 0;
        }
    }

    // prodives output when display = 0
    if (conversion == ""){
      conversion = "0";
    }
    return conversion;
}

// Created 10/20/2019 by Sri Ramya Dandu
// Checks if fraction portion is a repeating value 
// function only called when num.length is even so we only worry about this case
// Input is the string to check 
function isRepeating(num){
   return num.substring(0,num.length/2) == num.substring(num.length/2);
}

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/21/2019 by Sri Ramya Dandu: Added get key feature 
// Converts whole number to decimal from given base 
// Input: numStr: String of number in base rep
//        base: the base currently representing the number 
function convertWholeFromBase(numStr, base){
  var decimalNum = 0;
  var exponent = numStr.length-1;
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(numStr.charAt(i)) * power(base,exponent); // # * base^exponent 
    exponent--;
  }
  return String(decimalNum);
}

// Created 10/21/2019 by Sri Ramya Dandu
// Converts fraction to decimal from given base; the numbers 
// tend to round due to IEEE FLoating Point representations for many decimal values
// Input: numStr: String of number in base rep with decimal point 
//        base: the base currently representing the number 
function convertFractionFromBase(numStr, base){
  var decimalNum = 0;
  var exponent = -1;
  // removes decimal point from number 
  numStr = numStr.substring(1);
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(numStr.charAt(i)) * (1/power(base,(-exponent))); // # * base^exponent s
    exponent--;
  }
  return String(decimalNum);
}


// Created 10/21/2019 by Sri Ramya Dandu
// Splits string into whole and fraction if it exists 
// Return value at index 0 is whole number, index 1 is fraction if it exists 
// Frcation value contains decimal point
function wholeFracSplit(numStr){
  var split = [];
  var dot = numStr.indexOf('.')
  if(dot != -1){ //if the number has a decimal point 
    split.push(numStr.substring(0,dot));
    split.push(numStr.substring(dot));   // fraction contains .
  }else{
    split.push(numStr);
  }
  return split;
}

// Created 10/21/2019 by Sri Ramya Dandu
// Returns the key number of the given value in String format
function getKey(value){
  for (p in conversionsMap){
    if(conversionsMap[p] == value){
      return Number(p); //TODO: what if value doesn't exist 
    }
  }
  return null;
}

// Created 10/23/2019 by Sri Ramya Dandu
// Checks if input in current display is valid 
// Returns boolean 
function isValidInput(display,from){
  var values = display.split('');
  var isValid = false;
  // checks for valid input 
  if(from == 2){
    isValid = values.every(function (currentElm) {
      return currentElm == '.' || currentElm == '1'|| currentElm == '0'||currentElm == '-';
    });
  }else if (from == 16){
    isValid = values.every(function (currentElm) {
      return currentElm == '.' || currentElm == '-' || getKey(currentElm) != null;
    });
  }else if(from == 10){
    isValid = values.every(function (currentElm) {
      return (getKey(currentElm) != null && getKey(currentElm) <= 9) || currentElm == '-' || currentElm == '.';
    });
  }
  return isValid;
}

// Created 10/21/2019 by Sri Ramya Dandu
// Edited 10/22/2019 by Sri Ramya Dandu: Modfied calling functions and display 
// Edited 10/22/2019 by Sri Ramya Dandu: Changed argument list and identifies negative numbers
// Edited 10/23/2019 by Sri Ramya Dandu: Checks for valid input 
// Input: splitNum is an array such that splitNum[0] is the whole number and splitNum[1] is fraction
//        to is the base to convert to and from is the base to convert from 
function callFunctions(display, from, to){
 
  if (!isValidInput(display,from)){
    document.getElementById("displayTo").innerHTML = 'Invalid Input!'
  }else {
    var actualDisplay = display;
    var isNegative = actualDisplay.charAt(0) == '-';
    if(isNegative){
      display = display.substring(1);
    }
    splitNum = wholeFracSplit(display);
    var decimal = "";
    // no conversion required 
    if(from == to){
        document.getElementById("displayTo").innerHTML = actualDisplay;
    }else if (from == 10) { // converting from decimal to a different base 
        document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(splitNum,to), isNegative);
    }else{ // converting from a base != decimal 
        decimal = getBaseToDecimal(splitNum,from);
        // if converting to decimal 
        if (to == 10){
            if (isNegative){
              decimal = '-'+decimal;
            }
            document.getElementById("displayTo").innerHTML = decimal;
        } else { // if converting to a base != decimal, converts decimal to that base 
            document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(wholeFracSplit(decimal),to),isNegative);
        }
    }
  }
}

// Created 10/21/2019 by Sri Ramya Dandu
// Input: split is an array such that split[0] is the whole number and split[1] is fraction
//        to is the base to convert to 
// Returns string of the converted value from decimal to base 
function getDecimalToBase(split,to){
  var converted = "";
  // if whole and fraction 
  if(split.length == 2){
      whole = convertWholeFromDecimal(split[0],to);
      frac = convertFractionFromDecimal(split[1],to);
      converted = whole + '.' + frac;
  }else if (split.length == 1){ // if only whole number 
      whole = convertWholeFromDecimal(split[0],to);
      converted = whole;
  }
  return converted;
}

// Created 10/22/2019 by Sri Ramya Dandu
// Input: split is an array such that split[0] is the whole number and split[1] is fraction
//        to is the base to convert to 
// Returns string of the converted value from base to decimal  
function getBaseToDecimal(split,from){
  var decimal = "";
  // converts from base to decimal 
  if(splitNum.length == 2){   // if whole and fraction 
    var whole = convertWholeFromBase(splitNum[0],from);
    var frac = convertFractionFromBase(splitNum[1],from);
    decimal = String(Number(whole) + Number(frac));
  }else if (splitNum.length == 1){  // if only whole 
    var whole = convertWholeFromBase(splitNum[0],from);
    decimal = whole;
  }
  return decimal;
}

// Created 10/22/2019 by Sri Ramya Dandu
// Input: String to format
// Displays 4 bits with space 
function splitIntoFour(value){
  var spacedValue = "";

  // if input is the fraction part 
  if(value.charAt(0) == '.'){
    spacedValue = value.substring(1);
    var extra0s = 4 - (spacedValue.length % 4);
    for(i = 0; i < extra0s && extra0s != 4; i++){
      spacedValue = spacedValue +'0';
    }
  }else{ // input is the whole number part 
    spacedValue = value;
    var extra0s = 4 - (spacedValue.length % 4);
    for(i = 0; i < extra0s && extra0s != 4; i++){
      spacedValue = '0' + spacedValue;
    }
  }
  for(i = 4; i<spacedValue.length; i += 5){
    spacedValue = spacedValue.substring(0,i)+ ' ' + spacedValue.substring(i); 
  }
  return spacedValue;
}

// Created 10/22/2019 by Sri Ramya Dandu
// Formats the display for the number 
function displayCalculated(result, isNegative){
 var printValue = '';
  parts = wholeFracSplit(result);
  if(parts.length == 2){
    printValue = splitIntoFour(parts[0]) + '.';
     
    // adds repeating symbol 
    if (isRepeating(parts[1].substring(1))&& parts[1].length > 7){
      printValue += '<span id = "repeating" >' + splitIntoFour(parts[1]) + '</span>';
    }else if (isRepeating(parts[1].substring(5))&& parts[1].length > 11) {
      var toPrint = splitIntoFour(parts[1]);
      printValue += toPrint.substring(0,5) + '<span id = "repeating" >' + toPrint.substring(5) + '</span>';
    }else{
      printValue += splitIntoFour(parts[1]);
    }
  }else{
    printValue = splitIntoFour(parts[0]);
  }
  if(isNegative){
    printValue = '- ' + printValue;
  }
  return printValue;
}

// Created 10/26/2019 by Sharon Qiu
// Edited 10/30/2019 by Sri Ramya Dandu: Modified to match mode calc
// Event listeners creator
function loadEvListeners(){

  //number buttons
  var numElArr = document.getElementsByName("inputValue");
  for (var i = 0; i < numElArr.length; i++){
      numElArr[i].addEventListener('click', onSimpleButtonClick, false);
  }

  //operators
  var operatorArr = document.getElementsByName("operator-button");
  for (var i = 0; i < operatorArr.length; i++) {
      operatorArr[i].addEventListener('click', onSimpleButtonClick, false);
  }

  //form conversions
  var conversionArr = document.getElementsByName("conversion-change");
  for (var i = 0; i < conversionArr.length; i++) {
      conversionArr[i].addEventListener('change', updateDisplay, false);
  }
}

// Created 10/29/2019 by Leah Gillespie
// takes two numbers as inputs, returns a ^ b
function power(a, b) {
    if (b == 0) {
        return 1;
    }
    let ans = a;
    for (let i = 1; i < b; i++) {
        ans*=a;
    }
    return ans;
}


