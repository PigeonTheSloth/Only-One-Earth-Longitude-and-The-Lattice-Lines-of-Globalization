const navItems = document.querySelectorAll("#projectsNavbar li");

navItems.forEach((item, i) => {
    const hue = Math.round((i / navItems.length) * 360);
    item.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
});