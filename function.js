document.addEventListener("DOMContentLoaded", () => {
    const mainDisplay = document.getElementById("main-video");
    const photoTitle = document.getElementById("photo-title")
    const thumbs = document.querySelectorAll(".thumb-item")
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


    if (photoTitle) photoTitle.textContent = activeThumb.getAttribute("data-name");
    
    if (mainDisplay) {
        const newImg = activeThumb.getAttribute("data-img");
        if (mainDisplay.tagName === "IMG") {
            mainDisplay.setAttribute("src", newImg);
        } else {
            mainDisplay.style.backgroundImage = `url('${newImg}')`;
        }
    }


    thumbs.forEach(t => {
        t.classList.remove("active");
        const rect = t.querySelector(".border-rect");
        if (rect) rect.style.strokeDashoffset = 261;
    });

    activeThumb.classList.add("active");

    const isHovering = showcase.matches(':hover');
    if (!isHovering) {
        animateBorder(activeThumb, CYCLE_DURATION);
    } else {
        const rect = activeThumb.querySelector(".border-rect");
        if (rect) rect.style.strokeDashoffset = 0;
    }
}
    function handleNext() {
        currentIndex = (currentIndex + 1) % thumbs.length;
        changeMedia(currentIndex);
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => changeMedia(index));
    });

    if (showcase) {
        showcase.addEventListener("mouseenter", () => cancelAnimationFrame(animationId));
        showcase.addEventListener("mouseleave", () => animateBorder(thumbs[currentIndex], CYCLE_DURATION));
    }

    changeMedia(0);
});