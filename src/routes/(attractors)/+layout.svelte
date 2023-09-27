<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { Canvas } from '@threlte/core';
	import { SlidersHorizontal, X, Play, Pause, Gauge, MoreHorizontal } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, createSwitch, createSeparator, melt } from '@melt-ui/svelte';
	import { page } from '$app/stores';
	import { positions, isPaused, isAutoRotate } from '$lib/state';
	import type { System } from '$lib/attractors';
	import { uid } from 'uid';

	$: innerWidth = 0;
	$: controlsSize = Math.min(Math.max(innerWidth / 20, 36), 50);

	let attractor: System;
	$: attractor = $page.route.id?.slice('/(attractors)/'.length) as System;

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({
		positioning: { placement: 'bottom-end' },
		arrowSize: 0,
		forceVisible: true,
	});

	function addDot() {
		if (!attractor) return console.error('No attractor found');

		const newDot = {
			count: 1 + ($positions[attractor][$positions[attractor].length - 1]?.count || 0),
			dotColor: '#fff5f5',
			x: Math.random(),
			y: Math.random(),
			z: Math.random(),
			speed: 50,
			trailLength: 200,
			id: uid(),
		};
		$positions[attractor] = [...$positions[attractor], newDot];
	}

	function removeDot(id: string) {
		if (!attractor) return console.error('No attractor found');
		$positions[attractor] = $positions[attractor].filter((d) => d.id !== id);
	}

	const {
		elements: { root, input },
	} = createSwitch({ defaultChecked: $isAutoRotate });

	$: $isAutoRotate = $input.checked;

	const {
		elements: { root: horizontal },
	} = createSeparator({});
</script>

<svelte:head>
	<meta name="description" content={`A 3D ${attractor} Attractor built with Svelte and Three.js`} />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="wrapper">
	<div class="header">
		<Header />
	</div>
	{#if innerWidth > 0}
		<div class="flex controls gap-6 mt-1">
			{#if attractor}
				<button type="button" on:click={() => ($isPaused = !$isPaused)}>
					{#if $isPaused}
						<Play size={controlsSize} />
						<span class="sr-only">Pause</span>
					{:else}
						<Pause size={controlsSize} />
						<span class="sr-only">Pause</span>
					{/if}
				</button>
			{/if}
			<button type="button" in:fade use:melt={$trigger}>
				<SlidersHorizontal size={controlsSize} />
				<span class="sr-only">Open Controls</span>
			</button>
		</div>
	{/if}
	{#if $open}
		<div
			use:melt={$content}
			transition:fade={{ duration: 100 }}
			class="content text-[var(--dark-color)]"
		>
			<div use:melt={$arrow} />
			<div class="flex flex-col gap-5">
				<button
					type="button"
					class="mx-auto max-w-max border px-4 py-2 border-slate-400 rounded-md hover:bg-blue-800 hover:text-slate-100"
					on:click={addDot}
				>
					Add dot
				</button>
				<div class="switch flex items-center mx-auto max-w-max">
					<label class="pr-4 leading-none" for="autorotate" id="autorotate-label">
						Autorotate
					</label>
					<button
						use:melt={$root}
						class="relative h-6 cursor-default rounded-full bg-blue-950 transition-colors data-[state=checked]:bg-blue-600"
						id="autorotate"
						aria-labelledby="autorotate-label"
					>
						<span class="thumb block rounded-full bg-white transition" />
					</button>
					<input use:melt={$input} />
				</div>
				<div class="h-px w-full bg-[var(--dark-color)]" use:melt={$horizontal} />
				{#each $positions[attractor] as dot (dot.id)}
					<div class="flex flex-col gap-2">
						<div class="flex items-center gap-2">
							<span class="w-3/5">Dot {dot.count}</span>
							<fieldset>
								<label class="sr-only" for={`${attractor}-${dot.id}-color`}>Color</label>
								<input
									type="color"
									id={`${attractor}-${dot.id}-color`}
									class="h-8 bg-white"
									bind:value={dot.dotColor}
								/>
							</fieldset>
						</div>
						<fieldset>
							<label
								for={`${attractor}-${dot.id}-trailLength`}
								class="flex items-center gap-2 w-3/5 text-sm"
							>
								<MoreHorizontal class="opacity-80" />
								Trail Length</label
							>
							<input
								type="number"
								id={`${attractor}-${dot.id}-trailLength`}
								class="input"
								placeholder="200"
								bind:value={dot.trailLength}
							/>
						</fieldset>
						<fieldset>
							<label
								for={`${attractor}-${dot.id}-speed`}
								class="flex items-center gap-2 w-3/5 text-sm"
							>
								<Gauge class="opacity-80" />
								Speed</label
							>
							<input
								type="number"
								id={`${attractor}-${dot.id}-speed`}
								class="input"
								placeholder="200"
								bind:value={dot.speed}
							/>
						</fieldset>
						<button
							type="button"
							class="mt-1 mx-auto max-w-max border px-3 py-1 text-sm border-red-400 rounded-md hover:bg-red-800 hover:text-slate-100 hover:border-red-800"
							on:click={() => removeDot(dot.id)}
						>
							Remove Dot {dot.count}
						</button>
					</div>
				{/each}
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
		opacity: 0.8;
	}
	.controls button {
		@apply focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2;
	}

	fieldset {
		@apply flex items-center gap-2;
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
		@apply z-10 w-60 rounded-[4px] bg-white p-5 shadow-sm opacity-95;
		overflow-y: scroll;
		max-height: 80vh;
	}

	.switch button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
