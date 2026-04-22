
import * as THREE from "three"

export function createCone() {
    const coneMesh = new THREE.ConeGeometry(0.1, 0.15, 36);
    const coneMaterial = new THREE.MeshBasicMaterial( {
        color: 0xffffff, wireframe: true
    })
    
    const cone = new THREE.Mesh(coneMesh, coneMaterial);
    cone.position.set(0,0.08,0);
    cone.visible = false;

    return cone;
}