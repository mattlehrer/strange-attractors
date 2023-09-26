<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import HalvorsenWrapper from './HalvorsenControlWrapper.svelte';
	import { controls } from '../positions';
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
		autoRotate={$controls.Halvorsen.autorotate}
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.x={-3}
		target.y={-2}
		target.z={-4}
	/>
</T.PerspectiveCamera>

{#each $controls.Halvorsen.dots as dot (dot.name)}
	<HalvorsenWrapper
		dotColor={dot.dotColor}
		trailLength={dot.trailLength}
		init={[dot.x, dot.y, dot.z]}
		speed={dot.speed}
	/>
{/each}
