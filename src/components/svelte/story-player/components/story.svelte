<script lang="ts">
  import { videoSourcesStore, videoPlayingIndexStore } from '../store';

  export let story: StoryPlayer.Story;

  const handleChangeSource = (storySources: StoryPlayer.Source[]) => {
    videoSourcesStore.set(storySources);
    videoPlayingIndexStore.set(0);
  };
</script>

<li class="cursor-pointer" on:click={() => handleChangeSource(story.sources)}>
  <figure class="flex flex-col items-center">
    <div class="animated-gradient rounded-full p-[4px] w-14 h-14 xl:w-16 xl:h-16">
      <div class="bg-slate-900 rounded-full h-full w-full p-2">
        <img class="h-full w-full" src={story.image} alt={story.label} />
      </div>
    </div>
    <figcaption class="text-center text-xs text-gray-800 mt-2 w-max" style="color: #f2f2f2">
      {story.label}
    </figcaption>
  </figure>
</li>
