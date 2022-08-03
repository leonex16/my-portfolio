<script lang="ts">
  import ProgressBar from './components/progress-bar.svelte'
  import Loader from './components/loader.svelte'
  import SpeakerButton from './components/speaker-button.svelte'
  import Video from './components/video.svelte';

  let videoPlayingIndex = 0;
  let isLoading = false;

  const sources: StoryPlayer.Source[] = [
    {
      id: 'video-1',
      src: '../../../../public/videos/video-1.mp4',
      poster: '../../../../public/images/chrome-dino.webp',
      progressBarRef: null,
    },
    {
      id: 'video-2',
      src: '../../../../public/videos/video-2.mp4',
      poster: '../../../../public/images/chrome-dino.webp',
      progressBarRef: null,
    },
    {
      id: 'video-3',
      src: '../../../../public/videos/video-3.mp4',
      poster: '../../../../public/images/chrome-dino.webp',
      progressBarRef: null,
    },
  ];

</script>

<article class="relative shadow-lg shadow-stale-400/50 bg-slate-800 rounded-xl overflow-hidden aspect-[9/16] max-w-[360px]" >

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
