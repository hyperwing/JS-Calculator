/*
File created 10/20/2019 by Sri Ramya Dandu
Edited 10/21/2019 by Sri Ramya Dandu
*/

// conversion values for hex and decimal 
var conversionsMap = {
  0:"0", 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6",
  7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"
};

// Created 10/20/2019 by Sri Ramya Dandu
// Edited 10/21/2019 by Sri Ramya Dandu: Added hex values 
// Converts whole numbers from decimal to given base 
function convertWholeFromDecimal(number, base,conversionsMap){
  conversion = "";
  while(number > 0){
      value = conversionsMap[String(number % base)];
      conversion = value + conversion; //remainder appends as msb 
      number = Math.floor(number/base); //integer division 
  }
  return conversion;
}

// Created 10/20/2019 by Sri Ramya Dandu
// Converts fractions from decimal to given base 
function convertFractionFromDecimal(number, base,conversionsMap){
    conversion = "";
    pattern = ""; // to check for repetition 
    while(number > 0){
        tempNum = number * base;
        conversion += conversionsMap[Math.floor(tempNum)]; // whole number appends as lsb
        number = tempNum - Math.floor(tempNum); //obtains fraction value 
        pattern += String(number.toFixed(1)).charAt(String(number.toFixed(1)).length -1); //TODO: change to find pattern in result 
        if (isRepeating(pattern) && pattern.length > 15){  // check repeating 
          number = 0;
        }
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
  decimalNum = 0;
  exponent = numStr.length-1;
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(conversionsMap, numStr.charAt(i)) * Math.pow(base,exponent); // # * base^exponent 
    exponent--;
  }
  return String(decimalNum);
  }

// Created 10/21/2019 by Sri Ramya Dandu
// Converts fraction to decimal from given base 
function convertFractionFromBase(conversionsMap,numStr, base){
  decimalNum = 0;
  exponent = -1;
  // removes decimal point from number 
  numStr = numStr.substring(1);
  for(i = 0; i < numStr.length; i++){
    decimalNum += getKey(conversionsMap, numStr.charAt(i)) * Math.pow(base,exponent); // # * base^exponent  //TODO: Write a Math.pow func
    exponent--;
  }
  return String(decimalNum);
}
  
// Created 10/21/2019 by Sri Ramya Dandu
// Takes twos complement of the given binary string 
function twosComp(binaryStr){
  firstOne = binaryStr.lastIndexOf("1"); //Finds the lsb 1
  compStr = binaryStr.substring(0,firstOne); //substring exlcuding the lsb 1
  // changes all 0s to 1s and vice versa 
  compStr = compStr.replace(/0/g, "-"); 
  compStr = compStr.replace(/1/g, "0");
  compStr = compStr.replace(/-/g, "1");
  return compStr + binaryStr.substring(firstOne); //concatenates twos comp with lsb 1
}

// Created 10/21/2019 by Sri Ramya Dandu
// Splits string into whole and fraction if it exists 
// Return value at index 0 is whole number, index 1 is fraction if it exists 
function wholeFracSplit(numStr){
  split = [];
  dot = numStr.indexOf('.')
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
}

// Created 10/21/2019 by Sri Ramya Dandu
// Input: splitNum is an array such that splitNum[0] is the whole number and splitNum[1] is fraction
//        to is the base to convert to and from is the base to convert from 
function callFunctions(splitNum, from, to){
  decimal = "";
  // no conversion required 
  if(from == to){
      document.getElementById("displayTo").innerHTML = display;
  }else if (from == 10) { // converting from decimal to a different base 
      document.getElementById("displayTo").innerHTML = getDecimalConversion(splitNum,to);
  }else{ // converting from a base != decimal 

      // converts from base to decimal 
      if(splitNum.length == 2){   // if whole and fraction 
          whole = convertWholeFromBase(conversionsMap,splitNum[0],from);
          frac = convertFractionFromBase(conversionsMap,splitNum[1],from);
          decimal = String(Number(whole) + Number(frac));
      }else if (splitNum.length == 1){  // if only whole 
          whole = convertWholeFromBase(conversionsMap,splitNum[0],from);
          document.getElementById("displayTo").innerHTML = whole;
          decimal = whole;
      }

      // if converting to decimal 
      if (to == 10){
          document.getElementById("displayTo").innerHTML = decimal;
      } else { // if converting to a base != decimal, converts decimal to that base 
          document.getElementById("displayTo").innerHTML = getDecimalConversion(wholeFracSplit(decimal),16);
      }
  }
}
// Created 10/21/2019 by Sri Ramya Dandu
// Input: split is an array such that split[0] is the whole number and split[1] is fraction
//        to is the base to convert to 
// Returns string of the converted value from decimal to base 
function getDecimalConversion(split,to){
  converted = 0;
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