document.addEventListener("DOMContentLoaded", () => {
    const mainDisplay = document.getElementById("main-video");
    const photoTitle = document.getElementById("photo-title")
    const thumbs = document.querySelectorAll(".thumb-items")
    const showcase = document.getElementById("showcase-box")

    let currentIndex = 0;
    let animationId = null;
    const CYCLE_DURATION = 10000;

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        })
    }

    function animateBorder(element, duration) {
        cancelAnimationFrame(animationId);
        const rect = element.querySelector(".border-rect")
        if (!rect) return;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            rect.style.strokeDashoffset = 261 - (progress * 261);
            if (progress < 1) {
                animationId = requestAnimationFrame(step);
            } else {
                handleNext();
            }
        }
        animationId = requestAnimationFrame(step);
    }
    function changeMedia(index) {
        currentIndex = index;
        const activeThumb = thumbs[currentIndex];

        if (photoTitle) {
            photoTitle.textContent = activeThumb.getAttribute("data-name");
        }
        if (mainDisplay) {
            const newImg = activeThumb.getAttribute("data-img");

            if (mainDisplay.tagName) {}
        }
    }
});