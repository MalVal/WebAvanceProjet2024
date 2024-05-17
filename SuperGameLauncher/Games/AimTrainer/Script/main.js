import { settings } from './settings.js';
import { moveTarget, removeTarget, drawTarget, calculateWall, resizeTarget } from "./target.js";
import { isInsideTarget, setMousePos } from "./mouse.js";
import { scoreUp } from "./score.js";
import { fliplopMonster, fliplopShotGun } from "./helpers.js";
import { drawShotGun } from "./shotGun.js";
import { initialyzeHearts, checkHeart, bleeding } from "./heart.js";
import { drawBackground } from "./image.js";

const myCanvasElement = document.getElementById('myCanvas');
const ctx = myCanvasElement.getContext('2d');
const bleed = document.getElementById('bleed')
const StartButton = document.getElementById('btnStart');

let heartNumber = { value: 3 };



//Calculate the pente and the start for x=0 y=?
calculateWall();

fliplopMonster();
fliplopShotGun();

//animate every thing
function animate() {
    if (settings.game.value) {
        removeTarget(ctx)
        moveTarget(myCanvasElement);
        resizeTarget();
        drawBackground(ctx);
        drawTarget(ctx);


        drawShotGun(ctx);

        checkHeart(heartNumber);
        bleeding(myCanvasElement, bleed);

        scoreUp();

        requestAnimationFrame(animate);

    }
    else
    {
        cancelAnimationFrame(animate);

        if (settings.score.value !== 0) {
            const scoreValue = settings.score.value;
            const gameName = 'AimTrainer';
            fetch(`../../src/PHP/results.php?game=${gameName}&score=${scoreValue}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network failed');
                    }
                    return response.json();
                });

            settings.score.value = 0;
        }

        heartNumber = { value: 3 };
        initialyzeHearts();
        StartButton.innerHTML = 'Start';
        myCanvasElement.classList = 'blur';
        settings.mouse.isClicked = false;
    }

}

StartButton.addEventListener("mousedown", () => {
    myCanvasElement.classList.toggle('blur');
    if (settings.game.value)
    {
        cancelAnimationFrame(animate);
        StartButton.innerHTML = 'Start';
    }
    else
    {
        requestAnimationFrame(animate);
        StartButton.innerHTML = 'Stop';
    }

    settings.game.value = !settings.game.value;
});

//Detect if Click is down
myCanvasElement.addEventListener("mousedown", () => {
    settings.mouse.isClicked = true;
});

//Detect if Click is up
myCanvasElement.addEventListener("mouseup", () => {
    settings.mouse.isClicked = false;
});


//Add the Score if the Click is down and if I am in the square
myCanvasElement.addEventListener("mousemove", (evt) => {


    if (settings.mouse.isClicked === true) {
        const posCanvas = myCanvasElement.getBoundingClientRect();

        //I don't know what happen but the coord for the mouse, and they were not similar for the target it was (0, 0) (300, 150)
        //and for the mouse it was (0, 0) (500, 250) so I did a rules of 3 and I divided
        settings.mouse.mouseX = ((evt.clientX - posCanvas.left) * 300 + 850) / posCanvas.width;
        settings.mouse.mouseY = ((evt.clientY - posCanvas.top) * 150 + 670) / posCanvas.height;

        setMousePos();

        if (isInsideTarget()) {
            settings.score.value += settings.score.add;
        }
    }
});

