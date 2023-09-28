import { Color } from 'three';

export const hexToRgb = (hex: string) => {
	return hex
		.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
		.substring(1)
		.match(/.{2}/g)
		?.map((x) => parseInt(x, 16)) as [number, number, number];
};

export const trailColors = ({
	rgb,
	trailLength,
	dt,
	prefersReducedMotion,
}: {
	rgb: [number, number, number];
	trailLength: number;
	dt: number;
	prefersReducedMotion: boolean;
}) => {
	const colors: Array<number> = [];
	for (let i = 0; i < trailLength; i++) {
		const ratio = prefersReducedMotion ? 1 : 4;

		const coefficient = !((trailLength - i) % Math.max(Math.floor(trailLength * dt), 10))
			? i / trailLength
			: i / trailLength / ratio;

		const color = new Color();
		color.setRGB(
			(rgb[0] * coefficient) / 255,
			(rgb[1] * coefficient) / 255,
			(rgb[2] * coefficient) / 255,
		);
		colors.unshift(color.r, color.g, color.b);
	}

	return colors;
};
