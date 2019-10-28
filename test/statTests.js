// File created 10/27/19 David Wing

const rewire = require("rewire");
const modeConversion = rewire("../scripts/stats.js");
expect = require('chai').expect;

/*
describe ('Check Statistics', () => {
  var data_set = [2,2,3,4,5];
  
  it('Median', () => {
    let median = stats.__get__("displayMedian")();
    expect(median).to.equal('3');
  });

  it('Mode', () =>{
      let mode = stats.__get__("displayMode")();
      expect(mode).to.equal('2');
  })

  it('Mean', () =>{
    let mean = stats.__get__("displayMean")();
    expect(mean).to.equal('3.2');
})
});
*/