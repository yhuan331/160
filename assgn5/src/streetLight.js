import * as THREE from "three";
import UTIL from "./utilities.js";

export default class StreetLight extends THREE.Group {
	animationSpeed = 5;

	constructor() {
		super();

		const base_lower = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.5), UTIL.dark_Material);
		base_lower.castShadow = base_lower.receiveShadow = true;
		this.add(base_lower);
		base_lower.position.set(0, 0.25, 0);

		const base_upper = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.5), UTIL.dark_Material);
		base_upper.castShadow = base_upper.receiveShadow = true;
		base_lower.add(base_upper);
		base_upper.position.set(0, 0.5, 0);

		const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.dark_Material);
		pole.castShadow = pole.receiveShadow  = true;
		base_upper.add(pole);
		pole.position.set(0, 2.75, 0);

		this.lightRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 9, 9), UTIL.yellow_Material);	// don't do shadows because the animation makes them look weird
		pole.add(this.lightRing1);
		this.lightRing1.position.set(0, 3, 0);

		this.lightRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.1, 9, 9), UTIL.yellow_Material);
		pole.add(this.lightRing2);
		this.lightRing2.position.set(0, 3, 0);
		this.lightRing2.rotateY(UTIL.degToRad(90));

		const pointLight = new THREE.PointLight(0xffe17d, 25, 0, 1);
		pointLight.castShadow = true;
		pole.add(pointLight);
		pointLight.position.set(0, 3, 0);
	}

	animate(deltaTime) {
		this.lightRing1.rotateOnAxis(new THREE.Vector3(4, 3, 9).normalize(), this.animationSpeed * deltaTime);
		this.lightRing2.rotateOnAxis(new THREE.Vector3(1, 5, 8).normalize(), this.animationSpeed * deltaTime);
	}
}