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
		<tr>
			<th>Red</th>
			<td>{$lorenzPositions[0][0].toFixed(2)}</td>
			<td>{$lorenzPositions[0][1].toFixed(2)}</td>
			<td>{$lorenzPositions[0][2].toFixed(2)}</td>
		</tr>
		<tr>
			<th>Blue</th>
			<td>{$lorenzPositions[1][0].toFixed(2)}</td>
			<td>{$lorenzPositions[1][1].toFixed(2)}</td>
			<td>{$lorenzPositions[1][2].toFixed(2)}</td>
		</tr>
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
