import type { System } from '$lib/attractors';
import { writable } from 'svelte/store';

export const controls = writable<
	Record<
		System,
		{
			autoRotate: boolean;
			isPaused: boolean;
		}
	>
>({
	Halvorsen: {
		autoRotate: true,
		isPaused: false,
	},
	Sprott: {
		autoRotate: true,
		isPaused: false,
	},
	Lorenz: {
		autoRotate: true,
		isPaused: false,
	},
});

export const positions = writable<
	Record<
		System,
		Array<{
			name: string;
			dotColor: string;
			x: number;
			y: number;
			z: number;
			speed: number;
			trailLength: number;
		}>
	>
>({
	Halvorsen: [
		{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
	],
	Sprott: [
		{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
	],
	Lorenz: [
		{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
	],
});
