<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		{#if $page.route.id?.startsWith('/(attractors)/')}
			<a class="home" href="/">Strange Attractors</a>
			<h1 class="name">
				The {$page.route.id?.slice('/(attractors)/'.length)} Attractor
			</h1>
		{:else}
			<h1>
				<a class="home font-bold" href="/">Strange Attractors</a>
			</h1>
		{/if}
	</nav>
</header>

<style>
	nav {
		width: 100%;
		margin: var(--header-spacer) auto;
		padding: 0 var(--header-spacer);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		opacity: 0.9;
		color: inherit;
		gap: 0.75rem;
		font-size: clamp(1.25rem, 3.5vw, 3rem);
	}

	@media (min-width: 450px) {
		nav {
			align-items: center;
		}

		header {
			margin-top: 0;
		}
	}

	h1 {
		view-transition-name: title;
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
