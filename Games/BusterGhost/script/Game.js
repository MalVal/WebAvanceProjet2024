import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { Heart } from './Heart.js';
import { settings } from './settings.js';

export class Game
{
    constructor(canvas, startButton, paragraphPol, paragraphNok, paragraphScore)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = window.innerWidth-100;
        this.canvas.height = window.innerHeight-250;
        this.startButton = startButton;
        this.paragraphPol = paragraphPol;
        this.paragraphNok = paragraphNok;
        this.paragraphScore = paragraphScore;

        this.numberOfEnemies = 0;
        this.numberOfKills = 0;
        this.score = 0;
        this.wave = 0;
        this.enemies = []; // The container for the enemies
        this.hearts = []; // The container for the hearts
        this.gameStart = false; // The state of the game
        this.heartReady = true; // Can a heart spawn ?

        this.player = new Player(150, 150, settings.player.width, settings.player.height, settings.player.maxLife, this.canvas); // The main player
  
        /*
            Bind methods to 'this' to ensure proper access to 'this' context
            Use the functions before their definition
        */
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isOccupied = this.isOccupied.bind(this);
        this.getNewPosition = this.getNewPosition.bind(this);
        this.createEnemies = this.createEnemies.bind(this);
        this.createHeart = this.createHeart.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.animate = this.animate.bind(this);

