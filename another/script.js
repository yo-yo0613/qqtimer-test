// =================================================================
// DOM 元素
// =================================================================
const timerDisplay = document.getElementById('timer');
const scrambleDisplay = document.getElementById('scramble');
const timesList = document.getElementById('times-list');
const puzzleSelect = document.getElementById('puzzle-select');
const instructions = document.getElementById('instructions');
const solveCountDisplay = document.getElementById('solve-count');
const ao5Display = document.getElementById('ao5');
const ao12Display = document.getElementById('ao12');
const themeToggleButton = document.getElementById('theme-toggle');

// =================================================================
// 狀態變數
// =================================================================
let timerState = 'idle'; // idle, ready, timing, inspecting
let timerInterval = null;
let startTime = 0;
let holdTimeout = null;
let readyToStart = false; // Renamed for clarity

let times = []; // { time: 12345, penalty: null | '+2', isDNF: false, scramble: '...' }
let currentPuzzle = '333';
const scrambler = new Scrambo();

let inspectionState = {
    active: false,
    countdown: 15,
    interval: null,
    penalty: null // null, '+2', or 'DNF'
};

// =================================================================
// 核心功能函數
// =================================================================

function formatTime(ms) {
    if (ms === null || typeof ms === 'undefined') return 'N/A';
    
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
        return `${minutes}:${seconds.toFixed(3).padStart(6, '0')}`;
    } else {
        return seconds.toFixed(3);
    }
}

function generateScramble() {
    try {
        const scramble = scrambler.get(currentPuzzle)[0].scramble_string;
        scrambleDisplay.textContent = scramble;
        return scramble;
    } catch (error) {
        console.error("Scramble generation failed:", error);
        scrambleDisplay.textContent = `無法為 ${currentPuzzle} 產生打亂公式。`;
        return null;
    }
}

function startInspection() {
    stopInspection();
    timerState = 'inspecting';
    inspectionState.active = true;
    inspectionState.countdown = 15;
    inspectionState.penalty = null;
    timerDisplay.textContent = inspectionState.countdown;
    timerDisplay.classList.remove('timer-ready', 'timer-go');
    instructions.textContent = "觀察中... 再次按住空白鍵準備";

    inspectionState.interval = setInterval(() => {
        inspectionState.countdown--;
        timerDisplay.textContent = inspectionState.countdown;

        if (inspectionState.countdown === 7) console.log("8 seconds!"); 
        if (inspectionState.countdown === 3) console.log("12 seconds!");
        if (inspectionState.countdown === 0) inspectionState.penalty = '+2';
        if (inspectionState.countdown <= -2) {
            stopInspection();
            addSolve(null, 'DNF');
            timerState = 'idle';
            instructions.textContent = "DNF! 按住空白鍵準備";
        }
    }, 1000);
}

function stopInspection() {
    clearInterval(inspectionState.interval);
    inspectionState.active = false;
}

