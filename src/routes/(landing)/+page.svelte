<script lang="ts">
	import Card from '$lib/Card.svelte';
</script>

<svelte:head>
	<meta
		name="description"
		content="An exploration of strange attractors built with Svelte, Three.js, and Threlte"
	/>
</svelte:head>

<main>
	<h1>Strange Attractors</h1>
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

	.attractors {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, var(--canvas-side));
		grid-template-rows: repeat(auto-fill, var(--canvas-side) + 1.25rem);
		gap: max(2%, 50px) max(5%, 50px);
	}
</style>
