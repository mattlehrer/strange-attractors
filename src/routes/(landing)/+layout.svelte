<script lang="ts">
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
</script>

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
