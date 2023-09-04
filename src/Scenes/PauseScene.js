import BaseScene from './BaseScene';

export default class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config);

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Continue'
      },
      {
        scene: 'MenuScene',
        text: 'Exit'
      }
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, this.setupPauseEvents.bind(this))
  }

  setupPauseEvents(menuItem) {
    const textGo = menuItem.textGo;

    textGo.setInteractive();

    textGo.on('pointerover', () => {
      textGo.setStyle({
        fill: '#ff0'
      });
    });

    textGo.on('pointerout', () => {
      textGo.setStyle({
        fill: '#fff'
      });
    });

    textGo.on('pointerup', () => {
      if(menuItem && menuItem.text === 'Continue') {
        // Shutting Pause scene starting play scene
        this.scene.stop()
        this.scene.resume(menuItem.scene);
      } else {
        // Shutting Pause and PlayScene starting menu scene
        this.scene.stop('PlayScene');
        this.scene.start(menuItem.scene);
      }
    })

  }
}
