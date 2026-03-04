document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const projectsContainer = document.getElementById('projects-container');
    const projectCards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('no-results');
    
    // 初始化显示所有项目
    let currentFilter = 'all';
    let currentSort = 'newest';
    let currentSearch = '';
    
    // 筛选功能
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前筛选
            currentFilter = this.getAttribute('data-filter');
            
            // 应用筛选
            filterProjects();
        });
    });
    
    // 排序功能
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        sortProjects();
    });
    
    // 搜索功能 - 使用防抖优化性能
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearch = this.value.toLowerCase();
            filterProjects();
        }, 300);
    });
    
    searchBtn.addEventListener('click', function() {
        clearTimeout(searchTimeout);
        currentSearch = searchInput.value.toLowerCase();
        filterProjects();
    });
    
    // 筛选项目
    function filterProjects() {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.getAttribute('data-name').toLowerCase();
            const description = card.querySelector('.project-excerpt').textContent.toLowerCase();
            
            // 检查是否符合筛选条件
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = currentSearch === '' || 
                                 title.includes(currentSearch) || 
                                 description.includes(currentSearch);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 显示或隐藏"无结果"消息
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        
        // 应用当前排序
        sortProjects();
    }
    
    // 排序项目
    function sortProjects() {
        const cardsArray = Array.from(projectCards);
        
        // 过滤出可见的卡片
        const visibleCards = cardsArray.filter(card => card.style.display !== 'none');
        
        // 根据排序方式排序
        visibleCards.sort((a, b) => {
            switch (currentSort) {
                case 'newest':
                    return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                case 'oldest':
                    return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
                case 'name':
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                default:
                    return 0;
            }
        });
        
        // 重新排列DOM元素
        visibleCards.forEach(card => {
            projectsContainer.appendChild(card);
        });
    }
    
    // 添加动画效果 - 优化性能
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.style.display !== 'none') {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // 一旦元素可见，停止观察它
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 为项目卡片添加观察者
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.willChange = 'opacity, transform';
        observer.observe(card);
    });
});