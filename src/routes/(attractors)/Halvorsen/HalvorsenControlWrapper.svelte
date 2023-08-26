<script lang="ts">
	import * as knobby from 'svelte-knobby';
	import { dots } from './positions';
	import Halvorsen from '$lib/Halvorsen.svelte';

	export let name: string;
	export let trailLength = 2_500;
	export let dotColor = '#ff2211';
	export let init = [0.01, 0, 0];

	let [x, y, z] = init;

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
			min: 1,
			max: 5_000,
			step: 1
		},
		'Starting Position': {
			x: init[0],
			y: init[1],
			z: init[2]
		},
		Reset: (value: typeof $controls) => {
			x = value['Starting Position'].x;
			y = value['Starting Position'].y;
			z = value['Starting Position'].z;
			// return value;
		},
		Remove: () => {
			$dots = $dots.filter((dot) => dot.name !== name);
		}
	});
	$controls.name = $controls.name;
	try {
		localStorage.setItem(`svelte-knobby:open:${name}`, 'false');
	} catch {
		// do nothing
	}
</script>

<Halvorsen
	color={$controls.Color}
	speed={$controls.Speed}
	init={[x, y, z]}
	trailLength={$controls.trailLength}
/>
