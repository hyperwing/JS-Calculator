// File created 10/27/19 David Wing

let data_set = [];

// adds to the set after button press
function addToSet(val){
    data_set.push(val);
}

// display new additions
function addToDisplay(val){
    let display_box = document.getElementById("display");

    if(data_set.length == 0){
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

    let display_mode = document.getElementById("median");
    display_mode.innerText = median;
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
    // console.log(map);

    let display_mode = document.getElementById("mode");
    display_mode.innerText = mode;

}

// calculate and display range
function displayRange(){

}

// calculate and display SD
function displayStandardDeviation(){

}

// calculate and display Prob
function displayProbability(){

}


function handleSubmit(){

    let num_box = document.getElementById("input");
    console.log(num_box.value);
    addToDisplay(num_box.value)
    addToSet(num_box.value);

    displayMode();
    displayMedian();
}