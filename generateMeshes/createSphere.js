
import * as THREE from "three"

export function createSphere() {

    const sphereMesh = new THREE.SphereGeometry(0.084, 36, 36,);
    const sphereEdge = new THREE.EdgesGeometry(sphereMesh);
    
    const lineMaterial = new THREE.LineBasicMaterial( {
        color: 0xffffff,
        transparent: true,
        opacity: 0.25
    });
    
    const sphere = new THREE.LineSegments(sphereEdge, lineMaterial);
    return sphere;
};