  
const cylExp = document.getElementById('cylExp');
const conicalExp = document.getElementById('conicalExp');

const openTitle = document.getElementById('openTitle');
const openTitleSub =  document.getElementById('openTitleSub');

conicalExp.style.display = "none";
cylExp.style.display = "none";

//popup test

//cylinder popup
document.getElementById('cylindrical').addEventListener('click', () => {

      fetch('./projection-explanations/cylinder-explain.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('cylExp').innerHTML = text;
                cylExp.style.display = "block";
                conicalExp.style.display = "none";

            });


})

//conical
document.getElementById('conical').addEventListener('click', () => {

      fetch('./projection-explanations/conical-explain.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('conicalExp').innerHTML = text;
                conicalExp.style.display = "block";
                cylExp.style.display = "none";

            });
     
})


document.getElementById('none').addEventListener('click', function(event) {

            conicalExp.style.display = "none";
            cylExp.style.display = "none";

})