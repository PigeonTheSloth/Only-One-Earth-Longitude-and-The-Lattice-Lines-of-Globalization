
export function createProjectsNavbar(points, allLocations) {
    const projects = points.map((point, i) => ({
        point,
        locations: allLocations[i]
    }));

    function setActiveProject(activeIndex) {
        projects.forEach(({ point, locations }, i) => {
            const isActive = i === activeIndex;
            point.visible = isActive;
            locations.forEach(loc => {
                if (loc.label) loc.label.style.display = isActive ? "block" : "none";
            });
        });
    }

    projects.forEach(({ }, i) => {
        document.getElementById(`project${i + 1}`)?.addEventListener("click", () => setActiveProject(i));
    });
}