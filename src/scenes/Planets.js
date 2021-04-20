class Planets extends Phaser.Scene {
    constructor() {
        super("planetScene");
    }

    preload() {
        this.load.audio('gameOver', './assets/audio3.mp3');
        this.load.image('planets', './assets/planets.png');
    }

    create() {
        // planets y-axis
        this.bluePlanet = this.add.tileSprite(
            250,320, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(0,0,235,245).setScale(0.75);

        this.purplePlanet = this.add.tileSprite(
            300,100, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(380,230,235,240).setScale(0.5);

        this.brownPlanet = this.add.tileSprite(
            75,25, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(380,0,235,240).setScale(0.25);

        this.greenPlanet = this.add.tileSprite(
            0,0, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(0,235,250,240).setScale(0.5);
        
        // planets x-axis
        this.bluePlanet2 = this.add.tileSprite(
            150,220, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(0,0,235,245).setScale(0.5);

        this.purplePlanet2 = this.add.tileSprite(
            200,0, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(380,230,235,240).setScale(0.5);

        this.brownPlanet2 = this.add.tileSprite(
            200,50, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(380,0,235,240).setScale(0.25);

        this.greenPlanet2 = this.add.tileSprite(
            200,0, 640,480,
            'planets'
        ).setOrigin(0,0).setCrop(0,235,250,240).setScale(0.5);

        //black screen
        this.add.rectangle(
            0, 0, 640, 480, 0x00000, 85
        ).setOrigin(0,0);

        // key inputs
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        soundVar = true;

        //displaying text
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                left: 10,
                right: 10,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //displaying scores
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                left: 10,
                right: 10,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(
            game.config.width/2,
            game.config.height/2 - borderUISize*3,
            'GAME OVER',
            textConfig
            ).setOrigin(0.5);

        this.add.text(
            game.config.width/2,
            game.config.height/2,
            'Press (P) to Play again\nOR\nPress (R) to Exit to Menu',
            textConfig
            ).setOrigin(0.5);
        
        this.add.text(
            borderUISize*3 + borderPadding*3,
            game.config.height/2 + borderUISize*6,
            "End Score: " + finScore,
            scoreConfig
            ).setOrigin(0.5);
    }

    update() {
        // replay the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("playScene");
        }

        // to menu
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // momentary black screen
            this.add.rectangle(
                0, 0, 640, 480, 0x000000
            ).setOrigin(0,0);
            
            // gameOver music
            if (soundVar == true) {
                this.sound.play('gameOver')
            };

            soundVar = false;
            this.time.addEvent({
                delay: 5000,
                paused: false,
                callback:()=> {
                    this.sound.get('gameOver').destroy();
                    this.scene.start("menuScene");
                },
            })
        }
        this.bluePlanet.tilePositionX -= 2;
        this.purplePlanet.tilePositionX += 3;
        this.brownPlanet.tilePositionX -= 2;
        this.greenPlanet.tilePositionX += 3;

        this.bluePlanet2.tilePositionY += 3;
        this.purplePlanet2.tilePositionY -= 2;
        this.brownPlanet2.tilePositionY += 3;
        this.greenPlanet2.tilePositionY -= 2;
    }
}