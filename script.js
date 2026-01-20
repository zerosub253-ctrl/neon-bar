document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content", { y: 60, opacity: 0, duration: 1.5, ease: "power3.out" });
    
    // Анимация карточек без скрытия
    gsap.from(".card", { 
        scrollTrigger: { trigger: ".grid", start: "top 95%" }, 
        y: 50, duration: 0.8, stagger: 0.2 
    });

    gsap.from(".glass-panel-small", { 
        scrollTrigger: { trigger: ".vibe-section", start: "top 80%" }, 
        scale: 0.95, opacity: 0, duration: 1 
    });

    // Модальные окна
    const cocktailModal = document.getElementById('cocktail-modal');
    const cards = document.querySelectorAll('.cocktail-card');
    const mImg = document.getElementById('modal-img');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-desc');
    const mPrice = document.getElementById('modal-price');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            mTitle.innerText = card.getAttribute('data-title');
            mPrice.innerText = card.getAttribute('data-price');
            mDesc.innerText = card.getAttribute('data-desc');
            mImg.src = card.getAttribute('data-img');
            cocktailModal.classList.add('active');
        });
    });

    const reserveModal = document.getElementById('reserve-modal');
    const reserveBtns = document.querySelectorAll('.open-reserve');

    reserveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            reserveModal.classList.add('active');
            cocktailModal.classList.remove('active');
        });
    });

    const closeBtns = document.querySelectorAll('.close-btn');
    function closeAllModals() {
        cocktailModal.classList.remove('active');
        reserveModal.classList.remove('active');
    }

    closeBtns.forEach(btn => { btn.addEventListener('click', closeAllModals); });
    window.addEventListener('click', (e) => {
        if (e.target === cocktailModal || e.target === reserveModal) { closeAllModals(); }
    });
});