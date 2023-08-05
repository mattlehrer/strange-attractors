<script lang="ts">
	import App from '$lib/App.svelte';
</script>

<svelte:head>
	<meta name="theme-color" content="#0d1320" />
	<meta name="description" content="A 3D Lorenz Attractor built with Svelte and Three.js" />
	<!-- disable zoom -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
	/>
</svelte:head>

<div>
	<App />
</div>

<style>
	:global(body) {
		margin: 0;
	}

	div {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #0d1320;
		background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
	}
</style>
