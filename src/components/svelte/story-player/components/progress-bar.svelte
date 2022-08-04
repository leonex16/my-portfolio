<script lang="ts" >
  export let progressBarRef: HTMLDivElement;

</script>

<div class="relative w-full">
	<div class="overflow-hidden h-1 flex rounded bg-slate-500 opacity-60">
		<div
			class="bg-slate-100 w-0"
			style="width: 0%"
			bind:this={progressBarRef}
		/>
	</div>
</div>
