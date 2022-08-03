<script lang="ts">
  const handleSpeaker = (e: SvelteEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('speaker');
  };
</script>

<div
  class={`speaker--muted absolute top-0 left-0 h-8 w-8 ml-4 mt-6 invert cursor-pointer z-[var(--z-index-story-player-speaker-icon)]`}
  on:click={handleSpeaker}
/>

<style>
  .speaker {
    background-image: url('../../../../public/icons/speaker-unmuted.svg') !important;
  }
  .speaker--muted {
    background-image: url('../../../../public/icons/speaker-muted.svg');
  }
</style>
