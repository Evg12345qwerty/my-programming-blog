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

// Функция для обработки кликов на ссылки в боковой панели
function initSidebarTabLinks() {
    const tabLinks = document.querySelectorAll('.tab-link');
    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                const tabButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
                if (tabButton) {
                    tabButton.click();
                    
                    // Прокрутка к началу вкладки
                    setTimeout(() => {
                        const tabContainer = document.querySelector('.tab-container');
                        if (tabContainer) {
                            window.scrollTo({
                                top: tabContainer.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            });
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    highlightActiveNav();
    initSmoothScroll();
    initSidebarTabLinks();
    
    // Обработка хэша в URL для вкладок
    const hash = window.location.hash.substring(1);
    if (hash) {
        const tabButton = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
        if (tabButton) {
            setTimeout(() => {
                tabButton.click();
            }, 100);
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
    
    // Подсветка активной ссылки в боковой панели
    function highlightActiveSidebarLink() {
        const currentHash = window.location.hash.substring(1) || 'limits';
        const sidebarLinks = document.querySelectorAll('.tab-link');
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-tab') === currentHash) {
                link.style.background = '#3498db';
                link.style.color = 'white';
            } else {
                link.style.background = '';
                link.style.color = '';
            }
        });
    }
    
    // Вызывать при смене вкладок
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn')) {
            setTimeout(highlightActiveSidebarLink, 150);
        }
    });
    
    highlightActiveSidebarLink();
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
