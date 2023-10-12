<script lang="ts">
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { Canvas } from '@threlte/core';
	import { SlidersHorizontal, X, Play, Pause, Gauge, MoreHorizontal } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import {
		createAccordion,
		createPopover,
		createSwitch,
		createSeparator,
		melt,
	} from '@melt-ui/svelte';
	import { page } from '$app/stores';
	import { positions, isPaused, isAutoRotate } from '$lib/state';
	import { settings, type System } from '$lib/attractors/settings';
	import { uid } from 'uid';

	$: innerWidth = 0;
	$: controlsSize = Math.min(Math.max(innerWidth / 30, 36), 50);

	let attractor: System;
	$: attractor = $page.route.id?.slice('/(attractors)/'.length) as System;

	const {
		elements: { trigger: popoverTrigger, content: popoverContent, arrow, close },
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
			x: Math.random() * settings[attractor].initScale,
			y: Math.random() * settings[attractor].initScale,
			z: Math.random() * settings[attractor].initScale,
			speed: 50,
			trailLength: 1_000,
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
	const {
		elements: { root: vertical },
	} = createSeparator({
		orientation: 'vertical',
	});

	const {
		elements: { content: accordionContent, item: accordionItem, trigger: accordionTrigger },
		helpers: { isSelected: accordionItemIsSelected },
	} = createAccordion();
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
				<button
					class="p-1 sm:p-0 -mt-1 -mr-1 sm:m-0"
					type="button"
					in:fade
					on:click={() => ($isPaused = !$isPaused)}
				>
					{#if $isPaused}
						<Play size={controlsSize} />
						<span class="sr-only">Pause</span>
					{:else}
						<Pause size={controlsSize} />
						<span class="sr-only">Pause</span>
					{/if}
				</button>
			{/if}
			<button type="button" in:fade use:melt={$popoverTrigger}>
				<SlidersHorizontal size={controlsSize} />
				<span class="sr-only">Open Controls</span>
			</button>
		</div>
	{/if}
	{#if $open}
		<div
			use:melt={$popoverContent}
			transition:fade={{ duration: 100 }}
			class="content text-[var(--dark-color)]"
		>
			<div use:melt={$arrow} />
			<div class="flex flex-col gap-5">
				<button
					type="button"
					class="mx-auto max-w-max border px-4 py-2 border-slate-400 rounded-md hover:bg-blue-800 hover:text-slate-100"
					on:click={addDot}
					on:dblclick={() => {
						// prevent zoom when tapping fast on mobile
						addDot();
						addDot();
					}}
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
					<input id="autorotate" use:melt={$input} />
				</div>
				<div class="h-px w-full bg-[var(--dark-color)]" use:melt={$horizontal} />
			</div>
			<div class="flex flex-col gap-2">
				{#each $positions[attractor] as dot, i (dot.id)}
					<div use:melt={$accordionItem(dot.id)} class="overflow-hidden transition-colors">
						<h2 class="flex">
							<button
								use:melt={$accordionTrigger(dot.id)}
								class={`flex items-center gap-2 justify-between w-full pt-2 ${
									i !== 0 ? 'border-t border-t-neutral-300' : ''
								}`}
							>
								{#if !$accordionItemIsSelected(dot.id)}
									Dot {dot.count}
									<div use:melt={$vertical} class="h-5 w-px bg-slate-900" />
									<div class="flex gap-1.5">
										<MoreHorizontal class="opacity-80" />
										{dot.trailLength}
									</div>
									<div use:melt={$vertical} class="h-5 w-px bg-slate-900" />
									<div class="flex gap-1.5">
										<Gauge class="opacity-80" />
										{dot.speed}
									</div>
									<div use:melt={$vertical} class="h-5 w-px bg-slate-900" />
									<div
										style="background-color: {dot.dotColor};"
										class="h-8 w-8 border border-slate-500"
									></div>
								{/if}
							</button>
						</h2>
						{#if $accordionItemIsSelected(dot.id)}
							<div use:melt={$accordionContent(dot.id)} transition:slide>
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
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<button class="close" use:melt={$close}>
				<X class="square-4" />
			</button>
		</div>
	{/if}

	<main>
		<Canvas useLegacyLights={false}>
			<slot />
		</Canvas>
	</main>

	<div class="footer">
		<Footer />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
		width: 97vw;
		height: 100dvh;
	}

	.header,
	.footer {
		position: absolute;
		left: 0;
		right: 0;
	}

	.header {
		top: 0.5rem;
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
		@apply px-2.5 text-base leading-none text-blue-700;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply text-blue-900 transition-colors hover:bg-blue-500/10;
		@apply focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2;
		@apply bg-white p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-80 rounded-[4px] bg-white p-5 shadow-sm opacity-95;
		overflow-y: auto;
		scrollbar-gutter: stable both-edges;
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
