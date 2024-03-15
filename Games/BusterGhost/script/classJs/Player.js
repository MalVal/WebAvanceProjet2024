import { AliveEntity } from './AliveEntity.js';
import { ImagePlayerLeft, ImagePlayerRight, ImagePlayerUp, ImagePlayerDown } from '../Images.js';

export class Player extends AliveEntity
{
    constructor(x, y, width, height, maxLife, canvas)
    {
        super(x, y, width, height, maxLife, canvas);
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

    draw()
    {
        if(this.attack.ready == false) // Draw damage area
        {
            this.context.fillStyle = 'yellow';
            this.context.fillRect(this.position.x-20, this.position.y-20, this.width+40, this.height+40);
        }

        this.drawLifeBar();
        this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    reset()
    {
        this.pointOfLive = this.maxLife;
        this.position = {x: 150, y: 150};
        this.velocity = {x: 0, y: 0};
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

    updateKey()
    {
        if(this.keys.right.pressed)
        {
            this.velocity.x = 3;
        }
        else if(this.keys.left.pressed)
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

    update()
    {
        this.context.clearRect(this.position.x, this.position.y, this.width, this.height); // Remove the old entity

        this.movement(); // Update the movement of the entity

        if(this.keys.left.pressed)
        {
            this.image = ImagePlayerLeft;
        }
        if(this.keys.right.pressed)
        {
            this.image = ImagePlayerRight;
        }
        if(this.keys.up.pressed)
        {
            this.image = ImagePlayerUp;
        }
        if(this.keys.down.pressed)
        {
            this.image = ImagePlayerDown;
        }

        this.draw(); // Draw the entity
    }
}