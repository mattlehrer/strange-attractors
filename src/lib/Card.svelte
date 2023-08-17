<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import type { System } from './utils';

	export let type: System;
</script>

<article>
	<Canvas useLegacyLights={false}>
		<Scene {type} />
	</Canvas>
	<a href={`/${type}`}>
		{type}
	</a>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1;
		grid-template-rows: 2;
		gap: 0.75rem;
		position: relative;
	}

	article :global(canvas) {
		max-height: var(--canvas-side);
		min-height: var(--canvas-side);
		height: var(--canvas-side);
		width: var(--canvas-side);
		background: oklch(18% 0.03 265);
		border-radius: 10%;
		overflow: hidden;
	}

	a {
		color: inherit;
		font-size: 1.25rem;
		text-decoration: none;
		padding-inline-start: 0.25rem;
	}

	a:visited {
		color: inherit;
	}
</style>
