import type { System } from '$lib/attractors/settings';
import { writable } from 'svelte/store';
import { uid } from 'uid';

export const isPaused = writable<boolean>(false);
export const isAutoRotate = writable<boolean>(true);

export const positions = writable<
	Record<
		System,
		Array<{
			count: number;
			dotColor: string;
			x: number;
			y: number;
			z: number;
			speed: number;
			trailLength: number;
			id: string;
		}>
	>
>({
	Halvorsen: [
		{
			count: 1,
			dotColor: '#fff5f5',
			x: 0.01,
			y: 0.0,
			z: 0.0,
			speed: 50,
			trailLength: 1000,
			id: uid(),
		},
	],
	Sprott: [
		{
			count: 1,
			dotColor: '#fff5f5',
			x: 0.01,
			y: 0.01,
			z: 0.0,
			speed: 50,
			trailLength: 1000,
			id: uid(),
		},
	],
	Lorenz: [
		{
			count: 1,
			dotColor: '#fff5f5',
			x: 0.01,
			y: 0.0,
			z: 0.0,
			speed: 50,
			trailLength: 1000,
			id: uid(),
		},
	],
});
