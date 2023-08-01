<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import { Color } from 'three';
	import { lorenzPositions } from './stores';
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

<Lorenz
	dotColor={new Color(0xff2222)}
	lineColor={new Color(0xaa2222)}
	bind:x={$lorenzPositions[0][0]}
	bind:y={$lorenzPositions[0][1]}
	bind:z={$lorenzPositions[0][2]}
/>
<Lorenz
	dotColor={new Color(0x2288ff)}
	lineColor={new Color(0x2277aa)}
	bind:x={$lorenzPositions[1][0]}
	bind:y={$lorenzPositions[1][1]}
	bind:z={$lorenzPositions[1][2]}
/>

<!-- <Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={500}
	cellSize={10}
	gridSize={100}
/> -->
