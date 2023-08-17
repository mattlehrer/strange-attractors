<script lang="ts">
	import { Canvas } from '@threlte/core';
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
		<slot />
	</Canvas>
	<nav>
		<a href="/">Strange Attractors</a>
	</nav>
</div>

<style>
	div {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: oklch(21% 0.03 265);
	}

	nav {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0.5rem;
	}
	a {
		text-decoration: none;
	}

	a:visited {
		color: inherit;
	}
</style>
