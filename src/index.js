import Phaser from 'phaser';
import Start from './scenes/Start.js';
import Level1 from './scenes/Level1.js';

let config = {
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  width: 800,
  height: 600,
  backgroundColor: 'ff9999',
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 1000},
          enableBody: true
      }
  },
  scene: [Start, Level1]
};

let game = new Phaser.Game(config);

export  {game, config};