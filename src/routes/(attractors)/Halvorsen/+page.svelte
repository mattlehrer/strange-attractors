<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Halvorsen from '$lib/attractors/Halvorsen.svelte';
	import { positions, isAutoRotate, isPaused } from '$lib/state';
	import { settings as allSettings } from '$lib/attractors/settings';

	const settings = allSettings.Halvorsen;
</script>

<T.PerspectiveCamera
	makeDefault
	position={settings.position}
	fov={settings.fov}
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
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target={settings.target}
	/>
</T.PerspectiveCamera>

{#each $positions.Halvorsen as dot (dot.id)}
	<Halvorsen
		color={dot.dotColor}
		speed={dot.speed}
		init={[dot.x, dot.y, dot.z]}
		trailLength={dot.trailLength}
		isPaused={$isPaused}
	/>
{/each}
