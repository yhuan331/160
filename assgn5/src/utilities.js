
import * as THREE from "three";

const blue_Material = new THREE.MeshPhongMaterial({color: 0x078BE2});
const yellow_Material = new THREE.MeshPhongMaterial({color: 0xFAF658});
const red_Material = new THREE.MeshPhongMaterial({color: 0xD71605});
const green_Material = new THREE.MeshPhongMaterial({color: 0x58E53F});
const dark_Material = new THREE.MeshPhongMaterial({color: 0x4B4B4B});

function degToRad(degrees) { return degrees * (Math.PI / 180); }

export default {
	blue_Material,
	yellow_Material,
	red_Material,
	green_Material,
	dark_Material,
	degToRad
};