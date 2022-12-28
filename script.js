"use strict";

const result = document.getElementById("result").textContent;
const equation = document.getElementById("equation").textContent;
const buttonCollection = document.getElementsByTagName("button");

function isEquationZero() {
    return equation == 0;
}

function isResultEmpty() {
    return result == "";
}

for (let currentButton of buttonCollection) {
    currentButton.addEventListener("click", inputSignal);
}

function inputSignal() {
    if (this.textContent === "clear") {
        equation = 0;
    }
}