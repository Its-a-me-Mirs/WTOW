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

        // timer in seconds until auto game ends
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOver = true;
            // black tint
            this.add.rectangle(
                0, 0, 640, 480, 0x00000, 45
            ).setOrigin(0,0);
            
            this.add.text(
                game.config.width/2,
                game.config.height/2 - borderPadding*4,
                'GAME OVER',
                textConfig
                ).setOrigin(0.5);

            this.add.text(
                game.config.width/2,
                game.config.height/2 + borderUISize*2,
                'Press (P) to Play again\nOR\nPress (R) to Exit to Menu',
                textConfig
                ).setOrigin(0.5);
        }, null, this);
    }

    // game difficulty settings
    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyP)) {
            // restart by sending back to menu
            this.scene.start("playScene");
        }

        // to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
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
    }
}