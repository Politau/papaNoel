// script.js
let rotationTimeout;

function survol(element) {
    element.style.backgroundColor = "#e0e0e0";
    element.style.transform = "scale(1.1)";
}

function quitterSurvol(element) {
    element.style.backgroundColor = "#f9f9f9";
    element.style.transform = "scale(1)";
}
