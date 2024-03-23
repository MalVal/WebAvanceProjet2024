import { settings } from "./settings";


// jeu de tests

const tab = [
    [0, 4, 0, 2],
    [2, 2, 2, 2],
    [0, 0, 0, 0],
    [2, 0, 0, 0]];

console.table(tab);

function moveLeft(tab)
{
const tmp = [] ;
for (let i = 0; i < tab.length; i++) 
{
    let ligne = [];
    ligne = condenser(tab[i]);
    ligne = fusionner(ligne);
    ligne = condenser(ligne);
    ligne = ajouterZeroFin(ligne);
    tmp.push(ligne);
}
return tmp;
}

function moveRight(tab)
{
    let tabInverse = TabMiroir(tab);
    tabInverse = moveLeft(tabInverse);
    return TabMiroir(tabInverse); // il ne faut pas faire tabMiroir ici car mauvaise valeur sinon mais tout translater vers la droite !!!
}

function moveUp(tab)
{
    let tabRotationGauche = RotationGauche(tab);
    tabRotationGauche = moveLeft(tabRotationGauche);
    return RotationDroite(tabRotationGauche);
}

function moveDown(tab)
{
    let tabRotationDroite = RotationDroite(tab);
    tabRotationDroite = moveLeft(tabRotationDroite);
    return RotationGauche(tabRotationDroite);
}

function condenser(ligne)
{
    const ligneSansZero = [];
    for(let i = 0; i< ligne.length; i++)
    {
        if(ligne[i] !== 0)
        {
            ligneSansZero.push(ligne[i]);
        }
    }
    return ligneSansZero;
}

function fusionner(ligne)
{
    for(let i = 0; i< ligne.length - 1; i++)
    {
        if(ligne[i+1] == ligne[i])
        {
            ligne[i]= ligne[i] * 2;
            ligne[i+1] = 0;
        }
    }
    return ligne;
}

function ajouterZeroFin(ligne)
{
    for(let i = 0; i < settings.taille; i++)
    {
      if(ligne[i] === undefined){
        ligne[i] = 0;
      }
    }
    return ligne;
}

function TabMiroir(tab)
{
    const tmp = [];
    for(let i = 0; i < settings.taille; i++)
    {
        const ligne = [];
        for(let j = settings.taille -1 ; j >= 0; j--)
        {
            ligne.push(tab[i][j]);
        }
        tmp.push(ligne);
    }
    return tmp;
}


function RotationGauche(tab)
{
    const tmp = [];
    for(let j = settings.taille -1; j >= 0; j--)
    {
        const ligne = [];
        for(let i = 0; i < settings.taille; i++)
        {
            ligne.push(tab[i][j]);
        }
        tmp.push(ligne);
    }
    return tmp;
}


function RotationDroite(tab)
{
    const tmp = [];
    for(let j = 0; j < settings.taille; j++)
    {
        const ligne = [];
        for(let i = 3; i >= 0; i--)
        {
            ligne.push(tab[i][j]);
        }
        tmp.push(ligne);
    }
    return tmp;
}



console.log("tabgauche : ");
console.table(moveLeft(tab));
console.log("tabdroite : ");
console.table(moveRight(tab));
console.log("tab haut : ");
console.table(moveUp(tab));
console.log("tab bas : ");
console.table(moveDown(tab));
