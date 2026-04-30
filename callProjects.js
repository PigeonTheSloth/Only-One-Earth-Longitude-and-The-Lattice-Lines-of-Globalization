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
    "Indonesia":      "./project-materials/Mena-Dupont/indonesia.html",

    "North PoleE":      "./project-materials/Egan-Goh/globe_vid.html",
    "Kenya":      "./project-materials/Arik-Aufderheide/kenya.html",

    "?Wyatt1":      "./project-materials/Wyatt-Kryvicky/kryvicky.html",
    "?Wyatt2":      "./project-materials/Wyatt-Kryvicky/kryvicky.html",

    "Boston": "./project-materials/Anthony-Rinaldi/AnthonyRinaldi.html",
    "Henan": "./project-materials/Anthony-Rinaldi/AnthonyRinaldi.html",

    "?": "./project-materials/Ella-Hollenbach/ella.html",
    
    
    "Sheffield": "./project-materials/Lincoln-Sharpe/stop-1-sheffield.html",
    "Rio De Janeiro": "./project-materials/Lincoln-Sharpe/stop-2-rio.html",
    "Mexico City": "./project-materials/Lincoln-Sharpe/stop-3-mexicocity.html",
    "Doha": "./project-materials/Lincoln-Sharpe/stop-4-doha.html",

    "Madrid": "./project-materials/Lulu-Arterburn/tourism.html",

    
    "randomPlace": "./project-materials/Gavin-Glover/glover.html"

};

export function callProjects(name) {
    const path = projectFiles[name];


    if (!path){
        console.log("incorrectPath");
        console.log(name);
     return; }
     console.log(name);

    
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

