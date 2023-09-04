import BaseScene from "./BaseScene";

export default class PreloadScene extends BaseScene {
  constructor(config) {
    super('PreloadScene', config);
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.spritesheet('bird', 'assets/birdSprite.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('PlayScene');
  }

  update() {

  }
}