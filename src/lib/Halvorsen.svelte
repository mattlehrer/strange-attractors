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
	export let speed = 50;
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

	let a = 1.89;
	$: dt = speed ? (10 * Math.log(speed)) / 4000 : 0.025;

	let trail: [BufferGeometry<NormalBufferAttributes>, PointsMaterial][] = [];

	useFrame(() => {
		const dx = (-a * x - 4 * y - 4 * z - y ** 2) * dt;
		const dy = (-a * y - 4 * z - 4 * x - z ** 2) * dt;
		const dz = (-a * z - 4 * x - 4 * y - x ** 2) * dt;
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
