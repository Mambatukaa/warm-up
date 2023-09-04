import { Scene } from 'phaser';

export default class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('pause', 'assets/pause.png');
  }

  create() {
    this.scene.start('PlayScene');
  }

  update() {

  }
}