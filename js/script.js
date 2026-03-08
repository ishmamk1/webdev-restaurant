let currentSlide = 0;
let slides;

window.onload = function () {
    slides = document.querySelectorAll(".slide");
    showSlide(currentSlide);
};

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add("active");
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

setInterval(() => {
    changeSlide(1);
}, 4000);