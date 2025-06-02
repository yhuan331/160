import * as THREE from "three";
import UTIL from "./utilities.js";

export default class Seesaw extends THREE.Group {
	animationTilt = 0.25;
	animationSpeed = 1;

	constructor() {
		super();

		const base = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 3, 1), UTIL.blue_Material);
		base.castShadow = base.receiveShadow = true;
		this.add(base);
		base.position.set(0, 0.5, 0);
		base.rotateX(UTIL.degToRad(270));
	
		this.board = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.25, 1), UTIL.yellow_Material);
		this.board.castShadow = this.board.receiveShadow =true;
		base.add(this.board);
		this.board.position.set(0, 0, 1);
		this.board.rotateX(UTIL.degToRad(90));
	
		const handle_L = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 1), UTIL.blue_Material);
		handle_L.castShadow = handle_L.receiveShadow = true;
		this.board.add(handle_L);
		handle_L.position.set(-2, 0.25, 0);
	
		const handle_R = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 1), UTIL.blue_Material);
		handle_R.castShadow = handle_R.receiveShadow = true;
		this.board.add(handle_R);
		handle_R.position.set(2, 0.25, 0);
	}

	animate(time) {
		this.board.rotation.z = (Math.sin(time * this.animationSpeed) * this.animationTilt);
	}
}