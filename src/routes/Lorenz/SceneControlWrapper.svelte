<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import LorenzWrapper from './LorenzControlWrapper.svelte';
	// import Lorenz from '$lib/Lorenz.svelte';
	import * as knobby from 'svelte-knobby';
	import { lorenzPositions } from './positions';

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

	function addDot() {
		const newDot = {
			name: `Dot ${$lorenzPositions.length + 1}`,
			dotColor: '#fff5f5',
			x: Number((Math.random() * 50 - 25).toFixed(10)),
			y: Number((Math.random() * 50 - 25).toFixed(10)),
			z: Number((Math.random() * 50 - 25).toFixed(10))
		};
		$lorenzPositions = [...$lorenzPositions, newDot];
	}
</script>

<T.PerspectiveCamera makeDefault position={[-150, 150, 150]} fov={35}>
	<OrbitControls
		autoRotate={$controls.autorotate}
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.y={0}
		target.z={25}
	/>
</T.PerspectiveCamera>

{#each $lorenzPositions as dot (dot.name)}
	<LorenzWrapper
		name={dot.name}
		dotColor={dot.dotColor}
		trailLength={200}
		init={[dot.x, dot.y, dot.z]}
	/>
{/each}
