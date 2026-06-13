if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Paksa scroll ke paling atas saat refresh
    window.scrollTo(0, 0);

    const body = document.body;
    const preloader = document.getElementById("preloader");
    const openingTitle = document.getElementById("opening-title");
    const heroTitleContainer = document.getElementById("hero-title-container");
    const heroSection = document.getElementById("hero-section");
    
    // Ambil elemen navbar
    const mainNavbar = document.getElementById("main-navbar");
    
    // Elemen animasi preloader
    const col1 = document.getElementById("pre-col-1");
    const col2 = document.getElementById("pre-col-2");
    const col3 = document.getElementById("pre-col-3");
    const overlay = document.getElementById("pre-overlay");
    const frame = document.getElementById("pre-frame");

    // ========================================================
    // AUTOMATIC SCROLL REVEAL SETUP (Sistem Maple Syrup)
    // ========================================================
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
    // ========================================================

    // Kunci scroll di awal
    body.classList.add("overflow-hidden");

    preloader.addEventListener("click", function() {
        
        preloader.style.pointerEvents = "none";

        // 1. Jalankan efek keluar pada elemen preloader
        col1.classList.add("slide-down-out");
        col2.classList.add("slide-up-out");
        col3.classList.add("slide-down-out");
        frame.classList.add("frame-explode");
        overlay.style.opacity = "0";

        // Buat judul memudar duluan sebelum dipindah
        openingTitle.style.transition = "opacity 0.4s ease";
        openingTitle.style.opacity = "0";
        
        // Sembunyikan preloader total setelah seluruh rentetan animasi selesai (1 detik)
        setTimeout(function() {
            // Hilangkan preloader dari pandangan & interaksi
            preloader.classList.add("hidden"); 

            // Kembalikan fungsi scroll pada website!
            body.classList.remove("overflow-hidden");

            // Bersihkan class preloader lama agar pas di hero-section ukurannya proporsional
            openingTitle.style.transform = "none"; 
            openingTitle.classList.remove("text-5xl", "md:text-8xl"); 
            openingTitle.classList.add("text-4xl", "md:text-7xl", "font-black", "tracking-tighter", "text-pure-white", "uppercase", "text-center", "w-full");
            
            // Pindahkan teks ke dalam kontainer di Hero Section
            heroTitleContainer.appendChild(openingTitle);

            // Munculkan kembali teksnya dengan transisi smooth di tempat baru
            setTimeout(function() {
                openingTitle.style.opacity = "1";
            }, 50);

            // Memunculkan navbar setelah preloader selesai
            setTimeout(function() {
                mainNavbar.classList.remove("opacity-0", "pointer-events-none");
            }, 100);

            setTimeout(function() {
                // Reset dulu biar browser bisa restart animasi fade-in hero section
                heroSection.classList.remove("fade-in");
                heroSection.style.opacity = "0";

                // Force reflow
                void heroSection.offsetWidth;

                heroSection.classList.add("fade-in");
            }, 10);

        }, 1000); 
    });

    // ========================================================
    // SHOW/HIDE NAVBAR ON SCROLL
    // ========================================================
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function() {
        // Abaikan fungsi jika scroll dikunci (saat preloader masih ada)
        if (body.classList.contains("overflow-hidden")) return;

        const currentScrollY = window.scrollY;

        // Toleransi scroll minimal (misal 5px) agar tidak terlalu sensitif jika tidak sengaja tersenggol
        if (Math.abs(currentScrollY - lastScrollY) < 5) return;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Jika scroll ke bawah DAN posisi scroll sudah melewati tinggi navbar, sembunyikan navbar
            mainNavbar.classList.add("nav-hidden");
        } else {
            // Jika scroll ke atas, munculkan kembali navbar
            mainNavbar.classList.remove("nav-hidden");
        }

        // Perbarui posisi terakhir
        lastScrollY = currentScrollY;
    });
    // ========================================================
});