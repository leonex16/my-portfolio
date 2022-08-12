<script lang="ts">
  import { isVideoPlayingStore } from '../store';

  const handleSpeaker = (e: SvelteEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('play-pause-icon--pause');
    isVideoPlayingStore.update((isPlaying) => !isPlaying);
  };
</script>

<div
  class={`play-pause-icon absolute inset-0 m-auto h-16 w-16 cursor-pointer z-[var(--z-index-story-player-speaker-icon)]`}
  on:click={handleSpeaker}
/>

<style>
  .play-pause-icon {
    background-image: url('/icons/play-pause.svg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 64px;
    width: 64px;
    opacity: 0;
  }

  .play-pause-icon--pause {
    opacity: 1 !important;
  }
</style>
