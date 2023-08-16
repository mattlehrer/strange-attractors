<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	export let type = 'Lorenz';
</script>

<article>
	<p>
		{type}
	</p>
	<Canvas useLegacyLights={false}>
		<Scene />
	</Canvas>
</article>

<style>
	article :global(canvas) {
		max-height: 250px;
		min-height: 250px;
		height: 250px;
		background: oklch(18% 0.03 265.91);
		border-radius: 10%;
	}

	p {
		color: oklch(85% 0.03 265.91);
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}
</style>
