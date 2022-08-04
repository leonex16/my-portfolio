<script lang="ts">
  import { videoSourcesStore } from './store';
  import storiesData from '../../../data/story-player-stories.json';

  import ProgressBar from './components/progress-bar.svelte';
  import Loader from './components/loader.svelte';
  import SpeakerButton from './components/speaker-button.svelte';
  import Story from './components/story.svelte';
  import Video from './components/video.svelte';

  let [_, ...stories] = storiesData;
</script>

<article class="relative">
  <Loader />
  <SpeakerButton />

  <div
    class="relative shadow-lg shadow-stale-400/50 bg-slate-800 rounded-xl w-screen overflow-hidden aspect-[9/16] max-w-[400px]"
  >
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
