if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Paksa scroll ke paling atas saat refresh
    window.scrollTo(0, 0);

    const targetElements = document.querySelectorAll(
        "#overview-section [class*='max-w-'], " +
        "#history-section .relative.flex, " +
        "#gameplay-section .text-center, " +
        "#gameplay-section .grid > div"
    );

    targetElements.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add('in'); 
                observer.unobserve(entry.target); 
            } 
        });
    }, { threshold: 0.12 });

    targetElements.forEach(el => observer.observe(el));

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function() {
        // Abaikan fungsi jika scroll dikunci
        if (body.classList.contains("overflow-hidden")) return;

        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) < 5) return;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Jika scroll ke bawah dan posisi scroll sudah melewati tinggi navbar, sembunyikan navbar
            mainNavbar.classList.add("nav-hidden");
        } else {
            // Jika scroll ke atas, munculkan kembali navbar
            mainNavbar.classList.remove("nav-hidden");
        }

        // Perbarui posisi terakhir
        lastScrollY = currentScrollY;
    });
});