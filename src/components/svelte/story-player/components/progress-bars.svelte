<script lang="ts">
  import { videoSourcesStore } from '../store';
</script>

<header class="relative flex gap-2 p-2 z-[var(--z-index-story-player-progress-bars)]">
  {#each $videoSourcesStore as source}
    <div class="relative w-full">
      <div class="overflow-hidden h-1 flex rounded bg-slate-500 opacity-60">
        <div class="bg-slate-100 w-0" style="width: 0%" bind:this={source.progressBarRef} />
      </div>
    </div>
  {/each}
</header>
