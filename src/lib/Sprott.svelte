<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import {
		BufferGeometry,
		Float32BufferAttribute,
		PointsMaterial,
		Color,
		type NormalBufferAttributes
	} from 'three';
	import { hexToRgb } from './utils';

	export let color = '#fff';
	export let speed = 150;
	export let trailLength = 500;
	export let init = [Math.random(), Math.random(), Math.random()];
	let [x, y, z] = init;

	const dotGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false
	});

	// let opacity = 1;
	let size = 5;
	$: rgb = hexToRgb(color);

	let a = 2.07;
	let b = 1.79;
	$: dt = speed ? speed / 2000 : 0.025;

	let trail: [BufferGeometry<NormalBufferAttributes>, PointsMaterial][] = [];

	useFrame(() => {
		const dx = (y + a * x * y + x * z) * dt;
		const dy = (1 - b * x ** 2 + y * z) * dt;
		const dz = (x - x ** 2 - y ** 2) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
		const material = new PointsMaterial({
			sizeAttenuation: false
		});
		trail.push([geometry, material]);
		// Is there a way to alternate instead of slicing?
		trail = trail.slice(-trailLength);

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
	});
</script>

<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} color={new Color(color)} />
</T.Points>

{#each trail as [geometry, material], i}
	{@const r =
		(rgb ? rgb[0] / 255 : 1) *
		(!((trail.length - i) % Math.max(Math.floor(1000 * dt), 10))
			? i / trail.length
			: i / trail.length / 4)}
	{@const g =
		(rgb ? rgb[1] / 255 : 1) *
		(!((trail.length - i) % Math.max(Math.floor(1000 * dt), 10))
			? i / trail.length
			: i / trail.length / 4)}
	{@const b =
		(rgb ? rgb[2] / 255 : 1) *
		(!((trail.length - i) % Math.max(Math.floor(1000 * dt), 10))
			? i / trail.length
			: i / trail.length / 4)}
	<T.Points>
		<T is={geometry} />
		<T is={material} size={2} color={new Color(r, g, b)} />
	</T.Points>
{/each}
