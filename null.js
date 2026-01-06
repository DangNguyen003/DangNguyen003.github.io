document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. TẮT MÀN HÌNH CHỜ (FIX LỖI TREO) --- */
    const loadingCurtain = document.querySelector('.loading-curtain');
    function removeLoading() {
        if(loadingCurtain) {
            loadingCurtain.style.opacity = '0';
            setTimeout(() => { loadingCurtain.style.display = 'none'; }, 500);
        }
    }
    // Tự động tắt sau 1.5 giây dù web load xong hay chưa
    setTimeout(removeLoading, 1500);

    /* --- 2. CHUYỂN TAB (QUAN TRỌNG) --- */
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    function switchTab(targetId) {
        // Ẩn tất cả
        sections.forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });
        
        // Hiện tab được chọn
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block'; 
            // Delay nhỏ để CSS active nhận diện
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 10);
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Đổi màu menu
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Lấy tên tab từ href="#tên"
            const targetId = item.getAttribute('href').substring(1);
            switchTab(targetId);
        });
    });

    /* --- 3. CON TRỎ CHUỘT MƯỢT --- */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let posX = 0, posY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Chấm nhỏ đi theo ngay lập tức
            if(cursor) cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Vòng tròn to đi theo chậm hơn
        function followMouse() {
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;
            if(follower) follower.style.transform = `translate(${posX}px, ${posY}px)`;
            requestAnimationFrame(followMouse);
        }
        followMouse();

        // Hiệu ứng khi di vào link/thẻ
        const hoverTargets = document.querySelectorAll('a, .nav-item, .writeup-item, .skill-category, .interest-item');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if(cursor) cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                if(cursor) cursor.classList.remove('hover');
            });
        });
    }

    /* --- 4. NỀN MẠNG LƯỚI (CANVAS) --- */
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        
        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const count = window.innerWidth < 768 ? 30 : 70; // Số lượng điểm

        for(let i=0; i<count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if(p.x < 0 || p.x > w) p.vx *= -1;
                if(p.y < 0 || p.y > h) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.fill();

                // Vẽ đường nối
                for(let j=i+1; j<particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if(dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist/1000})`;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
