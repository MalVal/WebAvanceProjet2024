import { settings } from "./settings.js";

export class Case2048
{
    constructor()
    {
        this.value = settings.valueCase;
    }

    setValue(value) 
    {
        this.value = value;
    }
}