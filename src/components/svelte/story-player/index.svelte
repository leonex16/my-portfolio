<script lang="ts">
  type SvelteEvent<T = Event> = Event & { currentTarget: EventTarget & T };

  const sources = [
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

  let isSpeakerMuted = false;
  let videoActive = 0;
  let isLoading = false;

  const zIndex = {
    btns: sources.length,
    speakerIcons: sources.length + 1,
    loader: sources.length + 1,
    progressBars: sources.length + 1,
  };

  const handleSpeaker = (e: SvelteEvent<HTMLDivElement>) => {
    isSpeakerMuted = !isSpeakerMuted;
  };
  const waitFor = (ms: number) => new Promise( res => setTimeout(() => res(0), ms) );


  const resetProgressBars = () => {
    sources.forEach( resetProgressBar );
  }

  const resetProgressBar = ({progressBarRef}: any) => {
    progressBarRef.style.transitionDuration = '';
    progressBarRef.style.width = '0%'
  }

  const fillProgressBar = ({progressBarRef}: any) => {
    progressBarRef.style.transitionDuration = '';
    progressBarRef.style.width = '100%'
  }

  const handleAction = (action: 'prev' | 'next') => {
    let accum = 1;
    const currentVideo = sources[videoActive];

    if (action === 'prev') {
      accum *= -1
      const prevVideo = sources[videoActive - 1];
      resetProgressBar(currentVideo)
      if (prevVideo) resetProgressBar(prevVideo)
    };
    if (action === 'next') {
      fillProgressBar(currentVideo)
    }
    if (videoActive + accum === -1) {
      videoActive = 2
      sources.slice(0, -1).forEach( fillProgressBar )
      return;
    };

    if (videoActive + accum === 3) {
      videoActive = 0;
      resetProgressBars()
      return;
    }

    videoActive += accum;
  };

  const setDurationToProgressBar = async ( totalDuration: number ) => {
    const currentVideo = sources[videoActive];

    if ( currentVideo.progressBarRef.style.transitionDuration !== '' ) return;

    currentVideo.progressBarRef.style.transitionDuration = `${totalDuration}s`;
    await waitFor(550);
    currentVideo.progressBarRef.style.width = `100%`;
  }

  const handleDuration = (e: SvelteEvent<HTMLVideoElement> ) => {
    const video = e.target as HTMLVideoElement 
    const totalDuration = Math.floor(video.duration);
    const currentTime = Math.floor(video.currentTime);

    // const percentage = (currentTime * 100) / totalDuration;
    // (sources[videoActive].progressBarRef as HTMLDivElement).style.width = percentage + '%';
    setDurationToProgressBar(totalDuration);

    if (currentTime >= totalDuration) return handleAction('next');
    //       console.log(e?.target, "total")
    // console.log(e?.target, "loaded")
  }

  //   const video = document.getElementsByTagName('video')[0];
  //   video.addEventListener('playing', e => {
  //     // console.log('playing', e)
  //   } )
  // video.addEventListener('seeked', e => {
  //   console.log('seeked', e)
  // } )
  // videoRef?.addEventListener('loadedmetadata', (e) => {
  //   console.log('loadedmetadata', e);
  //   alert('loaded');
  // });
  // video.addEventListener('loadeddata', e => {
  //   console.log('loadeddata', e)
  // } )
  // video.addEventListener('timeupdate', e => {
  //   console.log('timeupdate', e, Math.trunc(e.target.currentTime), Math.trunc(e.target.duration))
  // } )

  //   const video = document.getElementsByTagName('video')[0];
  //   const sources = [
  //   'https://assets.mixkit.co/videos/preview/mixkit-father-and-his-little-daughter-eating-marshmallows-in-nature-39765-large.mp4',
  //   'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
  //   'https://assets.mixkit.co/videos/preview/mixkit-family-walking-together-in-nature-39767-large.mp4'
  // ]
  // let counter = 0;
  //   setInterval(() => {

  //     video.src = sources[counter]
  //     counter =+ 1;
  //     if ( counter === 2 ) counter = 0;
  //   }, 3000);
</script>

<article class="relative shadow-lg shadow-stale-400/50 bg-slate-800 rounded-xl overflow-hidden" style="aspect-ratio: 9/16; max-width: 360px;">
  <!-- PROGRESS BAR -->
  <header class="relative flex gap-2 p-2" style={`z-index: ${zIndex.progressBars};`}>
    {#each sources as source }
    <div class="relative w-full">
      <div class="overflow-hidden h-1 flex rounded bg-slate-500 opacity-60">
         <div
         class="bg-slate-100"
         style="width: 0%"
         bind:this={source.progressBarRef}
          />
       </div>
     </div>
    {/each}
  </header>
  
  <!-- LOADER -->
  <span
  class="loader"
  style={`z-index: ${zIndex.loader}; display: ${isLoading ? 'block' : 'none'}`}
  />
  <!-- SPEAKER -->
  <div
    class={`speake absolute top-0 left-0 h-8 w-8 ml-4 mt-6 invert cursor-pointer ${
      isSpeakerMuted ? 'speaker--muted' : 'speaker'
    }`}
    style={`z-index: ${zIndex.speakerIcons};`}
    on:click={handleSpeaker}
  />
  <!-- ACTIONS -->
  <button
    class="absolute top-0 left-0 inline-block h-full rounded-xl"
    style={`z-index: ${zIndex.btns}; width: 50%`}
    on:click={(e) => handleAction('prev')}
  />
  <video src=""
  ></video>
  <video
    class="absolute top-0 left-0 h-full object-cover"
    src={sources[videoActive].src}
    poster={sources[videoActive].poster}
    on:loadstart={(e) => isLoading = true}
    on:playing={(e) => isLoading = false}
    on:timeupdate={handleDuration}
    autoplay
    muted
    loop
  />
  <!-- {#each sources as src, i}
    <video
      class="absolute top-0 left-0 rounded-xl h-full object-cover"
      {src}
      style={`z-index: 0: ${i}`}
      autoplay
      muted
      loop
    />
  {/each} -->
  <!-- ACTIONS -->
  <button
    class="absolute top-0 right-0 inline-block h-full rounded-xl"
    style={`z-index: ${zIndex.btns}; width: 50%`}
    on:click={(e) => handleAction('next')}
  />
</article>

<style>
  .speaker {
    background-image: url('../../../public/icons/speaker-unmuted.svg');
  }

  .speaker--muted {
    background-image: url('../../../public/icons/speaker-muted.svg');
  }

  .loader {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 4px solid green;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-bottom: 4px solid #ff3d00;
    border-left: 4px solid transparent;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
