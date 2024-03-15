import { Game } from './classJs/Game.js';

/*
    Html's variables
*/
const canvasElement = document.querySelector('canvas');

const startButton = document.getElementById("startButton");

const paragraphPol = document.querySelector("#pol");
const paragraphNok = document.querySelector("#nok");
const paragraphScore = document.querySelector("#score");

const myGame = new Game(canvasElement, startButton, paragraphPol, paragraphNok, paragraphScore);