const images = document.querySelectorAll('.images img');
images.forEach((img) => {
    img.addEventListener('mouseenter', (e) => {
        const current = e.target;
        const prev = current.previousElementSibling;
        const next = current.nextElementSibling;
        if (prev) prev.classList.add('neighbor');
        if (next) next.classList.add('neighbor');
    })


img.addEventListener('mouseleave', (e) => {
    images.forEach(i => i.classList.remove('neighbor'));
 });
});