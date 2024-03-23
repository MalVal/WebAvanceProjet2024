import { Case2048 } from "./case2048";
import { settings } from "./settings";

export class Tableau2048{
    constructor()
    {
        this.tableau = this.initialiserTableau();
        this.score = 0;
        this.scoreElement = document.getElementById(settings.score);
        this.ajouterCaseAleatoire();
        this.ajouterCaseAleatoire();
        window.addEventListener("keyup", this.mouvement.bind(this)); // L'utilisation de bind(this) garantit que this dans la fonction de mouvement fait référence à l'instance de la classe Tableau2048.
    }

    initialiserTableau()
    {
        const tableau = [];
        for(let i = 0; i < settings.taille; i++)
        {
            const ligne = [];
            for(let j = 0; j < settings.taille; j++)
            {
                ligne.push(new Case2048());
            }
            tableau.push(ligne);
        }
        return tableau;
    }

    ajouterCaseAleatoire() 
    {
        let caseVide = false;
        while(!caseVide) // cond a changer car sinon boucle infinie
        {
            const x = Math.floor(Math.random() * settings.taille);
            const y = Math.floor(Math.random() * settings.taille);
            if (this.tableau[x][y].valeur == 0) 
            {
                const nouvelleValeur = Math.random() < 0.9 ? 2 : 4;
                this.tableau[x][y].valeur = nouvelleValeur;
                caseVide = true;
            }
        }
        this.afficherSurPage();
    }

    afficherSurPage()
    {
        const tableauElement = document.getElementById("tableau");

        tableauElement.innerHTML = "";

        for(let i = 0; i < settings.taille; i++)
        {
            for(let j = 0; j < settings.taille; j++)
            {
                const case2048 = this.tableau[i][j];
                const caseElement = document.createElement("div");
                caseElement.classList.add("case");
                if (case2048.valeur != 0) {
                    caseElement.textContent = case2048.valeur;
                    caseElement.classList.add("valeur" + case2048.valeur);
                } 
                else 
                {
                    caseElement.textContent = "";
                }
                tableauElement.appendChild(caseElement);
            }
        }
    }

    mouvement(event)
    {
        debugger;
        const tabAvantMouv = this.copierTableau(this.tableau); // pour eviter de copier par reference vu qu'on les compare juste apres
        switch (event.key)
        {
        case "ArrowLeft":
            this.tableau = this.moveLeft();
            break;

        case "ArrowRight":
            this.tableau = this.moveRight();
            break;

        case "ArrowUp":
            this.tableau = this.moveUp();
            break;

        case "ArrowDown":
            this.tableau = this.moveDown();
            break;
        }
        const mouv = this.comparerTableaux(tabAvantMouv, this.tableau);
        if(mouv === true)
        {
            this.ajouterCaseAleatoire();
        }
        else
        {
            this.afficherSurPage();
        }
    }

     moveLeft()
     {
        const tmp = [] ;
        for (let i = 0; i < settings.taille; i++) 
        {
            let ligne = [];
            ligne = this.condenser(this.tableau[i]);
            ligne = this.fusionner(ligne);
            ligne = this.condenser(ligne);
            ligne = this.ajouterZeroFin(ligne);
            tmp.push(ligne);
        }
        return tmp;
    }

    moveRight()
    {
        let tabInverse = this.tabMiroir(this.tableau);
        tabInverse = this.moveLeft();
        return this.translaterDroite(tabInverse); // il ne faut pas faire tabMiroir ici car mauvaise valeur sinon mais tout translater vers la droite !!!
    }

    moveUp() 
    {
        this.tableau = this.rotationGauche(this.tableau); // bien mettre this.tableau = car on l'ultilise dans moveLeft
        let tabRotationGauche = this.moveLeft();
        return this.rotationDroite(tabRotationGauche);
    }

    moveDown(tab)
    {
        this.tableau = this.rotationDroite(this.tableau); // bien mettre this.tableau = car on l'ultilise dans moveLeft
        let tabRotationDroite = this.moveLeft();
        return this.rotationGauche(tabRotationDroite);
    }

    condenser(ligne)
    {
        const ligneSansZero = [];
        for(let i = 0; i< ligne.length; i++)
        {
            if(ligne[i].valeur !== 0)
            {
                ligneSansZero.push(ligne[i]);
            }
        }
        return ligneSansZero;
    }

    fusionner(ligne)
    {
        for(let i = 0; i< ligne.length - 1; i++)
        {
            if(ligne[i+1].valeur === ligne[i].valeur)
            {
                ligne[i].valeur = ligne[i].valeur * 2;
                this.score += ligne[i].valeur;
                this.scoreElement.textContent = this.score;
                ligne[i+1].valeur = 0;
            }
        }
        return ligne;
    }

    ajouterZeroFin(ligne)
    {
        for(let i = 0; i < settings.taille; i++)
        {
        if(ligne[i] === undefined)
        {
            ligne[i] = new Case2048();
        }
        }
        return ligne;
    }

    tabMiroir(tab)
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

    translaterDroite(tab)
    {
        const tmp = [];
        for(let i = 0; i < settings.taille; i++)
        {
            const ligne = [];
            let compteurZero = 0;
            for(let j = settings.taille -1 ; j >= 0 && tab[i][j].valeur === 0; j--)
            {
                compteurZero ++;
            }
            if(compteurZero !== 0)
            {
                for(let k = 0; k < compteurZero; k++)
                {
                    ligne.push(new Case2048());
                }
                for(let l = 0; l < settings.taille - compteurZero; l++)
                {
                    ligne.push(tab[i][l]);
                }
            }
            else
            {
                for(let m = 0; m < settings.taille; m++)
                {
                    ligne.push(tab[i][m]);
                }
            }
            tmp.push(ligne);
        }
        return tmp;
    }

    rotationGauche(tab)
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

    rotationDroite(tab)
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

    copierTableau(tableau) // pour ne pas copier le tableau par reference
    {
        const nouveauTableau = [];
        for (let i = 0; i < settings.taille; i++) 
        {
            const ligne = [];
            for (let j = 0; j < settings.taille; j++) 
            {
                const valeur = tableau[i][j].valeur;
                const nouvelleCase = new Case2048(); // creer nouvelle instnace de case2048
                nouvelleCase.setValeur(valeur); // Définir la valeur de la nouvelle instance de Case2048
                ligne.push(nouvelleCase);
            }
            nouveauTableau.push(ligne);
        }
        return nouveauTableau;
    }

    comparerTableaux(tabAvantMouv, tabApresMouv)
    {
        for (let i = 0; i < settings.taille; i++) 
        {
            for(let j = 0; j < settings.taille; j++)
            {
                // Comparez chaque élément
                if (tabAvantMouv[i][j].valeur !== tabApresMouv[i][j].valeur) 
                {
                    return true; // Si un élément diffère, je retourne vrai pour ajouter case aleatoire
                }
            }
        }
        return false;
    }
}
