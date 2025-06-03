

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
    seesaw.position.set(6, 0, -7);

    const swings = new SwingSet();
    scene.add(swings);
    swings.position.set(-10, 0, -7);
    swings.rotateY(UTIL.degToRad(30));

    const pig = new Pig();
    pig.position.set(-2, 0, 1); 
    scene.add(pig);

    const streetLight = new StreetLight();
    scene.add(streetLight);
    streetLight.position.set(-4, 0, 6);


	mtlLoader.load("assets/12222_Cat_v1_l3.mtl", mtl => {
		mtl.preload();
		objLoader.setMaterials(mtl);
		objLoader.load("assets/12222_Cat_v1_l3.obj", root => {
			// have to do all code in the callback because don't know when it'll finish
			// and idk how to do JS promises or .then() whatever stuffs
			scene.add(root);
			root.scale.set(0.05, 0.05, 0.05);
			root.scale.multiplyScalar(0.5);
			root.position.set(2,0,-2);
			root.rotateX(UTIL.degToRad(270));
		});
	});



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

    const fountain = new Fountain();
    scene.add(fountain);
    fountain.position.set(0, 0, 0);  
	fountain.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed

    // Add more light types for assignment requirements
    // Point light for variety (requirement: 3 different light types)
    const pointLight = new THREE.PointLight(0xff9900, 1, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Hemisphere light for more natural lighting
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.3);
    scene.add(hemiLight);

class ParkBench extends THREE.Group {
    constructor(textureLoader) {
        super();
        const woodMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x8B4513,
            map: textureLoader.load('assets/wood_texture.jpg')
        });
        
        // Bench seat - lower position
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.2, 1),
            woodMaterial
        );
        seat.position.y = 0.6;  // Lowered from 1 to 0.6
        seat.castShadow = true;
        seat.receiveShadow = true;
        this.add(seat);
        
        // Bench back - lower position
        const back = new THREE.Mesh(
            new THREE.BoxGeometry(3, 1, 0.1),
            woodMaterial
        );
        back.position.set(0, 1.1, -0.4);  // Lowered from 1.5 to 1.1
        back.castShadow = true;
        back.receiveShadow = true;
        this.add(back);
        
        // Shorter legs
        for (let x of [-1.3, 1.3]) {
            for (let z of [-0.3, 0.3]) {
                const leg = new THREE.Mesh(
                    new THREE.BoxGeometry(0.1, 0.6, 0.1),  // Changed height from 1 to 0.6
                    woodMaterial
                );
                leg.position.set(x, 0.3, z);  // Changed y from 0.5 to 0.3
                leg.castShadow = true;
                leg.receiveShadow = true;
                this.add(leg);
            }
        }
    }
}
    // Create benches with the textureLoader
    const bench1 = new ParkBench(textureLoader);  // Pass textureLoader here
    bench1.position.set(-2, 0, -8);
    scene.add(bench1);




	// Add path/walkway
	const pathMaterial = new THREE.MeshStandardMaterial({
		color: 0x696969,
		roughness: 0.8,
		metalness: 0.1
	});

	const path = new THREE.Mesh(
		new THREE.PlaneGeometry(3, 20),
		pathMaterial
	);
	path.rotation.x = -Math.PI / 2;
	path.position.set(0, 0.01, 0);
	scene.add(path);

    requestAnimationFrame(tick);

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