<script lang="ts">
  import {
    isLoadingVideoStore,
    isMutedAudioStore,
    videoPlayingIndexStore,
    videoSourcesStore,
  } from '../store';
  import { waitFor } from '../../../../shared';

  let videoRef: HTMLVideoElement | undefined;
  let videoPlayingIndex = $videoPlayingIndexStore;
  let sources = $videoSourcesStore;
  let SOURCES_LEN = sources.length;

  const resetProgressBar = (progressBarRef: HTMLDivElement) => {
    progressBarRef.style.transitionDuration = '';
    progressBarRef.style.width = '0%';
  };

  const fillProgressBar = (progressBarRef: HTMLDivElement) => {
    progressBarRef.style.transitionDuration = '';
    progressBarRef.style.width = '100%';
  };

  const resetProgressBars = (sourcesProp: StoryPlayer.Source[]) => {
    sourcesProp.forEach((source) => resetProgressBar(source.progressBarRef));
  };

  const fillProgressBars = (sourcesProp: StoryPlayer.Source[]) => {
    sourcesProp.forEach((source) => fillProgressBar(source.progressBarRef));
  };

  const managerProgressBarsByAction = (action: 'prev' | 'next') => {
    const prevProgressBarRef = sources[videoPlayingIndex - 1]?.progressBarRef;
    const currentProgressBarRef = sources[videoPlayingIndex].progressBarRef;

    if (action === 'prev') resetProgressBar(currentProgressBarRef);
    if (action === 'prev' && prevProgressBarRef) resetProgressBar(prevProgressBarRef);
    if (action === 'next') fillProgressBar(currentProgressBarRef);
  };

  const managerProgressBarsByVideoIndex = (videoIndex: number) => {
    const notFoundPrevVideo = videoIndex === -1;
    const notFoundNextVideo = videoIndex === SOURCES_LEN;

    if (notFoundPrevVideo) fillProgressBars(sources.slice(0, -1));
    if (notFoundNextVideo) resetProgressBars(sources);
  };

  const getVideoIndexToPlay = (toSum: number, videoIndex: number) => {
    const firstVideoIndex = (videoIndex - 1) * -1;
    const lastVideoIndex = SOURCES_LEN + videoIndex;

    switch (videoIndex) {
      case SOURCES_LEN:
        return firstVideoIndex;

      case -1:
        return lastVideoIndex;

      default:
        return toSum;
    }
  };

  const handleButtonAction = (action: 'prev' | 'next') => {
    let toSum = action === 'prev' ? -1 : 1;
    const tempNextVideoIndex = videoPlayingIndex + toSum;

    managerProgressBarsByAction(action);
    managerProgressBarsByVideoIndex(tempNextVideoIndex);

    videoPlayingIndex += getVideoIndexToPlay(toSum, tempNextVideoIndex);
  };

  const setDurationToProgressBar = (totalDuration: number, progressBarRef: HTMLDivElement) => {
    progressBarRef.style.transitionDuration = `${totalDuration}s`;
  };

  const startPlayingEffectProgressBar = (progressBarRef: HTMLDivElement) => {
    progressBarRef.style.width = `100%`;
  };

  const handleDuration = async (e: SvelteEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const totalDuration = Math.floor(video.duration);
    const currentTime = Math.floor(video.currentTime);
    const currentProgressBarRef = sources[videoPlayingIndex].progressBarRef;
    const shouldChangeToNextVideo = currentTime >= totalDuration;
    const shouldStartTransitionEffect = currentProgressBarRef.style.transitionDuration === '';

    if (shouldStartTransitionEffect) {
      setDurationToProgressBar(totalDuration, currentProgressBarRef);
      await waitFor(550);
      startPlayingEffectProgressBar(currentProgressBarRef);
    }

    if (shouldChangeToNextVideo) handleButtonAction('next');
  };

  isMutedAudioStore.subscribe((isMuted) => {
    if (videoRef === undefined) return;
    videoRef.muted = isMuted;
  });

  videoSourcesStore.subscribe((sourcesStore) => {
    sources = sourcesStore;
  });
</script>

<button
  class="absolute top-0 left-0 inline-block h-full rounded-xl w-[50%] z-[var(--z-index-story-player-btns)]"
  on:click={() => handleButtonAction('prev')}
/>
<video
  class="absolute top-0 left-0 h-full object-cover"
  src={sources[videoPlayingIndex].src}
  poster={sources[videoPlayingIndex].poster}
  on:loadstart={() => isLoadingVideoStore.set(true)}
  on:playing={() => isLoadingVideoStore.set(false)}
  on:timeupdate={handleDuration}
  bind:this={videoRef}
  autoplay
  muted
  loop
/>
<button
  class="absolute top-0 right-0 inline-block h-full rounded-xl w-[50%] z-[var(--z-index-story-player-btns)]"
  on:click={(e) => handleButtonAction('next')}
/>
