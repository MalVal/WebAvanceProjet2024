import { settings } from "./settings.js";

let myScore = document.getElementById('Score')

export function scoreUp () {
    myScore.textContent = "Score : " + Math.round(settings.score.value);
    speedUp();
}

//Verify the score and add 0.5 every 500
function speedUp() {
    settings.target.speed = Math.round((settings.score.value/500))/4 + 0.5;
}