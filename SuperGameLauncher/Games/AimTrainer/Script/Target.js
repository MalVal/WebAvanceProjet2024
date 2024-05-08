import { settings } from './settings.js';
import { drawImage } from "./image.js";
import { getRandomInt } from "./helpers.js";


export function moveTarget(canvas) {
    //Make the Target Move

    //Change direction backWall
    if (settings.target.y + settings.target.height > settings.frontWall.y || settings.target.y < settings.backWall.y) {
        //En cas de vitesse trop élever pour ne pas qu'il clip au travers
        settings.target.x -= settings.target.speed * settings.target.directionX;
        settings.target.y -= settings.target.speed * settings.target.directionY;

        settings.target.directionY *= -1
    }
    //Change direction leftWall
    if (settings.target.x * settings.leftWall.m + settings.leftWall.b > settings.target.y) {

        settings.target.x -= settings.target.speed * settings.target.directionX;
        settings.target.y -= settings.target.speed * settings.target.directionY;

        settings.target.directionX *= -1
        settings.target.directionY *= -1
    }
    //Change direction rightWall
    if ((settings.target.x + settings.target.width) * settings.rightWall.m + settings.rightWall.b > settings.target.y) {

        settings.target.x -= settings.target.speed * settings.target.directionX;
        settings.target.y -= settings.target.speed * settings.target.directionY;

        settings.target.directionX *= -1
        settings.target.directionY *= -1
    }


    settings.target.x += settings.target.speed * settings.target.directionX;
    settings.target.y += settings.target.speed * settings.target.directionY;

    //Randomize the direction change
    let randomVar = getRandomInt(60);

    if (randomVar === 0) {
        if (settings.target.y + settings.target.height < settings.frontWall.y - settings.target.speed &&
            settings.target.y > settings.backWall.y + settings.target.speed &&
            settings.target.x * settings.leftWall.m + settings.leftWall.b < settings.target.y - settings.target.speed &&
            (settings.target.x + settings.target.width) * settings.rightWall.m + settings.rightWall.b < settings.target.y - settings.target.speed) {

            //console.log("Change Direction");

            randomVar = getRandomInt(2);

            if (randomVar === 0) {
                settings.target.directionX *= -1
            }
            if (randomVar === 1) {
                settings.target.directionY *= -1
            }
        }
    }
}

export function calculateWall() {
    settings.leftWall.m = (settings.leftWall.y2-settings.leftWall.y1)/(settings.leftWall.x2-settings.leftWall.x1);
    settings.leftWall.b = settings.leftWall.y1-(settings.leftWall.m*settings.leftWall.x1);

    settings.rightWall.m = (settings.rightWall.y2-settings.rightWall.y1)/(settings.rightWall.x2-settings.rightWall.x1);
    settings.rightWall.b = settings.rightWall.y2-(settings.rightWall.m*settings.rightWall.x2);
}

export function drawTarget(ctx) {
    //Draw the Target
    ctx.fillRect(settings.target.x, settings.target.y, settings.target.width, settings.target.height);

    if (settings.flipflopMonster.value)
        drawImage(ctx, "monster1");
    else
        drawImage(ctx, "monster2");
    }

export function removeTarget(ctx) {
    ctx.clearRect(0, 0, settings.canvas.x, settings.canvas.y);
}

export function resizeTarget() {

    if (settings.target.directionY === -1) {
        settings.target.width = settings.target.width - settings.target.speed;
        if (settings.target.width < settings.target.minwidth)
        {
            settings.target.width = settings.target.minwidth;
        }
    }
    else {
        settings.target.width = settings.target.width + settings.target.speed;
        if (settings.target.width > settings.target.maxwidth)
        {
            settings.target.width = settings.target.maxwidth
        }
    }


    settings.target.heightMonster = settings.target.width;
}
