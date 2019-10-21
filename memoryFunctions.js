/*
File created 10/18/2019 by Sri Ramya Dandu
Edited 10/17/2019 by Sri Ramya Dandu
Edited 10/18/2019 by Sharon Qiu
Edited 10/18/2019 by Sri Ramya Dandu
Edited 10/20/2019 by Sharon Qiu
Functions for memory including ms, mr, m-, m+, m*, m/, mc.
*/

var memory = [];
// Created 10/17/2019 by Sri Ramya Dandu
// Edited 10/18/2019 by Sri Ramya Dandu: diabled buttons 
// Edited 10/20/2019 by Sharon Qiu: fixed so it works with internal memory array and returns nothing.
// Clears all the values stored in memory, sets the memory to 0
function clearMemory(){
    memory.length = 0;
    document.getElementById('MC').disabled = true;
    document.getElementById('MR').disabled = true;
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for ms button. Stores a value in memory
function storeMemory() {
    memory.unshift(display);
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for ms button. clears a single specific value.
function clearMemorySingle(index) {
    memory.splice(index,1);
    updateDisplay();
}

// Created 10/17/2019 by Sri Ramya Dandu
// Uses the number in memory as the current value 
function memoryRecall(){
    display = String(memory[0]);// TODO: Stringify
    updateDisplay();
}

// Created 10/17/2019 by Sri Ramya Dandu
// Edited 10/18/2019 by Sharon Qiu: Added html code for more buttons
// Edited 10/20/2019 by Sharon Qiu: Fixed popups for list.
// Shows the list of numbers in memory 
function displayMemory(){
    var htmlCode = "";
    console.log(memory)
    
    if (memory.length < 1) {
        document.getElementById('MC').disabled = true;
        document.getElementById('MR').disabled = true;
        document.getElementById('display-memory-list').style.display = "none";
    }
    else{
        document.getElementById('MC').disabled = false;
        document.getElementById('MR').disabled = false;

        index = 0;
        memory.forEach(function(element) {

            htmlCode += 
                `
                <button class="memory-list" onclick="memoryRecall([${element}])">${element}</button>
                <div class="memory-operations-container">
                    <button class="memory-button" onclick="memorySubtract(${element})">M-</button>
                    <button class="memory-button" onclick="memoryAdd(${element})">M+</button>
                    <button class="memory-button" onclick="memoryDivide(${element})">M/</button>
                    <button class="memory-button" onclick="memoryMultiply(${element})">M*</button>
                    <button class="memory-button" id="MC single" onclick="clearMemorySingle(${index})">MC</button>
                </div>
                `;
                index++;
        });
    }
    
    document.getElementById("memory-stack-display").innerHTML = htmlCode;
    document.getElementById('display-memory-list').style.display = "block";
}


// Created 10/17/2019 by Sri Ramya Dandu
// Hides the list of numbers in memory 
function hideMemory(){
    document.getElementById('display-memory-list').style.display = "none";
}

/*
* Memory operations
*/

// Created 10/18/2019 by Sharon Qiu
// Functionality for m- button.
function memorySubtract(element) {
    display -= element;
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for m+ button.
function memoryAdd(element) {
    display = Number(display) + element;// TODO: Stringify
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for m+ button.
function memoryDivide(element) {
    if ((element == 0) && (display == 0)) {
        display = "Result is undefined.";
    }else if(display == 0){
        display = "Cannot divide by 0";
    }else{
        display /= element;
    }
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for m+ button.
function memoryMultiply(element) {
    display *= element;
    updateDisplay();
}
