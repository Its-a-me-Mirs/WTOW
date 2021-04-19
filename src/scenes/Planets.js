class Planets extends Phaser.Scene {
    constructor() {
        super("planetScene");
    }

    preload() {
        this.load.audio('gameOver', './assets/audio3.mp3');
    }
    create() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //displaying text
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            //color: '#BF340F',
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
            //backgroundColor: '#F3B141',
            //color: '#BF340F',
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

        // timer in seconds until auto game ends
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            // black tint
            this.add.rectangle(
                0, 0, 640, 480, 0x00000, 45
            ).setOrigin(0,0);
            
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
                game.config.width/2,
                game.config.height/2 + borderUISize*6,
                "End Score: " + finScore,
                scoreConfig
                ).setOrigin(0.5);
        }, null, this);
        soundVar = true;
    }

    update() {
        // replay the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("playScene");
        }

        // to menu
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            // momentary screen
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
                callback:()=> {
                    this.sound.get('gameOver').destroy();
                    this.scene.start("menuScene");
                },
            })
        }
    }
}