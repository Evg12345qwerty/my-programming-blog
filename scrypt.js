// Простой скрипт для сайта

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    
    // Подсветка активной ссылки в навигации
    function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Простая подписка по email
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.email-input');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            if (emailInput && emailInput.value) {
                const email = emailInput.value;
                if (validateEmail(email)) {
                    alert(`Спасибо за подписку! Мы отправили письмо на ${email}`);
                    emailInput.value = '';
                } else {
                    alert('Пожалуйста, введите корректный email адрес');
                }
            } else {
                alert('Пожалуйста, введите ваш email');
            }
        });
        
        // Подписка по нажатию Enter
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    subscribeBtn.click();
                }
            });
        }
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Анимация появления статей
    const articles = document.querySelectorAll('.post');
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Обновление года в футере
    const yearSpan = document.querySelector('footer p');
    if (yearSpan && yearSpan.textContent.includes('2026')) {
        yearSpan.textContent = yearSpan.textContent.replace('2026', new Date().getFullYear());
    }
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Вызов функции подсветки
    highlightActiveNav();
    
    // Добавляем год в футер
    const footerText = document.querySelector('.footer-content p:first-child');
    if (footerText) {
        footerText.innerHTML = `&copy; ${new Date().getFullYear()} Научный блог. Все права защищены.`;
    }
});
