// File created 10/23/2019 by Sri Ramya Dandu
const rewire = require("rewire");
const modeConversion = rewire("../modeConversion");
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