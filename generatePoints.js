import * as THREE from "three";

export function createPoints(scene) {


     const rawFarber = [
        { name: "Grewingk Glacier", coords: [-0.0317401,0.0727321,-0.0275429] },
    ];

    const rawPhelps = [
        { name: "North Pole", coords: [1.75913e-18,0.084,4.83316e-18] },
        { name: "New York", coords: [-0.0514549,0.0548103,0.0374731]},
        { name: "Milan", coords: [0.0287322,0.0598763,0.0514324]}
    ];
    
    const rawLowe = [
        { name: "Greenwich", coords: [0.017892,0.0657189,0.049162] },
        { name: "Valencia Coast", coords: [0.0217799,0.0533929,0.0610806]},
        { name: "Northern Algeria", coords: [0.027366,0.0394795,0.0689091]},
        { name: "Accra, Ghana", coords: [0.0283094,0.00821858,0.0786577]},
        { name: "Gulf of Guinea", coords: [0.0321258,0.00293156,0.0775586]}
    ];

    const rawDupont = [
        { name: "North PoleM", coords: [1.75913e-18,0.084,4.83316e-18] },
        { name: "Punta Reinas", coords: [-0.0748786,0.0145388,0.0351826] },
        { name: "Indonesia", coords: [0.0604989,-0.0011571,-0.0582628] },
    ];

    const rawGoh = [
        {name: "North PoleE", coords: [1.75913e-18,0.084,4.83316e-18]}
    ];

    const rawAufderheide = [
        {name: "Kenya", coords: [0.0711631,-3.45393e-05,0.0446298]}
    ];

    const rawRinaldi = [
        {name: "Boston", coords: [-0.0482753,0.0565993,0.039013]},
        {name: "Henan", coords: [0.0499621,0.0478756,-0.0476204]},

    ];

    const rawKryvicky = [
        {name: "?Wyatt1", coords: [-0.0643382,0.0537071,0.00566904]},
        {name: "?Wyatt2", coords: [-0.0641112,0.0540155,0.0052994]}
    ];

    const rawHollenbach = [
        {name: "?", coords: [-0.0765895,0.0203214,0.0278763]},
    ];
   
    const rawSharpe = [
        {name: "Sheffield", coords: [0.01729,0.0670854,0.0475038]},
        {name: "Rio De Janeiro", coords: [-0.0302123,-0.0328214,0.0711757]},
        {name: "Mexico City", coords: [-0.0779643,0.0273477,0.0151547]},
        {name: "Doha", coords: [0.0719822,0.0354999,0.0247855]},
    
    ];
    const rawArterburn = [
        {name: "Madrid", coords: [0.0179455,0.0544608,0.0613839]},
    ];
    
    const rawGlover = [
        {name: "randomPlace", coords: [0.0179455,0.0544608,0.0613839]},

    ];

    if (rawGlover) {
        console.log("PointGloverGenerated");
    }

    const locationsAll = [rawFarber, rawPhelps, rawLowe, rawDupont, rawGoh, rawAufderheide, rawKryvicky, 
        rawRinaldi, rawHollenbach, rawSharpe, rawArterburn, rawGlover];
    const groupNames = ["Farber", "Phelps", "Lowe", "Dupont", "Goh", "Aufderheide",
         "Kryvicky", "Rinaldi", "Hollenbach", "Sharpe", "Arterburn", "Glover"];

//concise function
   const projectData =  locationsAll.map((locationGroup, i) => {

        // Fix 2: renamed to 'positions' to match the BufferAttribute call below
        const positions = new Float32Array(
            locationGroup.flatMap(loc => loc.coords)
        );

        const geometry = new THREE.BufferGeometry();

        // Fix 3: typo fix — BufferAttribute, and correct variable name 'positions'
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Fix 4: rainbow color using HSL, spread evenly across groups
        const color = new THREE.Color().setHSL(i / locationsAll.length, 1, 0.5);

        const material = new THREE.PointsMaterial({
            color: color,
            size: 10,
            sizeAttenuation: false
        });

        const points = new THREE.Points(geometry, material);
        points.userData.locations = locationGroup;
        points.userData.name = groupNames[i];

        locationGroup.forEach(loc => {
            const label = document.createElement("div");
            label.className = "point-label";
            label.textContent = loc.name;
            label.style.position = "absolute";
            document.body.appendChild(label);
            loc.label = label;
        });

        locationGroup.forEach(loc => {
            if (loc.label) {
                loc.label.style.display = "none";
            }
        });

        points.visible = false;
        scene.add(points);


    return { points, locations: locationGroup };
    });

    
const points = projectData.map(p => p.points);
const allLocations = projectData.map(p => p.locations);

return { points, allLocations };
}
