<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<meta name="theme-color" content="#0d1320" />
	<title>Strange Attractor Exploration</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		margin: 0;
		font-family: 'Ranade-Variable', sans-serif;
		font-weight: 200;
	}
</style>
