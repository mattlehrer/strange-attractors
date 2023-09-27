<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
	import { hexToRgb, trailColors } from '$lib/utils';

	export let isPaused = false;
	export let color = '#fff';
	export let speed = 150;
	export let trailLength = 500;
	export let init = [Math.random(), Math.random(), Math.random()];
	let [x, y, z] = init;

	const dotGeometry = new BufferGeometry();
	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false,
	});

	const geometry = new BufferGeometry();
	const material = new PointsMaterial({
		sizeAttenuation: false,
	});

	let size = 5;
	$: rgb = hexToRgb(color);

	let a = 2.07;
	let b = 1.79;
	$: dt = speed ? speed / 2000 : 0.025;

	let trailPositions: Array<number> = [];
	let colors: Array<number> = [];
	$: colors = trailColors({ trailLength, rgb, dt });

	useFrame(() => {
		if (isPaused) return;
		const dx = (y + a * x * y + x * z) * dt;
		const dy = (1 - b * x ** 2 + y * z) * dt;
		const dz = (x - x ** 2 - y ** 2) * dt;
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
