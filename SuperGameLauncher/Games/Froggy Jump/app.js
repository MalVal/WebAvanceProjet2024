class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        this.load.image('startButton', 'asset/play.png');
    }

    create() {
        this.startButton = this.add.image(200, 300, 'startButton').setInteractive();
        this.startButton.setDisplaySize(100, 100);

        this.startButton.on('pointerdown', function() {
            this.scene.start('main');
        }, this);
    }
}

class MainScene extends Phaser.Scene {
    constructor() {
        super('main');
    }

    preload() {
        this.load.image('frogR', 'asset/frogR.png');
        this.load.image('frogL', 'asset/frogL.png');
        this.load.image('bar', 'asset/bar.png');
    }

    create() {
        this.frog = this.physics.add.image(200, 450, 'frogR');
        this.isOnBar = false;
        this.isFalling = true;
        this.score = 0;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.bars = this.physics.add.staticGroup();

        this.bars.create(200, 550, 'bar').setDisplaySize(80, 20).refreshBody();
        this.bars.create(100, 430, 'bar').setDisplaySize(80, 20).refreshBody();
        this.bars.create(300, 430, 'bar').setDisplaySize(80, 20).refreshBody();
        this.bars.create(200, 250, 'bar').setDisplaySize(80, 20).refreshBody();

        this.physics.add.collider(
            this.frog,
            this.bars,
            null,
            (frog, bars) =>
            {
                return frog.body.velocity.y >= 0;
            });

        this.frog.setDisplaySize(50, 50);

        this.frog.body.collideWorldBounds = false;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#111' });
        this.scoreText.setColor('#FFF')

    }

    update() {
        this.frog.setVelocityX(0);

        if(this.frog.body.y > this.score){
            this.score = this.frog.body.y;
            this.scoreText.setText(`Score: ${Math.floor(this.score)}`);
        }

        if(this.frog.body.velocity.y > 0){
            this.isFalling = true;
        }else if (this.frog.body.velocity.y == 0){
            this.isOnBar = true;
            this.isFalling = false;
        }

        if ( this.isOnBar && !this.isFalling) {
            this.frog.setVelocityY(-900);
            this.isFalling = false;
            this.isOnBar = false;
        }

        if (this.cursors.right.isDown) {
            this.frog.setVelocityX(200);

            if (this.frog.texture.key === 'frogL') {
                this.frog.setTexture('frogR');
            }
        }

        if (this.cursors.left.isDown) {
            this.frog.setVelocityX(-200);

            if (this.frog.texture.key === 'frogR') {
                this.frog.setTexture('frogL');
            }
        }
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) {
            this.scene.restart();
        }

    }
}

const config = {
    width: 400,
    height: 600,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
            gravity: {
                y: 2000,
            }
        }
    },
    scene: [MenuScene, MainScene]
};

var game = new Phaser.Game(config);
