import * as THREE from "three";	
import UTIL from "./utilities.js";

export default class SwingSet extends THREE.Group {
	constructor() {
		super();

		const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 10), UTIL.red_Material);
		topBar.castShadow = topBar.receiveShadow = true;
		this.add(topBar);
		topBar.position.set(0, 3.5, 0);
		topBar.rotateZ(UTIL.degToRad(270));

		const stand_L_Front = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_L_Front.castShadow = stand_L_Front.receiveShadow = true;
		topBar.add(stand_L_Front);
		stand_L_Front.position.set(0, -5, 0);
		stand_L_Front.rotateZ(UTIL.degToRad(90));
		stand_L_Front.rotateX(UTIL.degToRad(315));
		stand_L_Front.translateY(-2.5);

		const stand_L_Back = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_L_Back.castShadow = stand_L_Back.receiveShadow = true;
		topBar.add(stand_L_Back);
		stand_L_Back.position.set(0, -5, 0);
		stand_L_Back.rotateZ(UTIL.degToRad(90));
		stand_L_Back.rotateX(UTIL.degToRad(45));
		stand_L_Back.translateY(-2.5);

		const stand_R_Front = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_R_Front.castShadow = stand_R_Front.receiveShadow = true;
		topBar.add(stand_R_Front);
		stand_R_Front.position.set(0, 5, 0);
		stand_R_Front.rotateZ(UTIL.degToRad(90));
		stand_R_Front.rotateX(UTIL.degToRad(315));
		stand_R_Front.translateY(-2.5);

		const stand_R_Back = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 5), UTIL.red_Material);
		stand_R_Back.castShadow = stand_R_Back.receiveShadow = true;
		topBar.add(stand_R_Back);
		stand_R_Back.position.set(0, 5, 0);
		stand_R_Back.rotateZ(UTIL.degToRad(90));
		stand_R_Back.rotateX(UTIL.degToRad(45));
		stand_R_Back.translateY(-2.5);

		const seat_L_rope_L = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_L_rope_L.castShadow = seat_L_rope_L.receiveShadow = true;
		topBar.add(seat_L_rope_L);
		seat_L_rope_L.position.set(1.5, -3, 0);
		seat_L_rope_L.rotateZ(UTIL.degToRad(90));

		const seat_L_rope_R = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_L_rope_R.castShadow = seat_L_rope_R.receiveShadow = true;
		topBar.add(seat_L_rope_R);
		seat_L_rope_R.position.set(1.5, -1, 0);
		seat_L_rope_R.rotateZ(UTIL.degToRad(90));

		const seat_L = new THREE.Mesh(new THREE.BoxGeometry(2, 0.25, 1), UTIL.green_Material);
		seat_L.castShadow = seat_L.receiveShadow = true;
		seat_L_rope_L.add(seat_L);
		seat_L.position.set(1, -1.5, 0);

		const seat_R_rope_L = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_R_rope_L.castShadow = seat_R_rope_L.receiveShadow = true;
		topBar.add(seat_R_rope_L);
		seat_R_rope_L.position.set(1.5, 1, 0);
		seat_R_rope_L.rotateZ(UTIL.degToRad(90));

		const seat_R_rope_R = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3), UTIL.yellow_Material);
		seat_R_rope_R.castShadow = seat_R_rope_R.receiveShadow = true;
		topBar.add(seat_R_rope_R);
		seat_R_rope_R.position.set(1.5, 3, 0);
		seat_R_rope_R.rotateZ(UTIL.degToRad(90));

		const seat_R = new THREE.Mesh(new THREE.BoxGeometry(2, 0.25, 1), UTIL.green_Material);
		seat_R.castShadow = seat_R.receiveShadow = true;
		seat_R_rope_L.add(seat_R);
		seat_R.position.set(1, -1.5);
	}
}