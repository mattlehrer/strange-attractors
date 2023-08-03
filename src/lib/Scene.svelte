<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import { lorenzPositions } from './stores';
	import * as knobby from 'svelte-knobby';

	const controls = knobby.panel({
		$id: 'main',
		'Add Dot': () => {
			const newDot = {
				name: `Dot ${$lorenzPositions.length + 1}`,
				dotColor: 0xff2211,
				lineColor: 0x993333,
				x: Math.random(),
				y: Math.random(),
				z: Math.random()
			};
			$lorenzPositions = [...$lorenzPositions, newDot];
		}
	});
	$controls.message = $controls.message;
</script>

<T.PerspectiveCamera makeDefault position={[-150, 150, 150]} fov={25}>
	<OrbitControls
		autoRotate
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.y={0}
		target.z={15}
	/>
</T.PerspectiveCamera>

<!-- <T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} /> -->
{#each $lorenzPositions as dot}
	<Lorenz
		dotColor={dot.dotColor}
		lineColor={dot.lineColor}
		bind:name={dot.name}
		bind:x={dot.x}
		bind:y={dot.y}
		bind:z={dot.z}
	/>
{/each}

<!-- <Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={500}
	cellSize={10}
	gridSize={100}
/> -->
