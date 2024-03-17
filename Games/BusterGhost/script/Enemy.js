import { AliveEntity } from "./AliveEntity.js";
import { images } from './main.js';

export class Enemy extends AliveEntity
{
    constructor(x, y, width, height, maxLife, canvas)
    {
        super(x, y, width, height, maxLife, canvas);
        this.image = images[4]; // Image of the enemi
        this.state = false; // Have to change the mouth ?
    }

    update()
    {
        this.context.clearRect(this.position.x, this.position.y, this.width, this.height); // Remove the old entity

        this.movement(); // Update the movement of the entity

        // Animation of the mouth
        if(this.state === false)
        {
            this.state = true;
            setTimeout(() =>
            {
                    this.state = false;
            }, 500);
            if(this.image === images[4])
            {
                this.image = images[5]; // Open mouth
            }
            else
            {
                this.image = images[4]; // Close mouth
            }
        }

        this.draw(); // Draw the enemy
    }

    follow(entity)
    {
        /*
            The enemies have to follow the parameter
        */
        if(this.position.x < entity.position.x)
        {
            this.velocity.x = 1;
        }
        else if(this.position.x === entity.position.x)
        {
            this.velocity.x = 0;
        }
        else
        {
            this.velocity.x = -1;
        }

        if(this.position.y < entity.position.y)
        {
            this.velocity.y = 1;
        }
        else if(this.position.y === entity.position.y)
        {
            this.velocity.y = 0;
        }
        else
        {
            this.velocity.y = -1;
        }
    }
}