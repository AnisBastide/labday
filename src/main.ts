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
    this.load.spritesheet('player', 'assets/spritesheetExample2.png', {frameWidth: 144, frameHeight: 144});
    this.load.image('ground', 'assets/ground.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('dirt', 'assets/blocdirt.png');
    this.load.image('smallplatform', 'assets/smallplatform.png');
    this.load.image('blockSideUp', 'assets/plateforme/texture/blocksideup.png');
    this.load.image('blockSideRight', 'assets/plateforme/texture/blocksideright.png');
}

function create() {
    // gameState.codey = this.add.sprite(150, 200, 'codey');
    //  gameState.cursors = this.input.keyboard.createCursorKeys();
    // Set cursor keys here!

    const platforms = this.physics.add.staticGroup();
    platforms.create(0, innerHeight - 12, 'blockSideUp');
    platforms.create(64, innerHeight - 12, 'blockSideUp');
    platforms.create(128, innerHeight - 12, 'blockSideUp');
    platforms.create(192, innerHeight - 12, 'blockSideUp');
    platforms.create(0, innerHeight - 76, 'blockSideRight');
    platforms.create(0, innerHeight - 140, 'blockSideRight');
    platforms.create(0, innerHeight - 204, 'blockSideRight');
    platforms.create(0, innerHeight - 268, 'blockSideRight');
    //
    gameState.player = this.physics.add.sprite(164, innerHeight - 150, 'player');
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