        // Creation of the eventListeners
        this.setupEventListeners();
    }

    setupEventListeners()
    {
        //The button to start the game
        this.startButton.addEventListener("click", () =>
        {
            this.startGame();
        });

        //Event for the pressed key
        window.addEventListener('keydown', (event) =>
        {
            this.handleKeyDown(event);
        });

        //Event for the released key
        window.addEventListener('keyup', (event) =>
        {
            this.handleKeyUp(event);
        });
    }

    startGame()
    {
        this.gameStart = true;
        this.startButton.style.display = "none";
        this.animate();
    }

    handleKeyDown(event)
    {
        if(this.gameStart)
        {
            switch(event.key)
            {
                case "ArrowLeft": // Left
                case 'q':
                    this.player.keys.left.pressed = true;
                    break;
                case "ArrowUp": // Up
                case 'z':
                    this.player.keys.up.pressed = true;
                    break;
                case "ArrowRight": // right
                case 'd':
                    this.player.keys.right.pressed = true;
                    break;
                case "ArrowDown": // Down
                case 's':
                    this.player.keys.down.pressed = true;
                    break;
                case ' ':
                    this.player.attack1(); // Attack1 of the Player (damage zone)
                    break;
            }
        }
    }

    handleKeyUp(event)
    {
        if(this.gameStart)
        {
            switch(event.key)
            {
                case "ArrowLeft": // Left
                case 'q':
                    this.player.keys.left.pressed = false;
                    break;
                case "ArrowUp": // Up
                case 'z':
                    this.player.keys.up.pressed = false;
                    break;
                case "ArrowRight": // right
                case 'd':
                    this.player.keys.right.pressed = false;
                    break;
                case "ArrowDown": // Down
                case 's':
                    this.player.keys.down.pressed = false;
                    break;
            }
        }
    }

    /*
        Get a random integer between the min and the max parameters
    */
    getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
        Return TRUE, when the first parameters isn't in the second parameters, else return FALSE
    */
    notIn(x1, y1, w1, h1, x2, y2, w2, h2)
    {
        let rightOfShape1 = x1 + w1 < x2;
        let leftOfShape1 = x1 > x2 + w2;
        let aboveShape1 = y1 + h1 < y2;
        let belowShape1 = y1 > y2 + h2;

        return (rightOfShape1 || leftOfShape1 || aboveShape1 || belowShape1);
    }

    /*
        Return TRUE, when the case is occupied by the player or an enemy, else return FALSE
    */
    isOccupied(x, y, width, height)
    {
        for (let i = 0; i < this.enemies.length; i++)
        {
            if (!this.notIn(x, y, width, height, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
            {
                return true;
            }
        }

        for (let i = 0; i < this.hearts.length; i++)
        {
            if (!this.notIn(x, y, width, height, this.hearts[i].position.x, this.hearts[i].position.y, this.hearts[i].width, this.hearts[i].height))
            {
                return true;
            }
        }

        return !this.notIn(x, y, width, height, this.player.position.x, this.player.position.y, this.player.width, this.player.height);
    }

    /*
        Return a clean position, without any enemies or player in this position
    */
    getNewPosition(width, height)
    {
        let x = this.getRandomInt(0, this.canvas.width - this.player.width);
        let y = this.getRandomInt(0, this.canvas.height - this.player.height);

        while (this.isOccupied(x, y, width, height))
        {
            x = this.getRandomInt(0, this.canvas.width - this.player.width);
            y = this.getRandomInt(0, this.canvas.height - this.player.height);
        }

        return [x, y];
    }

    /*
        Create a series of w (the parameter) enemies and push them in the enemies list
    */
    createEnemies(w)
    {
        for(let i = 0; i < w; i++)
        {
            let position = this.getNewPosition(settings.enemy.width, settings.enemy.height);
            this.enemies.push(new Enemy(position[0], position[1], settings.enemy.width, settings.enemy.height, 100, this.canvas));
            this.numberOfEnemies++;
        }
    }

    // Create a heart and put it in the array
    createHeart()
    {
        let position = this.getNewPosition(settings.heart.width, settings.heart.height);
        let newHeart = new Heart(position[0], position[1], settings.heart.width, settings.heart.height, this.canvas, settings.heart.health);
        this.hearts.push(newHeart);
        return newHeart;
    }

    // Delete a heart from the array
    deleteHeart(heart)
    {
        let index = this.hearts.indexOf(heart);
        if(index !== -1)
        {
            this.context.clearRect(heart.position.x, heart.position.y, heart.width, heart.height);
            this.hearts.splice(index, 1);
            return true;
        }
        return false;
    }

    // Reset the game
    resetGame()
    {
        this.player.reset(); // Reset the variables of the player
        this.enemies = []; // Delete all the remain enemies
        this.hearts = []; // Delete all the remain hearts
        this.numberOfEnemies = 0;
        this.numberOfKills = 0;
        this.wave = 0;
        this.startButton.style.display = "block";
        this.gameStart = false;
        this.paragraphPol.textContent = "";
        this.paragraphNok.textContent = "";
        this.paragraphScore.textContent = "";
    }

    // Update the text
    updateDisplay()
    {
        this.paragraphPol.textContent = "Points of life : " + this.player.pointOfLive;
        this.paragraphNok.textContent = "Number of kills : " + this.numberOfKills;
        this.paragraphScore.textContent = "Score : " + this.score;
    }

    // Function to animate the game
    animate()
    {
        let anim = requestAnimationFrame(this.animate);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

        this.updateDisplay();

        /*
            Death of the player
        */
        if(this.player.pointOfLive <= 0)
        {
            cancelAnimationFrame(anim); // Stop the animations
            this.resetGame(); // Reset the variables of the game
            return;
        }
        else
        {
            /*
                Update of the player
            */
            this.player.update();
        }

        let damage = false; // an enemy is in the damage zone ?
        for(let i = 0; i < this.enemies.length; i++)
        {
            /*
                Death of an enemy
            */
            if(this.enemies[i].pointOfLive <= 0)
            {
                let index = this.enemies.indexOf(this.enemies[i]);

                if(index !== -1)
                {
                    this.context.clearRect(this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height);
                    this.enemies.splice(index, 1);
                    this.numberOfEnemies--;
                    this.numberOfKills++;
                    /*
                        Update of the score
                    */
                    const scoreIncrease = this.numberOfKills * 100;
                    this.score = this.score + scoreIncrease;
                }
            }
            else
            {
                /*
                    Update of an enemy
                */
                this.enemies[i].update();

                /*
                    The enemies have to follow the Player
                */
                this.enemies[i].follow(this.player);

                /*
                Damage on the player + collision player - enemy
                */
                if(!this.notIn(this.player.position.x + this.player.velocity.x, this.player.position.y + this.player.velocity.y, this.player.width, this.player.height, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
                {
                    this.player.stopMoving();
                    this.enemies[i].attack1(this.player);
                }

                /*
                    Damage on the player + collision enemy - player
                */
                if(!this.notIn(this.player.position.x, this.player.position.y, this.player.width, this.player.height, this.enemies[i].position.x + this.enemies[i].velocity.x, this.enemies[i].position.y + this.enemies[i].velocity.y, this.enemies[i].width, this.enemies[i].height))
                {
                    this.enemies[i].stopMoving();
                    this.enemies[i].attack1(this.player);
                }

                /*
                    Collision enemy - enemy
                */
                for(let j = 0; j < this.enemies.length; j++)
                {
                    if(this.enemies[i] !== this.enemies[j]) // If is not the same enemy
                    {
                        if(!this.notIn(this.enemies[j].position.x + this.enemies[j].velocity.x, this.enemies[j].position.y + this.enemies[j].velocity.y, this.enemies[j].width, this.enemies[j].height, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
                        {
                            this.enemies[j].stopMoving();
                        }

                        if(!this.notIn(this.enemies[j].position.x, this.enemies[j].position.y + this.enemies[j].velocity.y, this.enemies[j].width, this.enemies[j].height, this.enemies[i].position.x + this.enemies[i].velocity.x, this.enemies[i].position.y + this.enemies[i].velocity.y, this.enemies[i].width, this.enemies[i].height))
                        {
                            this.enemies[i].stopMoving();
                        }
                    }
                }

                /*
                    Collision enemy - heart
                 */
                for(let i = 0; i < this.hearts.length; i++)
                {
                    if(this.hearts[i]) // If the heart still exists
                    {
                        if ((!this.notIn(this.enemies[i].position.x + this.enemies[i].velocity.x, this.enemies[i].position.y + this.enemies[i].velocity.y, this.enemies[i].width, this.enemies[i].height, this.hearts[i].position.x, this.hearts[i].position.y, this.hearts[i].width, this.hearts[i].height)))
                        {
                            if(this.deleteHeart(this.hearts[i]))
                            {
                                this.enemies[i].pointOfLive += settings.heart.health;
                            }
                        }
                    }
                }

                /*
                    Damage on the enemies
                */
                if(this.player.attack.ready === false)
                {
                    if(this.player.zone === true) // If the zone can kill
                    {
                        if(!this.notIn(this.player.position.x - 20, this.player.position.y - 20, this.player.width + 40, this.player.height + 40, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
                        {
                            damage = true; // An enemy is in the Player's damage zone
                            this.enemies[i].pointOfLive -= settings.player.damage; // Damage on the enemy
                        }
                    }
                }
            }
        }
        if(damage === true) // If an enemy is in the Player's damage zone
        {
            this.player.zone = false; // The zone don't kill the enemies
            setTimeout(() =>
            {
                this.player.zone = true; // The zone will kill the enemies after the time out
            }, 500);
        }

        /*
            Creation of the heart
        */
        if(this.heartReady === true)
        {
            this.heartReady = false;
            let timeHeart = this.getRandomInt(settings.heart.timeSpawnMin, settings.heart.timeSpawnMax); // Random time before spawn a heart
            setTimeout(() =>
            {
                let heart = this.createHeart();
                this.heartReady = true;
                // Destruction of a heart
                setTimeout(() =>
                {
                    if(heart) // If the heart still exists
                    {
                        this.deleteHeart(heart);
                    }
                }, settings.heart.disappearance);
            }, timeHeart);
        }

        /*
            Collision player - heart
        */
        for(let i = 0; i < this.hearts.length; i++)
        {
            if((!this.notIn(this.player.position.x + this.player.velocity.x, this.player.position.y + this.player.velocity.y, this.player.width, this.player.height, this.hearts[i].position.x, this.hearts[i].position.y, this.hearts[i].width, this.hearts[i].height)))
            {
                if(this.deleteHeart(this.hearts[i]))
                {
                    this.player.pointOfLive += settings.heart.health; // Gain life
                    this.score -= settings.score.decreasingHeart; // Lose score when we take a heart
                }
            }
            else
            {
                this.hearts[i].update();
            }
        }

        /*
            New wave when no enemy
        */
        if(this.numberOfEnemies === 0)
        {
            this.wave++;
            this.createEnemies(this.wave);
        }
    }
}