/* --- 1. CONFIG & DATA --- */
const bgMusic = document.getElementById("bg-music");
const terminal = document.getElementById("terminal");
const output = document.getElementById("output");
let isMusicPlaying = false;

// DỮ LIỆU NỘI DUNG 
const data = {
    'about': `
    <div class="dossier-container">
        <div class="avatar-frame">
            <i class="fas fa-user-secret"></i>
        </div>
        <div class="dossier-info">
            <h3 style="color:var(--cyan); margin-bottom:10px;">>> PERSONNEL_FILE: #8492</h3>
            <div><span class="label">CODENAME:</span> <span class="value">DangNguyen003</span></div>
            <div><span class="label">REAL NAME:</span> <span class="value">Nguyen Hai Dang</span></div>
            <div><span class="label">LOCATION:</span> <span class="value">Vietnam</span></div>
            <div><span class="label">ROLE:</span> <span class="value">Security Researcher</span></div>
            <div><span class="label">STATUS:</span> <span class="value" style="color:#0f0">[ONLINE]</span></div>
            <br>
            <div style="font-size:0.9rem; color:#ccc;">
                [BIO_SUMMARY]<br>
                Passionate about offensive security and reverse engineering. 
                Currently focusing on Web Exploitation and expanding knowledge in Malware Analysis.
                <br><br>
                "I break code to make it stronger."
            </div>
        </div>
    </div>
    `,

    'skills': `
    <div>
        <span style="color:#0f0">root@dang:~/skills#</span> ./scan_capabilities.exe<br>
        <br>
        <div class="skill-category">>> WEB_EXPLOITATION</div>
        <div class="skill-row"><span>Burp Suite Pro</span> <span class="progress-bar">[██████████] 100%</span></div>
        <div class="skill-row"><span>SQL Injection</span> <span class="progress-bar">[████████░░] 80%</span></div>
        <div class="skill-row"><span>XSS / CSRF</span> <span class="progress-bar">[█████████░] 90%</span></div>
        
        <div class="skill-category">>> PROGRAMMING</div>
        <div class="skill-row"><span>Python (Auto)</span> <span class="progress-bar">[█████████░] 90%</span></div>
        <div class="skill-row"><span>JavaScript</span> <span class="progress-bar">[███████░░░] 70%</span></div>
        <div class="skill-row"><span>C / C++</span> <span class="progress-bar">[█████░░░░░] 50%</span></div>

        <div class="skill-category">>> SYSTEM & TOOLS</div>
        <div class="skill-row"><span>Linux (Kali)</span> <span class="progress-bar">[████████░░] 80%</span></div>
        <div class="skill-row"><span>Docker</span> <span class="progress-bar">[██████░░░░] 60%</span></div>
        <br>
        <span style="color:#888">>> Analysis complete. 8 modules loaded.</span>
    </div>
    `,

    'contact': `
    <div style="margin-top:10px;">
        <span style="color:#f00; font-weight:bold;">>> INITIATING ENCRYPTED HANDSHAKE...</span><br>
        <br>
        <table style="width:100%; color:#ccc;">
            <tr>
                <td style="width:30px;"><i class="fas fa-envelope" style="color:var(--cyan)"></i></td>
                <td>EMAIL:</td>
                <td><a href="mailto:danghn0703@gmail.com">danghn0703@gmail.com</a></td>
            </tr>
            <tr>
                <td><i class="fab fa-github" style="color:var(--cyan)"></i></td>
                <td>GITHUB:</td>
                <td><a href="https://github.com/DangNguyen003" target="_blank">DangNguyen003</a></td>
            </tr>
            <tr>
                <td><i class="fab fa-facebook" style="color:var(--cyan)"></i></td>
                <td>SOCIAL:</td>
                <td><a href="https://facebook.com/Hai.Dang.0703" target="_blank">Hai Dang</a></td>
            </tr>
        </table>
        <br>
        <span style="color:#0f0">>> Connection established. Waiting for input...</span>
    </div>
    `
};

