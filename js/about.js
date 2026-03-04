document.addEventListener('DOMContentLoaded', function() {
    // 滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察者
    const animateElements = document.querySelectorAll('.about-image, .about-text, .resume-block, .philosophy-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 技能标签动画
    const skillItems = document.querySelectorAll('.skill-details span');
    skillItems.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(10px)';
        skill.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
        
        // 当父元素可见时，显示技能标签
        const parentObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        parentObserver.observe(skill.closest('.skill-item'));
    });
    
    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.about-image img');
        
        parallaxElements.forEach(element => {
            const speed = 0.2;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // 简历下载按钮点击事件
    const cvButton = document.querySelector('.cv-button');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            e.preventDefault();
            // 这里可以添加实际的下载简历功能
            // 例如创建一个模态框提示用户，或者直接下载PDF文件
            
            // 创建提示元素
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = '简历下载功能即将开放，敬请期待！';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'var(--forest-green)';
            notification.style.color = 'white';
            notification.style.padding = '12px 24px';
            notification.style.borderRadius = '30px';
            notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1000';
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(notification);
            
            // 显示通知
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 100);
            
            // 3秒后移除通知
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    }
});