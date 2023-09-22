<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
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

<div class="wrapper">
	<div class="header">
		<Header />
	</div>

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
</style>
