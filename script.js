function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return +(Math.round((a * b) + "e+2") + "e-2");
}
function divide(a, b) {
    return +(Math.round((a / b) + "e+2") + "e-2");
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

//---------------------------------------------------------------------//

const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operators")
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const dot = document.querySelector("#dot");
const undo = document.querySelector("#delete");
const negative = document.querySelector("#negative");

let operand = "";
let operator = "";
let previousOperator = "";
let number1 = "";
let number2 = "";

//take digits

digits.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const el = document.getElementById(this.id).innerHTML;
        if (operand.length < 15) {
            operand += el;
            display.innerHTML = operand;
        }
    });
})

//take operator

operators.forEach(btn => {
    btn.addEventListener("click", function (e) {
        operator = document.getElementById(this.id).innerHTML;

        if (previousOperator == "") {
            previousOperator = operator;
        }
        assignNumbers();
    });
})

//assign numbers

function assignNumbers() {
    if (number1 == "") {
        number1 = operand;         // will be assigned once at the beginning
    } else {
        number2 = operand;
        calculate();
    }
    operand = "";
}

//calculate

function calculate() {
    if (number1 != "" && number2 != "") {
        number1 = operate(previousOperator, number1, number2);
        display.innerHTML = number1;
        previousOperator = operator;
    }
}

equals.addEventListener("click", () => {
    previousOperator = operator;         // equals button(=) works only with current operator
    assignNumbers();
});

//clear 

clear.addEventListener("click", function () {
    display.innerHTML = "";
    operand = "";
    number1 = "";
    number2 = "";
    result = "";
})

dot.addEventListener("click", () => {
    if (operand != "" && !operand.includes(".")) {
        operand += "."
        display.innerHTML = operand;
    }
})

undo.addEventListener("click", () => {
    if (operand != "") {
        operand = operand.slice(0, -1);
        display.innerHTML = operand;
    }
})

negative.addEventListener("click", () => {
    if (!operand.includes("-")) {
        operand = "-" + operand;
        display.innerHTML = operand;
        number1 = "";                           //to refresh old values  
    } else {
        operand = operand.slice(1);
        display.innerHTML = operand;
    }
})