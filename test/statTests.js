// File created 10/27/19 David Wing
// File edited 10/29/19 David Wing

const rewire = require("rewire");
const stats = rewire("../scripts/stats");
expect = require('chai').expect;


describe ('Check stat base case', () => {

  stats.__get__("clearSet")();

  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("3");
  stats.__get__("addToSet")("4");
  stats.__get__("addToSet")("5");
  
  it('Median', function(done){

    stats.__get__("clearSet")();

    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("3");
    stats.__get__("addToSet")("4");
    stats.__get__("addToSet")("5");

    let median = stats.__get__("calculateMedian")();
    expect(median).to.equal(3);
    done();
  });

  it('Mode', function(done){
    let mode = stats.__get__("calculateMode")();
    expect(mode).to.equal(2);
    done();

  })

  it('Mean', function(done) {
    let mean = stats.__get__("calculateMean")();
    expect(mean).to.equal(3.2);
    done();

  })

  it('Range', function(done) {
    let range = stats.__get__("calculateRange")();
    expect(range).to.equal(3);
    done();

  })

  it('Standard Deviation', function(done) {
    let mean = stats.__get__("calculateMean")();
    let sd =stats.__get__("calculateStandardDeviation")(mean);
    expect(sd).to.equal(1.17);
    done();

  })

});


describe ('Check stat unordered display', () => {
  stats.__get__("clearSet")();

  stats.__get__("addToSet")("3");
  stats.__get__("addToSet")("5");
  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("2");
  stats.__get__("addToSet")("4");


  it('Median', function(done){

    stats.__get__("clearSet")();

    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("3");
    stats.__get__("addToSet")("4");
    stats.__get__("addToSet")("5");

    let median = stats.__get__("calculateMedian")();
    expect(median).to.equal(3);
    done();
  });

  it('Mode', function(done){
      let mode = stats.__get__("calculateMode")();
      expect(mode).to.equal(2);
      done();

  })

  it('Mean', function(done){
    let mean = stats.__get__("calculateMean")();
    expect(mean).to.equal(3.2);
    done();

  })

  it('Range', function(done) {
    let range = stats.__get__("calculateRange")();
    expect(range).to.equal(3);
    done();

  })

  it('Standard Deviation', function(done){
    let mean = stats.__get__("calculateMean")();
    let sd =stats.__get__("calculateStandardDeviation")(mean);
    expect(sd).to.equal(1.17);
    done();

  })

});


describe ('Median edge cases', () => {

  it('median of even length list', function(done){

    stats.__get__("clearSet")();

    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("2");
    stats.__get__("addToSet")("3");
    stats.__get__("addToSet")("4");

    let median = stats.__get__("calculateMedian")();

    expect(median).to.equal(2.5);
    done();
  });

  it('median of 1 length list', function(done){

    stats.__get__("clearSet")();

    stats.__get__("addToSet")("2");
    
    let median = stats.__get__("calculateMedian")();

    expect(median).to.equal(2);
    done();
  });
});
