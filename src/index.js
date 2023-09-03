import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 400;
const RENDER_TO_PIPE = 4;
const flapVelocity = 300;

let bird = null;
let pipes = null;

const initialBirdPosition = { x: config.width * 0.1, y: config.height * 0.5 };
const pipeVeritcalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [300, 400];

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird')
    .setOrigin(0);

  bird.body.gravity.y = VELOCITY;
  pipes = this.physics.add.group();

  for(let i = 0; i < RENDER_TO_PIPE; i++)  {
    const upperPipe = pipes.create(0, 0, 'pipe')
      .setOrigin(0, 1);

    const lowerPipe = pipes.create(0, 0, 'pipe')
      .setOrigin(0, 0);


    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

  this.input.on('pointerdown', flat);

  this.input.keyboard.on('keydown_SPACE', () => {});
}

function update() {
  if (bird.y < -bird.height || bird.y > config.height) {
    console.log('game over');
  }

  recyclePipe();
}

function placePipe(uPipe, lPipe) {
  const rightMostX = getRightMostPipe();

  const pipeVerticalDistance = Phaser.Math.Between(...pipeVeritcalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);

  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange) + rightMostX;


  uPipe.x = pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;

  lPipe.x = uPipe.x; 
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function(pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

function recyclePipe() {
  const tempPipes = [];
  pipes.getChildren().forEach(function(pipe) {
    if(pipe.getBounds().right < 0) {
      tempPipes.push(pipe);
      if(tempPipes.length === 2) {
        placePipe(...tempPipes);
      }
    }
  })

}

function flat() {
  bird.body.velocity.y = -flapVelocity;
}
