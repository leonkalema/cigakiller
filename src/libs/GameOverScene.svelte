<!-- <script>
  import { onMount } from 'svelte';

  let score = 0;
  let canvasRef;

  onMount(async () => {
    const { default: Phaser } = await import('phaser');
    const gameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        create: create
      }
    };
    const game = new Phaser.Game({
      ...gameConfig,
      parent: canvasRef
    });

    function create() {
      this.add.text(400, 300, 'Game Over', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
      this.add.text(400, 350, `Your score: ${score}`, { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
    }
  });
</script>

<div bind:this={canvasRef}>
  <canvas />
</div> -->


<template>
  <div>
    <h1>Game Over!</h1>
    <p>Your score: {{score}}</p>
    <button on:click={reset}>Play Again</button>
  </div>
</template>

<script>
  export let score;

  function reset() {
    window.location.reload();
  }
</script>
