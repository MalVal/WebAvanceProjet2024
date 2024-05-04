import { Case2048 } from "./case2048.js";
import { settings } from "./settings.js";

export class Game2048{
    constructor(tableGame, startButton, time, penality, pEnd, paragraphMessage)
    {
        this.table2048 = tableGame; // tableau récupéré avec getElementById --> vrai tableau que l'on voit
        this.timeElement = time;
        this.startButton = startButton;
        this.penalityElement = penality;
        this.pEndElement = pEnd;
        this.paragraphMessage = paragraphMessage;

        this.elapsedTime = 0; // etat du temps
        this.gameStart = false; // etat du jeu
        this.tableTMP = null; // table 2048 qui est modifié pendant le jeu

        /*
            Liez(bind) les méthodes à « this » pour garantir un accès approprié au contexte « this »
            Utiliser les fonctions avant leur définition
        */
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.startGame = this.startGame.bind(this);
        this.movement = this.movement.bind(this);
        this.initializeArray = this.initializeArray.bind(this);
        this.addCaseRandom = this.addCaseRandom.bind(this);
        this.showOnPage = this.showOnPage.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.condense = this.condense.bind(this);
        this.merge = this.merge.bind(this);
        this.addZeroEnd = this.addZeroEnd.bind(this);
        this.tabMirror = this.tabMirror.bind(this);
        this.translateRight = this.translateRight.bind(this);
        this.rotationLeft = this.rotationLeft.bind(this);
        this.rotationRight = this.rotationRight.bind(this);
        this.copyTable = this.copyTable.bind(this);
        this.compareTablex = this.compareTablex.bind(this);
        this.swapTableRandomly = this.swapTableRandomly.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.endGame = this.endGame.bind(this);

        //créer les évenements 
        this.setupEventListeners();
    }

    setupEventListeners()
    {
        // quand on clicke sur le bouton pour démarrer le jeu
        this.startButton.addEventListener("click", () =>
        {
            this.startGame();
            this.paragraphMessage.textContent = "";
        });

        //evenement de la fenetre
        window.addEventListener("keyup", (event) =>
        {
            this.movement(event);
        });
    }

    startGame()
    {
         // Supprimer la section "end game" si elle existe
        const endGameSection = document.getElementById("pEnd");
        if (endGameSection) {
            endGameSection.remove();
        }

         // créer jeu 
        this.gameStart = true;
        this.startButton.style.display = "none";
        this.tableTMP = this.initializeArray();
        this.addCaseRandom();
        this.addCaseRandom();
        this.elapsedTime = 0;
        this.startTimer();
    }

