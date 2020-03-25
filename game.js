const config = {
    width: 1000,
    height: 1000,
    background: 0xffffff,
    scene: {
        preload,
        create,
        update,
    }
}

const gameState = {
    fire: false,
    hit: false,
    anim: false
}

function preload() {
    this.load.spritesheet('spicy', 'assets/spicy_sprite.png', {frameWidth: 618, frameHeight: 542})
    this.load.spritesheet('steve', 'assets/steve_sprite.png', {frameWidth: 500, frameHeight: 500})
    this.load.audio('attack', 'assets/sounds/attack.wav')
    this.load.audio('dialup', 'assets/sounds/dialup.wav')
    this.load.audio('dead', 'assets/sounds/dead.wav')
    this.load.image('energy', 'assets/energyBall.jpg')
}

function create() {

    gameState.attackSound = this.sound.add('attack')
    gameState.loadSound = this.sound.add('dialup')
    gameState.deadSound = this.sound.add('dead')
    

    gameState.spicy = this.add.sprite(850, 500, 'spicy')
    gameState.spicy.setScale(0.6, 0.6)
    gameState.spicy.setInteractive()
    gameState.spicy.on('pointerup', function() {

    if (!gameState.anim) {
        gameState.loadSound.play()
        gameState.anim = true
    }    
    
        gameState.spicy.anims.play('play', true).on('animationcomplete', () => {
            if (gameState.hit) {
                gameState.loadSound.stop()
                gameState.deadSound.play()
                gameState.hit = false
                gameState.anim = false
            }
            gameState.spicy.anims.play('button', true)
            gameState.steve.anims.play('steve_idle', true)
        })
        gameState.steve.anims.play('steve_attack', true)
    })

    gameState.energy = this.add.sprite(150, 500, 'energy')
    gameState.energy.setScale(0.2, 0.2)
   
    gameState.steve = this.add.sprite(150, 500, 'steve')
    gameState.steve.setScale(0.6, 0.6)
    gameState.steve.setInteractive()
    
    this.anims.create({
        key: 'button',
        frames: [ { key : 'spicy', frame : 0 } ],
        frameRate: 1
    })
    this.anims.create({
        key: 'play',
        frames: this.anims.generateFrameNumbers('spicy', {start: 0, end: 5}),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'steve_idle',
        frames: [ { key : 'steve', frame : 0 } ],
        repeat: 0
    });
    this.anims.create({
        key: 'steve_attack',
        frames: this.anims.generateFrameNumbers('steve', {start: 0, end: 1}),
        frameRate: 0.25,
        repeat: 0
    });
}
function fire() {
    if(gameState.energy.x < 700) {
        
    } else {
        gameState.energy.x == 0
    }
}

function update() {
    gameState.steve.on('animationupdate-steve_attack', function (anim, frame) {
        gameState.attackSound.play()
        gameState.fire = true
    });

    if (gameState.fire) {
        gameState.energy.x += 5
        if (gameState.energy.x > 700) {
            gameState.fire = false
            gameState.hit = true
            gameState.energy.x = 150
        }
    }
}

const game = new Phaser.Game(config)