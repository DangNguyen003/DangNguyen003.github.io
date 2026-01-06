document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TẮT MÀN HÌNH CHỜ (LOADING)
    const loadingCurtain = document.querySelector('.loading-curtain');
    setTimeout(() => {
        loadingCurtain.style.opacity = '0';
        setTimeout(() => { loadingCurtain.style.display = 'none'; }, 500);
    }, 1500); // 1.5 giây thì tắt

    // 2. CON TRỎ CHUỘT MƯỢT (LERP)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Hiệu ứng đuổi theo mượt mà
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            followerX += (mouseX - followerX) * 0.1; // Vòng tròn to đi chậm hơn
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.transform = `translate3d(${cursorX - 4}px, ${cursorY - 4}px, 0)`;
            follower.style.transform = `translate3d(${followerX - 15}px, ${followerY - 15}px, 0)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hiệu ứng khi di chuột vào link/button
        const interactiveEls = document.querySelectorAll('a, .writeup-item, .nav-item, .social-icon');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });
    }

    // 3. CHUYỂN TAB NAVIGATION
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    setTimeout(() => section.classList.add('active'), 200); // Delay nhẹ tạo hiệu ứng
                }
            });
        });
    });

    // 4. HIỆU ỨNG NỀN CYBER NETWORK (CANVAS)
    const canvas = document.getElementById('cyber-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Dội ngược khi chạm cạnh màn hình
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'; // Màu xanh hacker
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 30 : 70; // Giảm điểm trên mobile cho đỡ lag
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }
    initParticles();

    function animateNetwork() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            
            // Vẽ đường nối nếu 2 điểm gần nhau
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist/1000})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();

    // 5. HIỆU ỨNG NGHIÊNG THẺ 3D (3D TILT)
    const tiltElements = document.querySelectorAll('.writeup-item, .skill-category, .interest-item');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Nghiêng tối đa 5 độ
            const rotateY = ((x - centerX) / centerX) * 5;

            // Hiệu ứng nghiêng + phóng to nhẹ
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Trả về vị trí cũ
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});
