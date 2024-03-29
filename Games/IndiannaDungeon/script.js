const canvas = document.getElementById('gameCanvas'); // Utilisez getElementById pour obtenir le canvas
const c = canvas.getContext('2d');

// Mettre à jour la taille du canvas lors du chargement de la page
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Appeler la fonction une fois pour définir la taille initiale du canvas

window.addEventListener('resize', resizeCanvas); // Mettre à jour la taille du canvas lors du redimensionnement de la fenêtre

const gravity = 0.5;
let level=1;

let point=0;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        };
        this.width = 30;
        this.height = 30;
        this.pv=50;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // Empêcher le joueur de sortir du canvas
        if (this.position.x + this.velocity.x >= 0 && this.position.x + this.velocity.x <= canvas.width - this.width) {
            this.position.x += this.velocity.x;
        }
        if (this.position.y + this.velocity.y >= 0 && this.position.y + this.velocity.y <= canvas.height - this.height) {
            this.position.y += this.velocity.y;
        }

        this.draw();

        if (this.position.y + this.height + this.velocity.y <= canvas.height)//permet de gerer la gravité pour les plateformes et reste
            this.velocity.y += gravity;
        else this.velocity.y = 0;
    }
}
class Platform {
    constructor(x, y, width, height, mid) {
        this.position = {
            x: x,
            y: y
        };
        this.width = width;
        this.height = height;
        this.mid = mid; // Ajoutez mid comme propriété de la plateforme
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
class objet{
    constructor(ennemi) {
        this.position = {
            x: ennemi.position.x-choixcoter(ennemi),
            y: ennemi.position.y
        };
        this.width = 30;
        this.height = 30;
        this.take= 0;
    }
    draw() {
        c.fillStyle = 'orange';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

function generateObjet(tabennemi){
    const tabobjet = [];
    for(let y=0;y<level;y++)
    {
        tabobjet.push(new objet(tabennemi[y]));
    }
    return tabobjet;
}

function choixcoter(ennemi){
    if(ennemi.position.x<= canvas.width/2)
    {
        return 40;
    }
    else
    {
        return -40;
    }
}

class Ennemi {
    constructor(platform) {
        this.position = {
            x: platform.position.x + platform.width / 2,
            y: platform.position.y-30
        };
        this.width = 30;
        this.height = 30;
    }

    draw() {
        c.fillStyle = 'black';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Attack {
    constructor(ennemi) {
        this.position = {
            x: ennemi.position.x + 5, 
            y: ennemi.position.y - 5   
        };
        this.width = 15;
        this.height = 15;
        this.initialX = ennemi.position.x + 5;  // Stocker la position initiale de l'attaque
        this.speed = 2;  // Vitesse de l'attaque
    }

    draw() {
        c.fillStyle = 'green';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        // Déplacer l'attaque horizontalement
        this.position.x +=choixside(this.initialX,this.speed);
        // Si l'attaque sort du canvas, réinitialiser sa position
        if (this.position.x > canvas.width || this.position.x<0) {
            this.position.x = this.initialX;
        }
    }
    reset() {
        this.position.x = this.initialX;
    }
}



function generateEnnemi(platforms)
{
    const tabennemi = [];
    for(let y=0;y<level;y++)
    {
        tabennemi.push(new Ennemi(platforms[y]));
    }
    return tabennemi;
}
function generateAttack(tabennemi)
{
    const tabattack = [];
    for(let y=0;y<level;y++)
    {
        tabattack.push(new Attack(tabennemi[y]));
    }
    return tabattack;
}
// Générer des plateformes aléatoires
function generatePlatforms(numPlatforms) {
    const platforms = [];
    const minDistance = 100; // Distance minimale entre les plateformes
    const topSpace = 200; // Espace en haut du canvas
    for (let i = 0; i < numPlatforms; i++) {
        let x, y, width, height,mid;
        do {
            x = Math.random() * (canvas.width - 200); // Position x aléatoire
            y = Math.random() * (canvas.height - topSpace - 200) + topSpace; // Position y aléatoire avec espace au sommet
            width = Math.random() * (canvas.width / 6) + 100; // Largeur aléatoire entre 100 et 1/4 de la largeur du canvas
            height = 20;// Hauteur fixe
            mid= x+width; 
        } while (platforms.some(platform => isColliding(platform, x, y, width, height, minDistance))); // Vérifier si la nouvelle plateforme entre en collision avec une existante
        platforms.push(new Platform(x, y, width, height,mid));
    }
    return platforms;
}

function isColliding(platform, x, y, width, height, minDistance) {
    // Vérifie si la nouvelle plateforme se superpose à la plateforme existante avec une marge minimale
    return (
        x < platform.position.x + platform.width + minDistance &&
        x + width > platform.position.x - minDistance &&
        y < platform.position.y + platform.height + minDistance &&
        y + height > platform.position.y - minDistance
    );
}



const player = new Player();
const platforms = generatePlatforms(5+(level-1));
const tabennemi = generateEnnemi(platforms);
const tabattack = generateAttack(tabennemi);
const tabobj =generateObjet(tabennemi);
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
};
function choixside(x,speed)
{
    if(x<= canvas.width/2)
    {
        return speed;
    }
    else
    {
        return -speed;
    }
}
function isPlayerHit(player, attack) {
    return (
        player.position.x < attack.position.x + attack.width &&
        player.position.x + player.width > attack.position.x &&
        player.position.y < attack.position.y + attack.height &&
        player.position.y + player.height > attack.position.y
    );
}
let objetneeded=0;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    tabattack.forEach(attack => {
        if (isPlayerHit(player, attack)) {
            // Si le joueur est touché, réinitialiser sa position à son emplacement de départ
            player.position.x = 100;
            player.position.y = 100;
            player.pv-=10;
            
            if(player.pv<=0)
            {
                // Niveau réussi
                console.log("Niveau RATE LOSER !");
                point=0;
                level=1; // Passer au niveau suivant
                console.log("Passage au niveau", level);
                // Réinitialiser les objets et les ennemis pour le nouveau niveau
                platforms.length = 0;
                tabennemi.length = 0;
                tabattack.length = 0;
                tabobj.length = 0;
                objetneeded=0;
                platforms.push(...generatePlatforms(5 + (level - 1)));
                tabennemi.push(...generateEnnemi(platforms));
                tabattack.push(...generateAttack(tabennemi));
                tabobj.push(...generateObjet(tabennemi));
                player.position.x = 100;
                player.position.y = 100;
                player.pv = 50;
            }
            attack.reset(); 
        }
    });
    
    player.update();
    platforms.forEach(platform => platform.draw());
    tabennemi.forEach(ennemi => ennemi.draw());
    tabobj.forEach(obj =>{
        if(obj.take==0)
        {
            if(player.position.x < obj.position.x + obj.width &&
                player.position.x + player.width > obj.position.x &&
                player.position.y < obj.position.y + obj.height &&
                player.position.y + player.height > obj.position.y)
            {
                obj.take=1;
                objetneeded++;
                console.log("jepasse",level);
            }
            else{
                obj.draw();
            }
        }
    });
    console.log("jepasse",level,"objneeded",objetneeded);
    if(objetneeded==level)
    {
        // Niveau réussi
        
        point+=level;
        level++; // Passer au niveau suivant
        
        // Réinitialiser les objets et les ennemis pour le nouveau niveau
        platforms.length = 0;
        tabennemi.length = 0;
        tabattack.length = 0;
        tabobj.length = 0;
        objetneeded=0;
        platforms.push(...generatePlatforms(5 + (level - 1)));
        tabennemi.push(...generateEnnemi(platforms));
        tabattack.push(...generateAttack(tabennemi));
        tabobj.push(...generateObjet(tabennemi));
    }
    
    tabattack.forEach(attack => attack.update());
    if (keys.right.pressed) {
        player.velocity.x = 5;
    } else if (keys.left.pressed) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;
    }
    // Plateforme condition de colision
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
             player.position.y + player.velocity.y + player.height >= platform.position.y &&
              player.position.x + player.width >= platform.position.x &&
               player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            
            
        }
    });
    //Pour empecher le joueur de traverser l'ennemi
    tabennemi.forEach(ennemi => {
        if (
            player.position.x < ennemi.position.x + ennemi.width &&
            player.position.x + player.width > ennemi.position.x &&
            player.position.y < ennemi.position.y + ennemi.height &&
            player.position.y + player.height > ennemi.position.y
        ) {
            player.velocity.x = 0; // Empêcher le joueur de traverser l'ennemi
           
            if(player.position.x + player.width > ennemi.position.x+ennemi.width && player.position.x < ennemi.position.x+ennemi.width)
            {
                if(keys.right.pressed)
                {
                    player.velocity.x = 5;
                }
                else
                {
                    player.velocity.x=0;
                }
            }
            else
            {
                if(keys.left.pressed)
                {
                    player.velocity.x = -5;
                }
                else
                {
                    player.velocity.x=0;
                }
            }
            
        }
    });
}
animate();
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 81:
            keys.left.pressed = true;
            break;
        case 32:
            player.velocity.y -= 20; // Donner un coup de saut
            break;
        case 68:
            keys.right.pressed = true;
            break;
    }
});
window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 81:
            keys.left.pressed = false;
            break;
        case 32:
            // Ne rien faire pour le saut lors de la touche relâchée
            break;
        case 68:
            keys.right.pressed = false;
            break;
    }
});
