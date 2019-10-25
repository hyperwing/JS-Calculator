// File created 10/25/2019 by Sri Ramya Dandu

const rewire = require("rewire");
const memoryFunctions = rewire("../memoryFunctions");
expect = require('chai').expect;
var memory = [1,2,3];
