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
    this.load.spritesheet('player', 'assets/spritesheetExample.png', {frameWidth: 144, frameHeight: 144});
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('dirt', 'assets/blocdirt.png');
    this.load.image('smallplatform', 'assets/smallplatform.png');
}

function create() {
    // gameState.codey = this.add.sprite(150, 200, 'codey');
    //  gameState.cursors = this.input.keyboard.createCursorKeys();
    // Set cursor keys here!
    const platforms = this.physics.add.staticGroup();
    platforms.create(920, innerHeight - 12, 'ground');
    platforms.create(1840, innerHeight - 12, 'ground');
    platforms.create(150, innerHeight - 300, 'platform');
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
    //
    //
    gameState.player = this.physics.add.sprite(1500, innerHeight - 150, 'player');
    gameState.player.setBounce(0.2);
    this.player = gameState.player;
    this.physics.add.collider(gameState.player, platforms);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setBounds(0, 0, 5000, 5000);
    this.cameras.main.startFollow(this.player);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 12, end: 17}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 12, end: 17}),
        frameRate: 5,
        repeat: -1,
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', {start: 4, end: 1}),
        frameRate: 5,
        repeat: -1,
    });
    this.anims.create({
        key: 'punch',
        frames: this.anims.generateFrameNumbers('player', {start: 18, end: 22}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('player', {start: 6, end: 6}),
        frameRate: 1,
        repeat: -1,
    });
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNumbers('player', {start: 7, end: 10}),
        frameRate: 1,
        repeat: -1,
    });
}

function update() {
    // Update based on keypress here!
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-160);
        if (!(gameState.player.anims.getCurrentKey() === 'left')) {
            gameState.player.anims.play('left', true);
        }
    } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(160);
        if (!(gameState.player.anims.getCurrentKey() === 'right')) {
            gameState.player.anims.play('right', true);
        }
    } else if (gameState.cursors.space.isDown) {
        if (!(gameState.player.anims.getCurrentKey() === 'punch')) {
            gameState.player.anims.play('punch', true);
        }

    } else {
        this.player.setVelocityX(0);
        gameState.player.anims.play('idle', true);
    }
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down && !(gameState.player.anims.getCurrentKey() === 'jump')) {
        gameState.player.setVelocityY(-330);
        gameState.player.anims.play('jump', true);
    }
    if ( !gameState.player.body.touching.down && !(gameState.player.anims.getCurrentKey() === 'fall')) {
        gameState.player.anims.play('fall', true);
    }
}

export const game = new Phaser.Game(gameConfig);
