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

// Функция для обработки ссылок в боковой панели
function initSidebarLinks() {
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            const tabButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
            if (tabButton) {
                tabButton.click();
            }
        });
    });
    
    // Обработка кликов на теги
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            console.log(`Выбран тег: ${tagText}`);
            // Здесь можно добавить фильтрацию контента
        });
    });
}

// Функция для подсветки активной навигации
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

// Основная инициализация
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSidebarLinks();
    highlightActiveNav();
    
    // Анимация появления статей
    const articles = document.querySelectorAll('article');
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
});
