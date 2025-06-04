import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import UTIL from "./utilities.js";
import moonlight from "./moonlight.js";
import Pig from "./pig.js";
import Fountain from "./fountain.js";
import FancyWindmill from "./fancyWindmill.js";

function main() {
  // === SETUP RENDERER, SCENE, CAMERA ===
  const canvas = document.getElementById("canvas");
  const render = new THREE.WebGLRenderer({ antialias: true, canvas });
  render.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 500);
  camera.position.set(2.55349, 3.11625, 6.39629);

  const orbitControls = new OrbitControls(camera, canvas);
  orbitControls.target.set(0, 2.5, 0);
  orbitControls.update();

  const textureLoader = new THREE.TextureLoader();

  // === LIGHTING ===
  const directionalLight = new THREE.DirectionalLight(0xABD3E1, 6);
    directionalLight.position.set(18, 24, 12);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.camera.far = 60;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff9900, 2.5, 120);
    pointLight.position.set(6, 6, 6);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 1.7);
    scene.add(hemiLight);


  // === SKYBOX ===
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    "assets/px.png", "assets/nx.png",
    "assets/py.png", "assets/ny.png",
    "assets/pz.png", "assets/nz.png"
  ]);

  // === GROUND ===
  const grass = textureLoader.load("assets/grass-texture-background_64049-124.jpg.avif");
  grass.wrapS = grass.wrapT = THREE.RepeatWrapping;
  grass.repeat.set(5, 5);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({ map: grass, side: THREE.DoubleSide })
  );
  ground.receiveShadow = true;
  ground.rotation.x = UTIL.degToRad(90);
  scene.add(ground);

  // === STATIC OBJECTS (PIG, BENCH, WINDMILL, FOUNTAIN, LAMP POST) ===
  const pig = new Pig();
  pig.position.set(-2, 0, 1);
  scene.add(pig);

  const fountain = new Fountain();
  fountain.position.set(0, 0, 0);
  fountain.scale.set(0.5, 0.5, 0.5);
  scene.add(fountain);

  const moon = new moonlight();
  moon.position.set(-11, 0, -3);
  scene.add(moon);

  const windmill = new FancyWindmill();
  windmill.position.set(-10, 0, -9);
  scene.add(windmill);

  // === PATH ===
  const path = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 20),
    new THREE.MeshStandardMaterial({ color: 0x696969, roughness: 0.8, metalness: 0.1 })
  );
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.01, 0);
  scene.add(path);

  // === BENCH CLASS ===
  class ParkBench extends THREE.Group {
    constructor(textureLoader) {
      super();
      const woodMaterial = new THREE.MeshPhongMaterial({
        color: 0x8B4513,
        map: textureLoader.load("assets/wood_texture.jpg"),
      });

      const seat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 1), woodMaterial);
      seat.position.y = 0.6;
      seat.castShadow = seat.receiveShadow = true;
      this.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.1), woodMaterial);
      back.position.set(0, 1.1, -0.4);
      back.castShadow = back.receiveShadow = true;
      this.add(back);

      for (let x of [-1.3, 1.3]) {
        for (let z of [-0.3, 0.3]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.1), woodMaterial);
          leg.position.set(x, 0.3, z);
          leg.castShadow = leg.receiveShadow = true;
          this.add(leg);
        }
      }
    }
  }

  const bench1 = new ParkBench(textureLoader);
  bench1.position.set(-2, 0, -8);
  scene.add(bench1);

  // === TREE BILLBOARDS ===
  const treeTexture = textureLoader.load("assets/tree.png");

  for (let i = 0; i < 6; i++) {
    const tree = new THREE.Sprite(new THREE.SpriteMaterial({ map: treeTexture, transparent: true }));
    tree.position.set(-20 + i * 10, 5, -25 + (i % 2) * 5);
    tree.scale.set(10, 10, 10);
    scene.add(tree);
  }

  // === LOAD OBJ MODEL (COTTAGE) ===
  const mtlLoader = new MTLLoader().setPath("./assets/85-cottage_obj/");
  mtlLoader.load("cottage_obj.mtl", (materials) => {
    materials.preload();
    const objLoader = new OBJLoader().setMaterials(materials).setPath("./assets/85-cottage_obj/");
    objLoader.load("cottage_obj.obj", (object) => {
      object.position.set(6, 0, -13);
      object.scale.set(0.3, 0.3, 0.3);
      scene.add(object);
      console.log("Cottage loaded!");
    });
  });

  // === GLOBAL LIGHT REFERENCES ===
  window.directionalLight = directionalLight;
  window.pointLight = pointLight;
  window.hemiLight = hemiLight;

  // === UI TOGGLE EVENTS ===
  document.getElementById("toggleDir").addEventListener("click", () => {
    directionalLight.visible = !directionalLight.visible;
    console.log(`Directional Light is now ${directionalLight.visible ? "ON" : "OFF"}`);
  });

  document.getElementById("toggleLamp").addEventListener("click", () => {
    moon.lampLight.visible = !moon.lampLight.visible;
    console.log(`Lamp is now ${moon.lampLight.visible ? "ON" : "OFF"}`);
  });

  document.getElementById("toggleHemi").addEventListener("click", () => {
    hemiLight.visible = !hemiLight.visible;
    console.log(`Hemisphere Light is now ${hemiLight.visible ? "ON" : "OFF"}`);
  });

  document.getElementById("toggleAmbient").addEventListener("click", () => {
    ambientLight.visible = !ambientLight.visible;
    console.log(`Ambient Light is now ${ambientLight.visible ? "ON" : "OFF"}`);
  });

  // === ANIMATION LOOP ===
  let prevTime = 0;
  function tick(time) {
    time /= 1000;
    const deltaTime = time - prevTime;

    moon.animate(deltaTime);
    fountain.animate(time);
    windmill.animate(deltaTime);

    render.render(scene, camera);
    prevTime = time;
    requestAnimationFrame(tick);

    // console.log("Camera position:", camera.position);
    // console.log("OrbitControls target:", orbitControls.target);
  }

  requestAnimationFrame(tick);
}

main();
