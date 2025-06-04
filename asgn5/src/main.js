import * as THREE from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import UTIL from "./utilities.js";
import moonlight from "./moonlight.js";
import Pig from './pig.js';
import Fountain from './fountain.js';
import FancyWindmill from './fancyWindmill.js';

function main() {
    const canvas = document.getElementById("canvas");

    const renderScene = new THREE.WebGLRenderer({antialias: true, canvas});
    renderScene.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 500);

    const orbitControls = new OrbitControls(camera, canvas);
 
    const textureLoader = new THREE.TextureLoader();

        camera.position.set(2.55349, 3.11625, 6.39629);   // Your captured position
        orbitControls.target.set(0, 2.5, 0);              // Target stays the same
        orbitControls.update();                          // Apply it




    const directionalLight = new THREE.DirectionalLight(0xABD3E1, 5);    
    directionalLight.shadow.camera.left = directionalLight.shadow.camera.bottom = -25;
    directionalLight.shadow.camera.right = directionalLight.shadow.camera.top = 25;
    directionalLight.shadow.camera.far = 50;
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    directionalLight.position.set(15, 20, 10);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const skybox = cubeTextureLoader.load([
        'assets/px.png', // +X (right)
        'assets/nx.png', // -X (left)
        'assets/py.png', // +Y (top)
        'assets/ny.png', // -Y (bottom)
        'assets/pz.png', // +Z (front)
        'assets/nz.png'  // -Z (back)
    ]);

    scene.background = skybox;

        
    const grass_Floor = textureLoader.load("assets/grass-texture-background_64049-124.jpg.avif");
    grass_Floor.wrapS = grass_Floor.wrapT = THREE.RepeatWrapping;
    grass_Floor.repeat.set(5, 5);
    
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({map: grass_Floor, side: THREE.DoubleSide}));
    ground.receiveShadow = true;
    scene.add(ground);
    ground.rotateX(UTIL.degToRad(90));

    const pig = new Pig();
    pig.position.set(-2, 0, 1); 
    scene.add(pig);

    const streetLight = new moonlight();
    scene.add(streetLight);
    streetLight.position.set(-11, 0, -3);

    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('./assets/85-cottage_obj/');

    mtlLoader.load('cottage_obj.mtl', (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./assets/85-cottage_obj/');

    objLoader.load('cottage_obj.obj', (object) => {
        object.position.set(6, 0, -13);    // Change as needed
        object.scale.set(0.3, 0.3, 0.3);   // Downscale if too large
        scene.add(object);
        console.log('Cottage loaded!');
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
	fountain.scale.set(0.5, 0.5, 0.5); 

    const pointLight = new THREE.PointLight(0xff9900, 2, 100); // brighter, larger range
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);



 
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 1.5); // was 0.3
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
        seat.position.y = 0.6;  
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
   
    const bench1 = new ParkBench(textureLoader);  
    bench1.position.set(-2, 0, -8);
    scene.add(bench1);


    const windmill = new FancyWindmill();
    windmill.position.set(-10, 0, -9);
    scene.add(windmill);




    // Keep global references
    window.directionalLight = directionalLight;
    window.pointLight = pointLight;
    window.hemiLight = hemiLight;



    // Toggle button events
    document.getElementById('toggleDir').addEventListener('click', () => {
        directionalLight.visible = !directionalLight.visible;
        console.log(`Directional Light is now ${directionalLight.visible ? 'ON' : 'OFF'}`);
    });

    document.getElementById('toggleLamp').addEventListener('click', () => {
    streetLight.lampLight.visible = !streetLight.lampLight.visible;
    console.log(`Lamp is now ${streetLight.lampLight.visible ? 'ON' : 'OFF'}`);
    });


    document.getElementById('toggleHemi').addEventListener('click', () => {
        hemiLight.visible = !hemiLight.visible;
        console.log(`Hemisphere Light is now ${hemiLight.visible ? 'ON' : 'OFF'}`);
    });

    document.getElementById("toggleAmbient").addEventListener("click", () => {
    ambientLight.visible = !ambientLight.visible;
    console.log(`Ambient Light is now ${ambientLight.visible ? 'ON' : 'OFF'}`);
    });



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

    function animateWindmill() {
    windmillBlades.rotation.z += 0.05;
    }




    requestAnimationFrame(tick);

    let prevTime = 0;

  



  function tick(time) {
    time /= 1000;
    const deltaTime = time - prevTime;
    streetLight.animate(time - prevTime);
    fountain.animate(time);


  windmill.animate(deltaTime);
    renderScene.render(scene, camera);
    prevTime = time;
    requestAnimationFrame(tick);

    console.log('Camera position:', camera.position);
    console.log('OrbitControls target:', orbitControls.target);

}


}

main();