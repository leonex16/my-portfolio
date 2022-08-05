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

<article class="relative w-screen max-w-[280px] xl:max-w-[320px] 2xl:max-w-[412px]">
  <SpeakerButton />

  <div
    class="relative shadow-stale-400/20 shadow-lg rounded-xl overflow-hidden aspect-[9/16]"
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
