import * as THREE from "three";
import { plusSlides, showSlides } from "./project-materials/Abraham-Farber/slides.js";

const projectFiles = {
    "Grewingk Glacier":  "./project-materials/Abraham-Farber/glacier.html",
    "North Pole":        "./project-materials/Jocelyn-Phelps/deliverable1.html",
    "New York":          "./project-materials/Jocelyn-Phelps/deliverable2.html",
    "Milan":             "./project-materials/Jocelyn-Phelps/deliverable3.html",
    "Greenwich":         "./project-materials/Brayden-Lowe/Greenwich.html",
    "Accra, Ghana":      "./project-materials/Brayden-Lowe/accra-ghana.html",
    "Gulf of Guinea":    "./project-materials/Brayden-Lowe/gulf-of-guinea.html",
    "Northern Algeria":  "./project-materials/Brayden-Lowe/northern-algeria.html",
    "Valencia Coast":    "./project-materials/Brayden-Lowe/valencia-coast.html",
    "North PoleM":       "./project-materials/Mena-Dupont/northPole.html",
    "Punta Reinas":      "./project-materials/Mena-Dupont/puntaReinas.html",
    "North PoleE":      "./project-materials/Egan-Goh/globe_vid.html",
    "Kenya":      "./project-materials/Arik-Aufderheide/kenya.html"
};

export function callProjects(name) {
    const path = projectFiles[name];
    if (!path) return;

    fetch(path)
        .then(res => res.text())
        .then(text => {
            const popup = document.getElementById('halfpPopup');
            popup.innerHTML = text;
            popup.style.display = 'block';

            //do slides behavior if there are slides
            const slides = popup.getElementsByClassName("mySlides");
            if (slides.length > 0) {
                showSlides(1);
                popup.querySelector('#prevBtn')?.addEventListener('click', () => plusSlides(-1));
                popup.querySelector('#nextBtn')?.addEventListener('click', () => plusSlides(1));
             }
        });
}

