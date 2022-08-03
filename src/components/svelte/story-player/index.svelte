<script lang="ts">
  import videos from '../../../data/story-player-videos.json';

  import ProgressBar from './components/progress-bar.svelte'
  import Loader from './components/loader.svelte'
  import SpeakerButton from './components/speaker-button.svelte'
  import Video from './components/video.svelte';

  let videoPlayingIndex = 0;
  let isLoading = false;

  const sources: StoryPlayer.Source[] = videos;

</script>

<article class="relative shadow-lg shadow-stale-400/50 bg-slate-800 rounded-xl w-screen overflow-hidden aspect-[9/16] max-w-[360px]" >

  <header class="relative flex gap-2 p-2 z-[var(--z-index-story-player-progress-bars)]">
    {#each sources as source }
      <ProgressBar bind:progressBarRef={source.progressBarRef} />
    {/each}
  </header>

  <Loader {isLoading} />

  <SpeakerButton />

  <Video
    bind:isLoading={isLoading}
    {sources}
    {videoPlayingIndex}
  />

</article>
