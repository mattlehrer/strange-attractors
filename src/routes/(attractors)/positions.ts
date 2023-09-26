import type { System } from '$lib/attractors';
import { writable } from 'svelte/store';

export const controls = writable<
	Record<
		System,
		{
			autorotate: boolean;
			dots: Array<{
				name: string;
				dotColor: string;
				x: number;
				y: number;
				z: number;
				speed: number;
				trailLength: number;
			}>;
		}
	>
>({
	Halvorsen: {
		autorotate: true,
		dots: [
			{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
		],
	},
	Sprott: {
		autorotate: true,
		dots: [
			{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
		],
	},
	Lorenz: {
		autorotate: true,
		dots: [
			{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0, speed: 50, trailLength: 1000 },
		],
	},
});
