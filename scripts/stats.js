// File created 10/27/19 David Wing
// File edited 10/28/19 David Wing
// File edited 10/29/19 David Wing

let data_set = [];

// adds to the set after button press
function addToSet(val){
    data_set.push(val);
}

// display new additions
function addToDisplay(val){
    let display_box = document.getElementById("display");

    if(display_box.innerText == ""){
        display_box.innerText += " " + val;
    }else{
        display_box.innerText += ", " + val;
    }
}

// calculate and display Median
function calculateMedian(){

    let len = data_set.length;
    let median = 0;

    if(len == 1){
        median = data_set[0];
    }else if(len %2 ==0){
        let m1 = parseFloat(data_set[parseInt(len/2-1)]);
        let m2 = parseFloat(data_set[parseInt(len/2)]);

        median = (m1 + m2) / 2;
        
    }
    else{
        median = data_set[Math.floor(len/2)];
    }
    return parseFloat(median);
}

// calculate and display mode
function calculateMode(){
    let max = 0;
    let mode = data_set[0]
    let map = {};
    data_set.forEach(addToMap);

    function addToMap(item){
        if(item in map){
            map[item] += 1;
        }else{
            map[item] = 0;
        }

        // see if we have an more of this
        if (map[item] > max){
            max = map[item];
            mode = item;
        }
    }
    return parseFloat(mode);
}



// calculate and display range
function calculateRange(){
    range = data_set[data_set.length-1] - data_set[0];
    return parseFloat(range);
}

function displayRange(range){
    document.getElementById("range").innerText = range
}

function calculateMean(){
    mean = 0;

    data_set.forEach(add);
    function add(item){
        mean += parseFloat(item);
    }
    mean = mean/data_set.length;
    return parseFloat(mean);
}

function displayMean(mean){
    document.getElementById("mean").innerText = mean;
}

// calculate and display SD 
function calculateStandardDeviation(mean){

    let sigma = 0;
    let sd = 0;
    data_set.forEach(calcSigma);
    function calcSigma(item){

        sigma += power((mean-item), 2);

        // sigma += Math.pow((mean-item), 2);
    }

    sd = sigma / data_set.length;
    sd = square_root(sd);
    // sd = Math.sqrt(sd);
    
    return parseFloat(sd);
}

function clearDisplay(){
    document.getElementById("display").innerText = "";
    document.getElementById("mean").innerText = "";
    document.getElementById("median").innerText = "";
    document.getElementById("mode").innerText = "";
    document.getElementById("range").innerText = "";
    document.getElementById("sd").innerText = "";

}

function handleSubmit(){

    let num_box = document.getElementById("input");

    num_input = parseFloat(num_box.value);

    // input checking
    if (isNaN(num_input)){
        return -1;        
    }
    console.log(num_input);
    addToDisplay(num_input)
    addToSet(num_input);

    num_box.value = ""
    
    // sort data before handling
    data_set.sort(function(a, b){return a - b});

    console.log(data_set);

    document.getElementById("mode").innerText = calculateMode();
    document.getElementById("median").innerText = calculateMedian();
    let mean = calculateMean();
    document.getElementById("mean").innerText =mean;
    document.getElementById("range").innerText = calculateRange();
    document.getElementById("sd").innerText = calculateStandardDeviation(mean);

}

function handleClear(){
    clearSet();    
    clearDisplay();
}

function clearSet(){
    data_set = [];
}

function handleSort(){
    document.getElementById("display").innerText = "";
    data_set.forEach(reprint);
    function reprint(item){
        addToDisplay(item);
    }

}


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
