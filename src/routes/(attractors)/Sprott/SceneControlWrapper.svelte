<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import SprottWrapper from './SprottControlWrapper.svelte';
	import * as knobby from 'svelte-knobby';
	import { dots } from './positions';

	const controls = knobby.panel({
		$id: 'main',
		autorotate: true,
		'Add Dot': addDot,
		'Add 5 Dots': () => {
			for (let i = 0; i < 5; i++) {
				addDot();
			}
		}
	});

	$controls.message = $controls.message;

	const x = 1;

	function addDot() {
		const newDot = {
			name: `Dot ${$dots.length + 1}`,
			dotColor: '#fff5f5',
			x: Math.random() * x,
			y: Math.random() * x,
			z: Math.random() * x
		};
		$dots = [newDot, ...$dots];
	}
</script>

<T.PerspectiveCamera makeDefault position={[-150, 150, 150]} fov={1}>
	<OrbitControls
		autoRotate={$controls.autorotate}
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.y={0}
		target.z={0}
	/>
</T.PerspectiveCamera>

{#each $dots as dot (dot.name)}
	<SprottWrapper
		name={dot.name}
		dotColor={dot.dotColor}
		trailLength={1000}
		init={[dot.x, dot.y, dot.z]}
	/>
{/each}
