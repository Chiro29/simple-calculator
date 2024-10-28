const body = document.querySelector("body");
const container = document.querySelector(".container");
const content = document.querySelector(".content");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operations");
const result = document.querySelector(".result");
const point = document.querySelector(".point");
const negative = document.querySelector(".negative");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const keysNumber = document.querySelector(".key");

const box = document.createElement("div");
const boxResult = document.createElement("div");
const numberSelected = document.createElement("p");
const nextNumberSelected = document.createElement("p");
const operatorSelected = document.createElement("p");
const resultNumber = document.createElement("p");
const scrollBar = document.createElement("div");

box.classList.add("box-flex");
boxResult.classList.add("box-flex");
scrollBar.classList.add("scrollbar");

numberSelected.textContent = 0;
box.appendChild(numberSelected);
container.appendChild(scrollBar);
content.appendChild(box);
content.appendChild(boxResult);

// Functions
function operate(n, nx, o) {
  n = Number(n);
  nx = Number(nx);

  if(o === "+")
    return add(n, nx);
  if(o === "-")
    return subtract(n, nx);
  if(o === "×")
    return multiply(n, nx);
  if(o === "÷")
    return divide(n, nx);
  if(o === "%")
    return n / 100; 
}

function add(n, nx) {
  return n + nx;
}

function subtract(n, nx) {
  return n - nx;
}

function multiply(n, nx) {
  return n * nx;
}

function divide(n, nx) {
  return n / nx;
}

let addNumber = null;

function addNumbers(n) {
  if (addNumber === null)
    return addNumber = n;
  else 
    return addNumber += n;
}

function numberSelection(n) {
  if (resultNumber.textContent != "")
    reset();

  const checkNumber = addNumbers(n);
  
  if (String(checkNumber).length < 22) {
    if (operatorSelected.textContent === "") 
      numberSelected.textContent = checkNumber;
    else {
      nextNumberSelected.textContent = checkNumber;
      box.appendChild(nextNumberSelected);
    }
  }

  if (checkNumber == 0) 
    addNumber = null; 
} 

function points(p) {
  let checkPoint = "";

  function checkPoints(n) {
    const string = String(n);
  
    if (string.includes("."))
      return true;
    else
      return false;
  }

  if (operatorSelected.textContent === "") {
    checkPoint = checkPoints(numberSelected.textContent);

    if (checkPoint === false) {
      if (numberSelected.textContent == 0) 
        addNumber = 0;

      numberSelected.textContent = addNumbers(p);
    }
  }
  else {
    checkPoint = checkPoints(nextNumberSelected.textContent);

    if (checkPoint === false) {
      if (nextNumberSelected.textContent === "" || nextNumberSelected.textContent == 0) 
        addNumber = 0;

      nextNumberSelected.textContent = addNumbers(p);
      box.appendChild(nextNumberSelected);
    }
  }

  if(resultNumber.textContent !== "") {
    reset();
    addNumber = 0;
    numberSelected.textContent = addNumbers(p);
  }
}

function negate() {
  if(operatorSelected.textContent === "" && resultNumber.textContent === "") 
    numberSelected.textContent = -numberSelected.textContent;
  else if(resultNumber.textContent != "") {
    reset(-resultNumber.textContent);
  }
  else
    nextNumberSelected.textContent = -nextNumberSelected.textContent;
}

function selectOperations(o) {
  function sign() {
    if (resultNumber.textContent !== "")
      reset(resultNumber.textContent);
    
    if (o === "*")
      operatorSelected.textContent = "×";
    else if (o === "/")
      operatorSelected.textContent = "÷";
    else
      operatorSelected.textContent = o;
    
    if(operatorSelected.textContent === "%")
      equals();
  
    box.appendChild(operatorSelected);
  }

  if ((resultNumber.textContent === "" && nextNumberSelected.textContent === "") || (resultNumber.textContent != "" && nextNumberSelected.textContent != "")) {
    operatorSelected.textContent = "";
    sign();
    addNumber = null;
  }
  else {
    equals();
    sign();
  }
}

function equals() {  
  function round(e) {
    return Math.round(e * 100) / 100;
  }

  if (operatorSelected.textContent === "" || (operatorSelected.textContent !== "" && operatorSelected.textContent !== "%" && nextNumberSelected.textContent === "")) {
    resultNumber.textContent = Number(numberSelected.textContent);   
  }
  else {
    const notRound = operate(numberSelected.textContent, nextNumberSelected.textContent, operatorSelected.textContent);
    resultNumber.textContent = Number(round(notRound));
  }

  boxResult.appendChild(resultNumber);

  addNumber = null;
}

function back() {
  function removeNumbers() {
    let array = String(addNumber).split("");
    array.pop();
    const string = array.join("");
  
    if (string === "") {
      addNumber = null;
      return 0;
    }
    else 
      return addNumber = string;
  }

  if (resultNumber.textContent === "") {
    if (operatorSelected.textContent === "") {
      if(numberSelected.textContent != 0) 
        numberSelected.textContent = removeNumbers();
    } 
    else {
      if (nextNumberSelected.textContent != 0) 
        nextNumberSelected.textContent = removeNumbers();
    }
  }
}

function reset(n) {
  addNumber = null;
  numberSelected.textContent = n;

  if (nextNumberSelected.textContent != "") {
    nextNumberSelected.textContent = "";
    box.removeChild(nextNumberSelected);    
  }
  if (operatorSelected.textContent != "") {
    operatorSelected.textContent = "";
    box.removeChild(operatorSelected);    
  }
  if (resultNumber.textContent != "") {
    resultNumber.textContent = "";
    boxResult.removeChild(resultNumber);     
  }
}

// Mouse events
body.addEventListener("click", () => {
  keysNumber.focus();
});

numbers.forEach(number => {
  number.addEventListener("click", () => {
    numberSelection(number.id);
    keysNumber.focus(); 
  });  
});

point.addEventListener("click", () => {
  points(point.id);
  keysNumber.focus();
});

negative.addEventListener("click", () => {
  negate();
  keysNumber.focus();
 });

operators.forEach(operator => {
  operator.addEventListener("click", () => {
  selectOperations(operator.id);

  keysNumber.focus();
  });
});

result.addEventListener("click", () => {
  equals();
  
  keysNumber.focus();
});

backspace.addEventListener("click", () => {
  back();

  keysNumber.focus();
});

clear.addEventListener("click", () => {
  reset(0);

  keysNumber.focus();
});

// Keys events
keysNumber.focus();

keysNumber.addEventListener("keydown", (event) => { 
  const num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; 
  const signs = ["%", "+", "-", "*", "/"]; 

  if (num.includes(event.key)) 
    numberSelection(event.key);
  if (event.key === ".")
    points(event.key);
  if (signs.includes(event.key))
    selectOperations(event.key);
  if (event.key === "=" || event.key === "Enter")
    equals();
  if (event.key === "Backspace")
    back();
  if (event.key === "Delete")
    reset(0);
});