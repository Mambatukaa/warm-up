import BaseScene from './BaseScene';

export default class ScoreScene extends BaseScene {
  constructor(config) {
    super('ScoreScene', config);
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);

    const bestScore = localStorage.getItem('bestScore');

    this.add
      .text(...this.screenCenter, `Best Score: ${bestScore || 0}`, this.fontOptions)
      .setOrigin(0.5);
  }
}
