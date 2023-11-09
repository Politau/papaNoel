// script.js
let rotationTimeout;

function survol(element) {
    element.style.backgroundColor = "#e0e0e0";
    clearTimeout(rotationTimeout); // Réinitialise le timeout pour éviter la rotation continue
    faireRotation(element, 360);
}

function quitterSurvol(element) {
    element.style.backgroundColor = "#f9f9f9";
    clearTimeout(rotationTimeout); // Annule la rotation en cours
    element.style.transform = "scale(1)"; // Rétablit le scale à 1
}

function faireRotation(element, degresFin) {
    let degresActuel = 0;

    function animer() {
        if (degresActuel < degresFin) {
            degresActuel += 5; // Ajuste la vitesse de rotation ici
            element.style.transform = `scale(1.1) rotate(${degresActuel}deg)`;
            rotationTimeout = setTimeout(animer, 16); // Utilise setTimeout pour contrôler l'animation
        }
    }

    animer();
}
