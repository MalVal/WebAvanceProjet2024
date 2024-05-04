import { settings } from "./settings.js";


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
    let row = [];
    row = condense(tab[i]);
    row = merge(row);
    row = condense(row);
    row = addZeroEnd(row);
    tmp.push(row);
}
return tmp;
}

function moveRight(tab)
{
    let tabInverse = TabMirror(tab);
    tabInverse = moveLeft(tabInverse);
    return TabMirror(tabInverse); // il ne faut pas faire TabMirror ici car mauvaise valeur sinon mais tout translater vers la droite !!!
}

function moveUp(tab)
{
    let tabRotateLeft = RotationLeft(tab);
    tabRotateLeft = moveLeft(tabRotateLeft);
    return RotationRight(tabRotateLeft);
}

function moveDown(tab)
{
    let tabRotateRight = RotationRight(tab);
    tabRotateRight = moveLeft(tabRotateRight);
    return RotationLeft(tabRotateRight);
}

function condense(row)
{
    const rowWithoutZero = [];
    for(let i = 0; i< row.length; i++)
    {
        if(row[i] !== 0)
        {
            rowWithoutZero.push(row[i]);
        }
    }
    return rowWithoutZero;
}

function merge(row)
{
    for(let i = 0; i< row.length - 1; i++)
    {
        if(row[i+1] == row[i])
        {
            row[i]= row[i] * 2;
            row[i+1] = 0;
        }
    }
    return row;
}

function addZeroEnd(row)
{
    for(let i = 0; i < settings.size; i++)
    {
      if(row[i] === undefined){
        row[i] = 0;
      }
    }
    return row;
}

function TabMirror(tab)
{
    const tmp = [];
    for(let i = 0; i < settings.size; i++)
    {
        const row = [];
        for(let j = settings.size -1 ; j >= 0; j--)
        {
            row.push(tab[i][j]);
        }
        tmp.push(row);
    }
    return tmp;
}


function RotationLeft(tab)
{
    const tmp = [];
    for(let j = settings.size -1; j >= 0; j--)
    {
        const row = [];
        for(let i = 0; i < settings.size; i++)
        {
            row.push(tab[i][j]);
        }
        tmp.push(row);
    }
    return tmp;
}


function RotationRight(tab)
{
    const tmp = [];
    for(let j = 0; j < settings.size; j++)
    {
        const row = [];
        for(let i = 3; i >= 0; i--)
        {
            row.push(tab[i][j]);
        }
        tmp.push(row);
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
