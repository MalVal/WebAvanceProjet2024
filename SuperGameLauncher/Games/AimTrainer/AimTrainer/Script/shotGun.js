import { shotGunNeed } from "./mouse.js";
import { drawImage } from "./image.js";
import {settings} from "./settings.js";

export function drawShotGun(ctx) {

    let gun = shotGunNeed();
    if (settings.flipflopShotGun.value && settings.mouse.isClicked) {
        if (gun === "rightFire") {
            drawImage(ctx, "shotGunFire1");
        }
        if (gun === "leftFire") {
            drawImage(ctx, "shotGunFire2");
        }
        if (gun === "centerFire") {
            drawImage(ctx, "shotGunFire3");
        }
    }
    else {
        if (gun === "rightNoFire" || gun === "rightFire") {
            drawImage(ctx, "shotGun1");
        }
        if (gun === "leftNoFire" || gun === "leftFire") {
            drawImage(ctx, "shotGun2");
        }
        if (gun === "centerNoFire" || gun === "centerFire") {
            drawImage(ctx, "shotGun3");
        }
    }
}