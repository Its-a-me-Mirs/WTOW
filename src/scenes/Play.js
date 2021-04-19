class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // new assets
        this.load.image('red', './assets/backdrop_red.png');
        this.load.image('stars', './assets/backdrop_stars.png');
        this.load.audio('gameOver', './assets/audio3.mp3');

        // load images and tile sprites
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png',
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // red backdrop
        var image = this.add.image(0,0,'red').setOrigin(0,0);

        //place tile sprite
        this.starfield = this.add.tileSprite(
            0,0,640,480,
            'stars'
            ).setOrigin(0,0);
        
        // whiteUI background
        this.add.rectangle(
            0,
            borderUISize,
            game.config.width,
            borderUISize * 2.5,
            0xcccccc
            ).setOrigin(0,0);
        
        // blackUI borders
        this.add.rectangle(
            0,
            0,
            game.config.width,
            borderUISize *2,
            0x000000
            ).setOrigin(0, 0);
        
        // green UI backdrop
        this.add.rectangle(
            borderUISize,
            borderUISize + borderPadding *1.5,
            game.config.width - borderUISize * 2, borderUISize *1.5,
            0x00dd00
            ).setOrigin(0,0);
        
        // add rocket player 1
        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
            ).setOrigin(0.5, 1);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(
            this,
            game.config.width + borderUISize*10.75,
            borderUISize*4,
            'spaceship',
            0,
            30
            ).setOrigin(0, 0);
        this.ship02 = new Spaceship(
            this,
            game.config.width + borderUISize*6.5,
            borderUISize*6.5 + borderPadding*3,
            'spaceship',
            0,
            20
            ).setOrigin(0,0);
        this.ship03 = new Spaceship(
            this,
            game.config.width + borderUISize,
            borderUISize*9 + borderPadding*2,
            'spaceship',
            0,
            10
            ).setOrigin(0,0);
        
        //defining keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',
            {start: 0, end: 9, first: 0}), frameRate: 30
        });

        //intitializing score
        this.p1Score = 0;

        //displaying score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#BF340F',
            align: 'right',
            padding: {
                top: 5,
                left: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(
            borderUISize + borderPadding,
            borderUISize + borderPadding*2,
            this.p1Score, scoreConfig);
        
        //Game Over flag
        this.gameOver = false;

        // timer in seconds
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOver = true;
            this.add.text(
                game.config.width/2,
                game.config.height/2,
                'GAME OVER',
                scoreConfig
                ).setOrigin(0.5);
            this.add.text(
                game.config.width/2,
                game.config.height/2 + 64,
                'Press (R) to Restart or LEFT for Menu',
                scoreConfig
                ).setOrigin(0.5);
        }, null, this);


    }

    update() {
        // to restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        // to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            soundVar = false;
            
            // momentary screen
            this.add.rectangle(
                0, 0, 640, 480, 0x000000
            ).setOrigin(0,0);
            // gameOver music
            this.sound.play('gameOver');
            this.time.addEvent({
                delay: 5000,
                callback:()=> {
                    this.scene.start("menuScene");
                },
            })
        }

        this.starfield.tilePositionX -= 3;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        //AABB (axis-aligned bounding boxes) check
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    // exploding event
    shipExplode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            this.sound.play('sfx_explosion');
            ship.alpha = 1;
            boom.destroy();
        });

        // adding and changing scores
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}