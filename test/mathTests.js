// File created 10/29/2019 by Leah Gillespie
// Test cases for powAndRoots file.

const rewire = require("rewire");
const powAndRoot = rewire("../scripts/stats.js");
expect = require('chai').expect;

// Created 10/29/2019 by Leah Gillespie
describe('Power function: ', () => {

    // Created 10/29/2019 by Leah Gillespie
    it('1 to power of 1', () => {
        let ans = powAndRoot.__get__("power")(1,1);
        expect(ans).to.equal(1);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('2 to power of 1', () => {
        let ans = powAndRoot.__get__("power")(2,1);
        expect(ans).to.equal(2);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('1 to power of 2', () => {
        let ans = powAndRoot.__get__("power")(1,2);
        expect(ans).to.equal(1);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('2 to power of 2', () => {
        let ans = powAndRoot.__get__("power")(2,2);
        expect(ans).to.equal(4);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('1 to power of 0', () => {
        let ans = powAndRoot.__get__("power")(1,0);
        expect(ans).to.equal(1);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('2 to power of 0', () => {
        let ans = powAndRoot.__get__("power")(2,0);
        expect(ans).to.equal(1);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('0 to power of 1', () => {
        let ans = powAndRoot.__get__("power")(0,1);
        expect(ans).to.equal(0);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('0 to power of 2', () => {
        let ans = powAndRoot.__get__("power")(0,2);
        expect(ans).to.equal(0);
    });

    // Created 10/29/2019 by Leah Gillespie
    it('0 to power of 0', () => {
        let ans = powAndRoot.__get__("power")(0,0);
        expect(ans).to.equal(1);
    });

});


// Created 10/29/2019 by Leah Gillespie
describe('Square root function: ', () => {

    // Created 10/29/2019 by Leah Gillespie
    it('Square root of 1', () => {
        let ans = powAndRoot.__get__("square_root")(1);
        expect(ans).to.equal('1.00');
    });

    it('Square root of 4', () => {
        let ans = powAndRoot.__get__("square_root")(4);
        expect(ans).to.equal('2.00');
    });

    it('Square root of 0', () => {
        let ans = powAndRoot.__get__("square_root")(0);
        expect(ans).to.equal('0.00');
    });

    it('Square root of 2', () => {
        let ans = powAndRoot.__get__("square_root")(2);
        expect(ans).to.equal('1.41');
    });

    it('Square root of 5', () => {
        let ans = powAndRoot.__get__("square_root")(5);
        expect(ans).to.equal('2.24');
    });

    it('Square root of 1234567890', () => {
        let ans = powAndRoot.__get__("square_root")(1234567890);
        expect(ans).to.equal('35136.42');
    });

});