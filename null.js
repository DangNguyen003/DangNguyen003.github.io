// Content Protection
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'c')
    ) {
        e.preventDefault();
        alert('Lại nữa hả, hong có dược đâu nha.');
    }
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Ấy ấy định làm gì bậy sao.');
});

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

window.addEventListener('beforeprint', (e) => {
    e.preventDefault();
    document.body.innerHTML = '<h1>Access Denied</h1><p>Viewing the source code is not allowed.</p>';
});

// DevTools Detection
(function detectDevTools() {
    const threshold = 160;
    const overlay = document.getElementById('devtoolsOverlay');
    let isDevToolsOpen = false;

    function checkDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (
            (widthThreshold || heightThreshold) &&
            (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold)
        ) {
            if (!isDevToolsOpen) {
                isDevToolsOpen = true;
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        } else {
            if (isDevToolsOpen) {
                isDevToolsOpen = false;
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    }

    setInterval(checkDevTools, 500);
    window.addEventListener('resize', checkDevTools);
})();

// Background Stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}
createStars();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px, 0)`;
}

function updateFollower() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    cursorFollower.style.transform = `translate(${posX - cursorFollower.offsetWidth / 2}px, ${posY - cursorFollower.offsetHeight / 2}px)`;
    requestAnimationFrame(updateFollower);
}

document.addEventListener('mousemove', updateCursor);
requestAnimationFrame(updateFollower);

document.querySelectorAll('.nav-item, .email, .social-icon, .writeup-item, .skill-item, .interest-item, .tag, .avatar-container').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

document.addEventListener('click', (e) => {
    cursor.classList.add('click');
    setTimeout(() => cursor.classList.remove('click'), 300);
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = Math.random() * 360;
        const dist = Math.random() * 50 + 20;
        particle.style.setProperty('--dx', `${Math.cos(angle * Math.PI / 180) * dist}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle * Math.PI / 180) * dist}px`);
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
});

// Navbar Scroll Behavior
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Section Navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const currentSection = document.querySelector('.content-section.active');
    const targetSection = document.getElementById(sectionId);

    if (currentSection !== targetSection) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');

        currentSection.classList.add('fading-out');
        setTimeout(() => {
            currentSection.classList.remove('active', 'fading-out');
            targetSection.classList.add('active');
            document.querySelector('.content-sections').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    } else {
        document.querySelector('.content-sections').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Writeup Navigation
function openWriteup(writeupId) {
    const writeupUrls = {
        'secure-auth-bypass': 'https://example.com/writeups/secure-auth-bypass',
        'crypto-conundrum': 'https://example.com/writeups/crypto-conundrum',
        'reverse-engineering': 'https://example.com/reverse-engineering'
    };
    const url = writeupUrls[writeupId] || '#';
    window.open(url, '_blank');
}

// Attach Navigation Events
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
    });
});

document.querySelectorAll('.writeup-item').forEach(item => {
    item.addEventListener('click', () => {
        const writeupId = item.getAttribute('data-writeup');
        openWriteup(writeupId);
    });
});

// Avatar Image Upload
document.querySelector('.avatar-container').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result;
            document.querySelector('.avatar-image').src = base64String;
            console.log('Base64 string:', base64String);
        };
        reader.readAsDataURL(file);
    }
});

// Page Load Initialization
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nav-item[data-section="about"]').classList.add('active');
    setTimeout(() => {
        document.querySelector('.loading-curtain').style.display = 'none';
    }, 3000);
});