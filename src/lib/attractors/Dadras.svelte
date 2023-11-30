<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
	import { hexToRgb, trailColors } from '$lib/utils';
	import { prefersReducedMotion } from '$lib/state';

	export let isPaused = false;
	export let color = '#fff';
	export let speed = 50;
	export let trailLength = 500;
	export let init = [1.1, 2.1, -2.0];
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

	const a = 3;
	const b = 2.7;
	const c = 1.7;
	const d = 2;
	const e = 9;

	$: dt = speed ? Math.log(speed) / 200 : 0.025;

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
		const dx1 = (y - a * x + b * y * z) * dt;
		const dy1 = (c * y - x * z + z) * dt;
		const dz1 = (d * x * y - e * z) * dt;

		const dx2 = (y + dy1 / 2 - a * (x + dx1 / 2) + b * (y + dy1 / 2) * (z + dz1 / 2)) * dt;
		const dy2 = (c * (y + dy1 / 2) - (x + dx1 / 2) * (z + dz1 / 2) + (z + dz1 / 2)) * dt;
		const dz2 = (d * (x + dx1 / 2) * (y + dy1 / 2) - e * (z + dz1 / 2)) * dt;

		const dx3 = (y + dy2 / 2 - a * (x + dx2 / 2) + b * (y + dy2 / 2) * (z + dz2 / 2)) * dt;
		const dy3 = (c * (y + dy2 / 2) - (x + dx2 / 2) * (z + dz2 / 2) + (z + dz2 / 2)) * dt;
		const dz3 = (d * (x + dx2 / 2) * (y + dy2 / 2) - e * (z + dz2 / 2)) * dt;

		const dx4 = (y + dy3 - a * (x + dx3) + b * (y + dy3) * (z + dz3)) * dt;
		const dy4 = (c * (y + dy3) - (x + dx3) * (z + dz3) + (z + dz3)) * dt;
		const dz4 = (d * (x + dx3) * (y + dy3) - e * (z + dz3)) * dt;

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
