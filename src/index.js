import Phaser from 'phaser';
import PlayScene from './Scenes/PlayScene';

const HEIGHT = 600;
const WIDTH = 800;

const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT * 0.5 };

const COMMON_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  velocity: 400,
  startPosition: BIRD_POSITION
}

const config = {
  type: Phaser.AUTO,
  ...COMMON_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [new PlayScene(COMMON_CONFIG)]
};

new Phaser.Game(config);