import * as THREE from "three"
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

export function createGlobe(scene, onLoaded) {
    const loader = new GLTFLoader();
    loader.load('./latitude_and_longitude_low_poly/scene.gltf', (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        model.rotation.y = Math.PI;
        model.rotation.x = Math.PI;
        model.rotation.z = Math.PI;
        scene.add(model);
        onLoaded(model);  // hand the model back when ready
    });
}