import { Game } from './Game.js';

/*
    Html's variables
*/
const canvasElement = document.querySelector("#BusterGhostCanvas");

const startButton = document.getElementById("startButton");

const paragraphPol = document.querySelector("#pol");
const paragraphNok = document.querySelector("#nok");
const paragraphScore = document.querySelector("#score");
const paragraphMessage = document.querySelector("#message");

/*
    Creation of the images
*/
const paths = ["img/playerLeft.png","img/playerRight.png","./img/playerUp.png","img/playerDown.png","img/slimer1.png","img/slimer2.png","img/heart.png"];
let count = 0;
export const images = [];

paths.forEach(path => {
    const image = new Image();
    image.src = path;
    images.push(image);
    image.addEventListener('load',()=>{
        count++;
        if(count===paths.length){
            // GO !
            const myGame = new Game(canvasElement, startButton, paragraphPol, paragraphNok, paragraphScore, paragraphMessage);
        }
    })
});
