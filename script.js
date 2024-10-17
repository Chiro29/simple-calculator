const container = document.querySelector(".container");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operations");
const result = document.querySelector(".result");
const negative = document.querySelector(".negative");
const clear = document.querySelector(".clear");
const percent = document.querySelector(".percent");

const box = document.createElement("div");
const numberSelected = document.createElement("p");
const nextNumberSelected = document.createElement("p");
const operatorSelected = document.createElement("p");
const resultNumber = document.createElement("p");

container.appendChild(box);

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
    nextNumberSelected.textContent = "";
    resultNumber.textContent = "";

    box.removeChild(nextNumberSelected);
    box.removeChild(resultNumber); 
  }

  operatorSelected.textContent = o.id;
  box.appendChild(operatorSelected);
}

function equals() {
  resultNumber.textContent = operate(numberSelected.textContent, nextNumberSelected.textContent, operatorSelected.textContent);
  box.appendChild(resultNumber);
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
  if(operatorSelected.textContent === "") {
    numberSelected.textContent = -numberSelected.textContent;
  }
  else {
    nextNumberSelected.textContent = -nextNumberSelected.textContent;
  }
});

operators.forEach(operator => {
  operator.addEventListener("click", () => {
    if(resultNumber.textContent != "")
      operatorSelected.textContent = "";

    if (operatorSelected.textContent === "") {
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

percent.addEventListener("click", () => {
  numberSelected.textContent = operate(numberSelected.textContent, "", "%");
  box.appendChild(numberSelected);
  addNumber = null;
  operatorSelected.textContent = "";
});

clear.addEventListener("click", () => {
  addNumber = null;

  if (numberSelected.textContent != "") {
    numberSelected.textContent = "";
    box.removeChild(numberSelected);      
  }
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
    box.removeChild(resultNumber);     
  }
});
