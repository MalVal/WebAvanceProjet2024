/*
    Creation of the images
*/

const paths = ["img/playerLeft.png","img/playerRight.png","./img/playerUp.png","img/playerDown.png","img/slimer1.png","img/slimer2.png","img/heart.png"]
let count = 0;
const images = [];

paths.forEach(path => {
    const image = new Image();
    image.path = path;
    images.push(image);
    image.addEventListener('load',()=>{
        count++;
        if(count===paths.length){
              // GO !   
        }
    })
});

const ImagePlayerLeft = new Image();
ImagePlayerLeft.src = "img/playerLeft.png";

const ImagePlayerRight = new Image();
ImagePlayerRight.src = "img/playerRight.png";

const ImagePlayerUp = new Image();
ImagePlayerUp.src = "./img/playerUp.png";

const ImagePlayerDown = new Image();
ImagePlayerDown.src = "img/playerDown.png";

const ImageEnemi1 = new Image();
ImageEnemi1.src = "img/slimer1.png";

const ImageEnemi2 = new Image();
ImageEnemi2.src = "img/slimer2.png";

const ImageHeart = new Image();
ImageHeart.src = "img/heart.png";

export { ImagePlayerLeft, ImagePlayerRight, ImagePlayerUp, ImagePlayerDown, ImageEnemi1, ImageEnemi2, ImageHeart };