<script lang="ts">
	import '../app.postcss';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';

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

	<link rel="canonical" href={`https://chaos.mattlehrer.com${$page.url.pathname}`} />
</svelte:head>

<slot />
