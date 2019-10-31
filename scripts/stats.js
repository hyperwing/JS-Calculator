// File created 10/27/19 David Wing
// File edited 10/28/19 David Wing
// File edited 10/29/19 David Wing
// File edited 10/29/19 Leah Gillespie
// File edited 10/31/19 David Wing: added chaining of stat display

let data_set = [];

// Created 10/28/19 David Wing
// adds to the set after button press
function addToSet(val){
    data_set.push(val);
}

// Created 10/28/19 David Wing
// display new additions
function addToDisplay(val){
    let display_box = document.getElementById("display");

    if(display_box.innerText == ""){
        display_box.innerText += " " + val;
    }else{
        display_box.innerText += ", " + val;
    }
}

// Created 10/28/19 David Wing
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

// Created 10/28/19 David Wing
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



// Created 10/28/19 David Wing
// calculate and display range
function calculateRange(){
    range = data_set[data_set.length-1] - data_set[0];
    return parseFloat(range);
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


// Created 10/28/19 David Wing
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

// Created 10/28/19 David Wing
// Edited 10/31/19 David Wing: added chaining
function clearDisplay(){

    //number buttons
    var statOut = document.getElementsByName("outputStat");
    for (var i = 0; i < statOut.length; i++){
        statOut[i].innerHTML = "";       
    }

    document.getElementById("display").innerText = "";

}

// Created 10/28/19 David Wing
// edited 10/29/19 David Wing
// edited 10/31/19 David Wing: chaining and arrays
function handleSubmit(){

    let num_box = document.getElementById("input");

    num_input = parseFloat(num_box.value);

    // input checking
    if (isNaN(num_input)){
        return -1;        
    }
    addToDisplay(num_input)
    addToSet(num_input);

    num_box.value = ""
    
    // sort data before handling
    data_set.sort(function(a, b){return a - b});

    // console.log(data_set);

    let stat_arr = [5];
    stat_arr[0] = calculateMedian();
    stat_arr[1] = calculateMode();
    let mean = calculateMean();
    stat_arr[2] = mean;
    stat_arr[3] = calculateRange()
    stat_arr[4] = calculateStandardDeviation(mean);

    updateStatDisplays(stat_arr);

}

// Created 10/28/19 David Wing
function handleClear(){
    clearSet();    
    clearDisplay();
}

// Created 10/31/19 David Wing: added chaining
function updateStatDisplays(arr){

    var statOut = document.getElementsByName("outputStat");
    for (var i = 0; i < statOut.length; i++){
        statOut[i].innerHTML = arr[i];       
    }

}

// Created 10/28/19 David Wing
function clearSet(){
    data_set = [];
}

// Created 10/28/19 David Wing
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
