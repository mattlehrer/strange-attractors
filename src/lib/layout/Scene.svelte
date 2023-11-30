<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Lorenz from '$lib/attractors/Lorenz.svelte';
	import Sprott from '$lib/attractors/Sprott.svelte';
	import Halvorsen from '$lib/attractors/Halvorsen.svelte';
	import Thomas from '$lib/attractors/Thomas.svelte';
	import Dadras from '$lib/attractors/Dadras.svelte';
	import { writable } from 'svelte/store';
	import { settings, type System } from '$lib/attractors/settings';

	export let type: System = 'Lorenz';

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
		// +15 is a hack because the camera center is different on the landing page grid and its own page
		offsetX: settings[type].offsetX + 25,
		offsetY: settings[type].offsetY,
		width: 250,
		height: 250,
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
	{:else if type === 'Halvorsen'}
		<Halvorsen
			color={dot.dotColor}
			trailLength={settings[type].trailLength}
			speed={settings[type].speed}
		/>
	{:else if type === 'Thomas'}
		<Thomas
			color={dot.dotColor}
			trailLength={settings[type].trailLength}
			speed={settings[type].speed}
		/>
	{:else if type === 'Dadras'}
		<Dadras
			color={dot.dotColor}
			trailLength={settings[type].trailLength}
			speed={settings[type].speed}
		/>
	{/if}
{/each}
