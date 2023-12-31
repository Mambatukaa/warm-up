import Phaser from 'phaser';
import PlayScene from './Scenes/PlayScene';
import MenuScene from './Scenes/MenuScene';
import PreloadScene from './Scenes/PreloadScene';
import ScoreScene from './Scenes/ScoreScene';
import PauseScene from './Scenes/PauseScene';

const HEIGHT = 600;
const WIDTH = 500;

const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT * 0.5 };

const COMMON_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
};

// Make an order of scenes
const Scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene, PauseScene];
const createScene = Scene => new Scene(COMMON_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...COMMON_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);
