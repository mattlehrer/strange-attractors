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
	<h1>Strange Attractors</h1>
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
				<a href="https://en.wikipedia.org/wiki/Butterfly_effect">the butterfly effect</a>. There are
				a few aspects that make these systems interesting.
			</p>
			<p>
				First, there is no way to predict values for some time in the future. The only way to
				calculate a future position is to iterate through the values, from moment to moment. There
				are rules which govern the system but an appearance of randomness.
			</p>
			<p>
				Second, the equations are sensitive to initial conditions in the extreme. The tiniest
				difference in initial values fairly quickly results in a wildly different path through
				space. This is the meaning of the butterfly effect. A small difference here causes a big
				difference over there. This is a primary principle of <a
					href="https://en.wikipedia.org/wiki/Chaos_theory">chaos theory</a
				>, which can be summarized as: "the present determines the future, but the approximate
				present does not approximately determine the future."
			</p>
			<p>
				The site was inspired by the book <a
					href="https://openlibrary.org/works/OL15899W/Chaos?edition=key:/books/OL7960927M"
					>Chaos by James Gleick</a
				>.
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
	main {
		--canvas-side: 300px;
		max-width: 1200px;
		margin: 0 auto;
		padding: min(75px, 10%);
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-weight: 700;
		view-transition-name: title;
	}

	p {
		font-size: large;
		max-width: 70ch;
	}

	.attractors {
		margin-top: 2rem;
		display: grid;
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
