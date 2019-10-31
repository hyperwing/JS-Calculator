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

/*
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
    */


MemoryActions = {
    //Checks if M+-/*S has been triggered, keeping display if that is the case.
    // Created 10/17/2019 by Sri Ramya Dandu
    // Edited 10/18/2019 by Sri Ramya Dandu: diabled buttons 
    // Clears all the values stored in memory, sets the memory to 0
    clearMemory: function(){
        document.getElementById("memory-stack-display").innerHTML = "";
        memory.length = 0;
        MemoryActions.displayMemory();
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/20/2019 by Sri Ramya Dandu: Added display memory
    // Functionality for ms button. Stores a value in memory
    ,storeMemory: function() {
        memory.unshift(display);
        createEVMemoryVal(display);

        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none"
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
    , displayMemory: function () {
        document.getElementById('display-memory-list').style.display = "block";
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
        updateDisplay();
        memoryTrigger = true;
    }
}

MemoryMath = {
    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/26/2019 by Sharon Qiu: Allowed for immediate add to list even if 0.
    // Functionality for m+ button.
    // value is a node
    memoryAdd: function (value) {
        
        if (value === undefined && memory.length < 1 && display != 0) {
            memory.unshift(display);
            createEVMemoryVal(display);
        } else if (value === undefined && memory.length < 1) {
            memory.unshift(0);
            createEVMemoryVal(0);
        } else if (value === undefined) {
            value = document.getElementsByClassName("memory-list")[0];
            var initialVal = value.getAttribute("value");
            value.setAttribute("value", Number(initialVal) + Number(display));
            value.textContent = String(Number(initialVal) + Number(display))
            memory[0] = Number(memory[0]) + Number(display);
        } else {
            var initialVal = value.getAttribute("value");
            value.setAttribute("value", Number(initialVal) + Number(display));
            value.textContent = String(Number(initialVal) + Number(display))
            memory[0] = Number(memory[0]) + Number(display);
        }
        
        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none";
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
        }
        memoryTrigger = true;
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Edited 10/26/2019 by Sharon Qiu: Added conditions division by 0 and undefined results.
    // Functionality for m/ button.
    ,memoryDivide: function() {
        var index = event.target.parentNode.getAttribute("value");
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
            document.getElementById('display-memory-list').style.display = "none";
        }
        memoryTrigger = true;
        updateDisplay();
    }

    // Created 10/18/2019 by Sharon Qiu
    // Functionality for m* button.
    ,memoryMultiply: function() {
        var index = event.target.parentNode.getAttribute("value");
        if (index === undefined && memory.length < 1) {
            memory.unshift(0);
        } else if (index === undefined) {
            memory[0] *= display;
        }else{
            memory[index] *= display;
        }
        if(document.getElementById('display-memory-list').style.display == "block"){
            document.getElementById('display-memory-list').style.display = "none";
        }
        memoryTrigger = true;
        updateDisplay();
    }

}

MemoryActions.__proto__ = MemoryMath;


function callFunction(event){
    var choice = String(event.target.value);
    var memVal = event.target.parentNode.parentNode.childNodes[0];
    var mathOpType = event.target.getAttribute("name")
    console.log(event.target.getAttribute("name"));
    console.log(event.target.parentNode.parentNode.childNodes[0]);
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
            if (mathOpType === "single-memory-button-op"){
                MemoryActions.memoryAdd(memVal);
            }else{
                MemoryActions.memoryAdd(undefined);
            }
            break;
        case "M-":
            MemoryActions.memorySubtract();
            break;
        case "M*":
            MemoryActions.memoryMultiply();
            break;
        case "M/":
            MemoryActions.memoryDivide();
            break;
        case "mem-disp":
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

// Created 10/30/2019 by Sharon Qiu
// Event listeners creator for memory values M+-*/
function createEVMemoryVal(value) {
    //main parent
    var memStack = document.getElementById("memory-stack-display");

    //buffer for values
    var buffer = document.createElement("div"); //buffer for mem values
    
    //adding children
    memStack.insertBefore(buffer, memStack.childNodes[0]);

    //children of main parent
    var memVal = document.createElement("button"); //memory value
    memVal.setAttribute("class", "memory-list"); //sets class
    memVal.setAttribute("value", value); //sets value
    memVal.textContent = value; //sets content

    var memOpCont = document.createElement("div"); //memory option container
    memOpCont.setAttribute("class","memory-operations-container")
    memOpCont.setAttribute("memvalue", value); //sets value

    //adding children
    buffer.insertBefore(memVal, buffer.childNodes[0]);
    buffer.insertBefore(memOpCont, buffer.childNodes[1]);

    //creation of the buttons,attributes, event listeners, children of child of main
    var mMcs = document.createElement("button"); //mem clear single
    mMcs.setAttribute("class", "memory-button")
    mMcs.setAttribute("name", "single-memory-button-op")
    mMcs.setAttribute("value", "MCS") //set value
    mMcs.textContent = "MC"; //sets content
    mMcs.addEventListener('click', callFunction, false);

    var mAdd = document.createElement("button"); //mem add
    mAdd.setAttribute("class", "memory-button")
    mAdd.setAttribute("name", "single-memory-button-op")
    mAdd.setAttribute("value", "M+")
    mAdd.textContent = "M+"; //sets content
    mAdd.addEventListener('click', callFunction, false);

    var mMinus = document.createElement("button"); //mem minus
    mMinus.setAttribute("class", "memory-button")
    mMinus.setAttribute("name", "single-memory-button-op")
    mMinus.setAttribute("value", "M-")
    mMinus.textContent = "M-"; //sets content
    mMinus.addEventListener('click', callFunction, false);

    var mMult = document.createElement("button"); //mem mult
    mMult.setAttribute("class", "memory-button")
    mMult.setAttribute("name", "single-memory-button-op")
    mMult.setAttribute("value", "M*")
    mMult.textContent = "M*"; //sets content
    mMult.addEventListener('click', callFunction, false);

    var mDiv = document.createElement("button"); //mem div
    mDiv.setAttribute("class", "memory-button")
    mDiv.setAttribute("name", "single-memory-button-op")
    mDiv.setAttribute("value", "M/")
    mDiv.textContent = "M/"; //sets content
    mDiv.addEventListener('click', callFunction, false);
    
    //adding children
    memOpCont.appendChild(mMcs);
    memOpCont.appendChild(mAdd);
    memOpCont.appendChild(mMinus);
    memOpCont.appendChild(mMult);
    memOpCont.appendChild(mDiv);
}

// Created 10/30/2019 by Sharon Qiu
// Event listeners creator
function loadEvListeners() {

    //number buttons
    var memOpArr = document.getElementsByName("memory-op");
    for (var i = 0; i < memOpArr.length; i++) {
        memOpArr[i].addEventListener('click', callFunction, false);
    }

}
window.addEventListener('load',loadEvListeners, false)