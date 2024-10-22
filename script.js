const container = document.querySelector(".container");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operations");
const result = document.querySelector(".result");
const point = document.querySelector(".point");
const negative = document.querySelector(".negative");
const backspace = document.querySelector(".backspace");
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
  if (operatorSelected.textContent === "") {
    resultNumber.textContent = numberSelected.textContent;
    boxResult.appendChild(resultNumber);
    addNumber = null;    
  }
  else {
    const notRound = operate(numberSelected.textContent, nextNumberSelected.textContent, operatorSelected.textContent);
    resultNumber.textContent = round(notRound);
    boxResult.appendChild(resultNumber);
    addNumber = null;
  }
}

let addNumber = null;

function addNumbers(n) {
  if (addNumber === null)
    return addNumber = n;
  else 
    return addNumber += n;
}

function removeNumbers() {
  let array = String(addNumber).split("");
  array.pop();
  const string = array.join("");

  if (string === "")
    return addNumber = null;
  else {
    const checkN = Number(string);
    const checkP = String(checkN).includes(".");
    
    if (checkP === false)
      checkPoint = false;

    return addNumber = Number(checkN);
  }
}

function numberSelection(n) {
  const checkNumber = addNumbers(n);
  if (operatorSelected.textContent === "") {
    if (checkNumber == 0) {
      numberSelected.textContent = checkNumber;
      addNumber = null;
    }
    else  
      numberSelected.textContent = checkNumber;
  }
  else {
    nextNumberSelected.textContent = checkNumber;
    box.appendChild(nextNumberSelected);

    if (checkNumber == 0) 
      addNumber = null;
  }
} 

function reset() {
  addNumber = null;
  checkPoint = false;
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
}

numbers.forEach(number => {
  number.addEventListener("click", () => {
    if (resultNumber.textContent != "") {
      reset();
      numberSelection(number.id);
    }
    else
      numberSelection(number.id);
  });    
});

let checkPoint = false;

point.addEventListener("click", () => {
  if (operatorSelected.textContent != "") 
    checkPoint = false;

  if (nextNumberSelected.textContent === "") {
    if(checkPoint === false) {
      if (numberSelected.textContent == 0) {
        addNumber = 0;
        numberSelected.textContent = addNumbers(point.id);
        checkPoint = true;
      }
      else {
        numberSelected.textContent = addNumbers(point.id);
        checkPoint = true;
      }
    }
  }
  else {
    if (checkPoint === false) {
      if (nextNumberSelected.textContent == 0) {
        addNumber = 0;
        nextNumberSelected.textContent = addNumbers(point.id);
        checkPoint = true;
      }
      else {
        nextNumberSelected.textContent = addNumbers(point.id);
        checkPoint = true;
      }
    }
  }

  if(resultNumber.textContent != "") {
    reset();
    addNumber = 0;
    numberSelected.textContent = addNumbers(point.id);
    checkPoint = true;
  }
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

backspace.addEventListener("click", () => {
  if (operatorSelected.textContent === "") {
    if(numberSelected.textContent != 0) 
      numberSelected.textContent = removeNumbers();
  } 
  else {
    if (nextNumberSelected.textContent != 0) 
      nextNumberSelected.textContent = removeNumbers();
  }
});

clear.addEventListener("click", () => {
  reset()
});