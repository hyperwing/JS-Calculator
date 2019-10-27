// File created 10/27/19 David Wing

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
function displayMedian(){

    let len = data_set.length;
    let median = 0;

    if(len == 1){
        median = data_set[0];
    }else if(len %2 ==0){
        let m1 = parseFloat(data_set[parseInt(len/2-1)]);
        let m2 = parseFloat(data_set[parseInt(len/2)]);
        // console.log("m1:"+ m1)
        // console.log("m2:"+ m2);

        median = (m1 + m2) / 2;
        
    }
    else{
        median = data_set[parseInt(len/2)+1];
    }

    document.getElementById("median").innerText = median;
    return median;
}

// calculate and display mode
function displayMode(){
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
    document.getElementById("mode").innerText = mode;
    return mode;
}

// calculate and display range
function displayRange(){
    let display_range = document.getElementById("range");
    display_range.innerText = data_set[data_set.length-1] - data_set[0];
}

// calculate and display mean
function displayMean(){
    mean = 0;

    data_set.forEach(add);
    function add(item){
        mean += parseFloat(item);
    }

    mean = mean/data_set.length;
    document.getElementById("mean").innerText = mean;
    return mean;
}

// calculate and display SD
function displayStandardDeviation(mean){
    let sigma = 0;
    let sd = 0;
    data_set.forEach(calcSigma);
    function calcSigma(item){
        sigma += Math.pow((mean-item), 2);
    }

    sd = sigma / data_set.length;
    sd = Math.sqrt(sd);
    
    document.getElementById("sd").innerText = sd;
    return sd;
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

    let mode = displayMode();
    let median = displayMedian();
    let mean = displayMean();
    let range = displayRange();
    let sd = displayStandardDeviation(mean);
}

function handleClear(){
    data_set = [];
    clearDisplay();
}

function handleSort(){
    document.getElementById("display").innerText = "";
    data_set.forEach(reprint);
    function reprint(item){
        addToDisplay(item);
    }

}
