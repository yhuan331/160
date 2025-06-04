
import * as THREE from "three";
import UTIL from "./utilities.js";

export default class moonlight extends THREE.Group {
	animationSpeed = 1.5;

	constructor() {
		super();

		// Glowing yellow moon sphere (no texture, just color + glow)
		this.moon = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshStandardMaterial({
				color: 0xffff66,              // pale yellow
				emissive: 0xfff166,           // strong glow
				emissiveIntensity: 2.0,       // brighter
				roughness: 0.3,
				metalness: 0.1
			})
		);
		this.moon.castShadow = true;
		this.moon.receiveShadow = true;
		this.moon.position.set(0, 3, 0);
		this.add(this.moon);

		// Bright yellow point light inside the moon
		const pointLight = new THREE.PointLight(0xfff580, 40, 30, 2);
		pointLight.castShadow = true;
		pointLight.position.set(0, 0, 0); // center of moon
		this.moon.add(pointLight);

		// Reference to toggle later
		this.lampLight = pointLight;
	}

	animate(deltaTime) {
		// Gentle spin animation
		this.moon.rotateOnAxis(new THREE.Vector3(0, 1, 0), this.animationSpeed * deltaTime);
	}
}
