import { writable } from 'svelte/store';

export const lorenzPositions = writable([
	[0.01, 0, 0],
	[0, 0.01, 0]
]);
