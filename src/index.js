
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

new Phaser.Game(config);

function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

const VELOCITY = 200;

const flapVelocity = 300;
let bird = null;

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(config.width * 0.1, config.height / 2, 'bird').setOrigin(0);

  this.input.on('pointerdown', flat)

  this.input.keyboard.on('keydown_SPACE', () => {

    console.log('space')
  })
}

function update() {
  if(bird.y < -bird.height || bird.y > config.height) {
    alert('Game Over')
  }
}

function flat() {
  bird.body.velocity.y = -flapVelocity;
}