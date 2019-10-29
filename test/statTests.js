// File created 10/27/19 David Wing

const rewire = require("rewire");
const stats = rewire("../scripts/stats");
expect = require('chai').expect;


describe ('Check Statistics', () => {
  var data_set = [2,2,3,4,5];

  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("3");
  stats.__get__("addToSet")("4");
  stats.__get__("addToSet")("5");

  it('Median', () => {
    let median = stats.__get__("calculateMedian")();
    expect(median).to.equal('3');
  });

  it('Mode', () =>{
      let mode = stats.__get__("calculateMode")();
      expect(mode).to.equal('2');
  })

  it('Mean', () =>{
    let mean = stats.__get__("calculateMean")();
    expect(mean).to.equal(3.2);
  })

  it('Standard Deviation', () =>{
    let mean = stats.__get__("calculateMean")();
    let sd =stats.__get__("calculateStandardDeviation")(mean);
    expect(sd).to.equal(1.16619037896906);
  })
});
