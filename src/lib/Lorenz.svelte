<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
	import { Grid, OrbitControls } from '@threlte/extras';

	const geometry = new BufferGeometry();

	const material = new PointsMaterial({
		transparent: true
	});

	let color = '#ffffff';
	let opacity = 1;
	let size = 1;

	let x = 0.01;
	let y = 0;
	let z = 0;

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	useFrame(() => {
		let dt = 0.01;
		let dx = a * (y - x) * dt;
		let dy = (x * (b - z) - y) * dt;
		let dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;
		// console.log({ x, y, z });
		geometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
	});
</script>

<T.PerspectiveCamera makeDefault position={[-150, 150, 150]} fov={20}>
	<OrbitControls autoRotate enableZoom={true} enableDamping autoRotateSpeed={0} target.y={0} />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={500}
	cellSize={1}
/>

<T.Points>
	<T is={geometry} />
	<T is={material} {size} {color} {opacity} />
</T.Points>
