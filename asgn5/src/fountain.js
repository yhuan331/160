import * as THREE from "three";

export default class Fountain extends THREE.Group {
    constructor() {
        super();
        
        // Initialize properties
        this.particleCount = 200;
        this.particles = null;
        this.velocities = new Float32Array(this.particleCount * 3);
        this.ages = new Float32Array(this.particleCount);
        
        this.createStructure();
        this.createWaterEffects();
        this.createParticleSystem();
    }
    
    createStructure() {
        // Large base pool
        const basePool = new THREE.Mesh(
            new THREE.CylinderGeometry(3, 3.5, 0.4, 64),
            new THREE.MeshStandardMaterial({ 
                color: 0x8B7355,
                roughness: 0.7,
                metalness: 0.1 
            })
        );
        basePool.position.y = 0.2;
        basePool.receiveShadow = true;
        basePool.castShadow = true;
        this.add(basePool);

        // Water in base pool
        this.baseWater = new THREE.Mesh(
            new THREE.CylinderGeometry(2.8, 2.8, 0.3, 64),
            new THREE.MeshPhysicalMaterial({
                color: 0x006994,
                transparent: true,
                opacity: 0.6,
                transmission: 0.9,
                roughness: 0,
                metalness: 0.1,
                ior: 1.33,
                thickness: 0.5
            })
        );
        this.baseWater.position.y = 0.25;
        this.add(this.baseWater);

        // Middle tier
        const middleTier = new THREE.Mesh(
            new THREE.CylinderGeometry(1.5, 2, 0.3, 32),
            new THREE.MeshStandardMaterial({ 
                color: 0x8B7355,
                roughness: 0.7,
                metalness: 0.1 
            })
        );
        middleTier.position.y = 1.2;
        middleTier.castShadow = true;
        this.add(middleTier);

        // Middle tier water
        this.middleWater = new THREE.Mesh(
            new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32),
            new THREE.MeshPhysicalMaterial({
                color: 0x006994,
                transparent: true,
                opacity: 0.6,
                transmission: 0.9,
                roughness: 0,
                metalness: 0.1,
                ior: 1.33,
                thickness: 0.5
            })
        );
        this.middleWater.position.y = 1.25;
        this.add(this.middleWater);

        // Top tier
        const topTier = new THREE.Mesh(
            new THREE.CylinderGeometry(0.8, 1.2, 0.25, 32),
            new THREE.MeshStandardMaterial({ 
                color: 0x8B7355,
                roughness: 0.7,
                metalness: 0.1 
            })
        );
        topTier.position.y = 2;
        topTier.castShadow = true;
        this.add(topTier);

