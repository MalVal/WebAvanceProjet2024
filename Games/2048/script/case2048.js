import { settings } from "./settings";

export class Case2048
{
    constructor()
    {
        this.valeur = settings.valeurCase;
    }

    setValeur(valeur) 
    {
        this.valeur = valeur;
    }
}