// Dữ liệu Writeups (Thêm bài viết mới vào đây)
const writeupsData = [
    { date: "May 2024", title: "Bypassing 2FA Mechanism", tag: "LOGIC_BUG", desc: "How I skipped OTP verification on a major e-commerce site." },
    { date: "Apr 2024", title: "SQLi to RCE via Upload", tag: "CRITICAL", desc: "Chaining vulnerabilities to get shell access." },
    { date: "Mar 2024", title: "Understanding Heap Overflow", tag: "BINARY", desc: "Deep dive into dynamic memory allocation attacks." },
    { date: "Feb 2024", title: "Android App Reverse Eng", tag: "MOBILE", desc: "Decompiling APK to find hardcoded API Keys." }
];

/* --- 2. MUSIC CONTROL --- */
function toggleMusic() {
    const btn = document.getElementById("music-control");
    if (isMusicPlaying) {
        bgMusic.pause();
        btn.innerHTML = '<i class="fas fa-volume-mute"></i> MUSIC: OFF';
        btn.style.boxShadow = "none";
    } else {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play blocked by browser"));
        btn.innerHTML = '<i class="fas fa-music"></i> MUSIC: ON';
        btn.style.boxShadow = "0 0 10px #0ff";
    }
    isMusicPlaying = !isMusicPlaying;
}

/* --- 3. BOOT SEQUENCE & FUNCTIONS --- */
const asciiArt = `
<div class="ascii-art">
  ██████╗  █████╗ ███╗   ██╗ ██████╗ 
  ██╔══██╗██╔══██╗████╗  ██║██╔════╝ 
  ██║  ██║███████║██╔██╗ ██║██║  ███╗
  ██║  ██║██╔══██║██║╚██╗██║██║   ██║
  ██████╔╝██║  ██║██║ ╚████║╚██████╔╝
  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
  >> SYSTEM READY. MODE: CYBERPUNK
</div>`;

document.getElementById("boot-screen").addEventListener("click", function() {
    this.style.opacity = "0";
    setTimeout(() => { 
        this.style.display = "none"; 
        document.getElementById("main-interface").style.display = "flex";
        toggleMusic(); // Tự động bật nhạc
        printHTML(asciiArt);
        setTimeout(() => printHTML("Welcome back, Nguyen Hai Dang."), 500);
    }, 500);
});

function renderWriteups() {
    let gridHtml = '<div class="writeup-grid">';
    writeupsData.forEach(w => {
        gridHtml += `
        <div class="card" onclick="alert('Đang cập nhật link bài viết: ${w.title}')">
            <span class="date">[${w.date}]</span>
            <h3>${w.title}</h3>
            <div style="font-size:0.85rem; color:#aaa; margin-bottom:10px; height: 40px; overflow:hidden;">${w.desc}</div>
            <span class="tag">${w.tag}</span>
        </div>`;
    });
    gridHtml += '</div>';
    return gridHtml;
}

function printHTML(content) {
    const line = document.createElement("div");
    line.className = "command-output";
    line.innerHTML = content;
    output.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function execCmd(cmd) {
    // In lệnh ra màn hình
    const cmdLine = document.createElement("div");
    cmdLine.innerHTML = `<span class="prompt">root@dang:~/portfolio$</span> ${cmd}`;
    output.appendChild(cmdLine);

    // Xử lý lệnh
    setTimeout(() => {
        if (cmd.includes('about')) {
            printHTML(data.about);
        } else if (cmd.includes('skills')) {
            printHTML(data.skills);
        } else if (cmd.includes('writeups')) {
            printHTML(renderWriteups());
        } else if (cmd.includes('contact') || cmd.includes('ping')) {
            printHTML(data.contact);
        } else if (cmd.includes('clear')) {
            output.innerHTML = '';
            printHTML(asciiArt);
        } else {
            printHTML(`bash: ${cmd}: command not found`);
        }
    }, 200);
}

/* --- 4. MATRIX RAIN EFFECT --- */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    for(let i=0; i<drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random()*chars.length));
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);
        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i]=0;
        drops[i]++;
    }
}
setInterval(draw, 40);

// Đồng hồ
setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleTimeString();
}, 1000);
