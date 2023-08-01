<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import {
		BufferAttribute,
		BufferGeometry,
		Float32BufferAttribute,
		LineBasicMaterial,
		PointsMaterial,
		Color
	} from 'three';
	import { Grid, OrbitControls } from '@threlte/extras';

	const MAX_POINTS = 25000;

	const dotGeometry = new BufferGeometry();
	const lineGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		// transparent: true
		sizeAttenuation: false
	});
	const lineMaterial = new LineBasicMaterial();

	let dotColor = new Color(0xff2211);
	let lineColor = new Color(0x997777);
	let opacity = 1;
	let size = 3;

	let x = 0.01;
	let y = 0;
	let z = 0;

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	const dt = 0.01;
	let i = 0;

	const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	lineGeometry.setAttribute('position', new BufferAttribute(positions, 3));

	useFrame(() => {
		let dx = a * (y - x) * dt;
		let dy = (x * (b - z) - y) * dt;
		let dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;
		// console.log({ x, y, z });

		const positions = lineGeometry.getAttribute('position').array;
		positions[i++] = x;
		positions[i++] = y;
		positions[i++] = z;

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
		lineGeometry.setAttribute('position', new BufferAttribute(positions, 3));
		lineGeometry.setDrawRange(0, i / 3);
	});
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

<T.DirectionalLight intensity={0.8} position.x={5} position.y={10} />
<T.AmbientLight intensity={0.2} />

<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} color={dotColor} {opacity} />
</T.Points>

<T.Line>
	<T is={lineGeometry} />
	<T is={lineMaterial} color={lineColor} opacity={0.05} />
</T.Line>

<!-- <Grid
	position.y={-0.001}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={500}
	cellSize={10}
	gridSize={100}
/> -->
