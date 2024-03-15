import { AliveEntity } from "./AliveEntity.js";
import { ImageEnemi1, ImageEnemi2 } from '../Images.js';

export class Enemi extends AliveEntity
{
    constructor(x, y, width, height, maxLife, canvas)
    {
        super(x, y, width, height, maxLife, canvas);
        this.image = ImageEnemi1;
        this.state = false;
    }

    update()
    {
        this.context.clearRect(this.position.x, this.position.y, this.width, this.height); // Remove the old entity

        this.movement(); // Update the movement of the entity

        if(this.state == false)
        {
            this.state = true;
            setTimeout(() =>
            {
                    this.state = false;
            }, 500);
            if(this.image == ImageEnemi1)
            {
                this.image = ImageEnemi2;
            }
            else
            {
                this.image = ImageEnemi1;
            }
        }

        this.draw(); // Draw the entity
    }

    follow(entity)
    {
        /*
            The enemies have to follow the Player
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