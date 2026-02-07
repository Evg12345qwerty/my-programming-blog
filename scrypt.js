// Функция для переключения вкладок
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            // Скрываем все содержимое вкладок
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Показываем выбранную вкладку
            const tabId = button.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// Функция для подсветки активной ссылки в навигации
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Функция для плавной прокрутки
function initSmoothScroll() {
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
}

// Функция для динамической загрузки контента (опционально)
function loadContent(section) {
    const content = {
        'mechanics': '<h2>Механика в программировании</h2><p>Содержимое для механики...</p>',
        'thermodynamics': '<h2>Термодинамика</h2><p>Содержимое для термодинамики...</p>',
        // Добавьте больше контента по мере необходимости
    };
    
    return content[section] || '<p>Контент в разработке...</p>';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    highlightActiveNav();
    initSmoothScroll();
    
    // Обработка хэша в URL для вкладок
    const hash = window.location.hash.substring(1);
    if (hash) {
        const tabButton = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }
    
    // Анимация для карточек
    const articles = document.querySelectorAll('article');
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            article.style.transition = 'all 0.6s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Функция для обновления даты в футере
function updateYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement && yearElement.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
    }
}

// Вызов функции обновления года
updateYear();
