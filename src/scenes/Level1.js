import Phaser from 'phaser';
import {game, config} from '../index.js'
import Align from '../util/align.js';
import AlignGrid from '../util/alignGrid.js';

class Level1 extends Phaser.Scene {
  constructor () {
    super({key: 'Level1'});
  };

  preload () {
    this.load.spritesheet('hunbun','./src/assets/hunbun.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('cave', './src/assets/cave.jpg');
    this.load.image('light', './src/assets/light.png');
    this.load.image('floor', './src/assets/platform.png');
    this.load.image('platform', './src/assets/platformSmall.png');
  }

  create () {
    this.active = true;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.background = this.add.image( 0, 0,'cave').setOrigin(0,0);

    this.light = this.add.image(0, 0, 'light').setScale(.5);
    this.light.alpha = 0.33;

    this.floor = this.physics.add.staticGroup();
    this.floor.create(600, 600, 'floor');
    this.floor.create(200, 600, 'floor');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(300, 500, 'platform');
    this.platforms.create(550, 400, 'platform');
    this.platforms.create(300, 300, 'platform');
    this.platforms.create(600, 200, 'platform');

    this.bun = this.physics.add.sprite(100, 100,'hunbun');
    this.bun.scale = 2;
    this.bun.setBounce(0.2);
    this.bun.body.collideWorldBounds = true;
    this.bun.setSize(32, 52);

    this.anims.create(
      {
        key: 'run',
        frames: this.anims.generateFrameNumbers('hunbun', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      }
    );
    this.anims.create(
      {
        key: 'jump',
        frames: this.anims.generateFrameNumbers('hunbun', { start: 45, end: 47 }),
        frameRate: 1,
        repeat: -1
      }
    );

    this.grid = new AlignGrid({scene: this, rows: 6, cols: 8});
    // this.grid.showNumbers();
    this.grid.placeAtIndex(1, this.bun);
    this.grid.placeAtIndex(9, this.light);

    this.physics.add.collider(this.bun, this.floor);
    this.physics.add.collider(this.bun, this.platforms);
  }

  update () {
    if (this.active) {
      if (this.cursors.right.isDown) {
        this.background.x -= 0.5;
        this.light.x -= 1;
        this.bun.flipX = true;
        this.bun.setVelocityX(200);
        if (this.bun.body.touching.down) {
          this.bun.anims.play('run', true);
        }
      } else if (this.cursors.left.isDown) {
        if (this.background.x < 0) {
        this.light.x += 1;
        this.background.x += 0.5;
        this.platforms.x++
        }
        this.bun.flipX = false;
        this.bun.setVelocityX(-200);
        if (this.bun.body.touching.down) {
          this.bun.anims.play('run', true);
        }
      } else {
        this.bun.setVelocityX(0);
        this.bun.anims.play('run', false);
      }
      if (this.cursors.up.isDown && this.bun.body.touching.down ) {
        this.bun.setVelocityY(-500);
        this.bun.anims.play('jump', true);
      } else if (this.cursors.down.isDown) {
        this.bun.setVelocityY(100);
        this.bun.anims.play('run', true);
      }
    }
  }
}

export default Level1;