
//load dependencies
import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

//3d loading

//project loading
import { createPoints } from "./generatePoints.js";
import { updateLabels } from "./labelUpdater.js";
import { raycasterPointsInit } from "./raycasterPoints.js"

import { callProjects } from "./callProjects.js";
import { createProjectsNavbar } from "./generateProjectNavbar.js";

//meshmakers
import {createSphere } from "./generateMeshes/createSphere.js"
import {createCone } from "./generateMeshes/createCone.js"
import {createCylinder } from "./generateMeshes/createCylinder.js"
import {createGlobe} from "./generateMeshes/createGlobe.js"

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

//add points to scene;
const { points, allLocations } = createPoints(scene);

//CAMERA

const fov = 75; //field of view
const aspect = w/h;
const near = 0.01; //anything rendered closer to the camera than 0.1 units will be invisible
const far = 100; //anything further than ten units wont be rendered

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 0.25; //set the camera a little further away



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


//build globe model
let model;
createGlobe(scene, (loadedModel) => {
    model = loadedModel;
    // anything that depends on model goes here
});

//conical projection
const cone = createCone();

//cylindrical projection
const cylinder = createCylinder();

//sphere wireframe
const sphere = createSphere();

//putting all of the models into a group
const sceneGroup = new THREE.Group();
scene.add(sceneGroup);

sceneGroup.add(sphere);
sceneGroup.add(cone);
sceneGroup.add(cylinder);
sceneGroup.add(model)


//Animation
const lightOffset = new THREE.Vector3(1,1,1);

//ray tracing
const raycasterG = new THREE.Raycaster();
const raycasterP = new THREE.Raycaster();
raycasterP.params.Points.threshold = 0.01;
raycasterG.params.Points.threshold = 0.01;

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {

    //convert screen coordinates to normalized device coordinates
    
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

document.addEventListener('mousedown', onMouseDown);

    function animate (t=0) {
        requestAnimationFrame(animate);

        updateLabels(allLocations, camera);


        //fixed lighting
        const rotatedOffset = lightOffset.clone().applyQuaternion(camera.quaternion);
        light.position.copy(camera.position).add(rotatedOffset);

        light.target.position.set(0,0,0);
        light.target.updateMatrixWorld();
        renderer.render(scene, camera);
        controls.update();

        //raycaster
        raycasterG.setFromCamera(mouse,camera);
        const objectsToTest = [];
        if (model) { objectsToTest.push(model);}

        const intersections = raycasterG.intersectObjects(objectsToTest,true);
        if (intersections.length > 0) {
            light.color.set(0x9898c);
        }
        else {
            light.color.set(0xffffff);
        }

     
    }
    animate();

    //rayhelper
//     const rayHelper = new THREE.ArrowHelper(
//     raycasterP.ray.direction,
//     raycasterP.ray.origin,
//     1,
//     0xffff00
// );

// scene.add(rayHelper);

callProjects(name); //behavior for fetching projects

function onMouseDown() {
    camera.updateMatrixWorld();
    controls.update();

    raycasterP.setFromCamera(mouse, camera);
   
    // visualize ray correctly
    // rayHelper.position.copy(raycasterP.ray.origin);
    // rayHelper.setDirection(raycasterP.ray.direction.clone().normalize());

    raycasterPointsInit(raycasterP, points, model);
};



const divExplain = document.getElementById("explanation");
const projectsNavbar = document.getElementById("projectsNavbar");
const coneButton = document.getElementById("conical");
const cylinderButton = document.getElementById("cylindrical");

const conicalExp = document.getElementById("conicalExp");
const cylExp = document.getElementById("cylExp");

const title = document.getElementById("openTitle");
const titleSub = document.getElementById("openTitleSub");



//Load buttons

coneButton.addEventListener('click', () => {
camera.position.z = 0.25;
camera.position.y = 0;
    
    camera.clearViewOffset()
    cone.visible = true;
    cylinder.visible = false;
    
    divExplain.style.display = "none";
    projectsNavbar.style.display = "none";

    conicalExp.style.display = "block";
    cylExp.style.display = "none";

    title.style.display = "none";
    titleSub.style.display = "none";
  

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
    

cylinderButton.addEventListener('click', () => {

camera.position.z = 0.2;
camera.position.y = 0;

camera.clearViewOffset()

    cylinder.visible = true;
    cone.visible = false;
    model.visible = true;

    divExplain.style.display = "none";
    projectsNavbar.style.display = "none";

    conicalExp.style.display = "none";
    cylExp.style.display = "block";
    
    title.style.display = "none";
    titleSub.style.display = "none";

   
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

camera.position.z = 0.25;
camera.position.y = 0;

    cylinder.visible = false;
    cone.visible = false;
    sphere.visible = true;
    model.visible = true;

    divExplain.style.display = "block";
    conicalExp.style.display = "none";
    cylExp.style.display = "none";

     
    title.style.display = "block";
    titleSub.style.display = "block";

    projectsNavbar.style.display = "block";

}
);

const hpopup = document.getElementById("halfpPopup");
hpopup.addEventListener('click', (e) => {
    const button = e.target.closest("#closeButtonAF");
    if (button) {
        e.currentTarget.style.display = "none";
        console.log("closeconfirm");
    }
});

//project showing hiding


createProjectsNavbar( points, allLocations );
