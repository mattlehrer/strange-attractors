<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import { Color } from 'three';
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

<Lorenz dotColor={new Color(0xff2222)} lineColor={new Color(0x772222)} x={0.01} y={0} z={0} />
<Lorenz dotColor={new Color(0x2222ff)} lineColor={new Color(0x222277)} x={0} y={0.01} z={0} />

<!-- <Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={500}
	cellSize={10}
	gridSize={100}
/> -->
