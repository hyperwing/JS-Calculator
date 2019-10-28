// File created 10/23/2019 by Sri Ramya Dandu
// Edited 10/24/2019 by Sri Ramya Dandu

const rewire = require("rewire");
const modeConversion = rewire("../scripts/modeConversion.js");
expect = require('chai').expect;
// conversion values for hex and decimal 
var conversionsMap = {
  0:"0", 1: "1", 2: "2", 3: "3", 4:"4", 5:"5", 6:"6",
  7:"7", 8:"8", 9:"9", 10:"A", 11:"B", 12:"C", 13:"D", 14:"E", 15:"F"
};


describe ('Converts from whole number decimal to binary', () => {
  var base = 2;
  
  it('Border Case: converts empty string', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('', base);
    expect(binaryValue).to.equal('0');
  });

  it('Border Case: converts 0', () => {
      let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('0', base);
      expect(binaryValue).to.equal('0');
  });

  it('Converts single digit', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('2', base);
    expect(binaryValue).to.equal('10');
  });

  it('Converts double digit', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('12', base);
    expect(binaryValue).to.equal('1100');
  });

  it('Converts tripple digit', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('121', base);
    expect(binaryValue).to.equal('1111001');
  });

  it('Converts number in thousands', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('1211', base);
    expect(binaryValue).to.equal('10010111011');
  });

  it('Border Case: Converts very large number', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")(String(Number.MAX_SAFE_INTEGER), base);
    expect(binaryValue).to.equal('11111111111111111111111111111111111111111111111111111');
  });
});

describe ('Converts from whole number decimal to hexadecimal', () => {
  var base = 16;

  it('Border Case: converts empty string', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromDecimal")('', base);
    expect(binaryValue).to.equal('0');
  });
  
  it('Border Case: converts 0', () => {
      let hexValue = modeConversion.__get__("convertWholeFromDecimal")('0', base);
      expect(hexValue).to.equal('0');
  });

  it('Converts single digit', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")('1', base);
    expect(hexValue).to.equal('1');
  });

  it('Converts double digit', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")('12', base);
    expect(hexValue).to.equal('C');
  });

  it('Converts tripple digit', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")('329', base);
    expect(hexValue).to.equal('149');
  });

  it('Converts number in thousands', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")('45023', base);
    expect(hexValue).to.equal('AFDF');
  });

  it('Converts all alpha values', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")('11259375', base);
    expect(hexValue).to.equal('ABCDEF');
  });

  it('Border Case: Converts very large number', () => {
    let hexValue = modeConversion.__get__("convertWholeFromDecimal")(String(Number.MAX_SAFE_INTEGER), base);
    expect(hexValue).to.equal('1FFFFFFFFFFFFF');
  });
});


describe ('Converts from fraction decimal to binary', () => {
  var base = 2;

  it('Border Case: converts .0', () => {
      let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('0', base);
      expect(binaryValue).to.equal('0');
  });

  it('Converts single decimal digit', () => {
    let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('.5', base);
    expect(binaryValue).to.equal('1');
  });

  it('Converts single decimal repeating digit', () => {
    let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('.7', base);
    expect(binaryValue).to.equal('101100110011');
  });

  it('Converts double decimal digit', () => {
    let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('.55', base);
    expect(binaryValue).to.equal('100011001100');
  });

  // check
  it('Converts tripple decimal digit', () => {
    let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('.987', base);
    expect(binaryValue).to.equal('11111100101011000000100000110001001001101110100101111');
  });

  it('Border Case: Converts Number.Max', () => {
    let binaryValue = modeConversion.__get__("convertFractionFromDecimal")('.' + String(Number.MAX_SAFE_INTEGER), base);
    expect(binaryValue).to.equal('11100110100101011001010010111110110001000100110111011');
  });
});


describe ('Converts from fraction decimal to hexadecimal', () => {
  var base = 16;

  it('Border Case: converts .0', () => {
      let hexValue = modeConversion.__get__("convertFractionFromDecimal")('0', base);
      expect(hexValue).to.equal('0');
  });

  it('Converts single decimal digit', () => {
    let hexValue = modeConversion.__get__("convertFractionFromDecimal")('.5', base);
    expect(hexValue).to.equal('8');
  });

  it('Converts single decimal repeating digit', () => {
    let hexValue = modeConversion.__get__("convertFractionFromDecimal")('.8', base);
    expect(hexValue).to.equal('CCCCCCCC');
  });

  it('Converts double decimal digit', () => {
    let hexValue = modeConversion.__get__("convertFractionFromDecimal")('.23', base);
    expect(hexValue).to.equal('3AE147AE147AE2');
  });

  // check
  it('Converts tripple decimal digit', () => {
    let hexValue = modeConversion.__get__("convertFractionFromDecimal")('.123', base);
    expect(hexValue).to.equal('1F7CED916872B');
  });

  it('Border Case: Converts Number.Max', () => {
    let hexValue = modeConversion.__get__("convertFractionFromDecimal")('.' + String(Number.MAX_SAFE_INTEGER), base);
    expect(hexValue).to.equal('E69594BEC44DD8');
  });
});


