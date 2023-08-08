<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import {
		BufferGeometry,
		Float32BufferAttribute,
		PointsMaterial,
		Color,
		type NormalBufferAttributes
	} from 'three';
	import * as knobby from 'svelte-knobby';
	import { lorenzPositions } from './stores';
	import { hexToRgb } from './utils';

	export let dotColor = '#ff2211';
	export let name: string;

	export let init = [0.01, 0, 0];
	let [x, y, z] = init;
	let trailLength = 2_500;

	const controls = knobby.panel({
		$id: `${name}`,
		$label: `${name}`,
		Color: dotColor,
		Speed: {
			$label: 'Speed',
			value: 50,
			min: 1,
			max: 100,
			step: 1
		},
		trailLength: {
			$label: 'Trail Length',
			value: trailLength,
			min: 100,
			max: 10_000,
			step: 100
		},
		'Starting Position': {
			x: init[0],
			y: init[1],
			z: init[2]
		},
		Reset: (value) => {
			x = value['Starting Position'].x;
			y = value['Starting Position'].y;
			z = value['Starting Position'].z;
			// return value;
		},
		Remove: () => {
			$lorenzPositions = $lorenzPositions.filter((dot) => dot.name !== name);
		}
	});
	$controls.name = $controls.name;
	try {
		localStorage.setItem(`svelte-knobby:open:${name}`, 'false');
	} catch {
		// do nothing
	}

	const dotGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false
	});

	// let opacity = 1;
	let size = 5;
	$: rgb = hexToRgb($controls.Color);

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;
	$: dt = $controls.Speed ? $controls.Speed / 5000 : 0.01;

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
		trail = trail.slice(-$controls.trailLength);

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));
	});
</script>

<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} color={new Color($controls.Color)} />
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
