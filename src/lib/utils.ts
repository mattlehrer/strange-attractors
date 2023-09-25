import { Color, SRGBColorSpace } from 'three';

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
	dt
}: {
	rgb: [number, number, number];
	trailLength: number;
	dt: number;
}) => {
	const colors: Array<number> = [];
	for (let i = 0; i < trailLength; i++) {
		const coefficient = !((trailLength - i) % Math.max(Math.floor(1000 * dt), 10))
			? i / trailLength
			: i / trailLength / 4;
		const color = new Color();
		color.setRGB(
			(rgb[0] * coefficient) / 255,
			(rgb[1] * coefficient) / 255,
			(rgb[2] * coefficient) / 255
		);
		colors.push(color.r, color.g, color.b);
	}

	return colors;
};
