<script lang="ts">
  import { isMutedAudioStore } from '../store';

  const handleSpeaker = (e: SvelteEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('speaker');
    isMutedAudioStore.update( isMuted => !isMuted );
  };
</script>

<div
  class={`speaker--muted absolute top-0 left-0 h-8 w-8 ml-4 mt-6 invert cursor-pointer z-[var(--z-index-story-player-speaker-icon)]`}
  on:click={handleSpeaker}
/>

<style>
  .speaker {
    background-image: url('/icons/speaker-unmuted.svg') !important;
  }
  .speaker--muted {
    background-image: url('/icons/speaker-muted.svg');
  }
</style>
