<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Color, Float32BufferAttribute, PointsMaterial } from 'three';
	import { hexToRgb, trailColors } from './utils';

	export let color = '#fff';
	export let speed = 75;
	export let trailLength = 10;
	export let init = [
		Number(Math.random().toFixed(10)),
		Number(Math.random().toFixed(10)),
		Number(Math.random().toFixed(10))
	];
	let [x, y, z] = init;

	const dotGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false
	});

	const geometry = new BufferGeometry();
	const material = new PointsMaterial({
		sizeAttenuation: false
	});

	// let opacity = 1;
	let size = 5;
	$: rgb = hexToRgb(color);

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;
	$: dt = speed ? speed / 5000 : 0.01;

	let trailPositions: Array<number> = [];
	let colors: Array<number> = [];
	$: colors = trailColors({ trailLength, rgb, dt });

	useFrame(() => {
		const dx = a * (y - x) * dt;
		const dy = (x * (b - z) - y) * dt;
		const dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));

		trailPositions.unshift(x, y, z);
		trailPositions = trailPositions.slice(0, trailLength * 3);
		const tempColors = colors.slice(0, trailPositions.length * 3);

		geometry.setAttribute('position', new Float32BufferAttribute(trailPositions, 3));
		geometry.setAttribute('color', new Float32BufferAttribute(tempColors, 3));
	});
</script>

<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} {color} />
</T.Points>

<T.Points>
	<T is={geometry} />
	<T is={material} vertexColors={true} size={2} />
</T.Points>
