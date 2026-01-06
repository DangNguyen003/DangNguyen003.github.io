/* --- 1. MATRIX RAIN EFFECT --- */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}
setInterval(drawMatrix, 30);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* --- 2. TERMINAL LOGIC --- */
const output = document.getElementById('output');
const prompt = 'root@dang:~/portfolio$ ';

// Dữ liệu nội dung (Sửa thông tin của bạn ở đây)
const data = {
    'intro': `
<div class="ascii-art">
  _   _    _    ___   ___   _    _   _  _____ 
 | \ | |  / \  |_ _| |   \ | |  | \ | ||  __ |
 |  \| | / _ \  | |  | |\ \| |  |  \| || |  \|
 | |\  |/ ___ \ | |  | | \ | |  | |\  || |__  
 |_| \_/_/   \_\___| |_|  \__|  |_| \_||_____|
 
 Security Researcher | CTF Player
</div>
System initialized...
Loading kernel modules... OK
Mounting file system... OK
Welcome, Guest. Type a command or click the buttons below.
`,
    'about': `
<span class="highlight">>> CAT ABOUT.TXT</span>
----------------------------------------
IDENTITY: Nguyen Hai Dang
ROLE: Security Researcher / CTF Player
LOCATION: Vietnam
----------------------------------------
[+] Passionate about breaking things to secure them.
[+] Focus: Web Security, Reverse Engineering, Binary Exploitation.
[+] Objective: Sharing knowledge & Strengthening community defense.
`,
    'skills': `
<span class="highlight">>> LS -LA SKILLS/</span>
drwx------  2 dang dang  4096 May 10 10:00 .
drwxr-xr-x 10 dang dang  4096 May 10 10:00 ..
-rwx------  1 dang dang  2048 <span class="file">Burp_Suite_Pro</span>
-rwx------  1 dang dang  1024 <span class="file">Metasploit_Framework</span>
-rwx------  1 dang dang  4096 <span class="file">IDA_Pro_&_Ghidra</span>
-rwx------  1 dang dang  1024 <span class="file">Python_Scripting.py</span>
-rwx------  1 dang dang  1024 <span class="file">C_Cpp_Assembly</span>
-rwx------  1 dang dang  1024 <span class="file">Wireshark_Analysis</span>
`,
    'writeups': `
<span class="highlight">>> CAT WRITEUPS.LOG</span>
[2024-05-12] <a href="#" style="color:#00ffff">Breaking_SecureAuth_Bypass.pdf</a>
             > Critical logic flaw found in bounty program.
             
[2024-03-15] <a href="#" style="color:#00ffff">DEFCON_CTF_Crypto_Writeup.txt</a>
             > Solving RSA Padding Oracle attacks.
             
[2024-02-20] <a href="#" style="color:#00ffff">Advanced_Malware_Analysis.md</a>
             > Dissecting APT persistence mechanisms.
`,
    'contact': `
<span class="highlight">>> PING CONTACT</span>
PING gmail.com (142.250.1.1) 56(84) bytes of data.
64 bytes from danghn0703@gmail.com: icmp_seq=1 ttl=116 time=14.2 ms

--- CONTACT INFO ---
[+] Email: <a href="mailto:danghn0703@gmail.com" style="color:#fff">danghn0703@gmail.com</a>
[+] Github: github.com/DangNguyen003
[+] Facebook: facebook.com/Hai.Dang.0703
`
};

// Hàm gõ chữ tự động
function typeText(html) {
    output.innerHTML += "<div>" + html + "</div>";
    // Tự động cuộn xuống cuối
    const terminalWindow = document.querySelector('.terminal-window');
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
}

// Chạy lệnh khi bấm nút
function runCommand(cmd) {
    let key = '';
    if(cmd.includes('about')) key = 'about';
    else if(cmd.includes('skills')) key = 'skills';
    else if(cmd.includes('writeups')) key = 'writeups';
    else if(cmd.includes('contact')) key = 'contact';

    // Hiệu ứng gõ lệnh vào dòng input ảo trước khi hiện kết quả
    const inputSpan = document.querySelector('.input-line .cursor');
    inputSpan.insertAdjacentHTML('beforebegin', cmd);
    
    setTimeout(() => {
        // Xóa lệnh ở dòng input sau khi "Enter"
        document.querySelector('.terminal-window').innerHTML += `<div><span class="prompt">${prompt}</span>${cmd}</div>`;
        document.querySelector('.input-line').innerHTML = `<span class="prompt">${prompt}</span><span class="cursor">_</span>`;
        
        // Hiện nội dung
        typeText(data[key]);
    }, 300); // Delay giả lập xử lý
}

// Khởi động
window.onload = () => {
    typeText(data['intro']);
};
