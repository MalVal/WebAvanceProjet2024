import { Entity } from './Entity.js';
import { images } from './main.js';

export class Heart extends Entity
{
    constructor(x, y, width, height, canvas, health)
    {
        super(x, y, width, height, canvas);
        this.health = health; // The health that the Heart give to the player
        this.image = images[6];
    }
}