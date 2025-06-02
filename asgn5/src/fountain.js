// import * as THREE from "three";

// export default class Fountain extends THREE.Group {
//     constructor() {
//         super();
        
//         // Initialize properties
//         this.particleCount = 200;
//         this.particles = null;
//         this.velocities = new Float32Array(this.particleCount * 3);
//         this.ages = new Float32Array(this.particleCount);
        
//         this.createStructure();
//         this.createWaterEffects();
//         this.createParticleSystem();
//     }
    
//     createStructure() {
//         // Large base pool
//         const basePool = new THREE.Mesh(
//             new THREE.CylinderGeometry(3, 3.5, 0.4, 64),
//             new THREE.MeshStandardMaterial({ 
//                 color: 0x8B7355,
//                 roughness: 0.7,
//                 metalness: 0.1 
//             })
//         );
//         basePool.position.y = 0.2;
//         basePool.receiveShadow = true;
//         basePool.castShadow = true;
//         this.add(basePool);

//         // Water in base pool
//         this.baseWater = new THREE.Mesh(
//             new THREE.CylinderGeometry(2.8, 2.8, 0.3, 64),
//             new THREE.MeshPhysicalMaterial({
//                 color: 0x006994,
//                 transparent: true,
//                 opacity: 0.6,
//                 transmission: 0.9,
//                 roughness: 0,
//                 metalness: 0.1,
//                 ior: 1.33,
//                 thickness: 0.5
//             })
//         );
//         this.baseWater.position.y = 0.25;
//         this.add(this.baseWater);

//         // Middle tier
//         const middleTier = new THREE.Mesh(
//             new THREE.CylinderGeometry(1.5, 2, 0.3, 32),
//             new THREE.MeshStandardMaterial({ 
//                 color: 0x8B7355,
//                 roughness: 0.7,
//                 metalness: 0.1 
//             })
//         );
//         middleTier.position.y = 1.2;
//         middleTier.castShadow = true;
//         this.add(middleTier);

//         // Middle tier water
//         this.middleWater = new THREE.Mesh(
//             new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32),
//             new THREE.MeshPhysicalMaterial({
//                 color: 0x006994,
//                 transparent: true,
//                 opacity: 0.6,
//                 transmission: 0.9,
//                 roughness: 0,
//                 metalness: 0.1,
//                 ior: 1.33,
//                 thickness: 0.5
//             })
//         );
//         this.middleWater.position.y = 1.25;
//         this.add(this.middleWater);

//         // Top tier
//         const topTier = new THREE.Mesh(
//             new THREE.CylinderGeometry(0.8, 1.2, 0.25, 32),
//             new THREE.MeshStandardMaterial({ 
//                 color: 0x8B7355,
//                 roughness: 0.7,
//                 metalness: 0.1 
//             })
//         );
//         topTier.position.y = 2;
//         topTier.castShadow = true;
//         this.add(topTier);

//         // Central spout
//         const spout = new THREE.Mesh(
//             new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16),
//             new THREE.MeshStandardMaterial({ 
//                 color: 0x666666,
//                 roughness: 0.3,
//                 metalness: 0.7 
//             })
//         );
//         spout.position.y = 2.5;
//         spout.castShadow = true;
//         this.add(spout);

//         // Add rim decoration
//         const rimGeometry = new THREE.TorusGeometry(3.2, 0.1, 8, 32);
//         const rimMaterial = new THREE.MeshStandardMaterial({ 
//             color: 0x444444,
//             roughness: 0.2,
//             metalness: 0.8
//         });
//         const rim = new THREE.Mesh(rimGeometry, rimMaterial);
//         rim.position.y = 0.4;
//         rim.rotation.x = Math.PI / 2;
//         this.add(rim);
//     }
    
//     createWaterEffects() {
//         // Falling water streams
//         const streamGeometry = new THREE.TubeGeometry(
//             new THREE.CatmullRomCurve3([
//                 new THREE.Vector3(0, 2.9, 0),
//                 new THREE.Vector3(0.5, 2.5, 0),
//                 new THREE.Vector3(1.2, 1.5, 0),
//                 new THREE.Vector3(1.5, 1.2, 0)
//             ]),
//             20, 0.05, 8, false
//         );

//         const streamMaterial = new THREE.MeshPhysicalMaterial({
//             color: 0x4488ff,
//             transparent: true,
//             opacity: 0.4,
//             transmission: 0.8,
//             roughness: 0,
//             metalness: 0
//         });

//         // Create multiple streams
//         for (let i = 0; i < 8; i++) {
//             const stream = new THREE.Mesh(streamGeometry, streamMaterial);
//             stream.rotation.y = (i / 8) * Math.PI * 2;
//             this.add(stream);
//         }

//         // Optional: Add underwater light
//         const underwaterLight = new THREE.PointLight(0x00aaff, 2, 5);
//         underwaterLight.position.set(0, 0.3, 0);
//         this.add(underwaterLight);
//     }
    
//     createParticleSystem() {
//         // Water particles
//         const particles = new THREE.BufferGeometry();
//         const positions = new Float32Array(this.particleCount * 3);

//         // Initialize particles
//         for (let i = 0; i < this.particleCount; i++) {
//             positions[i * 3] = 0;
//             positions[i * 3 + 1] = 2.9;
//             positions[i * 3 + 2] = 0;
            
//             const angle = Math.random() * Math.PI * 2;
//             const speed = 0.05 + Math.random() * 0.1;
//             this.velocities[i * 3] = Math.cos(angle) * speed;
//             this.velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2;
//             this.velocities[i * 3 + 2] = Math.sin(angle) * speed;
            
//             this.ages[i] = Math.random() * 2;
//         }

