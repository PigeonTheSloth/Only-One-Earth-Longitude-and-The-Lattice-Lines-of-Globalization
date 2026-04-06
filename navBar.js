  fetch('./navBar.html')
            .then(res => res.text())
            .then(text => {
                document.getElementById('navBar').innerHTML = text;
            });