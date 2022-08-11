<script lang="ts">
  import {
    isVideoPlayingStore,
    isVideoLoadingStore,
    isMutedAudioStore,
    videoPlayingIndexStore,
    videoSourcesStore,
  } from '../store';
  import { waitFor } from '../../../../shared';

  let videoRef: HTMLVideoElement | undefined;
  let sources = $videoSourcesStore;
  $: SOURCES_LEN = sources.length;

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
    const prevProgressBarRef = sources[$videoPlayingIndexStore - 1]?.progressBarRef;
    const currentProgressBarRef = sources[$videoPlayingIndexStore].progressBarRef;

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
    const tempNextVideoIndex = $videoPlayingIndexStore + toSum;

    managerProgressBarsByAction(action);
    managerProgressBarsByVideoIndex(tempNextVideoIndex);

    videoPlayingIndexStore.update(
      (videoPlayingIndex) => videoPlayingIndex + getVideoIndexToPlay(toSum, tempNextVideoIndex)
    );
  };

  const setDurationToProgressBar = (totalDuration: string, progressBarRef: HTMLDivElement) => {
    progressBarRef.style.transitionDuration = totalDuration;
  };

  const setWidthProgressBar = (progressBarWidth: string, progressBarRef: HTMLDivElement) => {
    progressBarRef.style.width = progressBarWidth;
  };

  const startTransitionEffectOnProgressBar = async (
    totalDuration: string,
    progressBarRef: HTMLDivElement
  ) => {
    setDurationToProgressBar(totalDuration, progressBarRef);
    await waitFor(550);
    setWidthProgressBar('100%', progressBarRef);
  };

  const stopTransitionEffectOnProgressBar = async (
    currentProgressBarWidth: string,
    progressBarRef: HTMLDivElement
  ) => {
    setDurationToProgressBar('none', progressBarRef);
    setWidthProgressBar(currentProgressBarWidth, progressBarRef);
  };

  const getDurationData = () => {
    if (videoRef === undefined) return;
    const totalDuration = Math.floor(videoRef.duration);
    const currentTime = Math.floor(videoRef.currentTime);

    return { currentTime, totalDuration };
  };

  const handleDuration = async () => {
    const currentProgressBarRef = sources[$videoPlayingIndexStore].progressBarRef;
    const { currentTime, totalDuration } = getDurationData();

    if (Boolean(currentProgressBarRef) === false) return;

    const shouldChangeToNextVideo = currentTime >= totalDuration;
    const shouldStartTransitionEffect = currentProgressBarRef.style.transitionDuration === '';

    if (shouldStartTransitionEffect) await startTransitionEffectOnProgressBar(`${totalDuration}s`, currentProgressBarRef);

    if (shouldChangeToNextVideo) handleButtonAction('next');
  };

  isMutedAudioStore.subscribe((isMuted) => {
    if (videoRef === undefined) return;
    videoRef.muted = isMuted;
  });

  isVideoPlayingStore.subscribe(async (isPlaying) => {
    if (videoRef === undefined) return;
    const { currentTime, totalDuration } = getDurationData();
    const currentProgressBarRef = sources[$videoPlayingIndexStore].progressBarRef;
    const currentProgressBarWidth = (currentTime * 160) / totalDuration;

    if (isPlaying) {
      await startTransitionEffectOnProgressBar(`${totalDuration - currentTime}s`, currentProgressBarRef)
      videoRef.play();
    } else {
      stopTransitionEffectOnProgressBar(`${currentProgressBarWidth}%`, currentProgressBarRef);
      videoRef.pause();
    }
  });

  videoSourcesStore.subscribe((sourcesStore) => {
    sources = sourcesStore;
    videoPlayingIndexStore.set(0);
  });
</script>

<button
  class="absolute top-0 left-0 inline-block h-full rounded-xl w-[50%] z-[var(--z-index-story-player-btns)]"
  on:click={() => handleButtonAction('prev')}
/>
<video
  class="absolute top-0 left-0 h-full object-cover"
  src={sources[$videoPlayingIndexStore].src}
  poster={sources[$videoPlayingIndexStore].poster}
  on:loadstart={() => isVideoLoadingStore.set(true)}
  on:playing={() => isVideoLoadingStore.set(false)}
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