    endGame() {
        this.stopTimer(); // Arrêter le chronomètre
        this.gameStart = false;
        this.startButton.style.display = "block";

        // envoyer les résultats dans l'application communne
        const scoreValue = encodeURIComponent(this.elapsedTime * (-1)); // score *(-1) pour que le moins de temps soit 1er
        const gameName = '2048';
        fetch(`../../src/PHP/results.php?game=${gameName}&score=${scoreValue}`)

            .then(response =>
            {
                if (!response.ok)
                {
                    throw new Error('Network failed');
                }
                return response.json();
            })

            .then(data =>
            {
                if(data.error === "success")
                {
                    this.paragraphMessage.textContent = "Score successful send";
                }
                else
                {
                    this.paragraphMessage.textContent = "Failed send";
                }
            })

            .catch(error => this.paragraphMessage.textContent = "Error : " + error)


    // Créer la section pour dire fin du jeu
    const sectionElement = document.createElement("section");
    const pElement = document.createElement("p");
    pElement.textContent = "You succeeded, you got 2048 !!! -> END GAME";
    pElement.id = "pEnd"; // Ajouter un ID pour le style
    sectionElement.appendChild(pElement);

    // Ajouter le style CSS à l'élément p
    const styleElement = document.createElement("style");
    styleElement.textContent = "#pEnd { color: red; font-weight: bold; }";

    // Insérer la section et le style dans le document
    document.body.appendChild(styleElement);
    document.body.appendChild(sectionElement);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.elapsedTime++;
            this.timeElement.textContent = this.elapsedTime;
        }, 1000); // Incrémente le temps toutes les secondes (1000 millisecondes)
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    initializeArray()
    {
        const table = [];
        for(let i = 0; i < settings.size; i++)
        {
            const row = [];
            for(let j = 0; j < settings.size; j++)
            {
                row.push(new Case2048());
            }
            table.push(row);
        }
        return table;
    }

    addCaseRandom() 
    {
        let emptyCase = false;
        while(!emptyCase) 
        {
            const x = Math.floor(Math.random() * settings.size);
            const y = Math.floor(Math.random() * settings.size);
            if (this.tableTMP[x][y].value == 0) 
            {
                let newValue;
                const rand = Math.random(); // Génère un nombre aléatoire entre 0 et 1

                // Répartition des valeurs selon les pourcentages souhaités
                if (rand < 0.8) {
                    newValue = 2; // 80%
                } else if (rand < 0.92) {
                    newValue = 4; // 12%
                } else if (rand < 0.98){
                    newValue = 1; // 6%
                } else {
                    newValue = 5; // 2%
                }

                this.tableTMP[x][y].value = newValue;
                emptyCase = true;
            }
        }
        this.showOnPage();
    }

    showOnPage()
    {
        this.table2048.innerHTML = "";
        for(let i = 0; i < settings.size; i++)
        {
            for(let j = 0; j < settings.size; j++)
            {
                const case2048 = this.tableTMP[i][j];
                const caseElement = document.createElement("div");
                caseElement.classList.add("case");
                if (case2048.value != 0) {
                    caseElement.textContent = case2048.value;
                    caseElement.classList.add("value" + case2048.value);
                } 
                else 
                {
                    caseElement.textContent = "";
                }
                this.table2048.appendChild(caseElement);
            }
        }
    }

    movement(event)
    {
        if(this.gameStart)//vérifier que le jeu est lancé ou en cours
        {
            const tabBeforeMove = this.copyTable(this.tableTMP); // pour eviter de copier par reference vu qu'on les compare juste apres
            switch (event.key)
            {
                case "ArrowLeft":
                    this.tableTMP = this.moveLeft();
                    break;

                case "ArrowRight":
                    this.tableTMP = this.moveRight();
                    break;

                case "ArrowUp":
                    this.tableTMP = this.moveUp();
                    break;

                case "ArrowDown":
                    this.tableTMP = this.moveDown();
                    break;
                
                case " ":
                    this.swapTableRandomly();
                    break;
            }
            const mouv = this.compareTablex(tabBeforeMove, this.tableTMP);
            if(mouv === true)
            {
                this.addCaseRandom();
            }
            else
            {
                this.showOnPage();
            }
        }
    }

     moveLeft()
     {
        const tmp = [] ;
        for (let i = 0; i < settings.size; i++) 
        {
            let row = [];
            row = this.condense(this.tableTMP[i]);
            row = this.merge(row);
            row = this.condense(row);
            row = this.addZeroEnd(row);
            tmp.push(row);
        }
        return tmp;
    }

    moveRight()
    {
        let tabInverse = this.tabMirror(this.tableTMP);
        tabInverse = this.moveLeft();
        return this.translateRight(tabInverse); // il ne faut pas faire tabMirror ici car mauvaise value sinon mais tout translater vers la droite !!!
    }

    moveUp() 
    {
        this.tableTMP = this.rotationLeft(this.tableTMP); // bien mettre this.tableTMP = car on l'ultilise dans moveLeft
        let tabrotationLeft = this.moveLeft();
        return this.rotationRight(tabrotationLeft);
    }

    moveDown()
    {
        this.tableTMP = this.rotationRight(this.tableTMP); // bien mettre this.tableTMP = car on l'ultilise dans moveLeft
        let tabrotationRight = this.moveLeft();
        return this.rotationLeft(tabrotationRight);
    }

    swapTableRandomly()
    {
        // mettre les valeurs dans une liste
        const valuesList = [];
        for(let i = 0; i < settings.size; i++)
        {
            for(let j = 0; j < settings.size; j++)
            {
                if(this.tableTMP[i][j].value !== 0)
                {
                    valuesList.push(this.tableTMP[i][j].value);
                    this.tableTMP[i][j].value = 0;
                }
            }
        }

        // trier la liste de manière croissante
        valuesList.sort((a, b) => a - b);
        
        for(let i = 1; i < valuesList.length; i++) // i = 1 et pas 0 pour enlever la plus petite valeur
        {
            let ok = false;
            while(ok===false)
            {
                let x = Math.floor(Math.random() * settings.size);
                let y = Math.floor(Math.random() * settings.size);
                if(this.tableTMP[x][y].value === 0)
                {
                    this.tableTMP[x][y].value = valuesList[i];
                    ok = true;
                }
            }
        }

        this.penalityElement.style.display = "block"; // afficher + 10 à l'écran

        this.elapsedTime += 10; // Ajouter une pénalité de 10 secondes
        this.timeElement.textContent = this.elapsedTime;

        // Retirez le message de pénalité après un délai de 0,4 secondes
        setTimeout(() => {
            this.penalityElement.style.display = "none";
        }, 400);

    }

    condense(row) // condenser
    {
        const rowWithoutZero = [];
        for(let i = 0; i< row.length; i++)
        {
            if(row[i].value !== 0)
            {
                rowWithoutZero.push(row[i]);
            }
        }
        return rowWithoutZero;
    }

    merge(row) // fusionner
    {
        for(let i = 0; i< row.length - 1; i++)
        {
            if(row[i+1].value === row[i].value)
            {
                if(row[i].value != 5)
                {
                    row[i].value = row[i].value * 2;
                    if(row[i].value === 2048)
                        {
                            this.endGame();
                        }
                }
                else
                {
                    row[i].value = 0;
                }
                row[i+1].value = 0;
            }
        }
        return row;
    }

    addZeroEnd(row)
    {
        for(let i = 0; i < settings.size; i++)
        {
        if(row[i] === undefined)
        {
            row[i] = new Case2048();
        }
        }
        return row;
    }

    tabMirror(tab)
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

    translateRight(tab)
    {
        const tmp = [];
        for(let i = 0; i < settings.size; i++)
        {
            const row = [];
            let counterZero = 0;
            for(let j = settings.size -1 ; j >= 0 && tab[i][j].value === 0; j--)
            {
                counterZero ++;
            }
            if(counterZero !== 0)
            {
                for(let k = 0; k < counterZero; k++)
                {
                    row.push(new Case2048());
                }
                for(let l = 0; l < settings.size - counterZero; l++)
                {
                    row.push(tab[i][l]);
                }
            }
            else
            {
                for(let m = 0; m < settings.size; m++)
                {
                    row.push(tab[i][m]);
                }
            }
            tmp.push(row);
        }
        return tmp;
    }

    rotationLeft(tab)
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

    rotationRight(tab)
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

    copyTable(table) // pour ne pas copier le table par reference
    {
        const newtable = [];
        for (let i = 0; i < settings.size; i++) 
        {
            const row = [];
            for (let j = 0; j < settings.size; j++) 
            {
                const value = table[i][j].value;
                const newCase = new Case2048(); // creer nouvelle instance de case2048
                newCase.setValue(value); // Définir la value de la nouvelle instance de Case2048
                row.push(newCase);
            }
            newtable.push(row);
        }
        return newtable;
    }

    compareTablex(tabBeforeMove, tabAfterMove)
    {
        for (let i = 0; i < settings.size; i++) 
        {
            for(let j = 0; j < settings.size; j++)
            {
                // Comparez chaque élément
                if (tabBeforeMove[i][j].value !== tabAfterMove[i][j].value) 
                {
                    return true; // Si un élément diffère, je retourne vrai pour ajouter case aleatoire
                }
            }
        }
        return false;
    }
}
