import BaseScene from './BaseScene';

const PIPES_TO_RENDER = 4;

export default class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);
    this.config = config;

    this.bird = null;
    this.pipes = null;

    this.flapVelocity = 300;
    this.birdGravity = 600;

    this.score = 0;
    this.scoreText = null;

    this.paused = false;

    this.difficulty = 'easy';
    this.difficultyText = null;

    this.difficulties = {
      easy: {
        pipeHorizontalDistanceRange: [300, 350],
        pipeVerticalDistanceRange: [160, 200]
      },
      medium: {
        pipeHorizontalDistanceRange: [270, 300],
        pipeVerticalDistanceRange: [130, 160]
      },
      hard: {
        pipeHorizontalDistanceRange: [220, 270],
        pipeVerticalDistanceRange: [90, 130]
      }
    };
  }

  create() {
    super.create();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.createPause();
    this.handleInputs();
    this.listenToEvent();
  }

  listenToEvent() {
    if (this.pauseEvent) {
      return;
    }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add
        .text(
          ...this.screenCenter,
          'Fly in: ' + this.initialTime,
          this.fontOptions
        )
        .setOrigin(0.5);

      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: () => this.countDown(),
        callbackScope: this,
        loop: true
      });
    });
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText('Fly in: ' + this.initialTime);

    if (this.initialTime < 0) {
      this.paused = false;
      this.countDownText.setText('');
      this.physics.resume();
    }
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
      .setOrigin(0);

    this.bird.body.gravity.y = this.birdGravity;

    this.bird.setCollideWorldBounds();
  }

  createPause() {
    const pauseBtn = this.add
      .image(this.config.width - 10, this.config.height - 10, 'pause')
      .setScale(3)
      .setInteractive()
      .setOrigin(1);

    pauseBtn.on('pointerdown', () => {
      this.physics.pause();
      this.scene.pause();
      this.paused = true;

      this.scene.launch('PauseScene');
    });
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    // render pipes
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 1);

      const lowerPipe = this.pipes
        .create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, {
      fontSize: '32px',
      fill: '#000'
    });

    const bestScore = localStorage.getItem('bestScore');

    this.add.text(16, 50, `Best Score: ${bestScore || 0}`, {
      fontSize: '20px',
      fill: '#000'
    });

    this.difficultyText = this.add.text(
      this.config.width - 90,
      16,
      this.difficulty,
      {
        fontSize: '20px',
        fill: '#000'
      }
    );
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
  }

  checkGameStatus() {
    if (
      this.bird.getBounds().bottom >= this.config.height ||
      this.bird.y <= 0
    ) {
      this.gameOver();
    }
  }

  flap() {
    if (this.paused) {
      return;
    }
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  gameOver() {
    this.saveBestScore();

    this.physics.pause();
    this.bird.setTint(0xff0000);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.start();
      },
      loop: false
    });
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();

    const pipeVerticalDistance = Phaser.Math.Between(
      ...this.difficulties[this.difficulty].pipeVerticalDistanceRange
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      20,
      this.config.height - 20 - pipeVerticalDistance
    );
    const pipeHorizontalDistance = Phaser.Math.Between(
      ...this.difficulties[this.difficulty].pipeHorizontalDistanceRange
    );

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right < 0) {
        tempPipes.push(pipe);

        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);

          this.increaseScore();
          this.increaseDifficulty();
        }
      }
    });
  }

  increaseScore() {
    this.score++;

    this.scoreText.setText(`Score: ${this.score}`);
  }

  increaseDifficulty() {
    if (this.score <= 1) {
      this.difficulty = 'easy';
      this.difficultyText.setText(this.difficulty);
    }

    if (this.score >= 3) {
      this.difficulty = 'medium';
      this.difficultyText.setText(this.difficulty);
    }

    if (this.score >= 10) {
      this.difficulty = 'hard';
      this.difficultyText.setText(this.difficulty);
    }
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }
}
