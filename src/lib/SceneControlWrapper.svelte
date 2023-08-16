<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import { lorenzPositions } from './stores';
	import * as knobby from 'svelte-knobby';

	const controls = knobby.panel({
		$id: 'main',
		autorotate: true,
		'Add Dot': addDot,
		'Add 25 Dots': () => {
			for (let i = 0; i < 25; i++) {
				addDot();
			}
		}
	});

	$controls.message = $controls.message;

	function addDot() {
		const newDot = {
			name: `Dot ${$lorenzPositions.length + 1}`,
			dotColor: '#fff5f5',
			x: Number(Math.random().toFixed(10)),
			y: Number(Math.random().toFixed(10)),
			z: Number(Math.random().toFixed(10))
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
	<Lorenz color={dot.dotColor} trailLength={1000} speed={50} />
{/each}
