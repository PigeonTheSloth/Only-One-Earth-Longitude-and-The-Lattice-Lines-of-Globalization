  
const cylExp = document.getElementById('cylExp');
const conicalExp = document.getElementById('conicalExp');

//popup test
document.getElementById('popupButton').addEventListener('click', () => {

      fetch('./popup.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('popup').innerHTML = text;
                popup.style.display = "block";
            });


})

document.getElementById('popup').addEventListener('click', function(event) {

     if (event.target.id == 'close-button') {
               document.getElementById('popup').style.display = "none";
        
     }

})

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