import * as Phaser from 'phaser';

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',

    type: Phaser.AUTO,

    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            debug: false,
        },
    },
    parent: 'game',
    scene: {
        preload,
        create,
        update,
    },
};
const gameState = {
    cursors: undefined,
    player: undefined,
};

function preload() {
    this.load.spritesheet('player', 'assets/Idle_Character.png', {frameWidth: 32, frameHeight: 64});
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('dirt', 'assets/blocdirt.png');
    this.load.image('smallplatform', 'assets/smallplatform.png');
}

function create() {
    // gameState.codey = this.add.sprite(150, 200, 'codey');
    //  gameState.cursors = this.input.keyboard.createCursorKeys();
    // Set cursor keys here!
    var platforms = this.physics.add.staticGroup();
    platforms.create(920, innerHeight - 12, 'ground');
    platforms.create(1840, innerHeight - 12, 'ground');
    platforms.create(150, innerHeight - 100, 'platform');
    // first floor
    platforms.create(332, innerHeight - 57, 'smallplatform');
    platforms.create(364, innerHeight - 57, 'dirt');
    platforms.create(388, innerHeight - 57, 'dirt');
    platforms.create(388, innerHeight - 57, 'dirt');
    platforms.create(412, innerHeight - 57, 'dirt');
    platforms.create(436, innerHeight - 57, 'dirt');
    platforms.create(460, innerHeight - 57, 'dirt');
    platforms.create(484, innerHeight - 57, 'smallplatform');
    // second floor
    platforms.create(356, innerHeight - 81, 'smallplatform');
    platforms.create(388, innerHeight - 81, 'dirt');
    platforms.create(388, innerHeight - 81, 'dirt');
    platforms.create(412, innerHeight - 81, 'dirt');
    platforms.create(436, innerHeight - 81, 'dirt');
    platforms.create(460, innerHeight - 81, 'smallplatform');
    // third floor
    platforms.create(380, innerHeight - 105, 'smallplatform');
    platforms.create(388, innerHeight - 105, 'dirt');
    platforms.create(412, innerHeight - 105, 'dirt');
    platforms.create(460, innerHeight - 105, 'smallplatform');
    gameState.player = this.physics.add.sprite(48, innerHeight - 100, 'player');
    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);
    this.player = gameState.player;
    this.physics.add.collider(gameState.player, platforms);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
        frameRate: 1,
        repeat: -1,
    });
}

function update() {
    // Update based on keypress here!
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-160);
        // gameState.player.anims.play('left', true);
        gameState.player.anims.play('idle', false);
    } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(160);
        // gameState.player.anims.play('right', true);
        gameState.player.anims.play('idle', false);
    } else {
        this.player.setVelocityX(0);
        // gameState.player.anims.play('right', false);
        // gameState.player.anims.play('left', false);
        gameState.player.anims.play('idle', true);
    }
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
        gameState.player.setVelocityY(-330);
    }
}

export const game = new Phaser.Game(gameConfig);
