import {settings} from "./settings.js";

export const image = {

    monster1: {
        src: './img/monster.png',
        x: 0,
        y: 0,
        width: 171,
        height: 130
    },
    monster2: {
        src: "./img/monster.png",
        x: 178,
        y: 0,
        width: 171,
        height: 130
    },

    shotGun1: {
        src: "./img/shotGun.png",
        x: 0,
        y: 26,
        width: 107,
        height: 90
    },
    shotGun2: {
        src: "./img/shotGun.png",
        x: 112,
        y: 26,
        width: 107,
        height: 90
    },
    shotGun3: {
        src: "./img/shotGun.png",
        x: 224,
        y: 26,
        width: 78,
        height: 90
    },

    shotGunFire1: {
        src: "./img/shotGun.png",
        x: 309,
        y: 8,
        width: 125,
        height: 108
    },
    shotGunFire2: {
        src: "./img/shotGun.png",
        x: 440,
        y: 8,
        width: 125,
        height: 108
    },
    shotGunFire3: {
        src: "./img/shotGun.png",
        x: 574,
        y: 0,
        width: 74,
        height: 116
    },

    heart1: {
        src: "./img/heart.png",
        x: 0,
        y: 0,
        width: 26,
        height: 22
    },
    heart2: {
        src: "./img/heart.png",
        x: 26,
        y: 0,
        width: 52,
        height: 22
    },
    heart3: {
        src: "./img/heart.png",
        x: 52,
        y: 0,
        width: 78,
        height: 22
    },
    heart4: {
        src: "./img/heart.png",
        x: 78,
        y: 0,
        width: 104,
        height: 22
    },
    heart5: {
        src: "./img/heart.png",
        x: 104,
        y: 0,
        width: 130,
        height: 22
    },
    heart6: {
        src: "./img/heart.png",
        x: 130,
        y: 0,
        width: 156,
        height: 22
    },
    heart7: {
        src: "./img/heart.png",
        x: 156,
        y: 0,
        width: 182,
        height: 22
    },
    heart8: {
        src: "./img/heart.png",
        x: 182,
        y: 0,
        width: 208,
        height: 22
    },
    heart9: {
        src: "./img/heart.png",
        x: 208,
        y: 0,
        width: 234,
        height: 22
    },
    heart10: {
        src: "./img/heart.png",
        x: 234,
        y: 0,
        width: 260,
        height: 22
    }
}


export function drawImage(ctx, varimage) {

    const regexMonster = /^monster.*$/;
    const regexShotGun = /^shotGun.*$/;
    const regexHeart = /^heart.*$/;


    if (regexMonster.test(varimage))
    {
        const ImageMonster = new Image();

        if (varimage === "monster1")
            varimage = image.monster1;
        if (varimage === "monster2")
            varimage = image.monster2;

        ImageMonster.src = varimage.src;
        ctx.drawImage(ImageMonster,
            varimage.x, varimage.y, varimage.width, varimage.height,
            settings.target.x, settings.target.y - settings.target.heightMonster, settings.target.width, settings.target.heightMonster);
        return;
    }

    if (regexShotGun.test(varimage))
    {
        const ImageShotGun = new Image();

        if (varimage === "shotGun1")
            varimage = image.shotGun1;
        if (varimage === "shotGun2")
            varimage = image.shotGun2;
        if (varimage === "shotGun3")
            varimage = image.shotGun3;

        if (varimage === "shotGunFire1")
            varimage = image.shotGunFire1;
        if (varimage === "shotGunFire2")
            varimage = image.shotGunFire2;
        if (varimage === "shotGunFire3")
            varimage = image.shotGunFire3;

        ImageShotGun.src = varimage.src;
        ctx.drawImage(ImageShotGun,
                    varimage.x, varimage.y, varimage.width, varimage.height,
                    settings.canvas.x/3, settings.canvas.y/1.5, 50, 50);
    }

    if (regexHeart.test(varimage))
    {
        const ImageHeart = new Image();

        if (varimage === "heart1"){
            varimage = image.heart1;
        }
        if (varimage === "heart2"){
            varimage = image.heart2;
        }
        if (varimage === "heart3"){
            varimage = image.heart3;
        }
        if (varimage === "heart4"){
            varimage = image.heart4;
        }
        if (varimage === "heart5"){
            varimage = image.heart5;
        }
        if (varimage === "heart6"){
            varimage = image.heart6;
        }
        if (varimage === "heart7"){
            varimage = image.heart7;
        }
        if (varimage === "heart8"){
            varimage = image.heart8;
        }
        if (varimage === "heart9")
        {
            varimage = image.heart9;
        }
        if (varimage === "heart10"){
            varimage = image.heart10;
        }

        ImageHeart.src = varimage.src;
        if (settings.canvasHeart.val === 3)
        {
            ctx.drawImage(ImageHeart,
                varimage.x, varimage.y, 26, 22,
                0, 0, 95, 80);
        }
        if (settings.canvasHeart.val === 2)
        {
            ctx.drawImage(ImageHeart,
                varimage.x, varimage.y, 26, 22,
                105, 0, 95, 80);
        }
        if (settings.canvasHeart.val === 1)
        {
            ctx.drawImage(ImageHeart,
                varimage.x, varimage.y, 26, 22,
                210, 0, 95, 100);
        }

    }

}