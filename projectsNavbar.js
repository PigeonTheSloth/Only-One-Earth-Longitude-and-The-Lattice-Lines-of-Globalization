const project1 = document.getElementById("project1");
const project2 = document.getElementById("project1");
const project3 = document.getElementById("project1");
const project4 = document.getElementById("project1");
const project5 = document.getElementById("project1");
const project6 = document.getElementById("project1");

document.getElementById('project1').addEventListener('click', () => {

      fetch('./popup.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('popup').innerHTML = text;
                popup.style.display = "block";
            });
        
        });