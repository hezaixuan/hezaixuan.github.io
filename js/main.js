// 导航栏交互
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 导航链接点击后关闭菜单
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // 滚动时导航栏效果 - 使用节流优化性能
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动显示动画 - 优化性能
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // 一旦元素可见，停止观察它
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察者
    const animateElements = document.querySelectorAll('.project-card, .about-text, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
    
    // 图片查看器功能
    const imageViewer = document.getElementById('image-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const closeViewer = document.getElementById('close-viewer');
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    
    // 确保元素存在
    if (imageViewer && viewerImage && closeViewer && zoomableImages.length > 0) {
        // 创建导航按钮和图片计数器
        const viewerContent = document.querySelector('.image-viewer-content');
        
        // 创建上一张按钮
        const prevButton = document.createElement('button');
        prevButton.className = 'viewer-nav viewer-prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        viewerContent.appendChild(prevButton);
        
        // 创建下一张按钮
        const nextButton = document.createElement('button');
        nextButton.className = 'viewer-nav viewer-next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        viewerContent.appendChild(nextButton);
        
        // 创建图片计数器
        const imageCounter = document.createElement('div');
        imageCounter.className = 'image-counter';
        viewerContent.appendChild(imageCounter);
        
        // 当前图片索引
        let currentImageIndex = 0;
        
        // 为所有可点击图片添加点击事件
        zoomableImages.forEach((image, index) => {
            image.addEventListener('click', function(e) {
                e.preventDefault(); // 防止默认行为
                currentImageIndex = index;
                openImageViewer(this);
            });
        });
        
        // 打开图片查看器
        function openImageViewer(image) {
            const imageSrc = image.getAttribute('src');
            const imageAlt = image.getAttribute('alt');
            
            viewerImage.setAttribute('src', imageSrc);
            viewerImage.setAttribute('alt', imageAlt);
            
            // 更新计数器
            updateImageCounter();
            
            // 添加动画类
            viewerImage.style.animation = 'none';
            setTimeout(() => {
                viewerImage.style.animation = '';
            }, 10);
            
            imageViewer.classList.add('active');
            imageViewer.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
        
        // 更新图片计数器
        function updateImageCounter() {
            imageCounter.textContent = `${currentImageIndex + 1} / ${zoomableImages.length}`;
        }
        
        // 显示上一张图片
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + zoomableImages.length) % zoomableImages.length;
            const prevImage = zoomableImages[currentImageIndex];
            
            // 添加切换动画
            viewerImage.style.opacity = '0';
            setTimeout(() => {
                viewerImage.setAttribute('src', prevImage.getAttribute('src'));
                viewerImage.setAttribute('alt', prevImage.getAttribute('alt'));
                updateImageCounter();
                viewerImage.style.opacity = '1';
            }, 200);
        }
        
        // 显示下一张图片
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % zoomableImages.length;
            const nextImage = zoomableImages[currentImageIndex];
            
            // 添加切换动画
            viewerImage.style.opacity = '0';
            setTimeout(() => {
                viewerImage.setAttribute('src', nextImage.getAttribute('src'));
                viewerImage.setAttribute('alt', nextImage.getAttribute('alt'));
                updateImageCounter();
                viewerImage.style.opacity = '1';
            }, 200);
        }
        
        // 关闭查看器
        closeViewer.addEventListener('click', function(e) {
            e.preventDefault();
            closeImageViewer();
        });
        
        // 关闭图片查看器
        function closeImageViewer() {
            imageViewer.classList.remove('active');
            setTimeout(() => {
                imageViewer.style.display = 'none';
                document.body.style.overflow = ''; // 恢复滚动
            }, 300);
        }
        
        // 点击背景关闭查看器
        imageViewer.addEventListener('click', function(e) {
            if (e.target === imageViewer) {
                closeImageViewer();
            }
        });
        
        // 上一张/下一张按钮事件
        prevButton.addEventListener('click', function(e) {
            e.stopPropagation();
            showPrevImage();
        });
        
        nextButton.addEventListener('click', function(e) {
            e.stopPropagation();
            showNextImage();
        });
        
        // ESC键关闭查看器
        document.addEventListener('keydown', function(e) {
            if (imageViewer.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeImageViewer();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
        
        // 添加触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        viewerImage.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        viewerImage.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextImage(); // 向左滑动，显示下一张
                } else {
                    showPrevImage(); // 向右滑动，显示上一张
                }
            }
        }
    }
});