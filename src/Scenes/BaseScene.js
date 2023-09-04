import { Scene } from 'phaser';

export default class BaseScene extends Scene {
  constructor(key, config) {
    super(key);
    this.config = config;

    this.screenCenter = [this.config.width / 2, this.config.height / 2];
    this.lineHeight = 42;

    this.fontSize = '32px';
    this.fill = '#fff';

    this.fontOptions = {
      fontSize: this.fontSize,
      fill: this.fill
    };
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0);

    if (this.config.canGoBack) {
      const backBtn = this.add
        .image(this.config.width - 10, this.config.height - 10, 'back')
        .setInteractive()
        .setScale(2)
        .setOrigin(1);

      backBtn.on('pointerdown', () => {
        this.scene.start('MenuScene');
      })
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach(menuItem => {
      menuItem.textGo = this.add
        .text(
          this.screenCenter[0],
          this.screenCenter[1] + lastMenuPositionY,
          menuItem.text,
          this.fontOptions
        )
        .setOrigin(0.5, 1);

      lastMenuPositionY += this.lineHeight;

      setupMenuEvents(menuItem);
    });
  }
}
