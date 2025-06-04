

import * as THREE from "three";

// Helper function to create a MeshPhongMaterial with a given color
const createMaterial = (hexColor) => new THREE.MeshPhongMaterial({ color: hexColor });

// Predefined materials
const Materials = {
	blue:  createMaterial(0x078BE2),
	yellow: createMaterial(0xFAF658),
	red:    createMaterial(0xD71605),
	green:  createMaterial(0x58E53F),
	dark:   createMaterial(0x4B4B4B)
};

// Degree to radians conversion
const degToRad = (degrees) => degrees * (Math.PI / 180);

// Export grouped utilities
export default {
	...Materials,
	degToRad
};
