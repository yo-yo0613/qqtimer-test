const button = document.getElementById('keydown');
const letterPair = [
    'AB','AD','AF','AG','AH','AI','AK','AL','AN','AO','AP','AQ','AS','AT','AU','AV','AW','AX',
    'BA','BD','BE','BF','BG','BH','BI','BK','BL','BO','BP','BR','BS','BT','BU','BV','BW','BX',
    'DA','DB','DE','DG','DH','DK','DL','DN','DO','DP','DQ','DR','DS','DT','DU','DV','DW','DX',   
    'EB','ED','EF','EG','EH','EI','EK','EL','EN','EO','EP','EQ','ES','ET','EU','EV','EW','EX',
    'FA','FB','FE','FG','FH','FK','FL','FN','FO','FP','FQ','FR','FS','FT','FU','FV','FW','FX',
    'GA','GB','GD','GE','GF','GH','GI','GK','GN','GO','GP','GQ','GR','GS','GT','GV','GW','GX',
    'HA','HB','HD','HE','HF','HG','HI','HK','HL','HN','HO','HP','HQ','HR','HT','HU','HV','HW',
    'IA','IB','IE','IG','IH','IK','IL','IN','IO','IP','IQ','IR','IS','IT','IU','IV','IW','IX',
    'KA','KB','KD','KE','KF','KG','KH','KI','KL','KN','KO','KQ','KR','KS','KT','KU','KW','KX',
    'LA','LB','LD','LE','LF','LH','LI','LK','LN','LO','LP','LQ','LR','LS','LT','LV','LW','LX',
    'NA','ND','NE','NF','NG','NH','NI','NK','NL','NO','NP','NR','NS','NT','NU','NV','NW','NX',
    'OA','OB','OD','OE','OF','OG','OH','OI','OK','OL','ON','OP','OQ','OR','OS','OU','OV','OX',   
    'PA','PB','PD','PE','PF','PG','PH','PI','PL','PN','PO','PQ','PR','PS','PT','PU','PW','PX',
    'QA','QD','QE','QF','QG','QH','QI','QK','QL','QO','QP','QR','QS','QT','QU','QV','QW','QX',
    'RB','RD','RF','RG','RH','RI','RK','RL','RN','RO','RP','RQ','RS','RT','RU','RV','RW','RX',
    'SA','SB','SD','SE','SF','SG','SI','SK','SL','SN','SO','SP','SQ','SR','ST','SU','SV','SW',
    'TA','TB','TD','TE','TF','TG','TH','TI','TK','TL','TN','TP','TQ','TR','TS','TU','TV','TX',
    'UA','UB','UD','UE','UF','UH','UI','UK','UN','UO','UP','UQ','UR','US','UT','UV','UX',
    'VA','VB','VD','VE','VF','VG','VH','VI','VL','VN','VO','VQ','VR','VS','VT','VU','VW','VX',
    'WA','WB','WD','WE','WF','WG','WH','WI','WK','WL','WN','WP','WQ','WR','WS','WU','WV','WX',
    'XA','XB','XD','XE','XF','XG','XI','XK','XL','XN','XO','XP','XQ','XR','XT','XU','XV','XW',
];

