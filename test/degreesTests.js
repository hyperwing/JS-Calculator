// File created 10/28/2019 by Sharon Qiu
// Test cases for degrees file.

const rewire = require("rewire");
const degrees = rewire("../scripts/degrees.js");
expect = require('chai').expect;

describe('Degree to radians conversions: ', () => {

    it('Negative degree value', () => {
        var display = '-20';
        let radians = degrees.__get__("degree_to_radians")(display);
        expect(radians.toPrecision(2)).to.equal('-0.35');
    });

    it('Positive degree value', () => {
        var display = '20';
        let radians = degrees.__get__("degree_to_radians")(display);
        expect(radians.toPrecision(2)).to.equal('0.35');
    });

    it('0 degree value', () => {
        var display = '0';
        let radians = degrees.__get__("degree_to_radians")(display);
        expect(radians.toPrecision(2)).to.equal('0.0');
    });
});

describe('Radians to degrees conversions: ', () => {

    it('Negative radian value with pi', () => {
        var display = '-20&#960;';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(-3600);
    });

    it('Positive radian value with pi', () => {
        var display = '20&#960;';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(3600);
    });

    it('0 radian value', () => {
        var display = '0';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(0);
    });

    it('multiple values', () => {
        var display = '2&#960;3';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(1080);
    });

    it('multiple values one decimal value', () => {
        var display = '2.5&#960;3';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(1350);
    });

    it('multiple values two decimal value', () => {
        var display = '2.3&#960;3.212';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal.toFixed(2)).to.equal('1329.77');
    });

    it('just Pi', () => {
        var display = '&#960;';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(180);
    });

    it('no pi', () => {
        var display = '5';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(parseFloat(degreesVal.toFixed(2))).to.equal(286.48);
    });

    it('no pi decimal', () => {
        var display = '5.21';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(parseFloat(degreesVal.toFixed(2))).to.equal(298.51);
    });

    it('0*pi', () => {
        var display = '0&#960;';
        let degreesVal = degrees.__get__("radians_to_degrees")(display);
        expect(degreesVal).to.equal(0);
    });
});