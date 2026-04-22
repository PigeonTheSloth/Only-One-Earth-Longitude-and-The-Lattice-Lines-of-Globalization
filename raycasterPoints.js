import * as THREE from "three";

import { callProjects } from "./callProjects.js";

export function raycasterPointsInit(raycaster, points, model) {
    const allHits = [];

    points.forEach((pointsGroup) => {
        const hits = raycaster.intersectObject(pointsGroup);
        if (hits.length > 0 && pointsGroup.visible) {
            hits[0].projectName = pointsGroup.userData.name;  // tag with name
            allHits.push(hits[0]);
        }
    });

    if (allHits.length === 0) return;

    // get closest hit
    const closestHit = allHits.reduce((a, b) =>
        a.distance < b.distance ? a : b
    );

    // globe takes priority
    const globeHit = raycaster.intersectObject(model, true);
    if (globeHit.length > 0 && globeHit[0].distance < closestHit.distance) return;

    // find which points group was hit and call the project
    const hitGroup = points.find(p => p.userData.name === closestHit.projectName);
    if (hitGroup) {
        const locationName = hitGroup.userData.locations[closestHit.index].name;
        callProjects(locationName);
    }
}

