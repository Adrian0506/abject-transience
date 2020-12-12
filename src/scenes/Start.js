import Phaser from 'phaser';
import {game, config} from '../index.js';
import Align from '../util/align.js';
import AlignGrid from '../util/alignGrid.js';


class Start extends Phaser.Scene {
  constructor() {
    super({key:"Start"});

    this.nextLevel = () => {
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.scene.stop('Start')
          this.scene.start('Level1')
        }
      })
    };

    this.openLink = () => {
      console.log('opened link?')
      let url = 'https://github.com/dwwr/abject-transience';

      let s = window.open(url, '_blank');

      if (s && s.focus) {
        s.focus();
      } else if (!s){
        window.location.href = url;
      }
    };
  };

  preload() {
    //load assets
    this.load.crossOrigin = true;
    this.load.audio('theme', 'http://bunhole.s3-us-west-2.amazonaws.com/LastSaveCrystal.mp3');
    this.load.image('hole', 'http://bunhole.s3-us-west-2.amazonaws.com/hole.png');
    this.load.image('blue', 'http://bunhole.s3-us-west-2.amazonaws.com/blue.png');
    this.load.image('github', 'http://bunhole.s3-us-west-2.amazonaws.com/gh.png');
    this.load.spritesheet('hunbun','http://bunhole.s3-us-west-2.amazonaws.com/hunbun.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('flower', 'http://bunhole.s3-us-west-2.amazonaws.com/flower.png', { frameWidth: 72.5, frameHeight: 96 });

    //titles & formatting
    this.title = this.add.text(400, 100, 'Lair of the Hunbun', { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '50px', fill:'#3366ff'});
    this.subtitle = this.add.text(400, 175, 'Go Down the Rabbit Hole', { fontFamily: 'Futura', fontStyle: 'italic', fontWeight: 'bold',fontSize: '25px', fill:'#3366ff'});

  }

  create () {
    this.title.setShadow(3, 3, '#809fff', 0);
    this.subtitle.setShadow(2, 2, '#809fff', 0);
    this.active = true;
    this.cursors = this.input.keyboard.createCursorKeys();

    let theme = this.sound.add('theme');
    theme.loop = true;
    theme.volume = 0.15;
    theme.play();

    this.hole = this.physics.add.staticGroup()
    this.hole.create(400, 550, 'hole');
    this.bun = this.physics.add.sprite(100, 100,'hunbun')
    this.bun.scale = 1.5;
    this.bun.body.setAllowGravity(false);

    this.button = this.add.image(400, 300, 'github').setInteractive();
    this.button.scale = 0.1;
    this.button.on('pointerup', this.openLink, this);


    this.anims.create(
      {
        key: 'run',
        frames: this.anims.generateFrameNumbers('hunbun', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      }
    );

    this.flower = this.physics.add.sprite(100, 100, 'flower');
    this.flower.body.setAllowGravity(false);

    this.anims.create({
        key: 'dance',
        frames: this.anims.generateFrameNumbers('flower', { start: 0, end: 26 }),
        frameRate: 10,
        repeat: -1
    });



    Align.centerH(this.title);
    Align.centerH(this.subtitle);
    this.grid = new AlignGrid({scene: this, rows: 5, cols: 5});

    // this.grid.showNumbers();
    this.grid.placeAtIndex(22, this.hole);
    this.grid.placeAtIndex(24, this.button);
    this.grid.placeAtIndex(13, this.flower);
    this.grid.placeAtIndex(11, this.bun);

    this.particles = this.add.particles('blue');
    this.emitter = this.particles.createEmitter();
    this.emitter.setPosition(this.hole.x, this.hole.y - 5);
    this.emitter.setSpeed(100);
    this.emitter.setScale(0.2, .2);
    this.emitter.setAlpha(0.3, 0.8);
    this.emitter.gravity = -500;
    this.emitter.setBlendMode(Phaser.BlendModes.ADD);
  }

  update () {
    if (this.active) {
      if (this.cursors.right.isDown) {
        this.bun.flipX = true;
        this.bun.setVelocityX(100);
        this.bun.anims.play('run', true);
      } else if (this.cursors.left.isDown) {
        this.bun.flipX = false;
        this.bun.setVelocityX(-100);
        this.bun.anims.play('run', true);
      } else if (this.cursors.up.isDown) {
        this.bun.setVelocityY(-100);
        this.bun.anims.play('run', true);
      } else if (this.cursors.down.isDown) {
        this.bun.setVelocityY(100);
        this.bun.anims.play('run', true);
      }else {
        this.bun.setVelocityX(0);
        this.bun.setVelocityY(0);
        this.bun.anims.play('run', false);
      }
    }
    this.flower.anims.play('dance', true);
    this.physics.overlap(this.bun, this.hole, this.nextLevel, null, this);
  }
}

export default Start;