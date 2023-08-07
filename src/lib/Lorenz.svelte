<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Color } from 'three';
	import * as knobby from 'svelte-knobby';
	import { lorenzPositions } from './stores';

	export let MAX_POINTS = 100;
	export let dotColor = '#ff2211';
	export let name: string;

	export let init = [0.01, 0, 0];
	let [x, y, z] = init;
	let size = 5;

	let trailingDots: Array<{ color: Color; position: [number, number, number] }> = [];
	// let positions: Array<number> = [];

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

	// const trailMaterial = new PointsMaterial({
	// 	sizeAttenuation: false
	// });

	const colors: Color[] = [];
	let red = 0.95;
	for (let j = 0; j < MAX_POINTS; j++) {
		colors.push(new Color(red, 0.01, 0.004));
		red = red * (0.96 - 1 / MAX_POINTS);
	}
	console.log({ colors });

	let a = 10;
	let b = 28;
	let c = 8.0 / 3.0;

	const dt = 0.01;
	let i = 0;

	useFrame(() => {
		const dx = a * (y - x) * dt;
		const dy = (x * (b - z) - y) * dt;
		const dz = (x * y - c * z) * dt;
		x = x + dx;
		y = y + dy;
		z = z + dz;

		dotGeometry.setAttribute('position', new Float32BufferAttribute([x, y, z], 3));

		if (!(i % 5)) {
			trailingDots = trailingDots.map((d, i) => ({
				...d,
				color: colors[trailingDots.length - i - 1]
			}));
			trailingDots = [
				...trailingDots,
				{ color: colors[MAX_POINTS - 1], position: [x, y, z] } as (typeof trailingDots)[0]
			].slice(-MAX_POINTS);
		}
		i++;
	});
</script>

{#each trailingDots as dot (dot.position)}
	{@const geometry = new BufferGeometry().setAttribute(
		'position',
		new Float32BufferAttribute(dot.position, 3)
	)}
	{@const trailMaterial = new PointsMaterial({
		sizeAttenuation: false
	})}
	<T.Points>
		<T is={geometry} />
		<T is={trailMaterial} size={2} color={dot.color} />
	</T.Points>
{/each}
<T.Points>
	<T is={dotGeometry} />
	<T is={dotMaterial} {size} color={new Color($controls.Color)} />
</T.Points>
