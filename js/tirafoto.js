const slider = document.getElementById("slider");
let scrollAmount = 0;
const cardWidth = 400; // card width + gap

function next() {
    scrollAmount += cardWidth;
    slider.style.transform = `translateX(-${scrollAmount}px)`;

    if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
        setTimeout(() => {
            slider.style.transition = "none";
            slider.style.transform = `translateX(0px)`;
            setTimeout(() => slider.style.transition = "transform 0.4s ease-in-out", 10);
        }, 400);
    }
}

function prev() {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
        scrollAmount = slider.scrollWidth / 2 - cardWidth;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${scrollAmount}px)`;
        setTimeout(() => slider.style.transition = "transform 0.4s ease-in-out", 10);
    } else {
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    }
}

document.getElementById("nextBtn").onclick = next;
document.getElementById("prevBtn").onclick = prev;

setInterval(next, 5000);
