import BaseScene from './BaseScene';

export default class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Play'
      },
      {
        scene: 'ScoreScene',
        text: 'Score'
      },
      {
        scene: null,
        text: 'Exit'
      }
    ];
  }

  create() {
    super.create();
    
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
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
      menuItem && this.scene.start(menuItem.scene);

      if(menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    })
  }
}
