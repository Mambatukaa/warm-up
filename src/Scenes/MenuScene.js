import { Scene } from 'phaser';

export default class MenuScene extends Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);

    this.scene.start('PlayScene');
  }

  update() {

  }
}