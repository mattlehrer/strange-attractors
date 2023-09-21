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
		<span>
			{type}
		</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" /><path d="M3 16.2V21m0 0h4.8M3 21l6-6" /><path
				d="M21 7.8V3m0 0h-4.8M21 3l-6 6"
			/><path d="M3 7.8V3m0 0h4.8M3 3l6 6" /></svg
		>
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
		font-size: 1.25rem;
		text-decoration: none;
		padding-inline: 0.25rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-content: end;
	}
</style>
