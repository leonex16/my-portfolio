<script lang="ts">
  import { videoSourcesStore, isLoadingVideoStore } from './store';
  
  import Loader from '../loader/index.svelte';
  import ProgressBar from './components/progress-bar.svelte';
  import SpeakerButton from './components/speaker-button.svelte';
  import Story from './components/story.svelte';
  import Video from './components/video.svelte';

  import storiesData from '../../../data/story-player-stories.json';

  let [_, ...stories] = storiesData;
</script>

<article class="relative">
  <SpeakerButton />

  <div
    class="relative shadow-stale-400/20 shadow-lg rounded-xl w-screen overflow-hidden aspect-[9/16] max-w-[400px]"
  >
    <Loader isLoading={$isLoadingVideoStore} />
    <header class="relative flex gap-2 p-2 z-[var(--z-index-story-player-progress-bars)]">
      {#each $videoSourcesStore as source}
        <ProgressBar bind:progressBarRef={source.progressBarRef} />
      {/each}
    </header>
    <Video />
  </div>

  <footer class="w-full">
    <ul class="flex justify-between my-[1rem]">
      {#each stories as story}
        <Story {story} />
      {/each}
    </ul>
  </footer>
</article>
