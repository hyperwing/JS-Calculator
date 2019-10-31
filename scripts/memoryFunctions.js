/*
File created 10/18/2019 by Sri Ramya Dandu
Edited 10/17/2019 by Sri Ramya Dandu
Edited 10/18/2019 by Sharon Qiu
Edited 10/18/2019 by Sri Ramya Dandu
Edited 10/20/2019 by Sharon Qiu
Edited 10/20/2019 by Sri Ramya Dandu
Edited 10/21/2019 by Sri Ramya Dandu
Edited 10/26/2019 by Sharon Qiu
Functions for memory including ms, mr, m-, m+, m*, m/, mc.
*/

var memory = [];
var memoryTrigger = false; 


MemoryActions = {
    //Checks if M+-/*S has been triggered, keeping display if that is the case.
    // Created 10/17/2019 by Sri Ramya Dandu
    // Edited 10/18/2019 by Sri Ramya Dandu: diabled buttons 
    // Clears all the values stored in memory, sets the memory to 0
    clearMemory: function(){
        memory.length = 0;
        displayMemory();
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/20/2019 by Sri Ramya Dandu: Added display memory
    // Functionality for ms button. Stores a value in memory
    ,storeMemory: function() {
        memory.unshift(display);

        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none"
            displayMemory();
        }
        memoryTrigger = true;
        updateDisplay();
    }

    ,memoryRecall: function(){
        display = String(memory[0]);
        updateDisplay();
    }

    // Created 10/17/2019 by Sri Ramya Dandu
    // Edited 10/18/2019 by Sharon Qiu: Added html code for more buttons
    // Edited 10/20/2019 by Sharon Qiu: Fixed popups for list.
    // Edited 10/20/2019 by Sri Ramya Dandu: Fixed glitch for memory 
    // Shows the list of numbers in memory 
    ,displayMemory: function(){
        var htmlCode = "";
        
        if(document.getElementById('display-memory-list').style.display == "block"){
            hideMemory();
        } else {
            index = 0;
            memory.forEach(function(element) {
                htmlCode += 
                    `
                    <button class="memory-list" onclick="callFunction('MR',[${element}])">${element}</button>
                    <div class="memory-operations-container">
                        <button class="memory-button" onclick="callFunction('M-',${index})">M-</button>
                        <button class="memory-button" onclick="callFunction('M+',${index})">M+</button>
                        <button class="memory-button" onclick="callFunction('M/',${index})">M/</button>
                        <button class="memory-button" onclick="callFunction('M*',${index})">M*</button>
                        <button class="memory-button" id="MC single" onclick="callFunction('MCS', ${index})">MC</button>
                    </div>
                    `;
                    index++;
            });

            document.getElementById("memory-stack-display").innerHTML = htmlCode;
            document.getElementById('display-memory-list').style.display = "block";
        }
    }

    // Created 10/17/2019 by Sri Ramya Dandu
    // Hides the list of numbers in memory 
    ,hideMemory: function(){
        document.getElementById('display-memory-list').style.display = "none";
    }


    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/20/2019 by Sri Ramya Dandu: Keeps memory up after deleting 
    // Functionality for ms button. clears a single specific value.
    ,clearMemorySingle: function(index) {
        memory.splice(index,1);
        document.getElementById('display-memory-list').style.display = "none";
        if(memory.length != 0){
            displayMemory();
        }
        updateDisplay();
        memoryTrigger = true;
    }

}

MemoryMath = {
    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/26/2019 by Sharon Qiu: Allowed for immediate add to list even if 0.
    // Functionality for m+ button.
    memoryAdd: function (index) {
        if (index === undefined && memory.length < 1 && display != 0) {
            memory.unshift(display);
        } else if (index === undefined && memory.length < 1) {
            memory.unshift(0);
        } else if (index === undefined) {
            memory[0] = Number(memory[0]) + Number(display);
        } else {
            memory[index] += Number(display)
        }
        
        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none"
            displayMemory();
        }
        memoryTrigger = true;
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/26/2019 by Sharon Qiu: Allowed for immediate add to list even if 0.
    // Functionality for m- button.
    ,memorySubtract: function (index) {
        if (index === undefined && memory.length < 1) {
            memory.unshift(0-display)
        } else if (index === undefined) {
            memory[0] -= display;
        }else {
            memory[index] -= Number(display)
        }

        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none";
            displayMemory();
        }
        memoryTrigger = true;
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/26/2019 by Sharon Qiu: Added conditions division by 0 and undefined results.
    // Functionality for m/ button.
    ,memoryDivide: function(index) {
        if (display == 0) {
            display = "Cannot divide by 0";
        } else if ((index == 0) && (display == 0)) {
            display = "Result is undefined.";
        } else if (index === undefined && memory.length < 1) {
            memory.unshift(0);
        } else if (index === undefined) {
            memory[0] /= display;
        } else {
            memory[index] /= display;
        }

        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none"
            displayMemory();
        }
        memoryTrigger = true;
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Functionality for m* button.
    ,memoryMultiply: function(index) {
        if (index === undefined && memory.length < 1) {
            memory.unshift(0);
        } else if (index === undefined) {
            memory[0] *= display;
        }else{
            memory[index] *= display;
        }
        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none"
            displayMemory();
        }
        memoryTrigger = true;
        updateDisplay();
    }

}

MemoryActions.__proto__ = MemoryMath;


function callFunction(choice,index){
    switch (choice){
        case "MC": 
            MemoryActions.clearMemory();
            break;
        case "MS": 
            MemoryActions.storeMemory();
            break;
        case "MR": 
            MemoryActions.memoryRecall()
            break;
        case "M+":
            MemoryActions.memoryAdd(index);
            break;
        case "M-":
            MemoryActions.memorySubtract(index);
            break;
        case "M*":
            MemoryActions.memoryMultiply(index);
            break;
        case "M/":
            MemoryActions.memoryDivide(index);
            break;
        case "MD":
            MemoryActions.displayMemory();
            break;
        case "MCS":
            MemoryActions.clearMemorySingle(index);
            break;
        case "MH":
            MemoryActions.hideMemory();
            break;
    }

}