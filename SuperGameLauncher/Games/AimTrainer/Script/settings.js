let canvas = document.getElementById("myCanvas");
let canvasHeart = document.getElementById("HeartContainer");

export const settings = {
    game: {
        value: false
    },
    target: {
        x : 100,
        y : 100,
        height : 1,
        heightMonster : 30,
        width : 30,
        maxwidth : 80,
        minwidth : 15,
        directionX : 1,
        directionY : 1,
        speed : 0.5
    },
    leftWall: {
        x1: canvas.width/2,
        y1: canvas.height/2,
        x2: 0,
        y2: canvas.height,
    },
    rightWall: {
        x1: canvas.width/2,
        y1: canvas.height/2,
        x2: canvas.width,
        y2: canvas.height,
    },
    backWall: {
        y: (canvas.height/10)+(canvas.height/2)
    },
    frontWall: {
        y: canvas.height
    },
    canvas: {
        x: canvas.width,
        y: canvas.height
    },
    canvasHeart: {
        x: canvasHeart.width,
        y: canvasHeart.height,
        val: 3,
        bleed: false
    },
    score: {
        value: 0,
        //smth where if we add it we can reach 1
        add: 1
    },
    mouse: {
        isClicked: false,
        pos: "center"
    },
    flipflopMonster: {
        value: false,
        time: 1000
    },
    flipflopShotGun: {
        value: false,
        time: 100
    },
    heart: {
        1: {
            value: 10
        },
        2: {
            value: 10
        },
        3: {
            value: 10
        },
    }
}
