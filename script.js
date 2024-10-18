const container = document.querySelector(".container");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operations");
const result = document.querySelector(".result");
const negative = document.querySelector(".negative");
const clear = document.querySelector(".clear");

const box = document.createElement("div");
const boxResult = document.createElement("div");
const numberSelected = document.createElement("p");
const nextNumberSelected = document.createElement("p");
const operatorSelected = document.createElement("p");
const resultNumber = document.createElement("p");

numberSelected.textContent = 0;
box.appendChild(numberSelected);

box.classList.add("box-flex");
boxResult.classList.add("box-flex");

container.appendChild(box);
container.appendChild(boxResult);

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

function sign(o) {
  if (resultNumber.textContent != "") {
    numberSelected.textContent = resultNumber.textContent;
    resultNumber.textContent = "";
    
    if (nextNumberSelected.textContent != "") {
      nextNumberSelected.textContent = "";
      box.removeChild(nextNumberSelected);
    }
    
    boxResult.removeChild(resultNumber); 
  }

  operatorSelected.textContent = o.id;
  
  if(operatorSelected.textContent === "%")
    equals();

  box.appendChild(operatorSelected);
}

function round(e) {
  return Math.round(e * 100) / 100;
}

function equals() {
  const notRound = operate(numberSelected.textContent, nextNumberSelected.textContent, operatorSelected.textContent);
  resultNumber.textContent = round(notRound);
  boxResult.appendChild(resultNumber);
  addNumber = null;
}

let addNumber = null;

function addNumbers(e) {
  if (addNumber === null)
    return addNumber = e;
  else 
    return addNumber += e;
}

numbers.forEach(number => {
    number.addEventListener("click", () => {
      if (operatorSelected.textContent === "") {
        numberSelected.textContent = addNumbers(number.id);
        box.appendChild(numberSelected);
      }
      else {
        nextNumberSelected.textContent = addNumbers(number.id);
        box.appendChild(nextNumberSelected);
      }
    });    
});

negative.addEventListener("click", () => {
  if(nextNumberSelected.textContent === "") 
    numberSelected.textContent = -numberSelected.textContent;
  else if(resultNumber.textContent != "") {
    numberSelected.textContent = -resultNumber.textContent;
    resultNumber.textContent = "";
    nextNumberSelected.textContent = "";

    boxResult.removeChild(resultNumber);
    box.removeChild(nextNumberSelected);
  }
  else
    nextNumberSelected.textContent = -nextNumberSelected.textContent;
});

operators.forEach(operator => {
  operator.addEventListener("click", () => {
    if ((resultNumber.textContent === "" && nextNumberSelected.textContent === "") || (resultNumber.textContent != "" && nextNumberSelected.textContent != "")) {
      operatorSelected.textContent = "";
      sign(operator);
      addNumber = null;
    }
    else {
      equals();
      sign(operator);
    }
  });
});

result.addEventListener("click", () => {
  equals();
});

clear.addEventListener("click", () => {
  addNumber = null;
  numberSelected.textContent = 0;

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
});