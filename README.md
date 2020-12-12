# Welcome to the Lair of the Hun Bun
>This project was built as a game jam to help introduce myself and others to Phaser JS.

>Thanks to W Clarkson for providing utility classes on phasergames.com.

>Adapted from the Phaser 3 Prject Template (https://github.com/photonstorm/phaser3-project-template)

# A Short Overview:
>Local version is on branch 'development'

>Production mode for amplify is on branch 'amplifydeploy'

All game code is in /src:
>assets (though assets in production are served from S3)

>util (utilities borrowed from W Clarkson)

>index (the main brain): set config options (eg. window size, rendering mode, gravity and physics, and scenes- scenes are the main subcomponent of a phaser game). Also Instantiates game from Phaser.Game.

>scenes: we have two: Start for the start screen, and Level1 for the first level. Think of these like React components- they have their own state and methods (including lifecycle methods). Quite like in React, state can be shared across components, for example, to pass a player character along from one scene to the next. You are free to generate classes, eg for a class of enemies, and use those throughout multiple scenes. An example of a simple phaser scene:


class Level1 extends Phaser.Scene {
  constructor() {
    super({key:"Level1"});
    };
    //methods go here
  };

  preload() {
    //load assets

  }

  create () {
    //instantiate state objects from assets
    //place objects in scene, define animations, logic
  }

  update () {
    //this bad boy fires 60 times a second
}