describe ('Checks repetition in string', () => {

  it('Returns true for empty string', () => {
      expect(modeConversion.__get__("isRepeating")('')).to.equal(true);
  });

  it('Returns false for string.length 1', () => {
    expect(modeConversion.__get__("isRepeating")('a')).to.equal(false);
  });

  it('Returns false for even non-matching string', () => {
    expect(modeConversion.__get__("isRepeating")('12')).to.equal(false);
  });

  it('Returns true for repeating', () => {
    expect(modeConversion.__get__("isRepeating")('10101010')).to.equal(true);
  });

  it('Returns true for even string with same char', () => {
    expect(modeConversion.__get__("isRepeating")('000000')).to.equal(true);
  });

});

describe ('Converts from whole number in binary to decimal', () => {
  var base = 2;
  
  it('Border Case: converts empty string', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('', base);
    expect(decimalValue).to.equal('0');
  });

  it('Border Case: converts 0', () => {
      let decimalValue = modeConversion.__get__("convertWholeFromBase")('0', base);
      expect(decimalValue).to.equal('0');
  });

  it('Converts single digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('10', base);
    expect(decimalValue).to.equal('2');
  });

  it('Converts double digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('1100', base);
    expect(decimalValue).to.equal('12');
  });

  it('Converts tripple digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('1111001', base);
    expect(decimalValue).to.equal('121');
  });

  it('Converts number in thousands', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('10010111011', base);
    expect(decimalValue).to.equal('1211');
  });

  it('Border Case: Converts very large number', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('11111111111111111111111111111111111111111111111111111', base);
    expect(decimalValue).to.equal(String(Number.MAX_SAFE_INTEGER));
  });
});

describe ('Converts from whole number in hexadecimal to decimal', () => {
  var base = 16;

  it('Border Case: converts empty string', () => {
    let binaryValue = modeConversion.__get__("convertWholeFromBase")('', base);
    expect(binaryValue).to.equal('0');
  });
  
  it('Border Case: converts 0', () => {
      let decimalValue = modeConversion.__get__("convertWholeFromBase")('0', base);
      expect(decimalValue).to.equal('0');
  });

  it('Converts single digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('1', base);
    expect(decimalValue).to.equal('1');
  });

  it('Converts double digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('C', base);
    expect(decimalValue).to.equal('12');
  });

  it('Converts tripple digit', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('149', base);
    expect(decimalValue).to.equal('329');
  });

  it('Converts number in thousands', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('AFDF', base);
    expect(decimalValue).to.equal('45023');
  });

  it('Converts all alpha values', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('ABCDEF', base);
    expect(decimalValue).to.equal('11259375');
  });

  it('Border Case: Converts very large number', () => {
    let decimalValue = modeConversion.__get__("convertWholeFromBase")('1FFFFFFFFFFFFF', base);
    expect(decimalValue).to.equal(String(Number.MAX_SAFE_INTEGER));
  });
});


describe ('Converts from fraction binary to decimal', () => {
  var base = 2;

  it('Border Case: converts .0', () => {
      let decimalValue = modeConversion.__get__("convertFractionFromBase")('0', base);
      expect(decimalValue).to.equal('0');
  });

  it('Converts single decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.1', base);
    expect(decimalValue).to.equal('0.5');
  });

  it('Converts single decimal repeating digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.101100110011', base);
    expect(decimalValue).to.equal('0.699951171875');
  });

  it('Converts double decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.100011001100', base);
    expect(decimalValue).to.equal('0.5498046875');
  });

  // check
  it('Converts tripple decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.11111100101011000000100000110001001001101110100101111', base);
    expect(decimalValue).to.equal('0.987');
  });

  it('Border Case: Converts Number.Max', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.11100110100101011001010010111110110001000100110111011', base);
    expect(decimalValue).to.equal('0.' + String(Number.MAX_SAFE_INTEGER));
  });
});


describe ('Converts from fraction hexadecimal to decimal', () => {
  var base = 16;

  it('Border Case: converts .0', () => {
      let decimalValue = modeConversion.__get__("convertFractionFromBase")('.0', base);
      expect(decimalValue).to.equal('0');
  });

  it('Converts single decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.8', base);
    expect(decimalValue).to.equal('0.5');
  });

  it('Converts single decimal repeating digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.CCCCCCCC', base);
    expect(decimalValue).to.equal('0.7999999998137355');
  });
