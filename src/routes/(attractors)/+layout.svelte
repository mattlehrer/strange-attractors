<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { Canvas } from '@threlte/core';
	import { SlidersHorizontal } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	$: innerWidth = 0;
	$: controlsSize = Math.min(Math.max(innerWidth / 20, 20), 32);

	let controlsOpen = false;
</script>

<svelte:head>
	<meta name="description" content="A 3D Lorenz Attractor built with Svelte and Three.js" />
	<!-- disable zoom -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
	/>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="wrapper">
	<div class="header">
		<Header />
	</div>
	{#if innerWidth > 0}
		<button in:fade on:click={() => (controlsOpen = !controlsOpen)} class="controls">
			<SlidersHorizontal size={controlsSize} />
		</button>
	{/if}
	{#if controlsOpen}
		hello
	{/if}

	<Canvas useLegacyLights={false}>
		<slot />
	</Canvas>

	<div class="footer">
		<Footer />
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		width: 100vw;
		min-height: 100dvh;
	}

	.header,
	.footer {
		position: absolute;
		left: 0;
		right: 0;
	}

	.header {
		top: 0;
	}

	.footer {
		bottom: 0;
	}

	.controls {
		position: absolute;
		top: var(--header-spacer);
		right: var(--header-spacer);
	}
</style>
