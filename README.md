# Project 5
### JavaScript Calculator
This program displays a classic calculator with an accumulater on a web page. Additonal features include a history option, mode conversion calculator between decimal, binary, and hex for whole numbers and fractions, degree conversion calculator between degrees and radians, logic calculator, and a statistics generator.

### Roles
* Overall Project Manager: Leah Gillespie
* Coding Manager: Sharon Qiu
* Testing Manager: David Wing
* Documentation: Neel Mansukhani

### Contributions
Please list who did what for each part of the project.
Also list if people worked together (pair programmed) on a particular section.

#### Basic Functionality:  
* Sri Ramya Dandu: MC, MR, and display of Memory stack option
* Leah Gillespie: Equals button
* Sharon Qiu: Memory math functions: M+, M-, M/, M* and MS
* David Wing: CE, C, DEL option
* Neel Mansukhani: Arithmetic operations and calc/buttons setup 

#### Extra Functionality:
* Sri Ramya Dandu: Modes calculator for whole numbers and fractions (Decimal, Binary, Hex)
* Leah Gillespie: History
* Sharon Qiu: Degree conversion calculator
* David Wing: Stats Generator 
* Neel Mansukhani: Logic Calculator 

### EXTRA CREDIT: Object Protoyping
Object protoyping is used in memoryFunctions.js. The prototype ("superclass") is the MemoryMath object, and the main object is MemoryAction ("subclass"). Line 211, in the file, defines this
relationship. Sri and Sharon paired for this implementation.

### How to run the project
1. Open the project folder
2. Open calculator.html in Firefox 

### How to run the tests
1. Make sure you have nodejs and npm installed 
>  sudo apt install nodejs
2. Check npm version
> npm -v
3. If it says to install npm follow the next steps
> sudo apt-get install npm
4. If step 3 gives you an error about broken packages then run the following:
> sudo apt-get install nodejs-dev node-gyp libssl1.0-dev
Then install npm again:
> sudo apt-get install npm
5. Check to make sure you have npm installed
6. Install mocha
> npm install mocha
7. Install chai
> npm install chai
8. Install rewire
> npm install rewire

Now your ready to run the test!
1. Open the project folder and run mocha
> mocha
