import * as THREE from "three";

export default class Pig extends THREE.Group {
    constructor() {
        super();
        
        // Define pig colors
        const bodyColor = 0xF8BABA;    // Pink
        const snoutColor = 0xECA6A6;   // Darker pink
        const hoofColor = 0xD99999;    // Even darker pink
        const footColor = 0x663333;    // Dark brown
        
        // Materials
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: bodyColor });
        const snoutMaterial = new THREE.MeshPhongMaterial({ color: snoutColor });
        const hoofMaterial = new THREE.MeshPhongMaterial({ color: hoofColor });
        const footMaterial = new THREE.MeshPhongMaterial({ color: footColor });
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        
        // Body - SMALLER and HIGHER UP
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.3, 0.7), // Made less tall
            bodyMaterial
        );
        body.position.set(0, 0.5, 0); // Raised up so legs show
        body.castShadow = true;
        this.add(body);
        
        // Head
        this.head = new THREE.Group();
        const headMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 0.35, 0.35),
            bodyMaterial
        );
        headMesh.castShadow = true;
        this.head.add(headMesh);
        
        // Snout
        const snout = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.09, 0.12),
            snoutMaterial
        );
        snout.position.set(0, -0.05, 0.2); // Changed to positive Z (forward)
        this.head.add(snout);
        
        // Nostrils
        const nostrilGeometry = new THREE.BoxGeometry(0.03, 0.03, 0.02);
        const leftNostril = new THREE.Mesh(nostrilGeometry, footMaterial);
        leftNostril.position.set(-0.04, -0.05, 0.26); // Positive Z
        this.head.add(leftNostril);
        
        const rightNostril = new THREE.Mesh(nostrilGeometry, footMaterial);
        rightNostril.position.set(0.04, -0.05, 0.26); // Positive Z
        this.head.add(rightNostril);
        
        // Eyes
        const eyeGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.04);
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.1, 0.1, 0.15); // Positive Z
        this.head.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.1, 0.1, 0.15); // Positive Z
        this.head.add(rightEye);
        
        // Pupils
        const pupilGeometry = new THREE.BoxGeometry(0.05, 0.06, 0.01);
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.1, 0.1, 0.17); // Positive Z
        this.head.add(leftPupil);
        
        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0.1, 0.1, 0.17); // Positive Z
        this.head.add(rightPupil);
        
        // Ears
        const earGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.03);
        const leftEar = new THREE.Mesh(earGeometry, bodyMaterial);
        leftEar.position.set(-0.12, 0.15, 0.1);
        leftEar.rotation.z = -0.3;
        this.head.add(leftEar);
        
        const rightEar = new THREE.Mesh(earGeometry, bodyMaterial);
        rightEar.position.set(0.12, 0.15, 0.1);
        rightEar.rotation.z = 0.3;
        this.head.add(rightEar);
        
        // Position head - in FRONT of body
        this.head.position.set(0, 0.5, 0.35); // Positive Z (forward)
        this.add(this.head);
        
        // Legs - with proper positioning
        this.createLeg(-0.15, 0, -0.2, bodyMaterial, hoofMaterial, footMaterial); // Front left
        this.createLeg(0.15, 0, -0.2, bodyMaterial, hoofMaterial, footMaterial);  // Front right
        this.createLeg(-0.15, 0, 0.2, bodyMaterial, hoofMaterial, footMaterial);   // Back left
        this.createLeg(0.15, 0, 0.2, bodyMaterial, hoofMaterial, footMaterial);    // Back right
        
        // Tail - at the BACK
        const tail = new THREE.Mesh(
            new THREE.ConeGeometry(0.05, 0.15, 8),
            hoofMaterial
        );
        tail.position.set(0, 0.5, -0.35); // Negative Z (back)
        tail.rotation.z = Math.PI;
        tail.rotation.x = 0.5;
        this.add(tail);
    }
    
    createLeg(x, y, z, bodyMat, hoofMat, footMat) {
        const legGroup = new THREE.Group();
        
        // Upper leg
        const upperLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.2, 0.1), // Longer
            bodyMat
        );
        upperLeg.position.y = 0.25; // Start from body bottom
        upperLeg.castShadow = true;
        legGroup.add(upperLeg);
        
        // Lower leg
        const lowerLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.2, 0.08), // Longer
            hoofMat
        );
        lowerLeg.position.y = 0.05; // Below upper leg
        lowerLeg.castShadow = true;
        legGroup.add(lowerLeg);
        
        // Foot
        const foot = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.05, 0.1),
            footMat
        );
        foot.position.y = -0.025; // On ground
        foot.castShadow = true;
        legGroup.add(foot);
        
        legGroup.position.set(x, y, z);
        this.add(legGroup);
        
        return legGroup;
    }
    
    // Optional: Add animation
    animate(time) {
        // Waggle tail
        const tail = this.children[this.children.length - 1];
        tail.rotation.z = Math.PI + Math.sin(time * 5) * 0.3;
        
        // Bob head slightly
        this.head.rotation.x = Math.sin(time * 2) * 0.05;
    }
}