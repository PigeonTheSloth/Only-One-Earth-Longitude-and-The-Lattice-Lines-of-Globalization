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



//controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;


//loader
const loader = new GLTFLoader();


//light
const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(1,1,1)
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

//3d model of the globe
let model;

loader.load(
    './latitude_and_longitude_low_poly/scene.gltf',
     (gltf) => {
    model = gltf.scene;

    // Scale down if too big
    model.scale.set(0.5, 0.5, 0.5);

    // Move to center of scene
    model.position.set(0, 0, 0);

    // Optional: rotate if needed
    model.rotation.y = Math.PI; 
    model.rotation.x = Math.PI;
    model.rotation.z = Math.PI;


    scene.add(model);
    sceneGroup.add(model)
}
);



//conical projection
const coneMesh = new THREE.ConeGeometry(0.1, 0.15, 36);
const coneMaterial = new THREE.MeshBasicMaterial( {
    color: 0xffffff, wireframe: true
})

const cone = new THREE.Mesh(coneMesh, coneMaterial);
cone.position.set(0,0.08,0);
cone.visible = false;
scene.add(cone);

//cylindrical projection
const cylinderMesh = new THREE.CylinderGeometry(0.085, 0.085, 0.17, 36);
const cylinderEdge= new THREE.EdgesGeometry(cylinderMesh);

const lineCyl = new THREE.LineBasicMaterial( {
    color: 0xffffff
});

const cylinder = new THREE.LineSegments(cylinderEdge, lineCyl);


cylinder.visible = true;
scene.add(cylinder);



//sphere wireframe

const sphereMesh = new THREE.SphereGeometry(0.084, 36, 36,);
const sphereEdge = new THREE.EdgesGeometry(sphereMesh);

const lineMaterial = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    transparent: true,
    opacity: 0.25
});

const sphere = new THREE.LineSegments(sphereEdge, lineMaterial);
scene.add(sphere);

// //testing loglat math
const boulderGeom = new THREE.SphereGeometry(0.001,10,10);
const boulderMat = new THREE.MeshBasicMaterial({color: 0xffffff});

const boulder = new THREE.Mesh(boulderGeom, boulderMat);
scene.add(boulder);
boulder.position.set(-0.0641112,0.0540155,0.0052994);

//east timor
const timorGeom = new THREE.SphereGeometry(0.001,10,10);
const timorMat = new THREE.MeshBasicMaterial({color: 0xffffff});

const timor = new THREE.Mesh(timorGeom, timorMat);
scene.add(timor);
timor.position.set(-0.0705571,0.041695,0.0184181);


const newyGeom = new THREE.SphereGeometry(0.001,10,10);
const newyMat = new THREE.MeshBasicMaterial({color: 0xffffff});

const newy = new THREE.Mesh(newyGeom, newyMat);
scene.add(newy);
newy.position.set(-0.0515149,0.0547905,0.0374195);


const mcdonaldGeom = new THREE.SphereGeometry(0.001,10,10);
const mcdonaldMat = new THREE.MeshBasicMaterial({color: 0xffffff});

const mcdonald = new THREE.Mesh(mcdonaldGeom, mcdonaldMat);
scene.add(mcdonald);
mcdonald.position.set(0.0503623,-0.0671575,-0.003084);




//putting all of the models into a group
const sceneGroup = new THREE.Group();
scene.add(sceneGroup);

sceneGroup.add(sphere);
sceneGroup.add(model);
sceneGroup.add(cone);
sceneGroup.add(cylinder);

//Animation
const lightOffset = new THREE.Vector3(1,1,1);

//ray tracing
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {

    //convert screen coordinates to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 -1;
    mouse.y = (event.clientY / window.innerHeight) * 2 -1;
})

    function animate (t=0) {
        requestAnimationFrame(animate);

        //fixed lighting
        const rotatedOffset = lightOffset.clone().applyQuaternion(camera.quaternion);
        light.position.copy(camera.position).add(rotatedOffset);

        light.target.position.set(0,0,0);
        light.target.updateMatrixWorld();
        renderer.render(scene, camera);
        controls.update();

        //raycaster
        raycaster.setFromCamera(mouse,camera);
        const objectsToTest = [];
        if (model) { objectsToTest.push(model);}

        const intersections = raycaster.intersectObjects(objectsToTest,true);
        if (intersections.length > 0) {
            light.color.set(0x9898c);
        }
        else {
            light.color.set(0xffffff);
        }

     
    }
    animate();

//Load buttons
const coneButton = document.getElementById("conical");

coneButton.addEventListener('click', () => {

camera.position.z = 0.25;
camera.position.y = 0;
    
    camera.clearViewOffset()
    cone.visible = true;
    cylinder.visible = false;
    camera.setViewOffset(
  w,        // full width
  h,       // full height
  w * 0.2,  // offsetX (positive = shift right)
  0,            // offsetY
  w,        // sub width
  h        // sub height
);

//sceneGroup.position.y= -0.03;

}
);


const cylinderButton = document.getElementById("cylindrical");

    

cylinderButton.addEventListener('click', () => {

camera.position.z = 0.2;
camera.position.y = 0;

camera.clearViewOffset()

    cylinder.visible = true;
    cone.visible = false;
    model.visible = true;

camera.setViewOffset(
  w,        // full width
  h,       // full height
  w * 0.2,  // offsetX (positive = shift right)
  0,            // offsetY
  w,        // sub width
  h        // sub height
);
}
);

const noneButton = document.getElementById("none");
noneButton.addEventListener('click', () => {

   
camera.clearViewOffset()

camera.position.z = 0.2;
camera.position.y = 0;

    cylinder.visible = false;
    cone.visible = false;
    sphere.visible = true;
    model.visible = true;
    
   


}
);