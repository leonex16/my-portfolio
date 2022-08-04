<script lang="ts">
  import { isLoadingVideoStore } from '../store';
</script>

<span class={`
  loader 
  absolute
  inset-0
  top-[-10%]
  box-border
  m-auto
  h-[48px]
  w-[48px]
  rounded-[50%]
  z-[var(--z-index-story-player-loader)]
  ${$isLoadingVideoStore ? 'inline-block' : 'hidden'}
`} />

<style>
  .loader {
    border-top: 4px solid green;
    border-right: 4px solid transparent;

    animation: rotation 1s linear infinite;
  }

  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid #ff3d00;
    border-left: 4px solid transparent;
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
