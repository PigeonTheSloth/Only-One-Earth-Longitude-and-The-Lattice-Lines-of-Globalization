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


cylinder.visible = false;
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

const locations = [
    { name: "Boulder", coords: [-0.0641112, 0.0540155, 0.0052994] },
    { name: "Houston", coords: [-0.0705571, 0.041695, 0.0184181] },
    { name: "New York", coords: [-0.0515149, 0.0547905, 0.0374195] },
    { name: "McDonald Island", coords: [0.0503623, -0.0671575, -0.003084] }
];

const positions = new Float32Array(
    locations.flatMap(loc => loc.coords)
);


const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 10,              // 👈 size in pixels (important!)
    sizeAttenuation: false // keeps size consistent regardless of distance
});



const points = new THREE.Points(geometry, material);
points.userData.locations = locations;

scene.add(points);


//putting all of the models into a group
const sceneGroup = new THREE.Group();
scene.add(sceneGroup);

sceneGroup.add(sphere);
sceneGroup.add(cone);
sceneGroup.add(cylinder);

// const redGroup = new THREE.Group();
// scene.add(redGroup);
// redGroup.add(mcdonald);
// redGroup.add(newy);


//Animation
const lightOffset = new THREE.Vector3(1,1,1);

//ray tracing
const raycasterG = new THREE.Raycaster();
const raycasterP = new THREE.Raycaster();
raycasterP.params.Points.threshold = 0.01;

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

function onMouseDown() {
       camera.updateMatrixWorld();
    controls.update();

    raycasterP.setFromCamera(mouse, camera);

    // visualize ray correctly
    // rayHelper.position.copy(raycasterP.ray.origin);
    // rayHelper.setDirection(raycasterP.ray.direction.clone().normalize());

    const globeHit = raycasterP.intersectObject(model, true);
    const pointHit = raycasterP.intersectObject(points);

    if (pointHit.length > 0) {
        if (globeHit.length > 0 &&
            globeHit[0].distance < pointHit[0].distance) return;

        const index = pointHit[0].index;
        console.log(points.userData.locations[index].name);
    }
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


//project showing hiding
const project1 = document.getElementById("project1");
const project2 = document.getElementById("project2");
const project3 = document.getElementById("project3");
const project4 = document.getElementById("project4");
const project5 = document.getElementById("project5");
const project6 = document.getElementById("project6");

// document.getElementById('project1').addEventListener('click', () => {

//     redGroup.visible = true;
    
        
//         });

// document.getElementById('project2').addEventListener('click', () => {

//     redGroup.visible = false;
        
//         });

// document.getElementById('project3').addEventListener('click', () => {

//     redGroup.visible = false;
        
//         });

// document.getElementById('project4').addEventListener('click', () => {

//     redGroup.visible = false;
        
//         });

// document.getElementById('project5').addEventListener('click', () => {

//     redGroup.visible = false;
        
//         });

// document.getElementById('project6').addEventListener('click', () => {

//     redGroup.visible = false;
        
//         });