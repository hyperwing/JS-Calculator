/*
File created 10/20/2019 by Sri Ramya Dandu
Edited 10/21/2019 by Sri Ramya Dandu
Edited 10/22/2019 by Sri Ramya Dandu
Edited 10/23/2019 by Sri Ramya Dandu 
*/

// conversion values for hex and decimal 
var conversionsMap = {
  0:"0", 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6",
  7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"
};


// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/21/2019 by Sri Ramya Dandu: Added hex values 
// Edited 10/22/2019 by Sri Ramya Dandu: Replaced Math.floor()
// Converts whole numbers from decimal to given base 
function convertWholeFromDecimal(number, base,conversionsMap){
  var conversion = "";
  while(number > 0){
      value = conversionsMap[String(number % base)];
      conversion = value + conversion; //remainder appends as msb 
      number = (number/base) - ((number/base) %1); //integer division 
  }

  // provides output when display = 0
  if (conversion == ""){
    conversion = "0";
  }
  return conversion;
}

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/22/2019 by Sri Ramya Dandu: Replaced Math library functions 
// Converts fractions from decimal to given base 
function convertFractionFromDecimal(number, base,conversionsMap){
    var conversion = "";
    while(number > 0){
        tempNum = number * base;
        conversion += conversionsMap[tempNum - (tempNum % 1)]; // whole number appends as lsb
        number = tempNum % 1; //obtains fraction value 
        if (isRepeating(conversion) && conversion.length > 7){  // check repeating 
          number = 0;
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
function isRepeating(number){
   return number.substring(0,number.length/2) == number.substring(number.length/2);
}

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/21/2019 by Sri Ramya Dandu: Added get key feature 
// Converts whole number to decimal from given base 
function convertWholeFromBase(conversionsMap,numStr, base){
  var decimalNum = 0;
  var exponent = numStr.length-1;
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(conversionsMap, numStr.charAt(i)) * Math.pow(base,exponent); // # * base^exponent 
    exponent--;
  }
  return String(decimalNum);
}

// Created 10/21/2019 by Sri Ramya Dandu
// Converts fraction to decimal from given base 
function convertFractionFromBase(conversionsMap,numStr, base){
  var decimalNum = 0;
  var exponent = -1;
  // removes decimal point from number 
  numStr = numStr.substring(1);
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(conversionsMap, numStr.charAt(i)) * Math.pow(base,exponent); // # * base^exponent  //TODO: Write a Math.pow func
    exponent--;
  }
  return String(decimalNum);
}


// Created 10/21/2019 by Sri Ramya Dandu
// Splits string into whole and fraction if it exists 
// Return value at index 0 is whole number, index 1 is fraction if it exists 
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
// Returns the key number of the given value 
function getKey(conversionsMap, value){
  for (p in conversionsMap){
    if(conversionsMap[p] == value){
      return Number(p); //TODO: what if value doesn't exist 
    }
  }
  return null;
}

// Created 10/23/2019 by Sri Ramya Dandu
// Checks if input is valid 
function isValidInput(display,from,conversionsMap){
  var values = display.split('');
  var isValid = false;
  // checks for valid input 
  if(from == 2){
    isValid = values.every(function (currentElm) {
      return currentElm == '.' || currentElm == '1'|| currentElm == '0'||currentElm == '-';
    });
  }else if (from == 16){
    isValid = values.every(function (currentElm) {
      return currentElm == '.' || currentElm == '-' || getKey(conversionsMap,currentElm) != null;
    });
  }else if(from == 10){
    isValid = values.every(function (currentElm) {
      return (getKey(conversionsMap,currentElm) != null && getKey(conversionsMap,currentElm) <= 9) || currentElm == '-' || currentElm == '.';
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
 
  if (!isValidInput(display,from,conversionsMap)){
    document.getElementById("displayTo").innerHTML = 'Invalid Input!'
  }else {
    var actualDisplay = display;
    if(display.charAt(0) == '-'){
      display = display.substring(1);
    }
    splitNum = wholeFracSplit(display);
    decimal = "";
    // no conversion required 
    if(from == to){
        document.getElementById("displayTo").innerHTML = actualDisplay;
    }else if (from == 10) { // converting from decimal to a different base 
        document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(splitNum,to), actualDisplay.charAt(0) == '-');
    }else{ // converting from a base != decimal 
        getBaseToDecimal(splitNum,from);
        // if converting to decimal 
        if (to == 10){
            document.getElementById("displayTo").innerHTML = decimal;
        } else { // if converting to a base != decimal, converts decimal to that base 
            document.getElementById("displayTo").innerHTML = displayCalculated(getDecimalToBase(wholeFracSplit(decimal),to),actualDisplay.charAt(0) == '-');
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
      whole = convertWholeFromDecimal(split[0],to,conversionsMap);
      frac = convertFractionFromDecimal(split[1],to,conversionsMap);
      converted = whole + '.' + frac;
  }else if (split.length == 1){ // if only whole number 
      whole = convertWholeFromDecimal(split[0],to,conversionsMap);
      converted = whole;
  }
  return converted;
}

// Created 10/22/2019 by Sri Ramya Dandu
// Input: split is an array such that split[0] is the whole number and split[1] is fraction
//        to is the base to convert to 
// Returns string of the converted value from base to decimal  
function getBaseToDecimal(split,from){
  decimal = "";
  // converts from base to decimal 
  if(splitNum.length == 2){   // if whole and fraction 
    var whole = convertWholeFromBase(conversionsMap,splitNum[0],from);
    var frac = convertFractionFromBase(conversionsMap,splitNum[1],from);
    decimal = String(Number(whole) + Number(frac));
  }else if (splitNum.length == 1){  // if only whole 
    var whole = convertWholeFromBase(conversionsMap,splitNum[0],from);
    decimal = whole;
  }
  return decimal;
}

// Created 10/22/2019 by Sri Ramya Dandu
// Displays 4 bits with space 
function splitInto4(value){
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
    printValue = splitInto4(parts[0]) + '.';
     
    // adds repeating symbol 
    if (isRepeating(parts[1].substring(1))&& parts[1].length > 7){
      printValue += '<span id = "repeating" >' + splitInto4(parts[1]) + '</span>';
    }else{
      printValue += splitInto4(parts[1]);
    }
  }else{
    printValue = splitInto4(parts[0]);
  }
  if(isNegative){
    printValue = '- ' + printValue;
  }
  return printValue;
}