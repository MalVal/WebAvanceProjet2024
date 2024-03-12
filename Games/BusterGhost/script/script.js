/*
    Html's variables
*/
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-150;

const paragraphPv = document.querySelector("#pv");
const paragraphNok = document.querySelector("#nok");
const paragraphScore = document.querySelector("#score");

/*
    Creation of the images
*/
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

/*
    Class for the entities
*/
class Entity
{
    constructor(x, y, width, height, maxLife)
    {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0};
        this.width = width;
        this.height = height;
        this.pointOfLive = maxLife;
        this.maxLife = maxLife;
        this.attack1 = {ready: true, x: 0, y: 0};
        this.image = ImageEnemi1;
        this.state = false;
    }

    DrawLifeBar()
    {
        // Définissez les propriétés de la barre de vie
        let width = 35;
        let height = 5;
        let color = "green";

        // Calculez la largeur de la barre en fonction de la vie actuelle
        let CurrentLifeWidth = (this.pointOfLive / this.maxLife) * width;

        c.clearRect(this.position.x, this.position.y - 15, CurrentLifeWidth, height);

        // Dessinez la barre de vie
        c.fillStyle = color;
        c.fillRect(this.position.x, this.position.y - 15, CurrentLifeWidth, height);
    }

    Draw()
    {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.DrawLifeBar();
    }

    Movement()
    {
        // Verification of position X

        if(this.position.x + this.width + this.velocity.x <= canvas.width && this.position.x + this.velocity.x >= 0)
        {
            this.position.x += this.velocity.x;
        }
        else
        {
            this.velocity.x = 0;
        }

        // Verification of position Y

        if(this.position.y + this.height + this.velocity.y <= canvas.height && this.position.y + this.velocity.y >= 0)
        {
            this.position.y += this.velocity.y;
        }
        else
        {
            this.velocity.y = 0;
        }
    }

    Update()
    {
        c.clearRect(this.position.x, this.position.y, this.width, this.height); // Remove the old entity

        this.Movement(); // Update the movement of the entity

        this.Draw(); // Draw the entity
    }

    Attack1()
    {
        if(this.attack1.ready === true)
        {
            this.attack1.ready = false;

            setTimeout(() =>
            {
                this.attack1.ready = true;
            }, 1000);
        }
    }
}

/*
    Class of the player
*/
class Player extends Entity
{
    constructor(x, y, width, height, pointOfLive)
    {
        super(x, y, width, height, pointOfLive);
        this.zone = true;
        this.image = ImagePlayerLeft;
        this.keys = {
            right:
            {
                pressed: false
            },
            left:
            {
                pressed: false
            },
            up:
            {
                pressed: false
            },
            down:
            {
                pressed: false
            }
        }
    }

