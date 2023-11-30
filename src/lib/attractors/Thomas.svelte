<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
	import { hexToRgb, trailColors } from '$lib/utils';
	import { prefersReducedMotion } from '$lib/state';

	export let isPaused = false;
	export let color = '#fff';
	export let speed = 50;
	export let trailLength = 500;
	export let init = [1.1, 1.1, -0.01];
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

	const b = 0.208186;
	$: dt = speed ? Math.log(speed) / 20 : 0.025;

	let trailPositions: Array<number> = [];
	let colors: Array<number> = [];
	$: colors = trailColors({ trailLength, rgb, dt, prefersReducedMotion: $prefersReducedMotion });

	// let minX = Infinity,
	// 	minY = Infinity,
	// 	minZ = Infinity,
	// 	maxX = -Infinity,
	// 	maxY = -Infinity,
	// 	maxZ = -Infinity;

	// let loops = 0;

	useFrame(() => {
		if (isPaused) {
			const tempColors = colors.slice(0, trailPositions.length * 3);
			geometry.setAttribute('color', new Float32BufferAttribute(tempColors, 3));

			return;
		}
		// use Runge-Kutta 4th order approximation
		const dx1 = (Math.sin(y) - b * x) * dt;
		const dy1 = (Math.sin(z) - b * y) * dt;
		const dz1 = (Math.sin(x) - b * z) * dt;

		const dx2 = (Math.sin(y + dy1 / 2) - b * (x + dx1 / 2)) * dt;
		const dy2 = (Math.sin(z + dz1 / 2) - b * (y + dy1 / 2)) * dt;
		const dz2 = (Math.sin(x + dx1 / 2) - b * (z + dz1 / 2)) * dt;

		const dx3 = (Math.sin(y + dy2 / 2) - b * (x + dx2 / 2)) * dt;
		const dy3 = (Math.sin(z + dz2 / 2) - b * (y + dy2 / 2)) * dt;
		const dz3 = (Math.sin(x + dx2 / 2) - b * (z + dz2 / 2)) * dt;

		const dx4 = (Math.sin(y + dy3) - b * (x + dx3)) * dt;
		const dy4 = (Math.sin(z + dz3) - b * (y + dy3)) * dt;
		const dz4 = (Math.sin(x + dx3) - b * (z + dz3)) * dt;

		x = x + (dx1 + 2 * dx2 + 2 * dx3 + dx4) / 6;
		y = y + (dy1 + 2 * dy2 + 2 * dy3 + dy4) / 6;
		z = z + (dz1 + 2 * dz2 + 2 * dz3 + dz4) / 6;

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));

		trailPositions.unshift(x, y, z);
		trailPositions = trailPositions.slice(0, trailLength * 3);
		const tempColors = colors.slice(0, trailPositions.length * 3);

		geometry.setAttribute('position', new Float32BufferAttribute(trailPositions, 3));
		geometry.setAttribute('color', new Float32BufferAttribute(tempColors, 3));

		// if (x < minX) minX = x;
		// if (y < minY) minY = y;
		// if (z < minZ) minZ = z;
		// if (x > maxX) maxX = x;
		// if (y > maxY) maxY = y;
		// if (z > maxZ) maxZ = z;

		// loops++;
		// if (loops === 1_000) {
		// 	console.log({
		// 		minX,
		// 		minY,
		// 		minZ,
		// 		maxX,
		// 		maxY,
		// 		maxZ,
		// 	});
		// }
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
