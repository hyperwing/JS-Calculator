/*
File created 10/18/2019 by Sri Ramya Dandu
Edited 10/17/2019 by Sri Ramya Dandu
Edited 10/18/2019 by Sharon Qiu
Edited 10/18/2019 by Sri Ramya Dandu
Functions for memory including ms, mr, m-, m+, m*, m/, mc.
*/

// Created 10/17/2019 by Sri Ramya Dandu
// Edited 10/18/2019 by Sri Ramya Dandu: diabled buttons 
// Clears all the values stored in memory, sets the memory to 0
function clearMemory(memoryStack, currentDisplay){
    memoryStack.length = 0;
    currentDisplay = 0;
    document.getElementById('MC').disabled = true;
    document.getElementById('MR').disabled = true;
    return memoryStack;
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for ms button. Stores a value in memory
function storeMemory(element) {
    memory.unshift(element);
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for ms button. clears a single specific value.
function clearMemorySingle(element) {
    memory.shift(element);
    updateDisplay();
}

// Created 10/17/2019 by Sri Ramya Dandu
// Uses the number in memory as the current value 
function memoryRecall(memoryStack){
    display = memoryStack[0];
    updateDisplay();
}

// Created 10/17/2019 by Sri Ramya Dandu
// Edited 10/18/2019 by Sharon Qiu: Added html code for more buttons
// Shows the list of numbers in memory 
function displayMemory(memoryStack){
    var htmlCode = "";

    if (document.getElementById('display-memory-list').style.display == "block"){
        hideMemory();
    }else{
        memoryStack.forEach(function(element) {

            //TODO: Memory to delete a specific value necessary?
            htmlCode += 
                `
                <button class="memory-list" onclick="memoryRecall([${element}])">${element}</button>
                <div class="memory-operations-container">
                    <button class="memory-button" onclick="memorySubtract(${element})">M-</button>
                    <button class="memory-button" onclick="memoryAdd(${element})">M+</button>
                    <button class="memory-button" onclick="memoryDivide(${element})">M/</button>
                    <button class="memory-button" onclick="memoryMultiply(${element})">M*</button>
                    <button class="memory-button" onclick="clearMemorySingle(${element})">MC</button>
                </div>
                `
        });
        document.getElementById("memory-stack-display").innerHTML = htmlCode;
        document.getElementById('display-memory-list').style.display = "block";
    }
}

// Created 10/17/2019 by Sri Ramya Dandu
// Hides the list of numbers in memory 
function hideMemory(){
    document.getElementById('display-memory-list').style.display = "none";
}

// Created 10/18/2019 by Sharon Qiu
// Display button options for a specific element in memory
function memoryOptionsDisplay(element) {
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
    display += element;
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for m+ button.
function memoryDivide(element) {
    display /= element;
    updateDisplay();
}

// Created 10/18/2019 by Sharon Qiu
// Functionality for m+ button.
function memoryMultiply(element) {
    display *= element;
    updateDisplay();
}
