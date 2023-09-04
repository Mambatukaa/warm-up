import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);

    this.scene.start('PlayScene');
  }

  update() {

  }
}