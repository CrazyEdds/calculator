"use strict";

let result = document.getElementById("result");
let equation = document.getElementById("equation");
const buttonCollection = document.getElementsByTagName("button");

let isRecentAnswer = false;

function inputSignal() {
    if (this.textContent === "clear") {
        equation.textContent = "0";
        isRecentAnswer = false;
    }
    else if (this.textContent === "delete") {
        if (equation.textContent != "0" && !isRecentAnswer) {
            if (equation.textContent.length > 1) {
                equation.textContent = equation.textContent.slice(0, -1);
            }
            else {
                equation.textContent = "0";
            }
        }
    }
    else if (Number.parseFloat(this.textContent)) {
        if (equation.textContent === "0" || isRecentAnswer) {
            equation.textContent = this.textContent;
            isRecentAnswer = false;
        }
        else {
            equation.textContent = equation.textContent + this.textContent;
        }
    }
    else if (this.textContent === "+"
    || this.textContent === "−"
    || this.textContent === "×"
    || this.textContent === "÷") {
        if (!/(\d(\+|\−|\×|\÷)\d|(\+|−|\×|\÷|\.)$)/.test(equation.textContent)) {
            equation.textContent = equation.textContent + this.textContent;
            isRecentAnswer = false;
        }
    }
    else if (this.textContent === "=") {
        if (/\d(\+|\−|\×|\÷).*\d$/.test(equation.textContent)) {
            let operatorPos = equation.textContent.search(/\d(\+|\−|\×|\÷)\d/) + 1;

            let operation = equation.textContent.charAt(operatorPos);
            switch (operation) {
                case "+":
                    operation = "add";
                    break;
                case "−":
                    operation = "substract";
                    break;
                case "×":
                    operation = "multiply";
                    break;
                case "÷":
                    operation = "divide";
                    break;
            }

            let calcNumbers = [];
            calcNumbers.push(Number.parseFloat(equation.textContent.slice(0, operatorPos)));
            calcNumbers.push(Number.parseFloat(equation.textContent.slice(operatorPos + 1,)));

            let answer;
            switch (operation) {
                case "add":
                    answer = calcNumbers[0] + calcNumbers[1];
                    break;
                case "substract":
                    answer = calcNumbers[0] - calcNumbers[1];
                    break;
                case "multiply":
                    answer = calcNumbers[0] * calcNumbers[1];
                    break;
                case "divide":
                    answer = calcNumbers[0] / calcNumbers[1];
                    break;
            }
            answer = Math.round((answer + Number.EPSILON) * 100) / 100;
            result.textContent = `${equation.textContent}=${answer}`;
            equation.textContent = answer;
            isRecentAnswer = true;
        }
    }
    else if (this.textContent === ".") {
        if (!/(\D$|\d+\.\d+$)/.test(equation.textContent) && !isRecentAnswer) {
            equation.textContent = equation.textContent + ".";
        }
    }
}

for (let currentButton of buttonCollection) {
    currentButton.addEventListener("click", inputSignal);
}
