<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { lorenzPositions } from './stores';
</script>

<Canvas>
	<Scene />
</Canvas>

<div>
	<table>
		<tr>
			<th />
			<th>x</th>
			<th>y</th>
			<th>z</th>
		</tr>
		{#each $lorenzPositions as position}
			<tr>
				<th>{position.name}</th>
				<td>{position.x.toFixed(2)}</td>
				<td>{position.y.toFixed(2)}</td>
				<td>{position.z.toFixed(2)}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		padding: 1rem;
		color: white;
		font-family: monospace;
	}

	td,
	th {
		width: 3.5rem;
		text-align: right;
	}

	th {
		text-emphasis: bold;
	}
</style>
