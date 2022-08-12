<script lang="ts">
  import { videoSourcesStore, isVideoLoadingStore } from './store';

  import Loader from '../loader/index.svelte';
  import ProgressBars from './components/progress-bars.svelte';
  import PlayPauseButton from './components/play-pause-button.svelte';
  import SpeakerButton from './components/speaker-button.svelte';
  import Story from './components/story.svelte';
  import Video from './components/video.svelte';

  import storiesData from '../../../data/story-player-stories.json';

  let [_, ...stories] = storiesData;
</script>

<article class="relative w-screen max-w-[280px] xl:max-w-[320px] 2xl:max-w-[412px]">
  <SpeakerButton />

  <div class="relative shadow-stale-400/20 shadow-lg rounded-xl overflow-hidden aspect-[9/16]">
    <Loader isLoading={$isVideoLoadingStore} />
    <PlayPauseButton />
    <ProgressBars />
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
