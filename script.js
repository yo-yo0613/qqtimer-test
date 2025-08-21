const button = document.getElementById('keydown');
const letterPair = [
    "BC","BD","BF","BG","BH","BI","BJ","BK","BL","BM","BO","BP","BS","BT","BU","BV","BW","BX",
    "CB","","","","","","","","","","","","","","","","","",
    "DB","","","","","","","","","","","","","","","","","",   
    "FB","","","","","","","","","","","","","","","","","",
    "GB","","","","","","","","","","","","","","","","","",
    "HB","","","","","","","","","","","","","","","","","",
    "IB","","","","","","","","","","","","","","","","","",
    "JB","","","","","","","","","","","","","","","","","",
    "KB","","","","","","","","","","","","","","","","","",
    "LB","","","","","","","","","","","","","","","","","",
    "MB","","","","","","","","","","","","","","","","","",
    "","","","","","","","","","","","","","","","","","", 
    "OB","","","","","","","","","","","","","","","","","",   
    "PB","","","","","","","","","","","","","","","","","",
    "","","","","","","","","","","","","","","","","","", 
    "SB","","","","","","","","","","","","","","","","","",
    "TB","","","","","","","","","","","","","","","","","",
    "UB","","","","","","","","","","","","","","","","","",
    "VB","","","","","","","","","","","","","","","","","",
    "WB","","","","","","","","","","","","","","","","",
    "XB","","","","","","","","","","","","","","","","","",
];

const algorithm = [
    "[R2 : [D , R' U R]]","[U' Lw : [R' D2 R  , U2]]","[L' , U R U']","[U R' U : [R U' R', D]]","[R U: [R' U' R , D']]","[x : [D' , R' U R]]","[U' : [L' , U R U']]","[D R U: [R' U' R, D ]]","[D' R U: [R' U' R, D' ]] ","[U Rw' : [U2 , L D2 L' ]]","[R U: [R' U' R, D ]]","[x' U' D' :[R' D' R, U ]] ","[D' R U: [R' U' R, D ]]","[U R U': [D, R' U R ]]","[U D' R U': [D', R' U R ]]","[R' U R: [R U' R', D' ]]","[U D R U': [D', R' U R ]]","[U R U': [D', R' U R ]]",
    "[R2 : [R' U R, D]]","","","","","","","","","","","","","","","","","",
    "[U' Lw : [U2 , R' D2 R]]","","","","","","","","","","","","","","","","","",   
    "[U R U' , L' ]","","","","","","","","","","","","","","","","","",
    "[U R' U : [D , R U' R' ]]","","","","","","","","","","","","","","","","","",
    "[R U: [D' , R' U' R ]]","","","","","","","","","","","","","","","","","",
    "[x : [R' U R , D' ]]","","","","","","","","","","","","","","","","","",
    "[U' : [U R U' , L' ]]","","","","","","","","","","","","","","","","","",
    "[D R U: [D , R' U' R ]]","","","","","","","","","","","","","","","","","",
    "[D' R U: [D' , R' U' R ]] ","","","","","","","","","","","","","","","","","",
    "[U Rw' : [ L D2 L' , U2 ]]","","","","","","","","","","","","","","","","","",
    "","","","","","","","","","","","","","","","","","",   
    "[R U: [ D, R' U' R ]]","","","","","","","","","","","","","","","","","",
    "[x' U' D' :[U , R' D' R ]] ","","","","","","","","","","","","","","","","","",
    "","","","","","","","","","","","","","","","","","",
    "[D' R U: [D , R' U' R ]]","","","","","","","","","","","","","","","","","",
    "[U R U': [R' U R , D ]]","","","","","","","","","","","","","","","","","",
    "[U D' R U': [R' U R , D' ]]","","","","","","","","","","","","","","","","",
    "[R' U R: [D' , R U' R']]","","","","","","","","","","","","","","","","","",
    "[U D R U': [R' U R , D' ]]","","","","","","","","","","","","","","","","","",
    "[U R U': [R' U R , D' ]]","","","","","","","","","","","","","","","","","",
];

// 檢查 letterPair 和 algorithm 是否對齊
if (letterPair.length !== algorithm.length) {
    console.error("letterPair 和 algorithm 長度不一致！", letterPair.length, algorithm.length);
} else {
    for (let i = 0; i < letterPair.length; i++) {
        if (!letterPair[i] || !algorithm[i]) {
            console.error(`第 ${i} 筆有缺漏: letterPair=${letterPair[i]}, algorithm=${algorithm[i]}`);
        }
    }
}

for (let i = 0; i < letterPair.length; i++) {
    if (!letterPair[i] || !algorithm[i]) {
        console.log(`第 ${i + 1} 筆有缺漏: letterPair=${letterPair[i]}, algorithm=${algorithm[i]}`);
    }
}

// 顯示隨機字母的函式
function showRandomLetter() {
    const randomIndex = Math.floor(Math.random() * letterPair.length);
    const randomLetter = letterPair[randomIndex];
    const randomAlgorithm = algorithm[randomIndex];
    // 你可以把這個字母顯示在某個元素上，例如 id="display"
    document.getElementById('letter-pair-text').textContent = randomLetter;
    document.getElementById('Algorithm').textContent = randomAlgorithm;
}

// 監聽鍵盤事件，只在按下空白鍵時執行
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        showRandomLetter();
        event.preventDefault(); // 防止頁面捲動
    }
});

document.getElementById('speed-button').onclick = function() {
    window.location.href = 'index.html';
};

document.getElementById('cornor-button').onclick = function() {
    window.location.href = 'blindfolded.html';
};

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === 'active') {
    enableDarkMode();
}

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode != "active" ? enableDarkMode() : disableDarkMode();
});

document.getElementById('show-letter-btn').onclick = function() {
    showRandomLetter();
};

// 只在顯示區點擊或觸控才隨機顯示
const display = document.getElementById('display');
display.addEventListener('click', showRandomLetter);
display.addEventListener('touchend', function(event) {
    // 避免點擊按鈕時觸發
    if (event.target.closest('button')) return;
    showRandomLetter();
});

document.getElementById('search-btn').onclick = function() {
    const input = document.getElementById('search-input').value.trim().toUpperCase();
    const idx = letterPair.indexOf(input);
    const letterText = document.getElementById('letter-pair-text');
    const algoText = document.getElementById('Algorithm');
    if (idx !== -1) {
        letterText.textContent = letterPair[idx];
        algoText.textContent = algorithm[idx];
    } else {
        letterText.textContent = '未找到';
        algoText.textContent = '';
    }
};

// 支援按 Enter 搜尋
document.getElementById('search-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('search-btn').click();
});

const DisplayletterPair = document.getElementById('display-letter-btn');
DisplayletterPair.addEventListener('click', function() {
    const cornorAlg = document.getElementById("Algorithm");
    if (cornorAlg.style.visibility === "hidden") {
        cornorAlg.style.visibility = "visible";
    } else {
        cornorAlg.style.visibility = "hidden";
    }
});