<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/Footer.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#0d1320" />
	<title>Strange Attractor Exploration</title>
</svelte:head>

<div>
	<slot />

	<Footer />
</div>

<style>
	div {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
