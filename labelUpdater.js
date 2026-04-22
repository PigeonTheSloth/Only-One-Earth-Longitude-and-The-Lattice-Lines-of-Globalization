
    import * as THREE from "three";

    export function updateLabels(locationsAll, camera) {
        camera.updateMatrixWorld();

        locationsAll.forEach((locationGroup) => {
            locationGroup.forEach(loc => {
                 if (!loc.label || loc.label.style.display === "none") return;
                const vector = new THREE.Vector3(...loc.coords);
        
                vector.project(camera);
        
                const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
                const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
        
                loc.label.style.left = x + "px";
                loc.label.style.top = y + "px";
            });

        });
    }
