  
  
document.getElementById('popupButton').addEventListener('click', () => {

      fetch('./popup.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('popup').innerHTML = text;
            });
})

document.getElementById('popup').addEventListener('click', () => {
    document.getElementById('popup').innerHTML = 'none';
});