    Draw()
    {
        if(this.attack1.ready == false) // Draw damage area
        {
            c.fillStyle = 'yellow';
            c.fillRect(this.position.x-20, this.position.y-20, this.width+40, this.height+40);
        }

        this.DrawLifeBar();
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    Reset()
    {
        player.pointOfLive = 150;
        player.position = {x: 150, y: 150};
        player.velocity = {x: 0, y: 0};
        this.keys = {
            right:
            {
                pressed: false
            },
            left:
            {
                pressed: false
            },
            up:
            {
                pressed: false
            },
            down:
            {
                pressed: false
            }
        }
    }

    UpdateKey()
    {
        if(this.keys.right.pressed)
        {
            this.velocity.x = 3;
        }
        else if(player.keys.left.pressed)
        {
            this.velocity.x = -3;
        }
        else
        {
            this.velocity.x = 0;
        }

        if(this.keys.up.pressed)
        {
            this.velocity.y = -3;
        }
        else if(this.keys.down.pressed)
        {
            this.velocity.y = 3;
        }
        else
        {
            this.velocity.y = 0;
        }
    }
}

/*
    Game's variables
*/
const enemiWidth = 35;
const enemiHeight = 25;
const playerWidth = 35;
const playerHeight = 43;

let numberOfEnemies = 0;
let numberOfKills = 0;
let score = 0;
let wave = 0;
let enemies = []; // The container of the enemies
let gameStart = false; // The state of the game

const player = new Player(150, 150, playerWidth, playerHeight, 150); // The main Player

/*
    Function to animate the game
*/
function animate()
{
    let anim = requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    /*
        Death of the player
    */
    if(player.pointOfLive <= 0)
    {
        cancelAnimationFrame(anim); // Stop the animations
        player.Reset(); // Reset the variables of the player
        resetGame(); // Reset the variables of the game
        startButton.style.display = "block";
        paragraphPv.textContent = "Loser";
        paragraphNok.textContent = "Loser";
        paragraphScore.textContent = "Loser";
        gameStart = false;
        return;
    }
    else
    {
        /*
            Update of the player
        */
        player.Update();
        player.UpdateKey();
    }

    for(let i = 0; i < enemies.length; i++)
    {
        /*
            Death of an enemi
        */
        if(enemies[i].pointOfLive <= 0)
        {
            let index = enemies.indexOf(enemies[i]);

            if(index !== -1)
            {
                c.clearRect(enemies[i].position.x, enemies[i].position.y, enemies[i].width, enemies[i].height);
                enemies.splice(index, 1);
                numberOfEnemies--;
                numberOfKills++;
                paragraphNok.textContent = "Number of kill : " + numberOfKills;
            }
        }
        else
        {
            /*
                Update of an enemi
            */
            enemies[i].Update();
            if(enemies[i].state == false)
            {
                enemies[i].state = true;
                setTimeout(() =>
                {
                    enemies[i].state = false;
                }, 500);
                if(enemies[i].image == ImageEnemi1)
                {
                    enemies[i].image = ImageEnemi2;
                }
                else
                {
                    enemies[i].image = ImageEnemi1;
                }
            }

            if(enemies[i].position.x < player.position.x)
            {
                enemies[i].velocity.x = 1;
            }
            else if(enemies[i].position.x === player.position.x)
            {
                enemies[i].velocity.x = 0;
            }
            else
            {
                enemies[i].velocity.x = -1;
            }

            if(enemies[i].position.y < player.position.y)
            {
                enemies[i].velocity.y = 1;
            }
            else if(enemies[i].position.y === player.position.y)
            {
                enemies[i].velocity.y = 0;
            }
            else
            {
                enemies[i].velocity.y = -1;
            }
        }
    }

    /*
        Damage on the enemies
    */
   let degat = false;
    if(player.attack1.ready === false)
    {
        for(let i = 0; i < enemies.length; i++)
        {
            if(player.zone === true)
            {
                if(!notIn(player.position.x-20, player.position.y-20, player.width+40, player.height+40, enemies[i].position.x, enemies[i].position.y, enemies[i].width, enemies[i].height))
                {
                    degat = true;
                    enemies[i].pointOfLive -= 15;
                }
            }
        }
        if(degat === true)
        {
            player.zone = false;
            setTimeout(() =>
            {
                player.zone = true;
            }, 500);
        }
    }

    for(let i = 0; i < enemies.length; i++)
    {
        /*
            Damage on the player + colision player - enemi
        */
        if(!notIn(player.position.x+player.velocity.x, player.position.y+player.velocity.y, player.width, player.height, enemies[i].position.x, enemies[i].position.y, enemies[i].width, enemies[i].height))
        {
            player.velocity.x = 0;
            player.velocity.y = 0;
            if(enemies[i].attack1.ready === true)
            {
                enemies[i].Attack1();
                player.pointOfLive -= 5;
                paragraphPv.textContent = "Points of life : " + player.pointOfLive;
            }
        }

        /*
            Damage on the player + colision enemi - player
        */
        if(!notIn(player.position.x, player.position.y, player.width, player.height, enemies[i].position.x+enemies[i].velocity.x, enemies[i].position.y+enemies[i].velocity.y, enemies[i].width, enemies[i].height))
        {
            enemies[i].velocity.x = 0;
            enemies[i].velocity.y = 0;
            if(enemies[i].attack1.ready === true)
            {
                enemies[i].Attack1();
                player.pointOfLive -= 5;
                paragraphPv.textContent = "Points of life : " + player.pointOfLive;
            }
        }

        /*
            Colision enemi - enemi
        */
        for(let j = 0; j < enemies.length; j++)
        {
            if(enemies[i] != enemies[j])
            {
                if(!notIn(enemies[j].position.x+enemies[j].velocity.x, enemies[j].position.y+enemies[j].velocity.y, enemies[j].width, enemies[j].height, enemies[i].position.x, enemies[i].position.y, enemies[i].width, enemies[i].height))
                {
                    enemies[j].velocity.x = 0;
                    enemies[j].velocity.y = 0;
                }

                if(!notIn(enemies[j].position.x, enemies[j].position.y+enemies[j].velocity.y, enemies[j].width, enemies[j].height, enemies[i].position.x+enemies[i].velocity.x, enemies[i].position.y+enemies[i].velocity.y, enemies[i].width, enemies[i].height))
                {
                    enemies[i].velocity.x = 0;
                    enemies[i].velocity.y = 0;
                }
            }
        }
    }

    /*
        New wave when no enemi
    */
    if(numberOfEnemies == 0)
    {
        wave++;
        createEnemies(wave);
    }
}

/*
    The button to start the game
*/
const startButton = document.getElementById("startButton");
startButton.addEventListener("click",
function()
{
    gameStart = true;
    paragraphPv.textContent = "Points of life : " + player.pointOfLive;
    paragraphNok.textContent = "Number of kill : " + numberOfKills;
    paragraphScore.textContent = "Score : " + score;
    startButton.style.display = "none";
    animate();
});

/*
    Event for the pressed key
*/
window.addEventListener('keydown', 
function(event)
{
    if(gameStart)
    {
        switch(event.key)
        {
            case "ArrowLeft": // Left
            case 'q':
                player.keys.left.pressed = true;
                player.image = ImagePlayerLeft;
                break;
            case "ArrowUp": // Up
            case 'z':
                player.keys.up.pressed = true;
                player.image = ImagePlayerUp;
                break;
            case "ArrowRight": // right
            case 'd':
                player.keys.right.pressed = true;
                player.image = ImagePlayerRight;
                break;
            case "ArrowDown": // Down
            case 's':
                player.keys.down.pressed = true;
                player.image = ImagePlayerDown;
                break;
        }

        if(event.key === ' ')
        {
            player.Attack1(); // Attack1 of the Player (damage zone)
        }
    }
}
);

/*
    Event for the released key
*/
window.addEventListener('keyup', 
function(event)
{
    if(gameStart)
    {
        switch(event.key)
        {
            case "ArrowLeft": // Left
            case 'q':
                player.keys.left.pressed = false;
                break;
            case "ArrowUp": // Up
            case 'z':
                player.keys.up.pressed = false;
                break;
            case "ArrowRight": // right
            case 'd':
                player.keys.right.pressed = false;
                break;
            case "ArrowDown": // Down
            case 's':
                player.keys.down.pressed = false;
                break;
        }
    }
}
);

/*
    Get a random integer between the min and the max parameters
*/
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    Return TRUE, when the case is occupied by the player or an enemi, else return FALSE
*/
function isOccupied(x, y, width, height)
{
    for (let i = 0; i < enemies.length; i++)
    {
        if (!notIn(x, y, width, height, enemies[i].position.x, enemies[i].position.y, enemies[i].width, enemies[i].height))
        {
            return true;
        }
    }

    return !notIn(x, y, width, height, player.position.x, player.position.y, player.width, player.height);
}

/*
    Return TRUE, when the fisrt parameters isn't in the second parameters, else return FALSE
*/
function notIn(x1, y1, w1, h1, x2, y2, w2, h2)
{
    let rightOfShape1 = x1 + w1 < x2;
    let leftOfShape1 = x1 > x2 + w2;
    let aboveShape1 = y1 + h1 < y2;
    let belowShape1 = y1 > y2 + h2;

    return (rightOfShape1 || leftOfShape1 || aboveShape1 || belowShape1);
}

/*
    Return a clean position, without any enemies or player in this position
*/
function getNewPosition(width, height)
{
    let x = getRandomInt(0, canvas.width-player.width);
    let y = getRandomInt(0, canvas.height-player.height);

    while (isOccupied(x, y, width, height))
    {
        x = getRandomInt(0, canvas.width-player.width);
        y = getRandomInt(0, canvas.height-player.height);
    }

    return [x, y];
}

/*
  Create a serie of w (the parameter) enemies and push them in the enemies list
*/

function createEnemies(w)
{
    for(let i = 0; i < w; i++)
    {
        let position = getNewPosition(enemiWidth, enemiHeight);
        enemies.push(new Entity(position[0], position[1], enemiWidth, enemiHeight, 100));
        numberOfEnemies++;
    }
}

/*
    Reset the game
*/
function resetGame()
{
    enemies = []; // Delete all the remain enemies
    numberOfEnemies = 0;
    numberOfKills = 0;
    wave = 0;
}