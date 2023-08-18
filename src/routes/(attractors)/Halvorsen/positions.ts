import { writable } from 'svelte/store';

export const dots = writable([{ name: 'Dot 1', dotColor: '#fff5f5', x: 0.01, y: 0.0, z: 0.0 }]);
