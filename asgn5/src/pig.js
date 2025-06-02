
import * as THREE from 'three';

export default class Pig extends THREE.Group {
  constructor() {
    super();

    const pink = new THREE.MeshStandardMaterial({ color: 0xf4b6b6 });
    const snoutPink = new THREE.MeshStandardMaterial({ color: 0xe18b8b });
    const hoof = new THREE.MeshStandardMaterial({ color: 0x663333 });
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const black = new THREE.MeshStandardMaterial({ color: 0x000000 });

    // Helper to make and place cube
    const makePart = (w, h, d, mat, pos) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(...pos);
      return mesh;
    };

    // Base transform
    const baseY = 0.15;

    // Body
    this.add(makePart(0.5, 0.25, 0.7, pink, [0, baseY + 0.125, 0]));

    // Head
    this.add(makePart(0.35, 0.35, 0.35, pink, [0.45, baseY + 0.25, 0]));

    // Face / snout
    this.add(makePart(0.3, 0.3, 0.03, snoutPink, [0.62, baseY + 0.3, 0]));
    this.add(makePart(0.15, 0.09, 0.06, snoutPink, [0.65, baseY + 0.3, 0]));

    // Nostrils
    this.add(makePart(0.03, 0.03, 0.01, hoof, [0.68, baseY + 0.37, -0.015]));
    this.add(makePart(0.03, 0.03, 0.01, hoof, [0.68, baseY + 0.37, 0.015]));

    // Ears
    this.add(makePart(0.12, 0.12, 0.03, pink, [0.35, baseY + 0.55, -0.1]));
    this.add(makePart(0.12, 0.12, 0.03, pink, [0.35, baseY + 0.55, 0.1]));

    // Eyes (white)
    this.add(makePart(0.1, 0.061, 0.04, white, [0.58, baseY + 0.45, -0.1]));
    this.add(makePart(0.1, 0.061, 0.04, white, [0.58, baseY + 0.45, 0.1]));

    // Eyes (black)
    this.add(makePart(0.05, 0.061, 0.04, black, [0.6, baseY + 0.45, -0.1]));
    this.add(makePart(0.05, 0.061, 0.04, black, [0.6, baseY + 0.45, 0.1]));

    // Legs upper (adjusted based on original matrix intent)
    this.add(makePart(0.1, 0.1, 0.1, pink, [-0.15, baseY, -0.3]));
    this.add(makePart(0.1, 0.1, 0.1, pink, [-0.15, baseY, 0.3]));
    this.add(makePart(0.1, 0.1, 0.1, pink, [0.2, baseY, -0.3]));
    this.add(makePart(0.1, 0.1, 0.1, pink, [0.2, baseY, 0.3]));

    // Legs lower
    this.add(makePart(0.08, 0.08, 0.08, hoof, [-0.15, baseY - 0.09, -0.3]));
    this.add(makePart(0.08, 0.08, 0.08, hoof, [-0.15, baseY - 0.09, 0.3]));
    this.add(makePart(0.08, 0.08, 0.08, hoof, [0.2, baseY - 0.09, -0.3]));
    this.add(makePart(0.08, 0.08, 0.08, hoof, [0.2, baseY - 0.09, 0.3]));
  }
}