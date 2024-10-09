let number = 0;
let nextNumber = 0;
let operator = "";

function operate(n, nx, o) {
  if(o === "+")
    return add(n, nx);
  if(o === "-")
    return subtract(n, nx);
  if(o === "*")
    return multiply(n, nx);
  if(o === "/")
    return divide(n, nx);
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