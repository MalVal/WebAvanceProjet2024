import { moveTarget, drawTarget, initializeTarget, isInsideTarget } from "./Target.js";

const myCanvasElement = document.getElementById('myCanvas')
let myScore = document.getElementById('Score')
let myHearts = document.querySelectorAll('.Heart')
const ctx = myCanvasElement.getContext('2d')

let score = 0
let speed = 0.5;
let isClick = false;

initializeTarget(myCanvasElement);

//animate every thing
function animate() {
    ctx.clearRect(0, 0, myCanvasElement.width, myCanvasElement.height);
    moveTarget(myCanvasElement, speed);
    drawTarget(ctx);

    checkScore();
    myScore.textContent = score;

    requestAnimationFrame(animate);
}



//Detect if Click is down
myCanvasElement.addEventListener("mousedown", (evt) => {
    isClick = true;
});

//Detect if Click is up
myCanvasElement.addEventListener("mouseup", (evt) => {
    isClick = false;
});

//Add the Score if the Click is down and if I am in the square
myCanvasElement.addEventListener("mousemove", (evt) => {

    if (isClick === true) {
        const posCanvas = myCanvasElement.getBoundingClientRect();
        const mouseX = evt.clientX - posCanvas.left;
        const mouseY = evt.clientY - posCanvas.top;

        if (isInsideTarget(mouseX, mouseY)) {
            score += 1;
        }
    }
});



//Initialise Via à 1
myHearts.forEach(heart =>  {
    heart.Vie = 1;
});


//Verify the score and add 0.5 every 500
function checkScore() {
    if (score % 500 === 0)
        speed = (score/500)/2 + 0.5;
}

//Verify if the life is Ok put Empty Heart if live loose
function checkVie() {
    myHearts.forEach(heart => {
        if (heart.Vie === 0)
            heart.setAttribute("src", "../img/Empty_Minecraft_Heart.png");
        else
            heart.setAttribute("src", "../img/Minecraft_Heart.png");
    });
}



requestAnimationFrame(animate);
