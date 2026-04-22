export let slideIndex = 1;

export function plusSlides(n) {
    showSlides(slideIndex += n);
}
export function currentSlide(n) {
    showSlides(slideIndex = n);
}
export function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}