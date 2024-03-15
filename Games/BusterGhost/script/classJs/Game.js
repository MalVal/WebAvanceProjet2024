import { Player } from './Player.js';
import { Enemi } from './Enemi.js';
import { Heart } from './Heart.js';
import { settings } from '../settings.js';

export class Game
{
    constructor(canvas, startButton, paragraphPol, paragraphNok, paragraphScore)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = window.innerWidth-100;
        this.canvas.height = window.innerHeight-150;
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
        this.heartReady = true;

        this.player = new Player(150, 150, settings.player.width, settings.player.height, settings.player.maxLife, this.canvas); // The main player
  
        /*
            Bind methods to 'this' to ensure proper access to 'this' context
            Use the functions before their definition
        */
        this.isOccupied = this.isOccupied.bind(this);
        this.getNewPosition = this.getNewPosition.bind(this);
        this.createEnemies = this.createEnemies.bind(this);
        this.createHeart = this.createHeart.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.animate = this.animate.bind(this);

        /*
            The button to start the game
        */
        this.startButton.addEventListener("click", () =>
        {
            this.gameStart = true;
            this.paragraphPol.textContent = "Points of life : " + this.player.pointOfLive;
            this.paragraphNok.textContent = "Number of kill : " + this.numberOfKills;
            this.paragraphScore.textContent = "Score : " + this.score;
            this.startButton.style.display = "none";
            this.animate();
        });

        /*
            Event for the pressed key
        */
        window.addEventListener('keydown', (event) =>
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
        );

        /*
            Event for the released key
        */
        window.addEventListener('keyup', (event) =>
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
        );
    }

    /*
        Get a random integer between the min and the max parameters
    */
    getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
        Return TRUE, when the fisrt parameters isn't in the second parameters, else return FALSE
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
        Return TRUE, when the case is occupied by the player or an enemi, else return FALSE
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
        Create a serie of w (the parameter) enemies and push them in the enemies list
    */
    createEnemies(w)
    {
        for(let i = 0; i < w; i++)
        {
            let position = this.getNewPosition(settings.enemi.width, settings.enemi.height);
            this.enemies.push(new Enemi(position[0], position[1], settings.enemi.width, settings.enemi.height, 100, this.canvas));
            this.numberOfEnemies++;
        }
    }

    /*
        Create a heart and put it in the array
    */
    createHeart()
    {
        let position = this.getNewPosition(settings.heart.width, settings.heart.height);
        this.hearts.push(new Heart(position[0], position[1], settings.heart.width, settings.heart.height, this.canvas, settings.heart.health));
    }

    /*
        Reset the game
    */
    resetGame()
    {
        this.player.reset(); // Reset the variables of the player
        this.enemies = []; // Delete all the remain enemies
        this.numberOfEnemies = 0;
        this.numberOfKills = 0;
        this.wave = 0;
    }

    /*
        Function to animate the game
    */
    animate()
    {
        let anim = requestAnimationFrame(this.animate);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

        /*
            Death of the player
        */
        if(this.player.pointOfLive <= 0)
        {
            cancelAnimationFrame(anim); // Stop the animations
            this.resetGame(); // Reset the variables of the game
            this.startButton.style.display = "block";
            this.paragraphPol.textContent = "Loser";
            this.paragraphNok.textContent = "Loser";
            this.paragraphScore.textContent = "Loser";
            this.gameStart = false;
            return;
        }
        else
        {
            /*
                Update of the player
            */
            this.player.update();
            this.player.updateKey();
        }

        let damage = false;
        for(let i = 0; i < this.enemies.length; i++)
        {
            /*
                Death of an enemi
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
                    this.paragraphNok.textContent = "Number of kill : " + this.numberOfKills;
                }
            }
            else
            {
                /*
                    Update of an enemi
                */
                this.enemies[i].update();

                /*
                    The enemies have to follow the Player
                */
                this.enemies[i].follow(this.player);

                /*
                Damage on the player + colision player - enemi
                */
                if(!this.notIn(this.player.position.x + this.player.velocity.x, this.player.position.y + this.player.velocity.y, this.player.width, this.player.height, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
                {
                    this.player.velocity.x = 0;
                    this.player.velocity.y = 0;
                    if(this.enemies[i].attack.ready === true)
                    {
                        this.enemies[i].attack1();
                        this.player.pointOfLive -= settings.enemi.damage;
                        this.paragraphPol.textContent = "Points of life : " + this.player.pointOfLive;
                    }
                }

                /*
                    Damage on the player + colision enemi - player
                */
                if(!this.notIn(this.player.position.x, this.player.position.y, this.player.width, this.player.height, this.enemies[i].position.x + this.enemies[i].velocity.x, this.enemies[i].position.y + this.enemies[i].velocity.y, this.enemies[i].width, this.enemies[i].height))
                {
                    this.enemies[i].velocity.x = 0;
                    this.enemies[i].velocity.y = 0;
                    if(this.enemies[i].attack.ready === true)
                    {
                        this.enemies[i].attack1();
                        this.player.pointOfLive -= settings.enemi.damage;
                        this.paragraphPol.textContent = "Points of life : " + this.player.pointOfLive;
                    }
                }

                /*
                    Colision enemi - enemi
                */
                for(let j = 0; j < this.enemies.length; j++)
                {
                    if(this.enemies[i] != this.enemies[j]) // If is not the same enemi
                    {
                        if(!this.notIn(this.enemies[j].position.x + this.enemies[j].velocity.x, this.enemies[j].position.y + this.enemies[j].velocity.y, this.enemies[j].width, this.enemies[j].height, this.enemies[i].position.x, this.enemies[i].position.y, this.enemies[i].width, this.enemies[i].height))
                        {
                            this.enemies[j].velocity.x = 0;
                            this.enemies[j].velocity.y = 0;
                        }

                        if(!this.notIn(this.enemies[j].position.x, this.enemies[j].position.y + this.enemies[j].velocity.y, this.enemies[j].width, this.enemies[j].height, this.enemies[i].position.x + this.enemies[i].velocity.x, this.enemies[i].position.y + this.enemies[i].velocity.y, this.enemies[i].width, this.enemies[i].height))
                        {
                            this.enemies[i].velocity.x = 0;
                            this.enemies[i].velocity.y = 0;
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
                                damage = true; // An enemi is in the Player's damage zone
                                this.enemies[i].pointOfLive -= settings.player.damage; // Damage on the enemi
                            }
                        }
                }
            }
        }
        if(damage === true) // If an enemi is in the Player's damage zone
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
                this.createHeart();
                this.heartReady = true;
            }, timeHeart);
        }

        for(let i = 0; i < this.hearts.length; i++)
        {
            /*
                "Death" of a heart
            */
                
            if((!this.notIn(this.player.position.x + this.player.velocity.x, this.player.position.y + this.player.velocity.y, this.player.width, this.player.height, this.hearts[i].position.x, this.hearts[i].position.y, this.hearts[i].width, this.hearts[i].height)))
            {
                let index = this.hearts.indexOf(this.hearts[i]);

                if(index !== -1)
                {
                    this.context.clearRect(this.hearts[i].position.x, this.hearts[i].position.y, this.hearts[i].width, this.hearts[i].height);
                    this.hearts.splice(index, 1);
                    this.player.pointOfLive += settings.heart.health;
                    this.paragraphPol.textContent = "Points of life : " + this.player.pointOfLive;
                }
            }
            else
            {
                this.hearts[i].update();
            }
        }

        /*
            New wave when no enemi
        */
        if(this.numberOfEnemies == 0)
        {
            this.wave++;
            this.createEnemies(this.wave);
        }
    }
}