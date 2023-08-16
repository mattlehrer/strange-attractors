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

	// let opacity = 1;
	let size = 5;
	$: rgb = hexToRgb(color);

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;
	$: dt = speed ? speed / 5000 : 0.01;

	let trail: [BufferGeometry<NormalBufferAttributes>, PointsMaterial][] = [];

	useFrame(() => {
		const dx = a * (y - x) * dt;
		const dy = (x * (b - z) - y) * dt;
		const dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
		const material = new PointsMaterial({
			sizeAttenuation: false
		});
		trail.push([geometry, material]);
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

<!-- <T.Line>
	<T is={lineGeometry} />
	<T is={lineMaterial} color={new Color($controls.Color)} />
</T.Line> -->
