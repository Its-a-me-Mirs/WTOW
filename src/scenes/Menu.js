class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // moving star backdrop
        this.load.image('stars', './assets/backdrop_stars.png');
        // original
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        //main theme and change sounds
        this.load.audio('mainTune', './assets/audio1.mp3');
        this.load.audio('toNextScene', './assets/audio2.mp3');
        this.load.audio('novice', './assets/audio4.mp3');
        
    }
    create() {
        // colored backdrop of the title screen
        this.add.rectangle(
            0, 0, 640, 480, 0x21101f
        ).setOrigin(0,0);

        // adding in the stars
        this.starfield = this.add.tileSprite(
            0,0,640,480,
            'stars'
        ).setOrigin(0,0);


        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            //backgroundColor: '#F3B141',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 10,
                right: 10
            },
            fixedWidth: 0
        }

        let titleConfig = {
            fontFamily: 'Garamond',
            fontSize: '32px',
            color: 'white',
            align: 'center',
            padding: {
                top: 10,
                bottom: 50,
                left: 10,
                right: 10
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(
            game.config.width/2,
            game.config.height/4 - borderUISize,
            'Without the Other Worlds',
            titleConfig
            ).setOrigin(0.5);
        
        this.add.text(
            game.config.width/2,
            game.config.height/2 - borderUISize - borderPadding*4,
            'use (🠔) LEFT and (🠖) RIGHT to move\nAND\n(F) to Fire',
            menuConfig
            ).setOrigin(0.5);
        
        //menuConfig.backgroundColor = '#45b450';
        //menuConfig.color = 'white';
        
        this.add.text(
            game.config.width/2,
            game.config.height/2 + borderUISize*3 + borderPadding,
            'To Begin:\n\nPress (O) for Novice\n\nOR\n\nPress (P) for Expert',
            menuConfig
            ).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // keys for difficulties
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        // adding the background music...
        const music = this.sound.add('mainTune', {loop: true});
        music.play();
    }

    // game difficulty settings
    update() {
        if (soundVar == false) {
            // plays sounds with F, LEFT, RIGHT key
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.sound.play('sfx_explosion');
            }
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.sound.play('sfx_select');
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.sound.play('sfx_select');
            }

            if (Phaser.Input.Keyboard.JustDown(keyO)) {
            // easy mode settings
                game.settings = {
                    spaceshipSpeed: 2,
                    gameTimer: 60000    
                }
                this.sound.get('mainTune').destroy();
                this.sound.play('novice');
                // momentary blue screen
                this.add.rectangle(
                    0, 0, 640, 480, 0x200052
                ).setOrigin(0,0);

                soundVar = true;
                this.time.addEvent( {
                    delay: 2800,
                    callback:() => {
                        this.scene.start('playScene');
                    },
                })   
            }

            if (Phaser.Input.Keyboard.JustDown(keyP)) {
                // hard mode settings
                game.settings = {
                    spaceshipSpeed: 4,
                    gameTimer: 45000
                    //gameTimer: 1000 // testing sound...
                }
                this.sound.get('mainTune').destroy();
                this.sound.play('toNextScene');
                // momentary red screen
                this.add.rectangle(
                    0, 0, 640, 480, 0x440000
                ).setOrigin(0,0);

                soundVar = true;
                this.time.addEvent( {
                    delay: 2800,
                    callback:() => {
                        this.scene.start('playScene');
                    },
                })   
            }
        }
        this.starfield.tilePositionX -= 2;
        this.starfield.tilePositionY += 1;
    }
}