function startTimer() {
    stopInspection();
    timerState = 'timing';
    startTime = Date.now();
    timerDisplay.classList.remove('timer-ready', 'timer-go');
    instructions.textContent = "計時中... 按任意鍵停止";

    function update() {
        if (timerState !== 'timing') return;
        const diff = Date.now() - startTime;
        timerDisplay.textContent = formatTime(diff);
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

function stopTimer() {
    const finalTime = Date.now() - startTime;
    timerState = 'idle';
    instructions.textContent = "按住空白鍵準備";
    addSolve(finalTime, inspectionState.penalty);
}

function addSolve(time, penalty) {
    const newSolve = {
        time: time,
        penalty: time === null ? null : penalty,
        isDNF: penalty === 'DNF' || time === null,
        scramble: scrambleDisplay.textContent
    };
    times.unshift(newSolve);
    updateAndSave();
    generateScramble();
}

// =================================================================
// UI 更新與統計
// =================================================================

function updateTimesList() {
    timesList.innerHTML = '';
    times.forEach((solve, index) => {
        const li = document.createElement('li');
        let displayTime;
        if (solve.isDNF) {
            displayTime = 'DNF';
        } else {
            const displayMs = solve.time + (solve.penalty === '+2' ? 2000 : 0);
            displayTime = formatTime(displayMs);
            if (solve.penalty === '+2') displayTime += ' (+2)';
        }
        li.innerHTML = `
            <span class="solve-time">${times.length - index}. ${displayTime}</span>
            <div class="solve-actions">
                <button onclick="togglePenalty(${index}, '+2')">+2</button>
                <button onclick="togglePenalty(${index}, 'DNF')">DNF</button>
                <button class="delete" onclick="deleteSolve(${index})">X</button>
            </div>
        `;
        timesList.appendChild(li);
    });
}

function calculateAverage(count) {
    if (times.length < count) return 'N/A';
    const session = times.slice(0, count);
    const dnfs = session.filter(solve => solve.isDNF);
    if (dnfs.length > 1) return 'DNF';
    const validTimes = session.filter(solve => !solve.isDNF);
    let numericTimes = validTimes.map(solve => solve.time + (solve.penalty === '+2' ? 2000 : 0));
    numericTimes.sort((a, b) => a - b);
    if (dnfs.length === 1) {
        numericTimes.shift();
    } else {
        numericTimes.shift();
        numericTimes.pop();
    }
    const sum = numericTimes.reduce((total, time) => total + time, 0);
    return formatTime(sum / numericTimes.length);
}

function updateStatistics() {
    solveCountDisplay.textContent = times.length;
    ao5Display.textContent = calculateAverage(5);
    ao12Display.textContent = calculateAverage(12);
}

// =================================================================
// 使用者互動處理
// =================================================================

window.togglePenalty = function(index, type) {
    const solve = times[index];
    if (type === 'DNF') {
        solve.isDNF = !solve.isDNF;
        if (solve.isDNF) solve.penalty = null;
    } else if (type === '+2') {
        solve.penalty = solve.penalty === '+2' ? null : '+2';
        solve.isDNF = false;
    }
    updateAndSave();
}

window.deleteSolve = function(index) {
    times.splice(index, 1);
    updateAndSave();
}

function updateAndSave() {
    updateTimesList();
    updateStatistics();
    saveState();
}

function saveState() {
    localStorage.setItem('qqtimer_times', JSON.stringify(times));
    localStorage.setItem('qqtimer_puzzle', currentPuzzle);
}

// **修正：增加了 try-catch 來防止載入錯誤**
function loadState() {
    try {
        const savedTimes = localStorage.getItem('qqtimer_times');
        if (savedTimes) times = JSON.parse(savedTimes);
    } catch (e) {
        console.error("Failed to load times from localStorage:", e);
        times = []; // 如果解析失敗，則重置為空陣列
    }
    const savedPuzzle = localStorage.getItem('qqtimer_puzzle');
    if (savedPuzzle) {
        currentPuzzle = savedPuzzle;
        puzzleSelect.value = currentPuzzle;
    }
}

// **新增：主題切換功能**
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = '切換淺色';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleButton.textContent = '切換深色';
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('qqtimer_theme', currentTheme);
}

themeToggleButton.addEventListener('click', toggleTheme);

function loadTheme() {
    const savedTheme = localStorage.getItem('qqtimer_theme') || 'light';
    applyTheme(savedTheme);
}

// =================================================================
// 事件監聽器
// =================================================================

window.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || document.activeElement.tagName !== 'BODY') return;
    e.preventDefault();

    switch(timerState) {
        case 'idle':
        case 'inspecting':
            if (timerState === 'inspecting' && readyToStart) return;
            timerState = 'ready';
            timerDisplay.classList.add('timer-ready');
            holdTimeout = setTimeout(() => {
                timerDisplay.classList.remove('timer-ready');
                timerDisplay.classList.add('timer-go');
                readyToStart = true;
            }, 300);
            break;
        case 'timing':
            stopTimer();
            break;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code !== 'Space' || document.activeElement.tagName !== 'BODY') return;
    e.preventDefault();

    clearTimeout(holdTimeout);

    if (timerState === 'ready') {
        if (readyToStart) {
            if (inspectionState.active) {
                startTimer();
            } else {
                startInspection();
            }
        } else {
            timerState = inspectionState.active ? 'inspecting' : 'idle';
            timerDisplay.classList.remove('timer-ready');
        }
        readyToStart = false;
    }
});

// =================================================================
// 初始化
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 將焦點設置到 body 以確保空白鍵能正常作用
    document.body.focus(); 
    loadState();
    loadTheme();
    updateTimesList();
    updateStatistics();
    generateScramble();
    instructions.textContent = "按住空白鍵準備";
});