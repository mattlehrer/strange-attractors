<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<a class="home" href="/">Strange Attractors</a>
		{#if $page.route.id?.slice('/(attractors)/'.length)}
			<div class="name">
				The {$page.route.id?.slice('/(attractors)/'.length)} Attractor
			</div>
		{/if}
	</nav>
</header>

<style>
	nav {
		width: 100%;
		margin: 1rem auto;
		padding: 1rem min(75px, 10%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		opacity: 0.9;
		color: inherit;
		font-size: clamp(1.25rem, 3.5vw, 3rem);
	}

	.home {
		max-width: 60%;
		view-transition-name: home;
	}

	.name {
		font-size: 130%;
		text-align: center;
	}
</style>
