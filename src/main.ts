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
    this.load.image('player', 'assets/Character1.png');
    this.load.image('ground', 'assets/Platform2.png');
    this.load.image('wall','assets/wall.png');
}

function create() {
    // gameState.codey = this.add.sprite(150, 200, 'codey');
    //  gameState.cursors = this.input.keyboard.createCursorKeys();
    // Set cursor keys here!
    var platforms = this.physics.add.staticGroup();
    platforms.create(48, innerHeight - 12, 'ground');
    platforms.create(108, innerHeight - 48, 'wall');
    gameState.player = this.physics.add.sprite(48, innerHeight -100, 'player');
    gameState.player.setBounce(0.2);
    gameState.player.setCollideWorldBounds(true);
    this.player = gameState.player;
    this.physics.add.collider(gameState.player, platforms);
    gameState.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Update based on keypress here!
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-160);

    } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(160);

    } else {
        this.player.setVelocityX(0);
    }
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
        gameState.player.setVelocityY(-330);
    }
}

export const game = new Phaser.Game(gameConfig);
