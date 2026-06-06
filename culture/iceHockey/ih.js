// biar browser gak otomatis balik ke posisi scroll sebelumnya
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener("DOMContentLoaded", function() {
    
    // langsung paksa scroll ke atas dulu sebelum apapun jalan agar animasi tulisan ICE HOCKEY tidak terbang keatas layar
    window.scrollTo(0, 0);

    const body = document.body;
    const preloader = document.getElementById("preloader");
    const clickMeBtn = document.getElementById("click-me-btn");
    const openingTitle = document.getElementById("opening-title");
    const heroTitleContainer = document.getElementById("hero-title-container");

    // scroll diblokir dulu selama preloader masih aktif
    body.classList.add("overflow-hidden");

    // pas tombol diklik, animasi teks mulai jalan
    clickMeBtn.addEventListener("click", function() {
        
        clickMeBtn.style.opacity = "0";
        clickMeBtn.style.pointerEvents = "none";

        // ambil posisi elemen sekarang — harus setelah scroll dipastikan di atas
        const initialRect = openingTitle.getBoundingClientRect();
        const targetRect = heroTitleContainer.getBoundingClientRect();

        // hitung seberapa jauh teks harus geser ke target
        const deltaX = targetRect.left - initialRect.left;
        const deltaY = targetRect.top - initialRect.top;
        const scale = 0.7; 

        // teks "terbang" ke posisi hero
        openingTitle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
        
        setTimeout(function() {
            preloader.classList.add("opacity-0", "pointer-events-none");

            // reset transform, lalu pindah elemennya secara fisik biar tetap responsif
            openingTitle.style.transform = "none"; 
            openingTitle.classList.remove("text-5xl", "md:text-8xl"); 
            openingTitle.classList.add("text-4xl", "md:text-7xl", "font-black", "tracking-tighter", "text-pure-white", "uppercase"); 
            
            heroTitleContainer.appendChild(openingTitle);

            // preloader selesai, scroll jalan lagi
            body.classList.remove("overflow-hidden");

        }, 1000); 
    });
});