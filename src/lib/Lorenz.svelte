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

	const dotGeometry1 = new BufferGeometry();
	const dotGeometry2 = new BufferGeometry();
	const lineGeometry1 = new BufferGeometry();
	const lineGeometry2 = new BufferGeometry();

	const dotMaterial1 = new PointsMaterial({
		sizeAttenuation: false
	});
	const lineMaterial1 = new LineBasicMaterial();
	const dotMaterial2 = new PointsMaterial({
		sizeAttenuation: false
	});
	const lineMaterial2 = new LineBasicMaterial();

	let dotColor1 = new Color(0xff2211);
	let lineColor1 = new Color(0x993333);

	let dotColor2 = new Color(0x2211ff);
	let lineColor2 = new Color(0x333399);

	let opacity = 1;
	let size = 3;

	let x1 = 0.01;
	let y1 = 0;
	let z1 = 0;

	let x2 = 0.03;
	let y2 = 0.01;
	let z2 = 0;

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	const dt = 0.01;
	let i = 0;

	const positions1 = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	const positions2 = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	lineGeometry1.setAttribute('position', new BufferAttribute(positions1, 3));
	lineGeometry2.setAttribute('position', new BufferAttribute(positions2, 3));

	useFrame(() => {
		let dx1 = a * (y1 - x1) * dt;
		let dy1 = (x1 * (b - z1) - y1) * dt;
		let dz1 = (x1 * y1 - c * z1) * dt;
		x1 = x1 + dx1;
		y1 = y1 + dy1;
		z1 = z1 + dz1;

		let dx2 = a * (y2 - x2) * dt;
		let dy2 = (x2 * (b - z2) - y2) * dt;
		let dz2 = (x2 * y2 - c * z2) * dt;
		x2 = x2 + dx2;
		y2 = y2 + dy2;
		z2 = z2 + dz2;
		// console.log({ x, y, z });

		const positions1 = lineGeometry1.getAttribute('position').array;
		const positions2 = lineGeometry2.getAttribute('position').array;
		positions1[i] = x1;
		positions2[i++] = x2;
		positions1[i] = y1;
		positions2[i++] = y2;
		positions1[i] = z1;
		positions2[i++] = z2;

		dotGeometry1.setAttribute('position', new Float32BufferAttribute([x1, y1, z1], 3));
		dotGeometry2.setAttribute('position', new Float32BufferAttribute([x2, y2, z2], 3));
		lineGeometry1.setAttribute('position', new BufferAttribute(positions1, 3));
		lineGeometry2.setAttribute('position', new BufferAttribute(positions2, 3));
		lineGeometry1.setDrawRange(0, i / 3);
		lineGeometry2.setDrawRange(0, i / 3);
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
	<T is={dotGeometry1} />
	<T is={dotMaterial1} {size} color={dotColor1} />
</T.Points>
<T.Points>
	<T is={dotGeometry2} />
	<T is={dotMaterial2} {size} color={dotColor2} />
</T.Points>

<T.Line>
	<T is={lineGeometry1} />
	<T is={lineMaterial1} color={lineColor1} />
</T.Line>
<T.Line>
	<T is={lineGeometry2} />
	<T is={lineMaterial2} color={lineColor2} />
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
