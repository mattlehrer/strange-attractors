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
		<a href="/">
			<span> Strange Attractors </span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" /><path d="M9 19.8V15m0 0H4.2M9 15l-6 6" /><path
					d="M15 4.2V9m0 0h4.8M15 9l6-6"
				/><path d="M9 4.2V9m0 0H4.2M9 9 3 3" /></svg
			>
		</a>
	</nav>
</div>

<style>
	div {
		position: relative;
		width: 100vw;
		height: 100dvh;
		background-color: oklch(21% 0.03 265);
	}

	nav {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		padding: 0.5rem;
	}
	a {
		font-size: large;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	nav > a > span {
		view-transition-name: title;
	}
	
	svg {
		opacity: 0.75;
	}

	a,
	a:visited,
	a:active,
	svg {
		color: var(--light-color);
	}
</style>
