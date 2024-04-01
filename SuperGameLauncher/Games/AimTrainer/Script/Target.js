const myTarget = {
    x : 0,
    y : 0,
    width : 30,
    height : 30,
    color : 'skyblue',
    directionX : 1,
    directionY : 1
};

export function initializeTarget(canvas) {
    myTarget.x = canvas.width/2 - myTarget.width/2
    myTarget.y = canvas.height/2 - myTarget.height/2
}

export function moveTarget(canvas, speed) {
    //Make the Target Move
    if (myTarget.x + myTarget.width > canvas.width || myTarget.x < 0) {
        myTarget.directionX *= -1
    }
    if (myTarget.y + myTarget.height > canvas.height || myTarget.y < 0) {
        myTarget.directionY *= -1
    }

    myTarget.x += speed * myTarget.directionX;
    myTarget.y += speed * myTarget.directionY;

    //Randomize the direction change
    let randomVar = getRandomInt(60);

    if (randomVar === 0) {
        if (myTarget.x + myTarget.width < canvas.width && myTarget.x > 0 &&
            myTarget.y + myTarget.height < canvas.height && myTarget.y > 0) {

            randomVar = getRandomInt(2);

            if (randomVar === 0) {
                myTarget.directionX *= -1
            }
            if (randomVar === 1) {
                myTarget.directionY *= -1
            }
        }
    }
}

export function drawTarget(ctx) {
    //Draw the Target
        ctx.fillStyle = myTarget.color;
        //ctx.arc(myTarget.x, myTarget.y, myTarget.width, 0, 2*Math.PI, true);
        //ctx.fill();
        //ctx.stroke();
        ctx.fillRect(myTarget.x, myTarget.y, myTarget.width, myTarget.height);
}



export function isInsideTarget(mouseX, mouseY) {
    return (mouseX >= myTarget.x &&
        mouseX <= myTarget.x + myTarget.width &&
        mouseY >= myTarget.y &&
        mouseY <= myTarget.y + myTarget.height);

}

//Return a ROUND Random Number if number = 2 {0, 1}
function getRandomInt(number) {
    return Math.floor(Math.random() * number);
}