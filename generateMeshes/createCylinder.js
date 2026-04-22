
import * as THREE from "three"

export function createCylinder() {
    const cylinderMesh = new THREE.CylinderGeometry(0.085, 0.085, 0.17, 36);
    const cylinderEdge= new THREE.EdgesGeometry(cylinderMesh);
    
    const lineCyl = new THREE.LineBasicMaterial( {
        color: 0xffffff
    });
    
    const cylinder = new THREE.LineSegments(cylinderEdge, lineCyl);
    
    
    cylinder.visible = false;

    return cylinder;
};