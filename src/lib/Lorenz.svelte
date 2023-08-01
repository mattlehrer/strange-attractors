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

	export let MAX_POINTS = 25000;
	export let dotColor = new Color(0xff2211);
	export let lineColor = new Color(0x993333);

	export let x = 0.01;
	export let y = 0;
	export let z = 0;

	const dotGeometry = new BufferGeometry();
	const lineGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false
	});
	const lineMaterial = new LineBasicMaterial();

	let opacity = 1;
	let size = 3;

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	const dt = 0.01;
	let i = 0;

	const positions1 = new Float32Array(MAX_POINTS * 3);
	lineGeometry.setAttribute('position', new BufferAttribute(positions1, 3));

	useFrame(() => {
		let dx = a * (y - x) * dt;
		let dy = (x * (b - z) - y) * dt;
		let dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		const positions = lineGeometry.getAttribute('position').array;
		positions[i++] = x;
		positions[i++] = y;
		positions[i++] = z;

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
		lineGeometry.setAttribute('position', new BufferAttribute(positions, 3));
		lineGeometry.setDrawRange(0, i / 3);
	});
</script>

<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} color={dotColor} />
</T.Points>

<T.Line>
	<T is={lineGeometry} />
	<T is={lineMaterial} color={lineColor} />
</T.Line>
