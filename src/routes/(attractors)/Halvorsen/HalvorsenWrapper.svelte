<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Halvorsen from '$lib/Halvorsen.svelte';
	import { controls, positions } from '../state';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[150, 150, 150]}
	fov={11}
	view={{
		enabled: true,
		fullWidth: 250,
		fullHeight: 250,
		offsetX: -10,
		offsetY: 0,
		width: 250,
		height: 250,
	}}
>
	<OrbitControls
		autoRotate={$controls.Halvorsen.autoRotate}
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.x={-3}
		target.y={-2}
		target.z={-4}
	/>
</T.PerspectiveCamera>

{#each $positions.Halvorsen as dot (dot.name)}
	<Halvorsen
		color={dot.dotColor}
		speed={dot.speed}
		init={[dot.x, dot.y, dot.z]}
		trailLength={dot.trailLength}
	/>
{/each}
