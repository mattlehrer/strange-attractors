<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Sprott from '$lib/attractors/Sprott.svelte';
	import { positions, isAutoRotate, isPaused } from '$lib/state';
	import { settings as allSettings } from '$lib/attractors/settings';

	const settings = allSettings.Sprott;
</script>

<T.PerspectiveCamera
	makeDefault
	position={settings.position}
	fov={settings.fov}
	zoom={settings.zoom}
	view={{
		enabled: true,
		fullWidth: 250,
		fullHeight: 250,
		offsetX: settings.offsetX,
		offsetY: settings.offsetY,
		width: 250,
		height: 250,
	}}
>
	<OrbitControls
		autoRotate={$isAutoRotate}
		autoRotateSpeed={0.5}
		enableZoom={true}
		enableDamping
		target={settings.target}
		near={settings.near}
		far={100}
	/>
</T.PerspectiveCamera>

{#each $positions.Sprott as dot (dot.id)}
	<Sprott
		color={dot.dotColor}
		speed={dot.speed}
		init={[dot.x, dot.y, dot.z]}
		trailLength={dot.trailLength}
		isPaused={$isPaused}
	/>
{/each}
