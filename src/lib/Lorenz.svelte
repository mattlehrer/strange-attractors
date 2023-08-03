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
	import * as knobby from 'svelte-knobby';
	import { lorenzPositions } from './stores';

	export let MAX_POINTS = 25000;
	export let dotColor = '#ff2211';
	export let name: string;

	export let init = [0.01, 0, 0];
	let [x, y, z] = init;

	const controls = knobby.panel({
		$id: `${name}`,
		$label: `${name}`,
		Color: dotColor,
		'Starting Position': {
			x: init[0],
			y: init[1],
			z: init[2]
		},
		Reset: (value) => {
			x = value['Starting Position'].x;
			y = value['Starting Position'].y;
			z = value['Starting Position'].z;
			i = 0;
			// return value;
		},
		Remove: () => {
			console.log({ pos: $lorenzPositions });
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
	const lineGeometry = new BufferGeometry();

	const dotMaterial = new PointsMaterial({
		sizeAttenuation: false
	});
	const lineMaterial = new LineBasicMaterial();

	// let opacity = 1;
	let size = 5;

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	const dt = 0.01;
	let i = 0;

	lineGeometry.setAttribute('position', new BufferAttribute(new Float32Array(MAX_POINTS * 3), 3));

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
	<T is={dotMaterial} {size} color={new Color($controls.Color)} />
</T.Points>

<T.Line>
	<T is={lineGeometry} />
	<T is={lineMaterial} color={new Color($controls.Color)} />
</T.Line>
