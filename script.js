document.addEventListener("DOMContentLoaded", () => {
    
    // ПРЕЛОАДЕР
    window.addEventListener("load", () => {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.classList.add('hide');
            // Анимация заголовка после загрузки
            gsap.from(".hero-content", { y: 60, opacity: 0, duration: 1.5, ease: "power3.out" });
        }, 1500);
    });

    // КУРСОР
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (window.matchMedia("(min-width: 992px)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        });
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".card", { scrollTrigger: { trigger: ".grid", start: "top 95%" }, y: 50, duration: 0.8, stagger: 0.2 });
    gsap.from(".glass-panel-small", { scrollTrigger: { trigger: ".vibe-section", start: "top 80%" }, scale: 0.95, opacity: 0, duration: 1 });

    // МОДАЛКИ
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

    // ОБРАБОТКА ФОРМЫ (ИМИТАЦИЯ)
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Отправка...";
        btn.style.opacity = "0.7";
        setTimeout(() => {
            btn.innerText = "✓ Заявка принята!";
            btn.style.background = "#4ade80"; 
            btn.style.color = "#000";
            btn.style.opacity = "1";
            form.reset();
            setTimeout(() => {
                reserveModal.classList.remove('active');
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ""; 
                    btn.style.color = "";
                }, 500);
            }, 2000);
        }, 1500);
    });
});