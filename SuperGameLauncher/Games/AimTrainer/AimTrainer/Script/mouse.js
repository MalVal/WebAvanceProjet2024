import {settings} from "./settings.js";

export function isInsideTarget() {
    if(settings.mouse.mouseX >= settings.target.x &&
        settings.mouse.mouseX <= settings.target.x + settings.target.width &&
        settings.mouse.mouseY <= settings.target.y &&
        settings.mouse.mouseY >= settings.target.y - settings.target.heightMonster)
    {
        return 1;
    }
    return 0;
}

export function shotGunNeed() {

    let returnElement = "";
    if (settings.mouse.pos === "left")
    {
        returnElement += "left";
    }
    else if (settings.mouse.pos === "right")
    {
        returnElement += "right";
    }
    else if (settings.mouse.pos === "center")
    {
        returnElement += "center";
    }

    if (settings.mouse.isClicked)
    {
        returnElement += "Fire";
    }
    else
    {
        returnElement += "NoFire";
    }

    return returnElement;
}

export function setMousePos() {
    const onePart = settings.canvas.x/3;

    if (settings.mouse.mouseX < onePart) {
        settings.mouse.pos = "left";
    }
    else if (settings.mouse.mouseX > onePart * 2)
    {
        settings.mouse.pos = "right";
    }
    else
    {
        settings.mouse.pos = "center";
    }


}