//hope you find this
  it('Converts double decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.3AE147AE147AE2', base);
    expect(decimalValue).to.equal('0.23');
  });

  // check
  it('Converts tripple decimal digit', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.1F7CED916872B', base);
    expect(decimalValue).to.equal('0.123');
  });

  it('Border Case: Converts Number.Max', () => {
    let decimalValue = modeConversion.__get__("convertFractionFromBase")('.E69594BEC44DD8', base);
    expect(decimalValue).to.equal('0.' + String(Number.MAX_SAFE_INTEGER));
  });
});


describe ('Splits number into whole and fraction' , () => {

  it('Boundary Case: splits 0', () => {
    expect(modeConversion.__get__("wholeFracSplit")('0')).to.eql([ '0' ]);
  });

  it('Boundary Case: splits 0.0', () => {
    expect(modeConversion.__get__("wholeFracSplit")('0.0')).to.eql([ '0' , '.0' ]);
  });

  it('Boundary Case: splits number with no whole', () => {
    expect(modeConversion.__get__("wholeFracSplit")('0.1')).to.eql([ '0' , '.1' ]);
  });

  it('Boundary Case: splits number with no fraction', () => {
    expect(modeConversion.__get__("wholeFracSplit")('2')).to.eql([ '2']);
  });

  it('Splits a normal decimal number', () => {
    expect(modeConversion.__get__("wholeFracSplit")('234.234')).to.eql([ '234' , '.234']);
  });

  it('Splits a normal binary number', () => {
    expect(modeConversion.__get__("wholeFracSplit")('11.01')).to.eql([ '11' , '.01']);
  });

  it('Splits a normal hex number', () => {
    expect(modeConversion.__get__("wholeFracSplit")('ABCDEF.01')).to.eql([ 'ABCDEF' , '.01']);
  });

});

describe ('Gets all conversion map values correctly', () => {

  it('Gets 1', () => {
    expect(modeConversion.__get__("getKey")('1')).to.equal(1);
  });

  it('Gets 2', () => {
    expect(modeConversion.__get__("getKey")('2')).to.equal(2);
  });

  it('Gets 3', () => {
    expect(modeConversion.__get__("getKey")('3')).to.equal(3);
  });
  it('Gets 4', () => {
    expect(modeConversion.__get__("getKey")('4')).to.equal(4);
  });
  it('Gets 5', () => {
    expect(modeConversion.__get__("getKey")('5')).to.equal(5);
  });
  it('Gets 6', () => {
    expect(modeConversion.__get__("getKey")('6')).to.equal(6);
  });
  it('Gets 7', () => {
    expect(modeConversion.__get__("getKey")('7')).to.equal(7);
  });
  it('Gets 8', () => {
    expect(modeConversion.__get__("getKey")('8')).to.equal(8);
  });
  it('Gets 9', () => {
    expect(modeConversion.__get__("getKey")('9')).to.equal(9);
  });
  it('Gets 10', () => {
    expect(modeConversion.__get__("getKey")('A')).to.equal(10);
  });
  it('Gets 11', () => {
    expect(modeConversion.__get__("getKey")('B')).to.equal(11);
  });
  it('Gets 12', () => {
    expect(modeConversion.__get__("getKey")('C')).to.equal(12);
  });

  it('Gets 13', () => {
    expect(modeConversion.__get__("getKey")('D')).to.equal(13);
  });
  
  it('Gets 14', () => {
    expect(modeConversion.__get__("getKey")('E')).to.equal(14);
  });

  it('Gets 15', () => {
    expect(modeConversion.__get__("getKey")('F')).to.equal(15);
  });

});


describe ('Tests for input for decimals', () => {

  var from = 10;
  it('Tests invalid hex input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('A', from)).to.equal(false);
  });

  it('Tests invalid hex input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-A', from)).to.equal(false);
  });

  it('Tests invalid hex input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-.A', from)).to.equal(false);
  });

  it('Tests invalid hex input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('A.', from)).to.equal(false);
  });


  it('Tests invalid hex input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-.BSA', from)).to.equal(false);
  });

  it('Tests invalid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('21*27.;sa,', from)).to.equal(false);
  });

  it('Tests invalid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('0!.23', from)).to.equal(false);
  });


  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('90029302', from)).to.equal(true);
  });

  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('219239121.0', from)).to.equal(true);
  });

  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('1.', from)).to.equal(true);
  });

  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('1.321322', from)).to.equal(true);
  });

  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('0.321322', from)).to.equal(true);
  });

  it('Tests valid input for decimal', () => {
    expect(modeConversion.__get__("isValidInput")('.321322', from)).to.equal(true);
  });


  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-29231239231.2132231', from)).to.equal(true);
  });

  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-1', from)).to.equal(true);
  });


  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-1.', from)).to.equal(true);
  });

  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-1.321322', from)).to.equal(true);
  });

  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-0.321322', from)).to.equal(true);
  });

  it('Tests valid input for negative decimal', () => {
    expect(modeConversion.__get__("isValidInput")('-.321322', from)).to.equal(true);
  });

}); 


