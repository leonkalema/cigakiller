import Phaser from 'phaser';

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game;

function preload() {}

function create() {}

function update() {}

export function createGame(canvasRef) {
  if (typeof navigator !== 'undefined') {
    gameConfig.parent = canvasRef;
    game = new Phaser.Game(gameConfig);
  }
}