        // Central spout
        const spout = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16),
            new THREE.MeshStandardMaterial({ 
                color: 0x666666,
                roughness: 0.3,
                metalness: 0.7 
            })
        );
        spout.position.y = 2.5;
        spout.castShadow = true;
        this.add(spout);

        // Add rim decoration
        const rimGeometry = new THREE.TorusGeometry(3.2, 0.1, 8, 32);
        const rimMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x444444,
            roughness: 0.2,
            metalness: 0.8
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.position.y = 0.4;
        rim.rotation.x = Math.PI / 2;
        this.add(rim);
    }
    
    createWaterEffects() {
        // Falling water streams
        const streamGeometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 2.9, 0),
                new THREE.Vector3(0.5, 2.5, 0),
                new THREE.Vector3(1.2, 1.5, 0),
                new THREE.Vector3(1.5, 1.2, 0)
            ]),
            20, 0.05, 8, false
        );

        const streamMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4488ff,
            transparent: true,
            opacity: 0.4,
            transmission: 0.8,
            roughness: 0,
            metalness: 0
        });

        // Create multiple streams
        for (let i = 0; i < 8; i++) {
            const stream = new THREE.Mesh(streamGeometry, streamMaterial);
            stream.rotation.y = (i / 8) * Math.PI * 2;
            this.add(stream);
        }

        // Optional: Add underwater light
        const underwaterLight = new THREE.PointLight(0x00aaff, 2, 5);
        underwaterLight.position.set(0, 0.3, 0);
        this.add(underwaterLight);
    }
    
    createParticleSystem() {
        // Water particles
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);

        // Initialize particles
        for (let i = 0; i < this.particleCount; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 2.9;
            positions[i * 3 + 2] = 0;
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.05 + Math.random() * 0.1;
            this.velocities[i * 3] = Math.cos(angle) * speed;
            this.velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2;
            this.velocities[i * 3 + 2] = Math.sin(angle) * speed;
            
            this.ages[i] = Math.random() * 2;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xaaccff,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(particles, particleMaterial);
        this.add(this.particleSystem);
    }
    
    animate(time) {
        // Animate water particles
        const positions = this.particleSystem.geometry.attributes.position.array;
        
        for (let i = 0; i < this.particleCount; i++) {
            // Update position
            positions[i * 3] += this.velocities[i * 3] * 0.1;
            positions[i * 3 + 1] += this.velocities[i * 3 + 1] * 0.1;
            positions[i * 3 + 2] += this.velocities[i * 3 + 2] * 0.1;
            
            // Apply gravity
            this.velocities[i * 3 + 1] -= 0.015;
            
            // Update age
            this.ages[i] += 0.02;
            
            // Reset particle if needed
            if (positions[i * 3 + 1] < 0.5 || this.ages[i] > 2) {
                positions[i * 3] = 0;
                positions[i * 3 + 1] = 2.9;
                positions[i * 3 + 2] = 0;
                
                const angle = Math.random() * Math.PI * 2;
                const speed = 0.05 + Math.random() * 0.1;
                this.velocities[i * 3] = Math.cos(angle) * speed;
                this.velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2;
                this.velocities[i * 3 + 2] = Math.sin(angle) * speed;
                
                this.ages[i] = 0;
            }
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
        // Animate water surfaces
        this.baseWater.material.opacity = 0.6 + Math.sin(time * 2) * 0.1;
        this.middleWater.material.opacity = 0.6 + Math.sin(time * 2 + 1) * 0.1;
    }
}
	// // fountain
	// const fountainBase = new THREE.Mesh(
	// new THREE.CylinderGeometry(2, 2, 0.5, 32),
	// new THREE.MeshStandardMaterial({ color: 0x888888 }) // gray stone
	// );
	// fountainBase.position.set(0, 0.25, 0); // y = height / 2
	// fountainBase.receiveShadow = true;
	// scene.add(fountainBase);

	// // Fountain pillar
	// const fountainPillar = new THREE.Mesh(
	// new THREE.CylinderGeometry(0.3, 0.3, 2, 16),
	// new THREE.MeshStandardMaterial({ color: 0x555555 }) // darker stone
	// );
	// fountainPillar.position.set(0, 1.5, 0); // sits on base
	// fountainPillar.castShadow = true;
	// scene.add(fountainPillar);

	// // Water dome on top
	// const fountainWater = new THREE.Mesh(
	// new THREE.SphereGeometry(0.5, 16, 8, 0, Math.PI), // hemisphere
	// new THREE.MeshStandardMaterial({ color: 0x3399ff, transparent: true, opacity: 0.6 })
	// );
	// fountainWater.position.set(0, 2.5, 0); // on top of pillar
	// scene.add(fountainWater);

	// mtlLoader.load("assets/12222_Cat_v1_l3.mtl", mtl => {
	// 	mtl.preload();
	// 	objLoader.setMaterials(mtl);
	// 	objLoader.load("assets/12222_Cat_v1_l3.obj", root => {
			
	// 		scene.add(root);
	// 		root.scale.set(0.05, 0.05, 0.05);
	// 		root.position.set(3, 0, 0);  
	// 		root.rotateX(UTIL.degToRad(270));
	// 	});
	// });

    //====== try 2 =======

// 	// Create a proper fountain group
// const fountainGroup = new THREE.Group();
// scene.add(fountainGroup);

