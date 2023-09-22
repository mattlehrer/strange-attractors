<script lang="ts">
	import Card from '$lib/Card.svelte';
	import animatedDetails from 'svelte-animated-details';
</script>

<svelte:head>
	<meta
		name="description"
		content="An exploration of strange attractors built with Svelte, Three.js, and Threlte"
	/>
</svelte:head>

<main>
	<details use:animatedDetails>
		<summary>What is this?</summary>
		<div>
			<p>
				This site is an exploration of chaotic systems and <a
					href="https://en.wikipedia.org/wiki/Attractor#Strange_attractor">strange attractors</a
				>. Each of the strange attractors is a system of three equations which are represented in 3D
				space as the calculations for x, y, and z which change over time. The first one was
				discovered by Edward Lorenz while trying to model weather patterns and is the inspiration
				for the term and concept of
				<a href="https://en.wikipedia.org/wiki/Butterfly_effect">the butterfly effect</a>.
			</p>
			<p>
				The visualizations of the attractors are interactive. You can drag them around and zoom in
				and out for different viewpoints. The grid on the landing page just shows one initial
				position and path moving over time. On each of the individual attractor pages, however,
				additional "dots" can be added, each with their own starting position and path. You can
				control the starting positions and colors of these.
			</p>
			<p>
				There is a few more details on the <a href="/about">about page</a>.
			</p>
		</div>
	</details>
	<div class="attractors">
		<Card type={'Lorenz'} />
		<Card type={'Sprott'} />
		<Card type={'Halvorsen'} />
	</div>
</main>

<style>
	.attractors {
		margin-top: 2rem;
		display: grid;
		width: 100%;
		grid-template-columns: repeat(auto-fill, var(--canvas-side));
		grid-template-rows: repeat(auto-fill, var(--canvas-side) + 1.25rem);
		gap: max(2%, 50px) max(5%, 50px);
	}

	details {
		overflow: hidden;
	}

	summary {
		padding: 1rem;
		display: block;
		padding-left: 2rem;
		position: relative;
		cursor: pointer;
	}

	summary:before {
		content: '';
		border-width: 0.4rem;
		border-style: solid;
		border-color: transparent transparent transparent var(--light-color);
		position: absolute;
		top: 1.3rem;
		left: 0.75rem;
		transform: rotate(0);
		transform-origin: 0.2rem 50%;
		transition: 0.25s transform ease;
	}

	details[open] > summary:before {
		transform: rotate(90deg);
	}

	details summary::-webkit-details-marker {
		display: none;
	}
</style>
