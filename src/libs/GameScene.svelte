<script>
  import { onMount } from 'svelte';

  let score = 0;
  let timeLeft = 30;
  let timeText;
  let scoreText;
  let cigarettes;
  let canvasRef;

  onMount(async () => {
    const { default: Phaser } = await import('phaser');

    const gameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game({
      ...gameConfig,
      parent: canvasRef
    });

    // Add event listeners for window resizing and orientation change
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);

    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      game.scale.resize(width, height);

      if (game.device.os.desktop) {
        game.scale.setZoom(1);
      } else {
        const orientation = width > height ? 'landscape' : 'portrait';

        if (orientation === 'landscape') {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  }
}

function preload() {
  this.load.image('cigarette', './cig.png');
  this.load.image('litCigarette', 'https://cdn-icons-png.flaticon.com/512/532/532461.png');
}

function create() {
  timeText = this.add.text(10, 10, 'Time Left: 30', { font: '16px Arial' });
  scoreText = this.add.text(680, 10, 'Score: 0', { font: '16px Arial' });

  cigarettes = this.physics.add.group();
  spawnCigarettes();
  this.time.addEvent({ delay: 1000, callback: countdown, callbackScope: this, loop: true }); }


function update() {
  if (timeLeft <= 0) {
    this.scene.stop();
    this.scene.start('GameOverScene', { score });
  }
}

function countdown() {
  timeLeft--;
  timeText.setText('Time Left: ' + timeLeft);
  spawnCigarettes();
}

function spawnCigarettes() {
  // Remove existing cigarettes
  cigarettes.clear(true, true);

  // Generate random number of cigarettes
  const numCigarettes = Phaser.Math.Between(2, 5);
  for (let i = 0; i < numCigarettes; i++) {
    const x = Phaser.Math.Between(100, game.scale.width - 100);
    const y = Phaser.Math.Between(100, game.scale.height - 100);
    const cigarette = cigarettes.create(x, y, 'cigarette');
    cigarette.setInteractive();
    cigarette.on('pointerdown', function () {
      if (this.texture.key === 'cigarette') {
        this.setTexture('litCigarette');
        score += 10;
        scoreText.setText('Score: ' + score);
      }
    });
  }
}

// Call the resize function initially to ensure correct layout
resize();
});
</script>

<div bind:this={canvasRef}>
  <canvas />
</div>


<style>
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  div {
    width: 100%;
    height: 100%;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
