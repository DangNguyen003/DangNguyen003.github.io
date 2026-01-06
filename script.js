/* --- 1. MATRIX RAIN EFFECT --- */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = canvas.width / fontSize;
const rainDrops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}
setInterval(drawMatrix, 30);

/* --- 2. TERMINAL LOGIC (ĐÃ SỬA LỖI) --- */

// Dữ liệu nội dung (Bạn sửa thông tin của mình ở đây)
const data = {
    'intro': `
<div class="ascii-art">
  _   _    _    ___   ___   _    _   _  _____ 
 | \\ | |  / \\  |_ _| |   \\ | |  | \\ | ||  __ |
 |  \\| | / _ \\  | |  | |\\ \\| |  |  \\| || |  \\|
 | |\\  |/ ___ \\ | |  | | \\ | |  | |\\  || |__  
 |_| \\_/_/   \\_\\___| |_|  \\__|  |_| \\_||_____|
 
 Security Researcher | CTF Player
</div>
<br>
System initialized...<br>
Loading kernel modules... OK<br>
Mounting file system... OK<br>
Welcome, Guest. Type a command or click the buttons below.<br>
<br>
`,
    'about': `
----------------------------------------
IDENTITY: Nguyen Hai Dang
ROLE: Security Researcher / CTF Player
LOCATION: Vietnam
----------------------------------------
[+] Passionate about breaking things to secure them.
[+] Focus: Web Security, Reverse Engineering, Binary Exploitation.
[+] Objective: Sharing knowledge & Strengthening community defense.
<br>
`,
    'skills': `
drwx------  2 dang dang  4096 May 10 10:00 .
drwxr-xr-x 10 dang dang  4096 May 10 10:00 ..
-rwx------  1 dang dang  2048 <span class="file">Burp_Suite_Pro</span>
-rwx------  1 dang dang  1024 <span class="file">Metasploit_Framework</span>
-rwx------  1 dang dang  4096 <span class="file">IDA_Pro_&_Ghidra</span>
-rwx------  1 dang dang  1024 <span class="file">Python_Scripting.py</span>
-rwx------  1 dang dang  1024 <span class="file">C_Cpp_Assembly</span>
-rwx------  1 dang dang  1024 <span class="file">Wireshark_Analysis</span>
<br>
`,
    'writeups': `
[2024-05-12] <a href="#" style="color:#00ffff; text-decoration: underline;">Breaking_SecureAuth_Bypass.pdf</a>
             > Critical logic flaw found in bounty program.
             
[2024-03-15] <a href="#" style="color:#00ffff; text-decoration: underline;">DEFCON_CTF_Crypto_Writeup.txt</a>
             > Solving RSA Padding Oracle attacks.
             
[2024-02-20] <a href="#" style="color:#00ffff; text-decoration: underline;">Advanced_Malware_Analysis.md</a>
             > Dissecting APT persistence mechanisms.
<br>
`,
    'contact': `
PING gmail.com (142.250.1.1) 56(84) bytes of data.
64 bytes from danghn0703@gmail.com: icmp_seq=1 ttl=116 time=14.2 ms

--- CONTACT INFO ---
[+] Email: <a href="mailto:danghn0703@gmail.com" style="color:#fff">danghn0703@gmail.com</a>
[+] Github: github.com/DangNguyen003
[+] Facebook: facebook.com/Hai.Dang.k66
<br>
`
};

const outputDiv = document.getElementById('output');
const terminalWindow = document.querySelector('.terminal-window');
const promptText = '<span class="prompt">root@dang:~/portfolio$</span>';

// Hàm ghi nội dung vào màn hình
function printLine(html, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'command-output';
    
    if (isCommand) {
        line.innerHTML = promptText + html;
    } else {
        line.innerHTML = html;
    }
    
    outputDiv.appendChild(line);
    
    // Tự động cuộn xuống
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
}

// Chạy lệnh khi bấm nút
function runCommand(cmd) {
    // 1. Xác định nội dung cần hiển thị
    let key = '';
    if(cmd.includes('about')) key = 'about';
    else if(cmd.includes('skills')) key = 'skills';
    else if(cmd.includes('writeups')) key = 'writeups';
    else if(cmd.includes('contact')) key = 'contact';

    // 2. Hiệu ứng gõ lệnh vào dòng input ảo (cho đẹp)
    const inputCursor = document.querySelector('.input-line .cursor');
    const inputPrompt = document.querySelector('.input-line');
    
    // Ẩn con trỏ nhấp nháy tạm thời và hiện lệnh
    inputCursor.style.display = 'none';
    inputPrompt.innerHTML += cmd;

    // 3. Sau 300ms thì đẩy lên lịch sử và hiện nội dung
    setTimeout(() => {
        // Xóa dòng input ảo đi (reset về ban đầu)
        inputPrompt.innerHTML = `${promptText}<span class="cursor">_</span>`;
        
        // In dòng lệnh vào lịch sử
        printLine(cmd, true);
        
        // In nội dung kết quả
        if(data[key]) {
            printLine(data[key]);
        } else {
            printLine(`bash: ${cmd}: command not found`);
        }
    }, 300);
}

// Khởi động: In intro
window.onload = () => {
    printLine(data['intro']);
};
