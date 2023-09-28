<script lang="ts">
	import '../app.postcss';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/state';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		if ($prefersReducedMotion) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		$prefersReducedMotion = mediaQuery.matches;

		mediaQuery.addEventListener('change', () => {
			$prefersReducedMotion = mediaQuery.matches;
		});
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#0d1320" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Strange Attractor Exploration</title>

	<link rel="canonical" href={`https://chaos.mattlehrer.com${$page.url.pathname}`} />
</svelte:head>

<slot />