// // 1. MULTI-TIERED FOUNTAIN STRUCTURE

// // Large base pool
// const basePool = new THREE.Mesh(
//     new THREE.CylinderGeometry(3, 3.5, 0.4, 64),
//     new THREE.MeshStandardMaterial({ 
//         color: 0x8B7355,
//         roughness: 0.7,
//         metalness: 0.1 
//     })
// );
// basePool.position.y = 0.2;
// basePool.receiveShadow = true;
// basePool.castShadow = true;
// fountainGroup.add(basePool);

// // Water in base pool
// const baseWater = new THREE.Mesh(
//     new THREE.CylinderGeometry(2.8, 2.8, 0.3, 64),
//     new THREE.MeshPhysicalMaterial({
//         color: 0x006994,
//         transparent: true,
//         opacity: 0.6,
//         transmission: 0.9,
//         roughness: 0,
//         metalness: 0.1,
//         ior: 1.33, // Index of refraction for water
//         thickness: 0.5
//     })
// );
// baseWater.position.y = 0.25;
// fountainGroup.add(baseWater);

// // Middle tier
// const middleTier = new THREE.Mesh(
//     new THREE.CylinderGeometry(1.5, 2, 0.3, 32),
//     new THREE.MeshStandardMaterial({ 
//         color: 0x8B7355,
//         roughness: 0.7,
//         metalness: 0.1 
//     })
// );
// middleTier.position.y = 1.2;
// middleTier.castShadow = true;
// fountainGroup.add(middleTier);

// // Middle tier water
// const middleWater = new THREE.Mesh(
//     new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32),
//     new THREE.MeshPhysicalMaterial({
//         color: 0x006994,
//         transparent: true,
//         opacity: 0.6,
//         transmission: 0.9,
//         roughness: 0,
//         metalness: 0.1,
//         ior: 1.33,
//         thickness: 0.5
//     })
// );
// middleWater.position.y = 1.25;
// fountainGroup.add(middleWater);

// // Top tier
// const topTier = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.8, 1.2, 0.25, 32),
//     new THREE.MeshStandardMaterial({ 
//         color: 0x8B7355,
//         roughness: 0.7,
//         metalness: 0.1 
//     })
// );
// topTier.position.y = 2;
// topTier.castShadow = true;
// fountainGroup.add(topTier);

// // Central spout
// const spout = new THREE.Mesh(
//     new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16),
//     new THREE.MeshStandardMaterial({ 
//         color: 0x666666,
//         roughness: 0.3,
//         metalness: 0.7 
//     })
// );
// spout.position.y = 2.5;
// spout.castShadow = true;
// fountainGroup.add(spout);

// // 2. ANIMATED WATER PARTICLES SYSTEM

// // Water particles for the main jet
// const particleCount = 200;
// const particles = new THREE.BufferGeometry();
// const positions = new Float32Array(particleCount * 3);
// const velocities = new Float32Array(particleCount * 3);
// const ages = new Float32Array(particleCount);

// // Initialize particles
// for (let i = 0; i < particleCount; i++) {
//     positions[i * 3] = 0;
//     positions[i * 3 + 1] = 2.9;
//     positions[i * 3 + 2] = 0;
    
//     // Random initial velocities
//     const angle = Math.random() * Math.PI * 2;
//     const speed = 0.05 + Math.random() * 0.1;
//     velocities[i * 3] = Math.cos(angle) * speed;
//     velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2; // Upward velocity
//     velocities[i * 3 + 2] = Math.sin(angle) * speed;
    
//     ages[i] = Math.random() * 2;
// }

// particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// const particleMaterial = new THREE.PointsMaterial({
//     color: 0xaaccff,
//     size: 0.1,
//     transparent: true,
//     opacity: 0.6,
//     sizeAttenuation: true,
//     blending: THREE.AdditiveBlending
// });

// const particleSystem = new THREE.Points(particles, particleMaterial);
// fountainGroup.add(particleSystem);

