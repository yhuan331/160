
import * as THREE from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import UTIL from "./utilities.js";
import Seesaw from "./seesaw.js";
import SwingSet from "./swingSet.js";
import StreetLight from "./streetLight.js";
import Pig from './pig.js';
import Fountain from './fountain.js';


function main() {
	const canvas = document.getElementById("canvas");

	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	renderer.shadowMap.enabled = true;

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xDDDDDD, 0.015);
	
	const camera = new THREE.PerspectiveCamera(60, canvas.width/canvas.height, 0.1, 500);	
	camera.position.set(0, 3, 10);

	const textureLoader = new THREE.TextureLoader();
	const objLoader = new OBJLoader();
	const mtlLoader = new MTLLoader();

	const orbitControls = new OrbitControls(camera, canvas);
	orbitControls.target.set(0, 3, 0);

	const directionalLight = new THREE.DirectionalLight(0xABD3E1, 5);	
	directionalLight.shadow.camera.left = directionalLight.shadow.camera.bottom = -25;
	directionalLight.shadow.camera.right = directionalLight.shadow.camera.top = 25;
	directionalLight.shadow.camera.far = 50;
	directionalLight.castShadow = true;
	scene.add(directionalLight);
	directionalLight.position.set(15, 20, 10);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
	scene.add(ambientLight);

	const skyTexture = textureLoader.load("assets/skyTexture2.jpeg");
	skyTexture.mapping = THREE.EquirectangularReflectionMapping;
	skyTexture.colorSpace = THREE.SRGBColorSpace;
	scene.background = skyTexture;

	const grass_Floor = textureLoader.load("assets/grass-texture-background_64049-124.jpg.avif");
	grass_Floor.wrapS = grass_Floor.wrapT = THREE.RepeatWrapping;
	grass_Floor.repeat.set(5, 5);
	
	const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({map: grass_Floor, side: THREE.DoubleSide}));
	ground.receiveShadow = true;
	scene.add(ground);
	ground.rotateX(UTIL.degToRad(90));

	const seesaw = new Seesaw();
	scene.add(seesaw);
	//seesaw.position.set(6, 0, 2);
	seesaw.position.set(6, 0, -7);

	const swings = new SwingSet();
	scene.add(swings);
	swings.position.set(-10, 0, -7);
	swings.rotateY(UTIL.degToRad(30));

	const pig = new Pig();
	pig.position.set(-2, 0, 4); 
	scene.add(pig);


	const streetLight = new StreetLight();
	scene.add(streetLight);
	streetLight.position.set(-4, 0, 6);

	const treeTexture = textureLoader.load("assets/tree.png");
	const treeBillboard = new THREE.Sprite(new THREE.SpriteMaterial({map: treeTexture, transparent: true}));
	scene.add(treeBillboard);
	treeBillboard.position.set(-10, 5, -25);
	treeBillboard.scale.set(10, 10, 10);

	for (let i = 0; i < 5; i++) {
		const tree = new THREE.Sprite(new THREE.SpriteMaterial({ map: treeTexture, transparent: true }));
		tree.position.set(-20 + i * 10, 5, -25 + (i % 2) * 5);
		tree.scale.set(10, 10, 10);
		scene.add(tree);
		}

	requestAnimationFrame(tick)


	    const fountain = new Fountain();
    scene.add(fountain);
    fountain.position.set(0, 0, 0);  


	let prevTime = 0;



function tick(time) {
        time /= 1000;

        seesaw.animate(time);
        streetLight.animate(time - prevTime);
        fountain.animate(time);  
        
        renderer.render(scene, camera);
        prevTime = time;
        requestAnimationFrame(tick);
    }
}

main();