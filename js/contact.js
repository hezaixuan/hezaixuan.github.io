document.addEventListener('DOMContentLoaded', function() {
    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // 这里可以添加实际的表单提交逻辑
        // 例如使用fetch API发送数据到服务器
        
        // 模拟表单提交
        console.log('表单数据：', { name, email, subject, message });
        
        // 显示成功模态框
        successModal.style.display = 'flex';
        
        // 重置表单
        contactForm.reset();
    });
    
    // 关闭模态框
    modalCloseBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // 表单输入验证
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // 移除之前的错误信息
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            input.parentNode.removeChild(existingError);
        }
        
        // 验证规则
        if (value === '') {
            isValid = false;
            errorMessage = '此字段不能为空';
        } else if (input.type === 'email' && !isValidEmail(value)) {
            isValid = false;
            errorMessage = '请输入有效的电子邮箱地址';
        }
        
        // 显示或隐藏错误状态
        if (!isValid) {
            input.classList.add('error');
            
            // 创建错误信息元素
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            
            input.parentNode.appendChild(errorElement);
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
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
    const animateElements = document.querySelectorAll('.contact-info, .contact-form, .map-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 地图功能（这里只是一个示例，实际应用中需要使用真实的地图API）
    const mapContainer = document.querySelector('.map-placeholder');
    if (mapContainer) {
        // 模拟地图加载
        setTimeout(() => {
            mapContainer.innerHTML = `
                <div style="width: 100%; height: 100%; background-color: #e0e0e0; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--forest-green); margin-bottom: 15px;"></i>
                    <p style="color: var(--stone-gray);">地图功能需要集成地图API</p>
                    <p style="color: var(--stone-gray); font-size: 0.9rem;">例如：高德地图、百度地图或Google Maps</p>
                </div>
            `;
        }, 1000);
    }
});