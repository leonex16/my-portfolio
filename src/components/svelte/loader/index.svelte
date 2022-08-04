<script lang="ts">
  export let isLoading = false;
</script>

<span
  class={`
  loader
  z-[var(--z-index-story-player-loader)]
  ${isLoading ? 'inline-block' : 'hidden'}
`}
/>

<style>
  .loader {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
