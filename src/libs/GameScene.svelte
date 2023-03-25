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
      width: 800,
      height: 600,
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

    function preload() {
      this.load.image('cigarette', './cig.png');
      this.load.image('litCigarette', 'https://cdn-icons-png.flaticon.com/512/532/532461.png');
    }

    function create() {
      timeText = this.add.text(10, 10, 'Time Left: 30', { font: '16px Arial' });
      scoreText = this.add.text(680, 10, 'Score: 0', { font: '16px Arial' });

      cigarettes = this.physics.add.group();
      spawnCigarettes();
      this.time.addEvent({ delay: 1000, callback: countdown, callbackScope: this, loop: true });
    }

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
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);
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
  });
</script>

<div bind:this={canvasRef}>
  <canvas />
</div>
