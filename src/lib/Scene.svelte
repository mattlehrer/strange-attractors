<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Lorenz from './Lorenz.svelte';
	import { writable } from 'svelte/store';

	const lorenzPositions = writable([{ name: 'Dot 1', dotColor: '#fff5f5' }]);

	export let autorotate = false;
</script>

<T.PerspectiveCamera makeDefault position={[-150, 300, 150]} fov={13}>
	<OrbitControls
		autoRotate={autorotate}
		enableZoom={true}
		enableDamping
		autoRotateSpeed={0.5}
		target.y={0}
		target.z={30}
	/>
</T.PerspectiveCamera>

{#each $lorenzPositions as dot (dot.name)}
	<Lorenz color={dot.dotColor} trailLength={200} speed={120} />
{/each}
