<script lang="ts">
	import Footer from '$lib/Footer.svelte';

	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
</svelte:head>

<div>
	<Header />

	<slot />

	<Footer />
</div>

<style>
	div {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
