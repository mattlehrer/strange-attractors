<script lang="ts">
	import App from '$lib/App.svelte';
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
	<App />
</div>

<style>
	div {
		position: relative;
		width: 100vw;
		height: 100vh;
	}
</style>
