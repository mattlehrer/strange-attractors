import { writable } from 'svelte/store';

export const lorenzPositions = writable([
	{ name: 'Dot 1', dotColor: '#ff2211', x: 0.01, y: 0, z: 0 }
	// { name: 'Blue', dotColor: 0x2288ff, lineColor: 0x2277aa, x: 0, y: 0.01, z: 0 },
	// { name: 'Green', dotColor: 0x22ff66, lineColor: 0x22aa66, x: 0, y: 0.02, z: 0.01 }
]);
