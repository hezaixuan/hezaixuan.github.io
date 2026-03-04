document.addEventListener('DOMContentLoaded', function() {
    // 图片画廊功能
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const imageDescription = document.querySelector('.image-description');
    
    // 图片说明数据
    const imageDescriptions = {
        'images/lumion节点效果图渲染.jpg': {
            title: '龙鳞坝景观节点 - 视角一',
            description: '展示龙鳞坝的整体景观效果与水流设计'
        },
        'images/lumion节点效果图渲染3.jpg': {
            title: '龙鳞坝景观节点 - 视角二',
            description: '展示龙鳞坝的细节设计与材质表现'
        },
        'images/lumion节点效果图渲染4.jpg': {
            title: '龙鳞坝景观节点 - 视角三',
            description: '展示龙鳞坝与周边环境的融合效果'
        },
        'images/lumion效果图渲染2.jpg': {
            title: '龙鳞坝景观节点 - 夜景效果',
            description: '展示龙鳞坝在夜景灯光下的氛围效果'
        },
        'images/lumion效果图渲染.jpg': {
            title: '观景平台景观节点',
            description: '展示观景平台的空间布局与景观视野'
        },
        'images/lumion效果图渲染3.png': {
            title: '植物花镜景观设计 - 视角一',
            description: '展示花镜的整体色彩搭配与植物组合'
        },
        'images/lumion效果图渲染4.png': {
            title: '植物花镜景观设计 - 视角二',
            description: '展示花镜的层次感与季相变化'
        },
        'images/lumion效果图渲染5.png': {
            title: '植物花镜景观设计 - 视角三',
            description: '展示花镜与建筑环境的协调关系'
        },
        'images/lumion效果图渲染6.jpg': {
            title: '植物花镜景观设计 - 细节表现',
            description: '展示花镜植物的质感与细节表现'
        },
        'images/lumion效果图渲染7.jpg': {
            title: '植物花镜景观设计 - 季节效果',
            description: '展示花镜在不同季节的景观效果'
        }
    };
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // 移除所有缩略图的active类
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // 添加当前缩略图的active类
            this.classList.add('active');
            
            // 更新主图
            const imagePath = this.getAttribute('data-image');
            mainImage.src = imagePath;
            
            // 更新图片说明
            if (imageDescription && imageDescriptions[imagePath]) {
                imageDescription.querySelector('h3').textContent = imageDescriptions[imagePath].title;
                imageDescription.querySelector('p').textContent = imageDescriptions[imagePath].description;
            }
        });
    });
    
    // 图片查看器功能
    const viewerModal = document.getElementById('image-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const viewerCaption = document.querySelector('.viewer-caption');
    const closeViewer = document.querySelector('.close-viewer');
    
    // 为所有图片添加点击查看功能
    const viewableImages = document.querySelectorAll('.gallery-main img, .process-images img, .drawing-image');
    
    viewableImages.forEach(img => {
        img.addEventListener('click', function() {
            viewerImage.src = this.src;
            
            // 获取图片说明
            let caption = '';
            if (this.alt) {
                caption = this.alt;
            } else if (this.closest('.drawing-container')) {
                const captionElement = this.closest('.drawing-container').querySelector('.drawing-caption p');
                if (captionElement) {
                    caption = captionElement.textContent;
                }
            }
            
            viewerCaption.textContent = caption;
            viewerModal.style.display = 'flex';
        });
    });
    
    // 关闭查看器
    closeViewer.addEventListener('click', function() {
        viewerModal.style.display = 'none';
    });
    
    viewerModal.addEventListener('click', function(e) {
        if (e.target === viewerModal) {
            viewerModal.style.display = 'none';
        }
    });
    
    // ESC键关闭查看器
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && viewerModal.style.display === 'flex') {
            viewerModal.style.display = 'none';
        }
    });
    
    // 图纸标签页功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮和面板的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // 添加当前按钮和对应面板的active类
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 滚动动画
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
    const animateElements = document.querySelectorAll('.overview-text, .overview-details, .timeline-item, .drawing-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image-container img');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});