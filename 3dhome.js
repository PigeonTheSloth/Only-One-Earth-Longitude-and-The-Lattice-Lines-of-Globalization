import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";


/*
THREE ELEMENTS NEEDED:
-renderer
-camera
-scene object */

//set size of renderer

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('globeModel');

const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias:true
});

renderer.setSize(w,h);

//SCENE

const scene = new THREE.Scene();

//CAMERA

const fov = 75; //field of view
const aspect = w/h;
const near = 0.01; //anything rendered closer to the camera than 0.1 units will be invisible
const far = 100; //anything further than ten units wont be rendered

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 0.2; //set the camera a little further away

//light

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x260aa3);
scene.add(hemiLight);


//controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;


//loader
const loader = new GLTFLoader();
loader.load(
    './latitude_and_longitude_low_poly/scene.gltf',
     (gltf) => {
    const model = gltf.scene;

    // Scale down if too big
    model.scale.set(0.5, 0.5, 0.5);

    // Move to center of scene
    model.position.set(0, 0, 0);

    // Optional: rotate if needed
    model.rotation.y = Math.PI; 

    scene.add(model);
}
);



//Animation

    function animate (t=0) {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    animate();

