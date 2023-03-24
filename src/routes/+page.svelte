<script>
  import GameScene from '../libs/GameScene.svelte';
  import GameOverScene from '../libs/GameOverScene.svelte';
  import { onMount } from 'svelte';

  let gameRunning = false;
  let showGameOver = false;
  let canvasRef;

  onMount(() => {
    canvasRef.style.display = 'none';
  });

  function startGame() {
    gameRunning = true;
    canvasRef.style.display = 'block';
  }

  function endGame(score) {
    showGameOver = true;
    gameRunning = false;
    canvasRef.style.display = 'none';
    setTimeout(() => {
      showGameOver = false;
    }, 5000);
  }
</script>
 <p>this one got me late for a meeting on game over you wont see your points u need to refresh the browser to play again. Happy friday</p>
{#if !gameRunning && !showGameOver}
  <button on:click={startGame}>Start Game</button>
 
{/if}

{#if gameRunning}
  <GameScene on:endGame={endGame} bind:canvasRef />
{/if}

{#if showGameOver}
  <GameOverScene />
{/if}

<div bind:this={canvasRef} style="display: none;">
  <canvas />
</div>
