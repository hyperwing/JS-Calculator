/*
File created 10/29/2019 by Leah Gillespie
 */

// Created 10/29/2019 by Leah Gillespie
// takes two numbers as inputs, returns a ^ b
function power(a, b) {
    if (b == 0) {
        return 1;
    }
    let ans = a;
    for (let i = 1; i < b; i++) {
        ans*=a;
    }
    return ans;
}

// Created 10/29/2019 by Leah Gillespie
// takes a number as the input, returns the square root of that number using newton's iteration, accurate within .0001%
// return value is rounded to two decimal places and is a string
function square_root(a) {
    if (a == 0) {
        return '0.00';
    }
    let r = a;
    while (Math.abs(r * r - a) / a >= .0000001) {
        r = (r + a / r) / 2;
    }
    return r.toFixed(2);
}