const algorithm = [
    "Aa perm","U2 Ab perm U2","[F : [U2 , F' R F R']]","[R' D R , U2]","[U' : [R D' R' , U2]]","[r D' U : [R D R' , U2]]","[D U' : [R D R' , U2]]","[D : [R' D' R , U2]]","[R' U D R2 : [U' , R' D' R]]","[U' : [R D R' , U2]]","[R' D' R , U2]","[R' U D : [R D R' , U2]]","[D' U' : [R D R' , U2]]","[D U' : [R D' R' , U2]]","[R F' R' U' : [R D R' , U2]]","[R' D R U' R D' R' , U2]","[R D' R' : [R' D R , U2]]","[R' U' D' R : [R U' R' , D]]",
    "Ab perm","U' Ab perm","[R : [U , R D R']]","[R2 : [D' , R U' R']]","[R' D R , U]","[U' , R D' R']","[R2 U' : [D' , R U R']]","[D' : [R' D R , U]]","[D : [R' D' R , U]]","[U' , R D R']","[R' D' R , U]","[R2 U : [R' U' R , D]]","[D' : [U' , R D R']]","[D : [U' , R D' R']]","[R F' : [R' U' R , D]]","[R' D R U' R D' R' , U]","[U' , R D' R' U R' D R]","[x: [R' U' R, D2]]",
    "U2 Aa perm U2","[R F' R' : [U , R' D R]]","[U' R2 : [D , R' U2 R]]","[R' D R , U']","[U' : [R D' R' , U']]","[D' : [R' D R , U']]","[D : [R' D' R , U']]","[U' R' : [U2 , R' D' R]]","[U' : [R D R' , U']]","[R' D' R , U']","[R' D' : [U' , R' D R]]","[U' R' : [U' , R' D' R]]","[D : [R' D R , U']]","[D' : [R' D' R , U']]","[R' U' R : [F2' , R' U R U']]","[R' D R U' R D' R' , U']","[R D' R' : [R' D R , U']]","[R' D' R : [R U' R' , D]]",
    "[R2 : [D , R' U R]]","[U' R : [U2 , R D R']]","[U' R' F : [D , R U R']]","[U R' : [U' , R' D R]]","[R D' : [R D R' , U]]","[l' U : [R D' R' , U2]]","[U D' R' : [U' , R' D R]]","[R U : [R' D R , U]]","[R' D R2 D' R2' : [U , R2 D R2' D' R2]]","[U' R : [R U' R' , D']]","[U R' U2 : [R D R' , U]]","[R' , F' L F]]","[U D R' : [U' , R' D R]]","[R U : [R' D' R , U]]","[D' R : [R D' R' , U]]","[U R' D' : [U' , R' D' R]]","[D R : [R D' R', U]]","[R : [R D' R' , U]]",
    "[F : [R' D' R , U2]]","[R' : [U' , R' D' R]]","[U' R' U , L]","[R' U' : [D , R U R']]","[U' R U' : [D' , R' U R]]","[R : [F , R' U R U']]","[D R' U' : [D' , R U R']]","[R U' D' R' : [D , R' U R]]","[D' R : [F , R' U R U']]","[R' U' : [D' , R U R']]","[R' F : [R U R' , D]]","[l U' l' , F]","[l U2 l' , F]","[D' R' U' : [D' , R U R']]","[U' R' U : [R U' R' , D]]","[U' D' R' U : [R U' R' , D]]","[R U' R' : [D , R' U R]]","[U' D R' U : [R U' R' , D]]",
    "[U2 , R' D R]","[U , R' D R]","[U' , R' D R]","[U R' : [R' D R , U']]","[R' U' : [R U R' , D]]","[D R' : [F' , R D' R']]","[D R' : [F2 , R D' R' D]]","[U : [D , R U' R']]","[U R U : [R' D R , U2]]","[U D : [R U' R' , D2]]","[U R' D : [R U' R' , D2]]","[R' U : [R U' R' , D]]","[R B' R' : [R' D R , U]]","[U D : [R U' R' , D]]","[R' D R : [D' , R U R']]","[U D R D' : [U' , R' D R]]","[U R : [D , R U' R']]","[D U R U' : [F2' , U R' U' R]]",
    "[U : [R D' R' , U2]]","[R D' R' , U']","[U2 : [R D' R' , U]]","[R D' : [U , R D R']]","[U' R U' : [R' U R , D']]","[R' D : [F' , D' R D R']]","[R U' D : [R' D R , U2]]","[l' U : [D , R U' R']]","[D2 : [R U R' , D']]","[U R : [R D' R' , U2]]","[R D' : [R' U' R , D2]]","[D2 , R U R']","[U' L U , R]","[U D R' F' : [D , R U' R']]","[D2 : [R U R' , D]]","[D R U' R' : [R' D R , U2]]","[R U' D R' : [R' D R , U2]]","[R D' R' : [R' D R , U]]",
    "R' D R U' R : [F , R' U R U']","[R2 U' : [R U R' , D']]","[l' U' : [R D' R' , U2]]","[R' D : [F2 , D' R D R']]","[R U D : [R' D R , U2]]","[D' R' D : [F2 , D' R D R']]","[R U : [R' D R , U2]]","[R' F' R D U : [U2 , R' D' R]","[R D' U : [R' D R , U2]]","[D R U : [R' D' R , U2]]","[R U D' : [R' D' R , U2]]","[R U R' U D : [R D R' , U2]]","[D R' D : [F2 , D' R D R']]","[R U : [R' D' R , U2]]","[D' R : [R D' R' , U2]]","[R U' R' D' : [R' D R , U2]]","[D R : [R D' R' , U2]]","[R : [R D' R' , U2]]",
    "[U D : [R D R' , U2]]","[D' : [U , R' D R]]","[D' : [U' , R' D R]]","[D' U R' : [R' D R , U']]","[U R U' : [F , U R' U' R]]","[U : [R U' R' , D]]","[l' U : [R U' R' , D]]","[R' : [F2 , R D' R' D]]","[R' : [F' , R D' R' D]]","[U' R' U : [R D R' , U2]]","[U : [R U' R' , D']]","[D' R' U : [R U' R' , D]]","[U' R' U2 : [R D R' , U]]","[U : [R U' R' , D2]]","[R U R' U' : [D' , R U R']]","[U R U' : [F2' , U R' U' R]]","[U R' D' : [U' , R' D R]]","[R' D' R : [R U R' , D]]",
    "[D' U : [R D' R' , U2]]","[D : [U , R' D' R]]","[D : [U' , R' D' R]]","[R U2 : [R' D R , U']]","[D R' U' : [R U R' , D']]","[D : [R U R' , D]]","[R U' : [R' D R , U U]]","[D' R' D : [F' , D' R D R']]","[U R U D : [R' D' R , U2]]","[R D2 : [R' U' R , D']]","[D , R U R']","[R' F : [R U' R' , D]]","[D R' : [D , R' U R]]","[D' R D' : [R' U' R , D2]]","[D : [R U R' , D2]]","[R U' R' : [R' D R , U2]]","[D R : [R D' R' , U']]","[D R D : [U , R' D' R]]",
    "[R' U D R : [D' , R U' R']]","[U' R2' : [D' , R U2 R']]","[R : [U , R2 D R2 D' R2]]","[R U' D' R' : [R' U R , D]]","[U R U' : [R' D R , U2]]","[U R : [U2 , R D' R']]","[R' F' R D U : [R' D' R , U2]","[U' R' U' : [R D R' , U2]]","[U R U' D : [R' D' R , U2]]","[U R U' : [R' D' R , U2]]","[U' R' D U' : [R D' R' , U2]]","[U R2 U' : [D' , R U R']]","[U' R' U' : [R D' R' , U2]]","[R' F' R D' U : [R' D R , U2]]","[U' R' : [R' D R , U2]]","[D' U' R' : [R' D R , U2]]","[U R U' D' : [R' D R , U2]]","[D U' R' : [R' D R , U2]]",
    "[U : [R D R' , U2]]","[R D R' , U']","[U2 : [R D R' , U]]","[U' R' F R : [R D R' , U']]","[D' R : [R' U R U' , F]]","[U D' : [R U' R' , D2]]","[R D : [R' U' R , D2]]","[R D' U' : [R' D R , U2]]","[U : [D' , R U' R']]","[R D : [R' U' R , D]]","[U R U : [R' D' R , U2]]","[R D' : [R' D R , U]]","[U' R U : [R' U' R , D]]","[R B' : [R' U' R , D]]","[U' : [R' U' R , D']]","[U' R' : [R' D R , U]]","[D' U R U' : [F2 , U R' U' R]]","[U D' R D' : [U' , R' D R]]",
    "[U2 , R' D' R]","[U , R' D' R]","[U' , R' D' R]","[U R' U' : [R D R' , U']]","[R' U' : [R U R' , D']]","[U R' D' : [R U' R' , D2]]","[R U R' , D2]","[D R U' : [R' D' R , U2]]","[R U R' , D]","[U' R' D U : [R D' R' , U2]]","[R D' : [U , R' D R]]","[R' U : [R U' R' , D']]","[R' : [D , R' U R]]","[U R' D' : [R U' R' , D']]","[R U R' , D']","[R D : [U , R' D' R]]","[D' R U' R' : [R' D R , U2]]","[R : [R D' R' , U']]",
    "[R' U' D : [R D R' , U2]]","[R' D' : [R' D R , U']]","[F' L F , R']","[R' F : [D , R U R']]","[R' U : [D , R U' R']]","[R , U' L U]","[R D' U' : [R' D' R , U2]]","[D' R' U : [D , R U' R']]","[R' F : [D , R U' R']]","[U' R U : [D , R' U' R]]","[R' U : [D' , R U' R']]","[R , U' L' U]","[D R' U : [D , R U' R']]","[R U' : [R' U R , D]]","[D' R U' : [R' U R , D']]","[U R' U' : [R U R' , D']]","[D R U' : [R' U R , D']]","[R U' : [R' U R , D']]",
    "[R2 U : [D , R' U' R]]","[U' R2' : [D' , R U' R']]","[F , l U' l']","[R B' R' : [U , R' D R]]","[U D R' F' : [R U' R' , D]]","[R U R' D' : [R' D R , U2]]","[U' R' U' : [R D R' , U']]","[D R' : [R' U R , D]]","[U R2 U' : [R U R' , D']]","[R B' : [D , R' U' R]]","[R2' : [U , R D R']]","[U' L' U , R]","[U' R' U' : [R D' R' , U']]","[D' R2' : [U , R D R']]","[U' R' : [R' D R , U']]","[D' U' R' : [R' D R , U']]","[U R : [D' , R U' R']]","[R2 U : [D' , R' U' R]]",
    "[U D' : [R D R' , U2]]","[D' : [R D R' , U']]","[D : [U' , R' D R]]","[D U R' : [R' D R , U']]","[F , l U2 l']","[U D2 : [R U' R' , D']]","[D R' D : [F2 , D' R D R']]","[U : [D2 , R U' R']]","[D' R D : [R' U' R , D2]]","[U' R' U : [R D' R' , U2]]","[U' : [D' , R' U' R]]","[U R' D' : [D' , R U' R']]","[D R' U : [R U' R' , D]]","[U' R' U2 : [R D' R' , U]]","[D2' R' : [F' , R D' R' D]]","[U' D' R' D' : [U' , R D R']]","[U' D' R' : [R' D R , U]]","[U R : [D2 , R U' R']]",
    "[U D : [R D' R' , U2]]","[D : [R D' R' , U']]","[D' : [U' , R' D' R]]","[R U2 : [R' D' R , U']]","[D' R' U' : [R U R' , D']]","[R' D R2 : [U , R' D' R]]","[D' : [R U R' , D']]","[R U' : [R' D' R , U2]]","[R U R' U' : [R U R' , D']]","[D' : [R U R' , D2]]","[R' F' R D' U' : [R' D R , U2]]","[D' , R U R']","[R U' : [D , R' U R]]","[D' R' : [D , R' U R]]","[D R' D : [F' , D' R D R']]","[D' R : [R D' R' , U']]","[D' R D : [U , R' D' R]]","[R U' D : [R' U R , D2]]",
    "[R F' R' U : [R D R' , U2]]","[R F' : [D , R' U' R]]","[U' : [F2' , U R' U' R]]","[D' R : [U , R D' R']]","[U' R' U : [D , R U' R']]","[D R U' R' : [U2 , R' D R]]","[R D U' : [R' D' R , U2]]","[R : [F2 , R' U R U']]","[U' R' : [U2 , R' D R]]","[U' R' : [U , R' D R]]","[R D : [R' D' R , U]]","[D' R U' : [D' , R' U R]]","[U' R' : [U' , R' D R]]","[U' D' R' D' : [R D R' , U']]","[D' R : [U' , R D' R']]","[U' R' U R : [D , R U' R']]","[R U' D2 : [R' U R , D]]",
    "[U2 , R' D R U' R D' R']","[U , R' D R U' R D' R']","[U' , R' D R U' R D' R']","[U R' D' : [R' D' R , U']]","[U' D' R' U : [D , R U' R']]","[U D R D' : [R' D R , U']]","[R U' D R' : [U2 , R' D R]]","[R U' R' U D : [R D R' , U2]]","[R U' R' : [U2 , R' D R]]","[U' D' R' : [U2 , R' D R]]","[D' R : [F2 , R' U R U']]","[U R' U' : [D' , R U R']]","[D' U' R' : [U' , R' D R]]","[U' D' R' : [U , R' D R]]","[D' R D : [R' D' R , U]]","[U' R' U R : [R U' R' , D]]","[D R U' R' : [R' U R , D']]","[R U' R' U : [R D' R' , U2]]",
    "[R D' R' : [U2 , R' D R]]","[R D' R' U R' D R , U']","[R D' R' : [U' , R' D R]]","[D R : [U , R D' R']]","[R U' R2' : [U , R D R']]","[U R2 : [U' , R' D R]]","[R D' R' : [U , R' D R]]","[D R : [U2 , R D' R']]","[U R D' : [R' D R , U']]","[D' R2 : [R' U' R , D']]","[U R U D' : [R' D R , U2]]","[D' R U' R' : [U2 , R' D R]]","[D R U' : [D' , R' U R]]","[U R2 : [U' , R' D' R]]","[U R2 : [U' , R' D2 R]]","[U' R2' : [D , R2 U R2' U' R2]]","[D R U' R' : [D' , R' U R]]","[R U' R' : [R' U R , D']]",
    "[R' U' D' R : [D , R U' R']]","[x: [D2, R' U' R]]","[R' D' R : [D , R U' R']]","[R : [U , R D' R']]","[U' D R' U : [D , R U' R']]","[D R : [F2 , R' U R U']]","[R2 U : [R' U R , D']]","[R' D' R : [D ,R U R']]","[D R D : [R' D' R , U]]","[D U' R' : [U2 , R' D R]]","[U D' R D' : [R' D R , U']]","[R2 : [R' U' R , D']]","[R U' : [D' , R' U R]]","[R2 U : [R' U' R , D']]","[R U' D' : [R' U R , D2]]","[R U' D' : [R' U R , D']]","[R U' R' U' : [R D' R' , U2]]","[R U' R' : [D' , R' U R]]"
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

document.getElementById('speed-button').onclick = function() {
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