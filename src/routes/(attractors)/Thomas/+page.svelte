<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Thomas from '$lib/attractors/Thomas.svelte';
	import { positions, isAutoRotate, isPaused } from '$lib/state';
	import { settings as allSettings } from '$lib/attractors/settings';

	const settings = allSettings.Thomas;
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

{#each $positions.Thomas as dot (dot.id)}
	<Thomas
		color={dot.dotColor}
		speed={dot.speed}
		init={[dot.x, dot.y, dot.z]}
		trailLength={dot.trailLength}
		isPaused={$isPaused}
	/>
{/each}
