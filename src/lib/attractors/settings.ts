export type System = 'Lorenz' | 'Sprott' | 'Halvorsen';

export const settings: Record<
	System,
	{
		near: number;
		fov: number;
		target: [number, number, number];
		position: [number, number, number];
		trailLength: number;
		speed: number;
		zoom: number;
		offsetX: number;
		offsetY: number;
		initScale: number;
	}
> = {
	Lorenz: {
		near: 0.01,
		fov: 25,
		position: [-175, 175, 175],
		target: [0, 0, 30],
		trailLength: 1000,
		speed: 75,
		zoom: 1,
		offsetX: 10,
		offsetY: 5,
		initScale: 8,
	},
	Sprott: {
		near: 0.01,
		fov: 1.75,
		position: [-150, 150, 150],
		target: [0.7, 0, 0],
		trailLength: 500,
		speed: 100,
		zoom: 1.5,
		offsetX: 0,
		offsetY: 0,
		initScale: 1,
	},
	Halvorsen: {
		near: 0.01,
		fov: 10,
		position: [150, 150, 150],
		target: [-3, -2, -4],
		trailLength: 500,
		speed: 50,
		zoom: 1,
		offsetX: -10,
		offsetY: 0,
		initScale: 1,
	},
};
