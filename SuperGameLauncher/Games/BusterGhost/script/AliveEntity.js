import { Entity} from "./Entity.js";

export class AliveEntity extends Entity
{
    constructor(x, y, width, height, maxLife, canvas)
    {
        super(x, y, width, height, canvas);
        this.pointOfLive = maxLife;
        this.maxLife = maxLife;
    }

    drawLifeBar()
    {
        // Properties of the life bar
        let width = 35;
        let height = 5;
        let color = "green";

        // Calculate the width of the life bar
        let CurrentLifeWidth = (this.pointOfLive / this.maxLife) * width;

        // Draw the life bar
        this.context.clearRect(this.position.x, this.position.y - 15, CurrentLifeWidth, height);
        this.context.fillStyle = color;
        this.context.fillRect(this.position.x, this.position.y - 15, CurrentLifeWidth, height);
    }

    draw()
    {
        this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.drawLifeBar();
    }

    attack1()
    {
        if(this.attack.ready === true)
        {
            this.attack.ready = false;

            setTimeout(() =>
            {
                this.attack.ready = true;
            }, 1000);
        }
    }
}