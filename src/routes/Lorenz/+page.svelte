<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SceneControlWrapper from '$lib/SceneControlWrapper.svelte';
</script>

<svelte:head>
	<meta name="description" content="A 3D Lorenz Attractor built with Svelte and Three.js" />
	<!-- disable zoom -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
	/>
</svelte:head>

<div>
	<Canvas useLegacyLights={false}>
		<SceneControlWrapper />
	</Canvas>
</div>

<style>
	:global(body) {
		background-color: hsl(221, 42%, 0%);
	}

	div {
		position: relative;
		width: 100vw;
		height: 100vh;
	}
</style>
