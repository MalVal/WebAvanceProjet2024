export class Entity
{
    constructor(x, y, width, height, canvas)
    {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0};
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.image = null;
        this.context = this.canvas.getContext('2d');
    }

    stopMoving()
    {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    draw()
    {
        this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    movement()
    {
        // Verification of position X

        if(this.position.x + this.width + this.velocity.x <= this.canvas.width && this.position.x + this.velocity.x >= 0)
        {
            this.position.x += this.velocity.x;
        }
        else
        {
            this.velocity.x = 0;
        }

        // Verification of position Y

        if(this.position.y + this.height + this.velocity.y <= this.canvas.height && this.position.y + this.velocity.y >= 0)
        {
            this.position.y += this.velocity.y;
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

        this.draw(); // Draw the entity
    }
}