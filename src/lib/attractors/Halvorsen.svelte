<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
	import { hexToRgb, trailColors } from '$lib/utils';

	export let isPaused = false;
	export let color = '#fff';
	export let speed = 50;
	export let trailLength = 500;
	export let init = [0.5, 0.5, 0];
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

	let a = 1.89;
	$: dt = speed ? (10 * Math.log(speed)) / 4000 : 0.025;

	let trailPositions: Array<number> = [];
	let colors: Array<number> = [];
	$: colors = trailColors({ trailLength, rgb, dt });

	useFrame(() => {
		if (isPaused) return;
		const dx = (-a * x - 4 * y - 4 * z - y ** 2) * dt;
		const dy = (-a * y - 4 * z - 4 * x - z ** 2) * dt;
		const dz = (-a * z - 4 * x - 4 * y - x ** 2) * dt;
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
