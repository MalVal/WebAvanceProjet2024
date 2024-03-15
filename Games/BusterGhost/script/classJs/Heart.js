import { Entity } from './Entity.js';
import { ImageHeart } from '../Images.js';

export class Heart extends Entity
{
    constructor(x, y, width, height, canvas, health)
    {
        super(x, y, width, height, canvas);
        this.health = health;
        this.image = ImageHeart;
    }
}