//         particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//         const particleMaterial = new THREE.PointsMaterial({
//             color: 0xaaccff,
//             size: 0.1,
//             transparent: true,
//             opacity: 0.6,
//             sizeAttenuation: true,
//             blending: THREE.AdditiveBlending
//         });

//         this.particleSystem = new THREE.Points(particles, particleMaterial);
//         this.add(this.particleSystem);
//     }
    
//     animate(time) {
//         // Animate water particles
//         const positions = this.particleSystem.geometry.attributes.position.array;
        
//         for (let i = 0; i < this.particleCount; i++) {
//             // Update position
//             positions[i * 3] += this.velocities[i * 3] * 0.1;
//             positions[i * 3 + 1] += this.velocities[i * 3 + 1] * 0.1;
//             positions[i * 3 + 2] += this.velocities[i * 3 + 2] * 0.1;
            
//             // Apply gravity
//             this.velocities[i * 3 + 1] -= 0.015;
            
//             // Update age
//             this.ages[i] += 0.02;
            
//             // Reset particle if needed
//             if (positions[i * 3 + 1] < 0.5 || this.ages[i] > 2) {
//                 positions[i * 3] = 0;
//                 positions[i * 3 + 1] = 2.9;
//                 positions[i * 3 + 2] = 0;
                
//                 const angle = Math.random() * Math.PI * 2;
//                 const speed = 0.05 + Math.random() * 0.1;
//                 this.velocities[i * 3] = Math.cos(angle) * speed;
//                 this.velocities[i * 3 + 1] = 0.3 + Math.random() * 0.2;
//                 this.velocities[i * 3 + 2] = Math.sin(angle) * speed;
                
//                 this.ages[i] = 0;
//             }
//         }
        
//         this.particleSystem.geometry.attributes.position.needsUpdate = true;
        
//         // Animate water surfaces
//         this.baseWater.material.opacity = 0.6 + Math.sin(time * 2) * 0.1;
//         this.
// 
// middleWater.material.opacity = 0.6 + Math.sin(time * 2 + 1) * 0.1;
//     }
// }

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

        // Water in base pool - make it more visible
        this.baseWater = new THREE.Mesh(
            new THREE.CylinderGeometry(2.9, 2.9, 0.35, 64),
            new THREE.MeshPhysicalMaterial({
                color: 0x1a6b9a,
                transparent: true,
                opacity: 0.85,
                transmission: 0.3,
                roughness: 0.05,
                metalness: 0,
                ior: 1.33,
                thickness: 0.5,
                reflectivity: 0.5,
                clearcoat: 1,
                clearcoatRoughness: 0
            })
        );
        this.baseWater.position.y = 0.35; // Position it higher so it's visible
        this.add(this.baseWater);

        // Add water surface detail for base pool
        const baseWaterSurface = new THREE.Mesh(
            new THREE.RingGeometry(0, 2.9, 64),
            new THREE.MeshBasicMaterial({
                color: 0x4499dd,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            })
        );
        baseWaterSurface.rotation.x = -Math.PI / 2;
        baseWaterSurface.position.y = 0.53;
        this.add(baseWaterSurface);

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

        // Middle tier water - more visible
        this.middleWater = new THREE.Mesh(
            new THREE.CylinderGeometry(1.4, 1.4, 0.25, 32),
            new THREE.MeshPhysicalMaterial({
                color: 0x1a6b9a,
                transparent: true,
                opacity: 0.85,
                transmission: 0.3,
                roughness: 0.05,
                metalness: 0,
                ior: 1.33,
                thickness: 0.5,
                reflectivity: 0.5,
                clearcoat: 1,
                clearcoatRoughness: 0
            })
        );
        this.middleWater.position.y = 1.3; // Position higher
        this.add(this.middleWater);

        // Middle water surface
        const middleWaterSurface = new THREE.Mesh(
            new THREE.RingGeometry(0, 1.4, 32),
            new THREE.MeshBasicMaterial({
                color: 0x4499dd,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            })
        );
        middleWaterSurface.rotation.x = -Math.PI / 2;
        middleWaterSurface.position.y = 1.43;
        this.add(middleWaterSurface);

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

        // Top tier water
        this.topWater = new THREE.Mesh(
            new THREE.CylinderGeometry(0.7, 0.7, 0.2, 32),
            new THREE.MeshPhysicalMaterial({
                color: 0x1a6b9a,
                transparent: true,
                opacity: 0.85,
                transmission: 0.3,
                roughness: 0.05,
                metalness: 0,
                ior: 1.33,
                thickness: 0.5,
                reflectivity: 0.5,
                clearcoat: 1,
                clearcoatRoughness: 0
            })
        );
        this.topWater.position.y = 2.08;
        this.add(this.topWater);

        // Top water surface
        const topWaterSurface = new THREE.Mesh(
            new THREE.RingGeometry(0, 0.7, 32),
            new THREE.MeshBasicMaterial({
                color: 0x4499dd,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            })
        );
        topWaterSurface.rotation.x = -Math.PI / 2;
        topWaterSurface.position.y = 2.18;
        this.add(topWaterSurface);

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

        // Add foam/bubbles where water hits
        this.createFoamEffects();
    }

    createFoamEffects() {
        // Foam ring where water hits base pool
        const foamGeometry = new THREE.TorusGeometry(0.8, 0.2, 8, 16);
        const foamMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.4
        });
        
        const foam = new THREE.Mesh(foamGeometry, foamMaterial);
        foam.position.y = 0.53;
        foam.rotation.x = -Math.PI / 2;
        foam.scale.set(1, 1, 0.3);
        this.add(foam);
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
        this.

middleWater.material.opacity = 0.6 + Math.sin(time * 2 + 1) * 0.1;
    }
}