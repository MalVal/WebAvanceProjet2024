import { drawImage } from "./image.js";
import { settings } from "./settings.js";
import { isInsideTarget } from "./mouse.js";

const HeartElement = document.getElementById('HeartContainer')
const ctx = HeartElement.getContext('2d')

export function checkHeart(i)
{
    if (settings.mouse.isClicked) {
        if (!isInsideTarget()) {

            if (settings.flipflopShotGun.value) {

                if (!substractValue(i.value)) {
                    if (!substractHeart(i)) {
                        settings.game.value = false;
                    }
                }
            }
            else
            {
                settings.canvasHeart.bleed = false;
            }
        }
        else
        {
            settings.canvasHeart.bleed = false;
        }
    }
    else
    {
        settings.canvasHeart.bleed = false;
    }




    removeImage();
        settings.canvasHeart.val = 3;
        let val3 = settings.heart["3"].value;
        let val2 = settings.heart["2"].value;
        let val1 = settings.heart["1"].value;
        drawImage(ctx, "heart" + val1);
        settings.canvasHeart.val = 2;
        drawImage(ctx, "heart" + val2);
        settings.canvasHeart.val = 1;
        drawImage(ctx, "heart" + val3);
}

function substractValue(i)
{
    if (settings.heart[i].value > 1) {
        settings.heart[i].value--;
        settings.canvasHeart.bleed = true;
        return true;
    }
    else
        return false;
}

function substractHeart(i) {
    if (i.value > 1)
    {
        i.value--;
        return true;
    }
    else
        return false;
}

export function initialyzeHearts(hearts) {
    settings.heart["1"].value = 10;
    settings.heart["2"].value = 10;
    settings.heart["3"].value = 10;
}

function removeImage() {
    ctx.clearRect(0, 0, HeartElement.width, HeartElement.height);
}

export function bleeding(myCanvasElement, bleed) {
    if (settings.canvasHeart.bleed) {
        bleed.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
    else
    {
        bleed.style.backgroundColor = "";
    }
}