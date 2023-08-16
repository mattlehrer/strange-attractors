<script lang="ts">
	import Card from '$lib/Card.svelte';
</script>

<svelte:head>
	<meta name="description" content="A 3D Lorenz Attractor built with Svelte and Three.js" />
</svelte:head>

<main>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
	<div>
		<Card />
	</div>
</main>

<style>
	:global(body) {
		background-color: hsl(221, 42%, 12%);
	}
	main {
		min-height: 100%;
		padding: min(75px, 10%);
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, 250px);
		grid-template-rows: repeat(auto-fill, 250px + 1.25rem);
		/* grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr)); */
		gap: max(2%, 50px) max(5%, 50px);
	}
</style>
