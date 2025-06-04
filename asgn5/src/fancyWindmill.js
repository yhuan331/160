import * as THREE from 'three';

class FancyWindmill extends THREE.Group {
    constructor() {
        super();
        
        // Materials
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B7355,
            roughness: 0.9,
            metalness: 0.1
        });
        
        const woodMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.8
        });
        
        const roofMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513,
            roughness: 0.7
        });
        
        const bladeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xF5DEB3,
            side: THREE.DoubleSide
        });
        
        // Base - Tapered cylinder (wider at bottom)
        const baseGeometry = new THREE.CylinderGeometry(0.8, 1.2, 4, 8);
        const base = new THREE.Mesh(baseGeometry, stoneMaterial);
        base.position.y = 2;
        base.castShadow = true;
        base.receiveShadow = true;
        this.add(base);
        
        // Add stone texture details
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const stone = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 0.4, 0.1),
                stoneMaterial
            );
            stone.position.set(
                Math.cos(angle) * 1.1,
                1 + Math.random() * 2,
                Math.sin(angle) * 1.1
            );
            stone.rotation.y = angle;
            this.add(stone);
        }
        
        // Middle section with windows
        const middleGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 8);
        const middle = new THREE.Mesh(middleGeometry, stoneMaterial);
        middle.position.y = 4.75;
        this.add(middle);
        
        // Windows
        const windowMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x87CEEB,
            emissive: 0x87CEEB,
            emissiveIntensity: 0.2
        });
        
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const window = new THREE.Mesh(
                new THREE.PlaneGeometry(0.3, 0.4),
                windowMaterial
            );
            window.position.set(
                Math.cos(angle) * 0.7,
                4.75,
                Math.sin(angle) * 0.7
            );
            window.rotation.y = angle;
            this.add(window);
        }
        
        // Roof - Conical
        const roofGeometry = new THREE.ConeGeometry(1, 1.5, 8);
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 6.25;
        roof.castShadow = true;
        this.add(roof);
        
        // Blade hub
        const hubGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 8);
        const hub = new THREE.Mesh(hubGeometry, woodMaterial);
        hub.position.set(0, 5, 0.9);
        hub.rotation.x = Math.PI / 2;
        this.add(hub);
        
        // Blades container
        this.blades = new THREE.Group();
        this.blades.position.set(0, 5, 1.2);
        
        // Create 4 detailed blades
        for (let i = 0; i < 4; i++) {
            const bladeGroup = new THREE.Group();
            
            // Main blade shape - tapered
            const bladeShape = new THREE.Shape();
            bladeShape.moveTo(0, 0);
            bladeShape.lineTo(2, 0.1);
            bladeShape.lineTo(2.5, 0.3);
            bladeShape.lineTo(2.5, -0.3);
            bladeShape.lineTo(2, -0.1);
            bladeShape.lineTo(0, 0);
            
            const bladeGeometry = new THREE.ExtrudeGeometry(bladeShape, {
                depth: 0.05,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                bevelSegments: 2
            });
            
            const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
            blade.castShadow = true;
            bladeGroup.add(blade);
            
            // Blade frame
            const frameGeometry = new THREE.BoxGeometry(2.5, 0.05, 0.08);
            const frame = new THREE.Mesh(frameGeometry, woodMaterial);
            frame.position.x = 1.25;
            bladeGroup.add(frame);
            
            // Cross supports
            const support1 = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.6, 0.05),
                woodMaterial
            );
            support1.position.set(0.8, 0, 0.04);
            bladeGroup.add(support1);
            
            const support2 = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.5, 0.05),
                woodMaterial
            );
            support2.position.set(1.6, 0, 0.04);
            bladeGroup.add(support2);
            
            bladeGroup.rotation.z = i * Math.PI / 2;
            this.blades.add(bladeGroup);
        }
        
        this.add(this.blades);
        
        // Door at base
        const doorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4B2F20
        });
        const door = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 1, 0.1),
            doorMaterial
        );
        door.position.set(0, 0.5, 1.15);
        this.add(door);
        
        // Door handle
        const handle = new THREE.Mesh(
            new THREE.SphereGeometry(0.05),
            new THREE.MeshStandardMaterial({ color: 0xFFD700 })
        );
        handle.position.set(0.2, 0.5, 1.2);
        this.add(handle);
        
        // Platform around windmill
        const platformGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 16);
        const platform = new THREE.Mesh(platformGeometry, stoneMaterial);
        platform.position.y = 0.05;
        platform.receiveShadow = true;
        this.add(platform);
        
        // Decorative fence around platform
        const fenceMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            const post = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 0.3),
                fenceMaterial
            );
            post.position.set(
                Math.cos(angle) * 1.8,
                0.25,
                Math.sin(angle) * 1.8
            );
            this.add(post);
        }
    }
    
    animate(deltaTime) {
        // Rotate blades with varying speed
        this.blades.rotation.z += 0.03 + Math.sin(Date.now() * 0.001) * 0.01;
    }
}



export default FancyWindmill;
