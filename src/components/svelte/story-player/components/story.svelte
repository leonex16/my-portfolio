<script lang="ts">
  import { videoSourcesStore, videoPlayingIndexStore } from '../store';

	export let story: StoryPlayer.Story;
	
  const handleChangeSource = (storySources: StoryPlayer.Source[]) => {
    videoSourcesStore.set(storySources)
		videoPlayingIndexStore.set(0)
  }
</script>

<li class="cursor-pointer" on:click={() => handleChangeSource(story.sources)}>
	<figure class="flex flex-col items-center">
		<div class="bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-14 h-14 p-1">
			<div class="bg-white rounded-full h-full w-full p-2">
				<img class="h-full w-full" src={story.image} alt={story.label}>
			</div>
		</div>
		<figcaption class="text-center text-xs text-gray-800 mt-2 w-max">
			{story.label}
		</figcaption>
	</figure>
</li>