// // 3. FALLING WATER STREAMS (curved)
// const streamGeometry = new THREE.TubeGeometry(
//     new THREE.CatmullRomCurve3([
//         new THREE.Vector3(0, 2.9, 0),
//         new THREE.Vector3(0.5, 2.5, 0),
//         new THREE.Vector3(1.2, 1.5, 0),
//         new THREE.Vector3(1.5, 1.2, 0)
//     ]),
//     20, 0.05, 8, false
// );

// const streamMaterial = new THREE.MeshPhysicalMaterial({
//     color: 0x4488ff,
//     transparent: true,
//     opacity: 0.4,
//     transmission: 0.8,
//     roughness: 0,
//     metalness: 0
// });

// // Create multiple streams around the fountain
// for (let i = 0; i < 8; i++) {
//     const stream = new THREE.Mesh(streamGeometry, streamMaterial);
//     stream.rotation.y = (i / 8) * Math.PI * 2;
//     fountainGroup.add(stream);
// }

// // 4. DECORATIVE ELEMENTS

// // Add rim decoration
// const rimGeometry = new THREE.TorusGeometry(3.2, 0.1, 8, 32);
// const rimMaterial = new THREE.MeshStandardMaterial({ 
//     color: 0x444444,
//     roughness: 0.2,
//     metalness: 0.8
// });
// const rim = new THREE.Mesh(rimGeometry, rimMaterial);
// rim.position.y = 0.4;
// rim.rotation.x = Math.PI / 2;
// fountainGroup.add(rim);

// // 5. ANIMATION FUNCTION
// function animateFountain(time) {
//     // Animate water particles
//     const positions = particleSystem.geometry.attributes.position.array;
    
//     for (let i = 0; i < particleCount; i++) {
//         // Update position based on velocity
//         positions[i * 3] += velocities[i * 3] * 0.1;
//         positions[i * 3 + 1] += velocities[i * 3 + 1] * 0.1;
//         positions[i * 3 + 2] += velocities[i * 3 + 2] * 0.1;
        
//         // Apply gravity
//         velocities[i * 3 + 1] -= 0.015;
        
//         // Update age
//         ages[i] += 0.02;
        
//         // Reset particle if it falls too low or gets too old
//         if (positions[i * 3 + 1] < 0.5 || ages[i] > 2) {
//             positions[i * 3] = 0;
//             positions[i * 3 + 1] = 2.9;
//             positions[i * 3 + 2] = 0;
            
//             const angle = Math.random() * Math.PI * 2;
//             const speed = 0.05 + Math.random() * 0.1;
//             velocities[i * 3] = Math.cos(angle) * speed;
//             velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2;
//             velocities[i * 3 + 2] = Math.sin(angle) * speed;
            
//             ages[i] = 0;
//         }
//     }
    
	
//     particleSystem.geometry.attributes.position.needsUpdate = true;
    
//     // Subtle water surface animation
//     baseWater.material.opacity = 0.6 + Math.sin(time * 2) * 0.1;
//     middleWater.material.opacity = 0.6 + Math.sin(time * 2 + 1) * 0.1;

// 	// Add water splash effects at impact points
// const splashGeometry = new THREE.RingGeometry(0.1, 0.3, 16);
// const splashMaterial = new THREE.MeshBasicMaterial({
//     color: 0xffffff,
//     transparent: true,
//     opacity: 0.3,
//     side: THREE.DoubleSide
// });

// // Add underwater lights
// const underwaterLight = new THREE.PointLight(0x00aaff, 2, 5);
// underwaterLight.position.set(0, 0.3, 0);
// fountainGroup.add(underwaterLight);

// }

// // Update your tick function to include fountain animation:
// function tick(time) {
//     time /= 1000;
    
//     seesaw.animate(time);
//     streetLight.animate(time - prevTime);
//     animateFountain(time); // Add this line
    
//     renderer.render(scene, camera);
//     prevTime = time;
//     requestAnimationFrame(tick);
// }
// }