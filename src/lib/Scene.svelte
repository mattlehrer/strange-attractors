<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import Sprott from './Sprott.svelte';
	import { writable } from 'svelte/store';
	import type { System } from './utils';

	export let type: System = 'Lorenz';

	const settings: Record<
		System,
		{
			near: number;
			fov: number;
			target: [number, number, number];
			position: [number, number, number];
			trailLength: number;
			speed: number;
			zoom: number;
			offsetX: number;
			offsetY: number;
		}
	> = {
		Lorenz: {
			near: 0.1,
			fov: 14,
			position: [-200, 400, 200],
			target: [0, 0, 30],
			trailLength: 100,
			speed: 75,
			zoom: 1,
			offsetX: 50,
			offsetY: 30
		},
		Sprott: {
			near: 0.01,
			fov: 10,
			position: [10, 20, 20],
			target: [0, 0, 0],
			trailLength: 500,
			speed: 100,
			zoom: 1,
			offsetX: 0,
			offsetY: 0
		}
	};

	const dots = writable([{ name: 'Dot 1', dotColor: '#fff5f5' }]);
</script>

<T.PerspectiveCamera
	makeDefault
	position={settings[type].position}
	fov={settings[type].fov}
	zoom={settings[type].zoom}
	view={{
		enabled: true,
		fullWidth: 250,
		fullHeight: 250,
		offsetX: settings[type].offsetX,
		offsetY: settings[type].offsetY,
		width: 250,
		height: 250
	}}
>
	<OrbitControls
		autoRotate={false}
		enableZoom={false}
		target={settings[type].target}
		near={settings[type].near}
		far={100}
	/>
</T.PerspectiveCamera>

{#each $dots as dot (dot.name)}
	{#if type === 'Lorenz'}
		<Lorenz
			color={dot.dotColor}
			trailLength={settings[type].trailLength}
			speed={settings[type].speed}
		/>
	{:else if type === 'Sprott'}
		<Sprott
			color={dot.dotColor}
			trailLength={settings[type].trailLength}
			speed={settings[type].speed}
		/>
	{/if}
{/each}
