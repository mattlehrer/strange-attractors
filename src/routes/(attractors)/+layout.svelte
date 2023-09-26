<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { Canvas } from '@threlte/core';
	import { SlidersHorizontal, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';

	$: innerWidth = 0;
	$: controlsSize = Math.min(Math.max(innerWidth / 20, 20), 32);

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({
		positioning: { placement: 'bottom-end' },
		arrowSize: 0,
		forceVisible: true,
	});
</script>

<svelte:head>
	<meta name="description" content="A 3D Lorenz Attractor built with Svelte and Three.js" />
	<!-- disable zoom -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
	/>
</svelte:head>

<svelte:window bind:innerWidth />

<div class="wrapper">
	<div class="header">
		<Header />
	</div>
	{#if innerWidth > 0}
		<button type="button" in:fade class="controls" use:melt={$trigger}>
			<SlidersHorizontal size={controlsSize} />
			<span class="sr-only">Open Popover</span>
		</button>
	{/if}
	{#if $open}
		<div use:melt={$content} transition:fade={{ duration: 100 }} class="content">
			<div use:melt={$arrow} />
			<div class="flex flex-col gap-2.5">
				<p>Dimensions</p>
				<fieldset>
					<label for="width">Width</label>
					<input type="number" id="width" class="input" placeholder="Width" />
				</fieldset>
				<fieldset>
					<label for="height">Height</label>
					<input type="number" id="height" class="input" placeholder="Height" />
				</fieldset>
				<fieldset>
					<label for="depth">Depth</label>
					<input type="number" id="depth" class="input" placeholder="Depth" />
				</fieldset>
				<fieldset>
					<label for="weight">Weight</label>
					<input type="number" id="weight" class="input" placeholder="Weight" />
				</fieldset>
			</div>
			<button class="close" use:melt={$close}>
				<X class="square-4" />
			</button>
		</div>
	{/if}

	<Canvas useLegacyLights={false}>
		<slot />
	</Canvas>

	<div class="footer">
		<Footer />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
		width: 100vw;
		min-height: 100dvh;
	}

	.header,
	.footer {
		position: absolute;
		left: 0;
		right: 0;
	}

	.header {
		top: 0;
	}

	.footer {
		bottom: 0;
	}

	.controls {
		position: absolute;
		top: var(--header-spacer);
		right: var(--header-spacer);
		@apply focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2;
	}

	fieldset {
		@apply flex items-center gap-5;
	}

	label {
		@apply w-[75px] text-sm text-neutral-700;
	}

	p {
		@apply mb-2 font-medium text-neutral-900;
	}

	.input {
		@apply flex h-8 w-full rounded-md border border-blue-800 bg-transparent px-2.5 text-sm;
		@apply ring-offset-blue-300 focus-visible:ring;
		@apply focus-visible:ring-blue-400 focus-visible:ring-offset-1;
		@apply flex-1 items-center justify-center;
		@apply px-2.5 text-sm leading-none text-blue-700;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-blue-900 transition-colors hover:bg-blue-500/10;
		@apply focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm;
	}
</style>
