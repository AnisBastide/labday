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
      debug: true,
    },
  },

  parent: 'game',
  scene: {
    preload,
    create,
    update,
  }
};
const gameState={
  cursors: undefined,
  codey: undefined
};
function preload() {
  this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/codey.png');
}

function create() {
  gameState.codey = this.add.sprite(150, 200, 'codey');
  gameState.cursors=this.input.keyboard.createCursorKeys();
  // Set cursor keys here!
}

function update() {
  // Update based on keypress here!
  if(gameState.cursors.right.isDown){
    gameState.codey.x+=5;
  }
  if(gameState.cursors.left.isDown){
    gameState.codey.x-=5;
  }
  if(gameState.cursors.up.isDown){
    gameState.codey.y-=5;
  }
  if(gameState.cursors.down.isDown){
    gameState.codey.y+=5;
  }
  if(gameState.cursors.space.isDown){
    gameState.codey.y-=5;
    setTimeout(function(){gameState.codey.y+=5},100);

  }
}

export const game = new Phaser.Game(gameConfig);
