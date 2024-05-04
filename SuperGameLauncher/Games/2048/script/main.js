import { Game2048 } from "./game2048.js";
import { settings } from "./settings.js";

const startButton = document.getElementById(settings.start);
const Time = document.getElementById(settings.time);
const tableGame = document.getElementById(settings.tableGame);
const penality = document.getElementById(settings.penality);
const pTime = document.getElementById(settings.pTime);
const paragraphMessage = document.querySelector(settings.pMessage);

window.onload = function()
{
    const myGame2048 = new Game2048(tableGame, startButton, Time, penality, pTime, paragraphMessage);
}