describe ('Tests input for binary', () => {

  var from = 2;
  it('Tests invalid hex input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('A', from)).to.equal(false);
  });

  it('Tests invalid hex input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('-A', from)).to.equal(false);
  });

  it('Tests invalid hex input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('-.A', from)).to.equal(false);
  });
//you have too many test cases
  it('Tests invalid hex input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('A.', from)).to.equal(false);
  });

  it('Tests invalid hex input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('-.BSA', from)).to.equal(false);
  });

  it('Tests invalid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('01*01.;10,', from)).to.equal(false);
  });

  it('Tests invalid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('0!.10', from)).to.equal(false);
  });

  it('Tests invalid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('0.321322', from)).to.equal(false);
  });

  it('Tests invalid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('.321322', from)).to.equal(false);
  });

  it('Tests invalid input for negative binary', () => {
    expect(modeConversion.__get__("isValidInput")('-29231239231.2132231', from)).to.equal(false);
  });

  it('Tests valid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('10.01', from)).to.equal(true);
  });

  it('Tests valid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('11', from)).to.equal(true);
  });

  it('Tests valid input for binary', () => {
    expect(modeConversion.__get__("isValidInput")('.01', from)).to.equal(true);
  });

  it('Tests valid input for negative binary', () => {
    expect(modeConversion.__get__("isValidInput")('-10', from)).to.equal(true);
  });

  it('Tests valid input for negative binary', () => {
    expect(modeConversion.__get__("isValidInput")('-10.01', from)).to.equal(true);
  });

  it('Tests valid input for negative binary', () => {
    expect(modeConversion.__get__("isValidInput")('-10.', from)).to.equal(true);
  });
});


describe ('Tests input for hexadecimal', () => {

  var from = 16;
  it('Tests invalid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('#23', from)).to.equal(false);
  });

  it('Tests invalid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('XYZ3', from)).to.equal(false);
  });

  it('Tests invalid negative input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('-XYZ3.0', from)).to.equal(false);
  });

  it('Tests valid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('3.3', from)).to.equal(true);
  });

  it('Tests valid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('ABCD.EF', from)).to.equal(true);
  });

  it('Tests valid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('.EF', from)).to.equal(true);
  });

  it('Tests valid input for negative hex', () => {
    expect(modeConversion.__get__("isValidInput")('-ABCD.EF', from)).to.equal(true);
  });

  it('Tests valid input for negative hex', () => {
    expect(modeConversion.__get__("isValidInput")('-ABCD', from)).to.equal(true);
  });

  it('Tests valid input for hex', () => {
    expect(modeConversion.__get__("isValidInput")('0.0', from)).to.equal(true);
  });
});



describe ('Tests outtping in 4 bits', () => {

  it('Boundary case input is 0', () => {
    expect(modeConversion.__get__("splitInto4")('0')).to.equal('0000');
  });

  it('Input has less than four digits ', () => {
    expect(modeConversion.__get__("splitInto4")('20')).to.equal('0020');
  });

  it('Input has exactly four digits ', () => {
    expect(modeConversion.__get__("splitInto4")('1220')).to.equal('1220');
  });

  it('Input has between four and eight digits ', () => {
    expect(modeConversion.__get__("splitInto4")('2ASLK0')).to.equal('002A SLK0');
  });

  it('Input has exactly eight digits ', () => {
    expect(modeConversion.__get__("splitInto4")('12111120')).to.equal('1211 1120');
  });

  it('Input has 20+ digits', () => {
    expect(modeConversion.__get__("splitInto4")('123456789012345678901234567890')).to.equal('0012 3456 7890 1234 5678 9012 3456 7890');
  });

  it('Boundary case: input is .0', () => {
    expect(modeConversion.__get__("splitInto4")('.0')).to.equal('0000');
  });

  it('Fraction input has less than four digits ', () => {
    expect(modeConversion.__get__("splitInto4")('.20')).to.equal('2000');
  });

  it('Fraction input has exactly four digits ', () => {
    expect(modeConversion.__get__("splitInto4")('.1220')).to.equal('1220');
  });

  it('Fraction input has between four and eight digits ', () => {
    expect(modeConversion.__get__("splitInto4")('.2ASLK0')).to.equal('2ASL K000');
  });

  it('Fraction input has exactly eight digits ', () => {
    expect(modeConversion.__get__("splitInto4")('.12111120')).to.equal('1211 1120');
  });

  it('Fraction input has 20+ digits', () => {
    expect(modeConversion.__get__("splitInto4")('.123456789012345678901234567890')).to.equal('1234 5678 9012 3456 7890 1234 5678 9000');
  });

});











