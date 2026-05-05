// 检测是否为移动端
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 允许用户手动覆盖（在控制台执行 window.toggleDevice() 可切换）
function toggleDevice() {
    isMobile = !isMobile;
    renderUI(); // 重新渲染
    console.log('已切换到', isMobile ? '移动端模式' : '电脑端模式');
}

// ========== 游戏模式 ==========
let gameMode = 'consultation';
let tutorialStep = 0;
let tutorialEvents = [];

// ========== 咨询状态 ==========
let consultationStep = 0;
let tempPersonality = { ie: null, ns: null, ft: null, jp: null };
const consultationQuestions = [
    { 
        id: "consult_ie",
        dim: 'ie', 
        title: "   心理咨询师",
        desc: "你觉得你是内向的人，还是外向的人？",
        choiceA: { text: "内向 (I)", value: -30, nextEventId: "consult_ns" },
        choiceB: { text: "外向 (E)", value: 30, nextEventId: "consult_ns" }
    },
    { 
        id: "consult_ns",
        dim: 'ns', 
        title: "   心理咨询师",
        desc: "做决定时，你更依赖直觉，还是更依赖实际经验？",
        choiceA: { text: "直觉 (N)", value: -30, nextEventId: "consult_ft" },
        choiceB: { text: "实感 (S)", value: 30, nextEventId: "consult_ft" }
    },
    { 
        id: "consult_ft",
        dim: 'ft', 
        title: "   心理咨询师",
        desc: "面对冲突，你更在意逻辑对错，还是更在意他人感受？",
        choiceA: { text: "情感 (F)", value: -30, nextEventId: "consult_jp" },
        choiceB: { text: "思考 (T)", value: 30, nextEventId: "consult_jp" }
    },
    { 
        id: "consult_jp",
        dim: 'jp', 
        title: "   心理咨询师",
        desc: "你喜欢按计划行事，还是更喜欢随性而为？",
        choiceA: { text: "判断 (J)", value: -30, nextEventId: "consult_end" },
        choiceB: { text: "感知 (P)", value: 30, nextEventId: "consult_end" }
    }
];

// ========== 游戏状态 ==========
let gameState = {
    ie: 0,
    ns: 0,
    ft: 0,
    jp: 0,
    gameOver: false,
    gameOverReason: '',
    startPersonality: { ie: null, ns: null, ft: null, jp: null },
    totalEvents: 0,
    startTime: null
};

let currentEvent = null;
let eventQueue = [];
let fullEventLibrary = [];
let poolSize = 8;
let unlockedDimensions = { ie: false, ns: false, ft: false, jp: false };

// ========== 音频系统 ==========
let bgmEnabled = true;
let sfxEnabled = true;
let bgmAudio = null;

function playSound(soundName) {
    if (!sfxEnabled) return;
    const audio = new Audio(`Resources/sounds/${soundName}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('音效播放失败:', soundName));
}

function initBGM() {
    if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio = null;
    }
    if (!bgmEnabled) return;
    bgmAudio = new Audio('Resources/music/bgm.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;
    bgmAudio.play().catch(e => console.log('背景音乐播放失败', e));
}

function toggleBGM() {
    bgmEnabled = !bgmEnabled;
    if (bgmEnabled) initBGM();
    else if (bgmAudio) { bgmAudio.pause(); bgmAudio = null; }
    updateAudioButtons();
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    updateAudioButtons();
}

function updateAudioButtons() {
    const bgmBtn = document.getElementById('btnToggleBGM');
    const sfxBtn = document.getElementById('btnToggleSFX');
    if (bgmBtn) bgmBtn.classList.toggle('muted', !bgmEnabled);
    if (sfxBtn) sfxBtn.classList.toggle('muted', !sfxEnabled);
}

function playCardFlip() { playSound('card_flip'); }
function playCardSlide() { playSound('card_slide'); }
function playCardConfirm() { playSound('card_confirm'); }
function playGameOver() { playSound('game_over'); }
function playBaseClick() { playSound('baseclick'); }

// ========== 辅助函数 ==========
function getRoot() { return document.getElementById('gameRoot'); }

function clamp(value) {
    return Math.max(-50, Math.min(50, value));
}

function valueToPercent(value, startValue) {
    if (startValue < 0) {
        if (value <= 0) return ((-value) / 50) * 100;
        else return 0;
    } else {
        if (value <= 0) return 0;
        else return (value / 50) * 100;
    }
}

function getPersonalityLetter(value, startValue, type) {
    if (value > 0) {
        if (type === 'ie') return 'E';
        if (type === 'ns') return 'S';
        if (type === 'ft') return 'T';
        if (type === 'jp') return 'P';
    } else if (value < 0) {
        if (type === 'ie') return 'I';
        if (type === 'ns') return 'N';
        if (type === 'ft') return 'F';
        if (type === 'jp') return 'J';
    }
    if (startValue > 0) {
        if (type === 'ie') return 'E';
        if (type === 'ns') return 'S';
        if (type === 'ft') return 'T';
        if (type === 'jp') return 'P';
    } else {
        if (type === 'ie') return 'I';
        if (type === 'ns') return 'N';
        if (type === 'ft') return 'F';
        if (type === 'jp') return 'J';
    }
    return '?';
}

function isPersonalityFlipped(currentValue, startValue) {
    if (startValue === null || startValue === 0) return false;
    return (startValue > 0 && currentValue < 0) || (startValue < 0 && currentValue > 0);
}

function checkGameOver() {
    if (gameState.gameOver) return true;
    
    const flipped = [];
    if (isPersonalityFlipped(gameState.ie, gameState.startPersonality.ie)) flipped.push('I/E');
    if (isPersonalityFlipped(gameState.ns, gameState.startPersonality.ns)) flipped.push('N/S');
    if (isPersonalityFlipped(gameState.ft, gameState.startPersonality.ft)) flipped.push('F/T');
    if (isPersonalityFlipped(gameState.jp, gameState.startPersonality.jp)) flipped.push('J/P');
    
    if (flipped.length > 0) {
        gameState.gameOver = true;
        gameState.gameOverReason = {
            flipped: flipped,
            totalEvents: gameState.totalEvents,
            isQuickFail: gameState.totalEvents < 10
        };
        playGameOver();
        return true;
    }
    return false;
}
function checkGameWin() {
    // 胜利条件：所有维度都达到各自方向的极值（±50）
    const ieWin = (gameState.startPersonality.ie > 0 && gameState.ie >= 50) || (gameState.startPersonality.ie < 0 && gameState.ie <= -50);
    const nsWin = (gameState.startPersonality.ns > 0 && gameState.ns >= 50) || (gameState.startPersonality.ns < 0 && gameState.ns <= -50);
    const ftWin = (gameState.startPersonality.ft > 0 && gameState.ft >= 50) || (gameState.startPersonality.ft < 0 && gameState.ft <= -50);
    const jpWin = (gameState.startPersonality.jp > 0 && gameState.jp >= 50) || (gameState.startPersonality.jp < 0 && gameState.jp <= -50);
    
    return ieWin && nsWin && ftWin && jpWin;
}

function showFloatAnimation(statId, delta, statKey) {
    const statEl = document.getElementById(statId);
    if (!statEl) return;
    
    // 判断这个变化对玩家来说是正向还是负向
    // 正向：朝着玩家初始人格方向变化；负向：背离玩家初始人格方向
    const startValue = gameState.startPersonality[statKey];
    let isPositiveForPlayer = false;
    
    if (startValue > 0) {
        // 玩家初始是 E/S/T/P（正值），增加是正向，减少是负向
        isPositiveForPlayer = delta > 0;
    } else if (startValue < 0) {
        // 玩家初始是 I/N/F/J（负值），减少是正向（因为更负），增加是负向
        isPositiveForPlayer = delta < 0;
    } else {
        // 理论上不会发生，但兜底
        isPositiveForPlayer = delta > 0;
    }
    
    const rect = statEl.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'stat-value-float';
    // 显示绝对值，不带正负号（因为正负对玩家含义不同）
    const absDelta = Math.abs(delta);
    floatEl.textContent = isPositiveForPlayer ? `+${absDelta}` : `-${absDelta}`;
    floatEl.style.color = isPositiveForPlayer ? '#6aab6a' : '#d65c5c';
    floatEl.style.left = rect.left + rect.width / 2 + 'px';
    floatEl.style.top = rect.top + 'px';
    document.body.appendChild(floatEl);
    
    setTimeout(() => floatEl.remove(), 800);
}

function applyEffects(effects) {
    const oldValues = {
        ie: gameState.ie,
        ns: gameState.ns,
        ft: gameState.ft,
        jp: gameState.jp
    };
    
    gameState.ie = clamp(gameState.ie + (effects.ie || 0));
    gameState.ns = clamp(gameState.ns + (effects.ns || 0));
    gameState.ft = clamp(gameState.ft + (effects.ft || 0));
    gameState.jp = clamp(gameState.jp + (effects.jp || 0));
    gameState.totalEvents++;
    
    if (effects.ie) showFloatAnimation('stat-ie', gameState.ie - oldValues.ie, 'ie');
if (effects.ns) showFloatAnimation('stat-ns', gameState.ns - oldValues.ns, 'ns');
if (effects.ft) showFloatAnimation('stat-ft', gameState.ft - oldValues.ft, 'ft');
if (effects.jp) showFloatAnimation('stat-jp', gameState.jp - oldValues.jp, 'jp');
    
    updateProgressBars();
}

function updateProgressBars() {
    const stats = ['ie', 'ns', 'ft', 'jp'];
    stats.forEach(stat => {
        const fillEl = document.getElementById(`fill-${stat}`);
        const startValue = gameState.startPersonality[stat];
        if (fillEl && startValue !== undefined && unlockedDimensions[stat]) {
            fillEl.style.width = valueToPercent(gameState[stat], startValue) + '%';
        }
    });
}

// ========== 事件池管理 ==========
function refillEventPool() {
    if (fullEventLibrary.length === 0) return [];
    let available = [...fullEventLibrary];
    let newQueue = [];
    let count = Math.min(poolSize, available.length);
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * available.length);
        newQueue.push(available[randomIndex]);
        available.splice(randomIndex, 1);
    }
    return newQueue;
}

function getNextEvent() {
    if (eventQueue.length === 0) {
        if (gameMode === 'tutorial') {
            if (tutorialStep >= tutorialEvents.length) {
                gameMode = 'simulation';
                eventQueue = refillEventPool();
            } else {
                eventQueue = [tutorialEvents[tutorialStep]];
                tutorialStep++;
            }
        } else if (gameMode !== 'consultation') {
            eventQueue = refillEventPool();
        }
        playCardFlip();
    }
    return eventQueue.length > 0 ? eventQueue.shift() : null;
}

function insertEventToFront(event) {
    eventQueue.unshift(event);
}

function findEventById(eventId) {
    // 先查主事件
    const mainEvent = fullEventLibrary.find(e => e.id === eventId);
    if (mainEvent) return mainEvent;
    // 再查后续事件
    const followUp = (window.followUpEvents || []).find(e => e.id === eventId);
    if (followUp) return followUp;
    // 再查咨询/教学事件
    const consultEvent = consultationQuestions.find(e => e.id === eventId);
    if (consultEvent) return consultEvent;
    const tutorialEvent = tutorialEvents.find(e => e.id === eventId);
    if (tutorialEvent) return tutorialEvent;
    return null;
}

// ========== 重启函数 ==========
function restartSimulation() {
    gameMode = 'simulation';
    gameState = {
        ie: tempPersonality.ie,
        ns: tempPersonality.ns,
        ft: tempPersonality.ft,
        jp: tempPersonality.jp,
        gameOver: false,
        gameOverReason: '',
        startPersonality: { ...tempPersonality },
        totalEvents: 0,
        startTime: Date.now()
    };
    unlockedDimensions = { ie: true, ns: true, ft: true, jp: true };
    eventQueue = [];
    currentEvent = getNextEvent();
    renderUI();
}

function resetGame() {
    gameMode = 'consultation';
    
    // 重置所有状态
    consultationStep = 0;
    tempPersonality = { ie: null, ns: null, ft: null, jp: null };
    unlockedDimensions = { ie: false, ns: false, ft: false, jp: false };
    gameState = {
        ie: 0,
        ns: 0,
        ft: 0,
        jp: 0,
        gameOver: false,
        gameOverReason: '',
        startPersonality: { ie: null, ns: null, ft: null, jp: null },
        totalEvents: 0,
        startTime: null
    };
    eventQueue = [];
    
    // 开始引导对话
    startGuideDialog();
}
// ========== 引导对话 ==========
let guideStep = 0;
const guideDialogs = [
    {
        title: "   心理咨询师",
        desc: "欢迎回来，那么……",
        image: "Resources/images/card_default.jpg"
    },
    {
        title: "   心理咨询师",
        desc: "因为你对自己「是什么样的人」有所疑虑，我觉得咱们可以来玩一个小游戏……",
        image: "Resources/images/card_default.jpg"
    },
    {
        title: "   心理咨询师",
        desc: "这个游戏里，你可以试着「扮演」一下你想要成为的自己，或者你认为真正的自己……",
        image: "Resources/images/card_default.jpg"
    },
    {
        title: "   心理咨询师",
        desc: "当然，你身边其他人也会因为你「扮演」时作出的选择，而觉得你是更像你所「扮演」的人格、还是更不像……",
        image: "Resources/images/card_default.jpg"
    },
    {
        title: "   心理咨询师",
        desc: "不过放松点，无论你怎么选择或「扮演」，你才是真正的自己，对吗？",
        image: "Resources/images/card_default.jpg"
    },
    {
        title: "   心理咨询师",
        desc: "那么，我们开始吧？",
        image: "Resources/images/card_default.jpg"
    }
];

function startGuideDialog() {
    gameMode = 'consultation';
    guideStep = 0;
    showGuideStep();
}

function showGuideStep() {
    if (guideStep >= guideDialogs.length) {
        startDimensionQuestions();
        return;
    }
    
    const dialog = guideDialogs[guideStep];
    const root = getRoot();
    if (!root) return;
    
    root.innerHTML = `
        <div class="audio-controls">
            <button class="audio-btn" id="btnToggleBGM">🎵</button>
            <button class="audio-btn" id="btnToggleSFX">🔊</button>
        </div>
        <div class="consultation-container">
            <div class="doctor-avatar"> </div><div class="card-text" style="margin-top: 0;">
                <div class="event-title">📜 ${dialog.title}</div>
                <div class="event-desc">${dialog.desc}</div>
            </div>
            <div class="event-card" id="guideCard" style="background-image: url('${dialog.image}');">
                <div class="choice-tip" id="choiceTip"></div>
            </div>
            
        </div>
        ${isMobile ? `
<div style="display: flex; gap: 16px; margin-top: 20px; padding: 0 16px;">
    <button id="choiceBtnA" class="choice-btn-mobile" style="flex:1;">← 直接开始</button>
    <button id="choiceBtnB" class="choice-btn-mobile" style="flex:1;">继续 →</button>
</div>
<div style="text-align: center; margin-top: 16px; font-size: 12px; color: #8c9aaa;">💡 点击按钮继续</div>
` : `
<div class="tutorial-tip">← 左滑：直接开始游戏 &nbsp;&nbsp;&nbsp;&nbsp; 右滑：继续 →</div>
`}
    `;
    
    document.getElementById('btnToggleBGM')?.addEventListener('click', toggleBGM);
    document.getElementById('btnToggleSFX')?.addEventListener('click', toggleSFX);
    updateAudioButtons();
    
    if (isMobile) {
        // 移动端：按钮模式
        const btnA = document.getElementById('choiceBtnA');
        const btnB = document.getElementById('choiceBtnB');
        if (btnA) btnA.addEventListener('click', () => {
            startDimensionQuestions();
        });
        if (btnB) btnB.addEventListener('click', () => {
            guideStep++;
            showGuideStep();
        });
    } else {
        // 电脑端：滑动模式
        const guideCard = document.getElementById('guideCard');
        if (!guideCard) return;
        
        let currentSide = null;
        let isAnimating = false;
        
        function clearSlide() {
            if (isAnimating) return;
            currentSide = null;
            guideCard.classList.remove('slide-left', 'slide-right');
            const tip = document.getElementById('choiceTip');
            if (tip) tip.style.opacity = '0';
        }
        
        function updateSlide(clientX) {
            if (isAnimating) return;
            const rect = guideCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const newSide = clientX < centerX ? 'left' : 'right';
            
            if (newSide !== currentSide) {
                currentSide = newSide;
                guideCard.classList.remove('slide-left', 'slide-right');
                const tip = document.getElementById('choiceTip');
                
                if (currentSide === 'left') {
                    guideCard.classList.add('slide-left');
                    if (tip) {
                        tip.innerHTML = "直接进入正题吧（跳过）";
                        tip.style.opacity = '1';
                    }
                } else {
                    guideCard.classList.add('slide-right');
                    if (tip) {
                        if(guideStep<=0){
                            tip.innerHTML = "上次说到哪了（游戏介绍）";
                        }else{
                            tip.innerHTML = "嗯（继续）";
                        }
                        
                        tip.style.opacity = '1';
                    }
                }
                playCardSlide();
            }
        }
        
        function confirmSelection(e) {
            if (isAnimating) return;
            const rect = guideCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const side = e.clientX < centerX ? 'left' : 'right';
            
            isAnimating = true;
            guideCard.classList.add(side === 'left' ? 'exit-left' : 'exit-right');
            clearSlide();
            
            setTimeout(() => {
                if (side === 'left') {
                    startDimensionQuestions();
                } else {
                    guideStep++;
                    showGuideStep();
                }
                isAnimating = false;
            }, 260);
        }
        
        guideCard.addEventListener('mousemove', (e) => updateSlide(e.clientX));
        guideCard.addEventListener('mouseleave', clearSlide);
        guideCard.addEventListener('click', confirmSelection);
    }
}

function startDimensionQuestions() {
    // 重置到第一个问题
    consultationStep = 0;
    tempPersonality = { ie: null, ns: null, ft: null, jp: null };
    unlockedDimensions = { ie: false, ns: false, ft: false, jp: false };
    gameState = {
        ie: 0,
        ns: 0,
        ft: 0,
        jp: 0,
        gameOver: false,
        gameOverReason: '',
        startPersonality: { ie: null, ns: null, ft: null, jp: null },
        totalEvents: 0,
        startTime: null
    };
    eventQueue = [];
    
    // 直接渲染第一个咨询问题
    showConsultationQuestion();
}

function showConsultationQuestion() {
    if (consultationStep >= consultationQuestions.length) {
        const teachChoiceEvent = {
            id: "teach_choice",
            title: "  心理咨询师",
            desc: "那么... 我们直接开始模拟？还是先快速了解一下操作方法？",
            choiceA: { text: "🎮 直接开始", value: null, nextEventId: "start_simulation", effects: {} },
            choiceB: { text: "📖 教学", value: null, nextEventId: "start_tutorial", effects: {} }
        };
        insertEventToFront(teachChoiceEvent);
        currentEvent = getNextEvent();
        renderUI();
        return;
    }
    
    const q = consultationQuestions[consultationStep];
    const root = getRoot();
    if (!root) return;
    
    root.innerHTML = `
        <div class="audio-controls">
            <button class="audio-btn" id="btnToggleBGM">🎵</button>
            <button class="audio-btn" id="btnToggleSFX">🔊</button>
        </div>
        <div class="consultation-container">
            <div class="doctor-avatar"> </div>
            <div class="card-text" style="margin-top: 0;">
                <div class="event-title">📜 ${q.title}</div>
                <div class="event-desc">${q.desc}</div>
            </div>
            <div class="event-card" id="questionCard" style="background-image: url('Resources/images/card_default.jpg');">
                <div class="choice-tip" id="choiceTip"></div>
            </div>
            
        </div>
        ${isMobile ? `
        <div style="display: flex; gap: 16px; margin-top: 16px;">
            <button id="choiceBtnA" class="choice-btn-mobile" style="flex:1;">← ${q.choiceA.text}</button>
            <button id="choiceBtnB" class="choice-btn-mobile" style="flex:1;">${q.choiceB.text} →</button>
        </div>
        ` : ''}
    `;
    
    document.getElementById('btnToggleBGM')?.addEventListener('click', toggleBGM);
    document.getElementById('btnToggleSFX')?.addEventListener('click', toggleSFX);
    updateAudioButtons();
    
    if (isMobile) {
        // 移动端：按钮模式
        const btnA = document.getElementById('choiceBtnA');
        const btnB = document.getElementById('choiceBtnB');
        if (btnA) btnA.addEventListener('click', () => {
            const choice = q.choiceA;
            tempPersonality[q.dim] = choice.value;
            unlockedDimensions[q.dim] = true;
            gameState[q.dim] = choice.value;
            gameState.startPersonality[q.dim] = choice.value;
            consultationStep++;
            showConsultationQuestion();
        });
        if (btnB) btnB.addEventListener('click', () => {
            const choice = q.choiceB;
            tempPersonality[q.dim] = choice.value;
            unlockedDimensions[q.dim] = true;
            gameState[q.dim] = choice.value;
            gameState.startPersonality[q.dim] = choice.value;
            consultationStep++;
            showConsultationQuestion();
        });
    } else {
        // 电脑端：滑动模式
        const questionCard = document.getElementById('questionCard');
        if (!questionCard) return;
        
        let currentSide = null;
        let isAnimating = false;
        
        function clearSlide() {
            if (isAnimating) return;
            currentSide = null;
            questionCard.classList.remove('slide-left', 'slide-right');
            const tip = document.getElementById('choiceTip');
            if (tip) tip.style.opacity = '0';
        }
        
        function updateSlide(clientX) {
            if (isAnimating) return;
            const rect = questionCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const newSide = clientX < centerX ? 'left' : 'right';
            
            if (newSide !== currentSide) {
                currentSide = newSide;
                questionCard.classList.remove('slide-left', 'slide-right');
                const tip = document.getElementById('choiceTip');
                
                if (currentSide === 'left') {
                    questionCard.classList.add('slide-left');
                    if (tip) {
                        tip.innerHTML = `← ${q.choiceA.text}`;
                        tip.style.opacity = '1';
                    }
                } else {
                    questionCard.classList.add('slide-right');
                    if (tip) {
                        tip.innerHTML = `${q.choiceB.text} →`;
                        tip.style.opacity = '1';
                    }
                }
                playCardSlide();
            }
        }
        
        function confirmSelection() {
            if (isAnimating || !currentSide) return;
            
            const choice = currentSide === 'left' ? q.choiceA : q.choiceB;
            isAnimating = true;
            questionCard.classList.add(currentSide === 'left' ? 'exit-left' : 'exit-right');
            clearSlide();
            
            setTimeout(() => {
                tempPersonality[q.dim] = choice.value;
                unlockedDimensions[q.dim] = true;
                gameState[q.dim] = choice.value;
                gameState.startPersonality[q.dim] = choice.value;
                consultationStep++;
                showConsultationQuestion();
                isAnimating = false;
            }, 260);
        }
        
        questionCard.addEventListener('mousemove', (e) => updateSlide(e.clientX));
        questionCard.addEventListener('mouseleave', clearSlide);
        questionCard.addEventListener('click', confirmSelection);
    }
}
// ========== 简化结局界面 ==========
function showConclusion() {
    const reason = gameState.gameOverReason;
    const isQuickFail = reason.isQuickFail;
    const flippedDims = reason.flipped || [];
    const flippedText = flippedDims.join('、');
    
    let message = '';
    if (isQuickFail) {
        message = `你只坚持了 ${reason.totalEvents} 个事件。\n\n其实，MBTI 只是理解自我的工具。你的行为本身，就是你最真实的自己。`;
    } else {
        message = `你在「${flippedText}」维度上偏离了最初的自我认知。\n\n这很正常，人是会变化的。想再试一次吗？`;
    }
    
    const root = getRoot();
    if (!root) return;
    
    root.innerHTML = `
        <div class="audio-controls">
            <button class="audio-btn" id="btnToggleBGM">🎵</button>
            <button class="audio-btn" id="btnToggleSFX">🔊</button>
        </div>
        <div class="game-over">
            <h2>💀 模拟结束 💀</h2>
            <p style="margin: 16px 0; white-space: pre-line;">${message}</p>
            <div style="display: flex; gap: 16px; justify-content: center; margin-top: 20px;">
                <button id="restartSameBtn" style="background: #4a2c2c; color: #ff9f6e; border: none; padding: 10px 20px; border-radius: 40px; cursor: pointer;">🔄 同样的身份再试一次</button>
                <button id="restartNewBtn" style="background: #2a2a3a; color: #f4c542; border: none; padding: 10px 20px; border-radius: 40px; cursor: pointer;">✨ 换一个身份重新开始</button>
            </div>
        </div>
    `;
    
    document.getElementById('btnToggleBGM')?.addEventListener('click', toggleBGM);
    document.getElementById('btnToggleSFX')?.addEventListener('click', toggleSFX);
    document.getElementById('restartSameBtn')?.addEventListener('click', () => {
        if (tempPersonality.ie !== null && tempPersonality.ns !== null && 
            tempPersonality.ft !== null && tempPersonality.jp !== null) {
            restartSimulation();
        } else {
            resetGame();
        }
    });
    document.getElementById('restartNewBtn')?.addEventListener('click', resetGame);
    updateAudioButtons();
}
function showVictory() {
    const root = getRoot();
    if (!root) return;
    
    const flippedDims = [];
    if (gameState.startPersonality.ie > 0) flippedDims.push('E');
    else flippedDims.push('I');
    if (gameState.startPersonality.ns > 0) flippedDims.push('S');
    else flippedDims.push('N');
    if (gameState.startPersonality.ft > 0) flippedDims.push('T');
    else flippedDims.push('F');
    if (gameState.startPersonality.jp > 0) flippedDims.push('P');
    else flippedDims.push('J');
    const personalityStr = flippedDims.join('');
    
    root.innerHTML = `
        <div class="audio-controls">
            <button class="audio-btn" id="btnToggleBGM">🎵</button>
            <button class="audio-btn" id="btnToggleSFX">🔊</button>
        </div>
        <div class="game-over" style="border-color: #6aab6a;">
            <h2 style="color: #6aab6a;">✨ 人格臻至 ✨</h2>
            <p style="margin: 16px 0; white-space: pre-line;">你已完全成为了「${personalityStr}」</p>
            <p style="margin: 16px 0; white-space: pre-line; font-size: 14px; color: #aaa;">但 MBTI 本该是一种自我了解的工具，而不是一个需要“达成”的目标。<br>
            真正重要的不是“你像什么类型”，而是你如何理解自己、接纳自己。</p>
            <div style="display: flex; gap: 16px; justify-content: center; margin-top: 20px;">
                <button id="continueBtn" style="background: #4a2c2c; color: #ff9f6e; border: none; padding: 10px 20px; border-radius: 40px; cursor: pointer;">🎮 继续当前</button>
                <button id="restartNewBtn" style="background: #2a2a3a; color: #f4c542; border: none; padding: 10px 20px; border-radius: 40px; cursor: pointer;">✨ 开新的一局</button>
            </div>
        </div>
    `;
    
    document.getElementById('btnToggleBGM')?.addEventListener('click', toggleBGM);
    document.getElementById('btnToggleSFX')?.addEventListener('click', toggleSFX);
    document.getElementById('continueBtn')?.addEventListener('click', () => {
        // 继续当前：保留当前所有数值，只是关闭胜利界面
        renderUI();
    });
    document.getElementById('restartNewBtn')?.addEventListener('click', resetGame);
    updateAudioButtons();
}
// ========== 悬停预览效果 ==========
function clearAllHoverEffects() {
    ['ie', 'ns', 'ft', 'jp'].forEach(stat => {
        let el = document.getElementById(`stat-${stat}`);
        if (el) el.classList.remove('highlight');
    });
    const hintEl = document.getElementById('previewHint');
    if (hintEl) hintEl.textContent = '';
}

function previewEffects(effects) {
    clearAllHoverEffects();
    if (!effects) return;
    
    const mapping = { ie: 'stat-ie', ns: 'stat-ns', ft: 'stat-ft', jp: 'stat-jp' };
    const dimNames = { ie: '⚡ I/E', ns: '🧠 N/S', ft: '❤️ F/T', jp: '📅 J/P' };
    const changedDims = [];
    
    for (let [key, id] of Object.entries(mapping)) {
        let delta = effects[key];
        if (delta !== undefined && delta !== 0) {
            let el = document.getElementById(id);
            if (el && unlockedDimensions[key]) {
                el.classList.add('highlight');
                const absDelta = Math.abs(delta);
                let intensity = '';
                if (absDelta > 15) intensity = '大幅';
                else if (absDelta > 5) intensity = '中度';
                else intensity = '轻微';
                changedDims.push(`${dimNames[key]} ${intensity}`);
            }
        }
    }
    
    const hintEl = document.getElementById('previewHint');
    if (hintEl && changedDims.length > 0) {
        hintEl.textContent = '✨ ' + changedDims.join(' · ');
    }
}

function getCardBackgroundImage(event) {
    if (event && event.image) {
        // 尝试加载指定图片，如果失败则用默认
        const img = new Image();
        img.src = event.image;
        // 同步返回，浏览器会异步加载，但 CSS 背景图会自然 fallback
        return event.image;
    }
    return 'Resources/images/card_default.jpg';
}

// ========== 教学事件 ==========
function initTutorialEvents() {
    tutorialEvents = [
        {
            id: "tutorial_1",
            title: "📖 教学：如何选择",
            desc: "这是一个例子。向左滑动或向右滑动，选择你认为合适的选项。\n\n（悬浮在卡片上可以看到这个选项会影响哪些人格维度）",
            image: "Resources/images/card_default.jpg",
            choiceA: { text: "← 好的，我明白了", effects: { ie: 0, ns: 0, ft: 0, jp: 0 }, nextEventId: "tutorial_2" },
            choiceB: { text: "再演示一遍 →", effects: { ie: 0, ns: 0, ft: 0, jp: 0 }, nextEventId: "tutorial_1" }
        },
        {
            id: "tutorial_2",
            title: "📖 教学：人格变化",
            desc: "你的选择会影响左上角的人格进度条。\n\n当某个维度偏离你最初的倾向过多时，模拟就会结束。",
            image: "Resources/images/card_default.jpg",
            choiceA: { text: "← 我准备好了", effects: { ie: 0, ns: 0, ft: 0, jp: 0 }, nextEventId: null },
            choiceB: { text: "再看一次 →", effects: { ie: 0, ns: 0, ft: 0, jp: 0 }, nextEventId: "tutorial_1" }
        }
    ];
}

// ========== 核心渲染 ==========
function renderUI() {
    const root = getRoot();
    if (!root) return;

    if (gameState.gameOver && gameMode !== 'consultation') {
        showConclusion();
        return;
    }

    if (!currentEvent) {
        currentEvent = getNextEvent();
        if (!currentEvent) return;
    }
    
    const bgImage = getCardBackgroundImage(currentEvent);
    
    const ieLetter = unlockedDimensions.ie ? getPersonalityLetter(gameState.ie, gameState.startPersonality.ie, 'ie') : '?';
    const nsLetter = unlockedDimensions.ns ? getPersonalityLetter(gameState.ns, gameState.startPersonality.ns, 'ns') : '?';
    const ftLetter = unlockedDimensions.ft ? getPersonalityLetter(gameState.ft, gameState.startPersonality.ft, 'ft') : '?';
    const jpLetter = unlockedDimensions.jp ? getPersonalityLetter(gameState.jp, gameState.startPersonality.jp, 'jp') : '?';

    const iePercent = unlockedDimensions.ie ? valueToPercent(gameState.ie, gameState.startPersonality.ie) : 0;
    const nsPercent = unlockedDimensions.ns ? valueToPercent(gameState.ns, gameState.startPersonality.ns) : 0;
    const ftPercent = unlockedDimensions.ft ? valueToPercent(gameState.ft, gameState.startPersonality.ft) : 0;
    const jpPercent = unlockedDimensions.jp ? valueToPercent(gameState.jp, gameState.startPersonality.jp) : 0;

    root.innerHTML = `
        <div class="audio-controls">
            <button class="audio-btn" id="btnToggleBGM">🎵</button>
            <button class="audio-btn" id="btnToggleSFX">🔊</button>
        </div>
        <div class="stats">
            <div class="stat ie" id="stat-ie" style="${!unlockedDimensions.ie ? 'opacity:0.3;' : ''}">
                <span class="stat-label">⚡ ${ieLetter}</span>
                <div class="progress-bar-container">
                    <div class="progress-fill" id="fill-ie" style="width: ${iePercent}%"></div>
                </div>
            </div>
            <div class="stat ns" id="stat-ns" style="${!unlockedDimensions.ns ? 'opacity:0.3;' : ''}">
                <span class="stat-label">🧠 ${nsLetter}</span>
                <div class="progress-bar-container">
                    <div class="progress-fill" id="fill-ns" style="width: ${nsPercent}%"></div>
                </div>
            </div>
            <div class="stat ft" id="stat-ft" style="${!unlockedDimensions.ft ? 'opacity:0.3;' : ''}">
                <span class="stat-label">❤️ ${ftLetter}</span>
                <div class="progress-bar-container">
                    <div class="progress-fill" id="fill-ft" style="width: ${ftPercent}%"></div>
                </div>
            </div>
            <div class="stat jp" id="stat-jp" style="${!unlockedDimensions.jp ? 'opacity:0.3;' : ''}">
                <span class="stat-label">📅 ${jpLetter}</span>
                <div class="progress-bar-container">
                    <div class="progress-fill" id="fill-jp" style="width: ${jpPercent}%"></div>
                </div>
            </div>
        </div>
        <div class="card-text">
            <div class="event-title">📜 ${currentEvent.title}</div>
            <div class="event-desc">${currentEvent.desc}</div>
        </div>
        <div class="event-card" id="eventCard" style="background-image: url('${bgImage}');">
            <div class="choice-tip" id="choiceTip"></div>
            <div class="preview-hint" id="previewHint"></div>
        </div>
        ${isMobile ? `
        <div style="display: flex; gap: 16px; margin-top: 16px;">
            <button id="choiceBtnA" class="choice-btn-mobile" style="flex:1;">← ${currentEvent.choiceA.text}</button>
            <button id="choiceBtnB" class="choice-btn-mobile" style="flex:1;">${currentEvent.choiceB.text} →</button>
        </div>
        ` : ''}
        <button class="reset-btn" id="resetGameBtnFooter">🔄 重新开始</button>
    `;

    document.getElementById('btnToggleBGM')?.addEventListener('click', toggleBGM);
    document.getElementById('btnToggleSFX')?.addEventListener('click', toggleSFX);
    updateAudioButtons();

    const resetBtn = document.getElementById('resetGameBtnFooter');
    if (resetBtn) resetBtn.addEventListener('click', resetGame);

    // 根据设备类型绑定不同的事件
    if (isMobile) {
        // 移动端：按钮模式
        const btnA = document.getElementById('choiceBtnA');
        const btnB = document.getElementById('choiceBtnB');
        if (btnA) btnA.addEventListener('click', () => makeChoice(currentEvent.choiceA));
        if (btnB) btnB.addEventListener('click', () => makeChoice(currentEvent.choiceB));
    } else {
        // 电脑端：滑动模式
        const eventCard = document.getElementById('eventCard');
        const choiceTip = document.getElementById('choiceTip');
        if (!eventCard) return;

        let currentSide = null;
        let isAnimating = false;

        function clearHover() {
            if (isAnimating) return;
            currentSide = null;
            eventCard.classList.remove('slide-left', 'slide-right');
            if (choiceTip) choiceTip.style.opacity = '0';
            clearAllHoverEffects();
        }

        function updateHoverSide(clientX) {
            if (isAnimating) return;
            const rect = eventCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const newSide = clientX < centerX ? 'left' : 'right';
            
            if (newSide !== currentSide) {
                currentSide = newSide;
                eventCard.classList.remove('slide-left', 'slide-right');
                
                if (currentSide === 'left') {
                    eventCard.classList.add('slide-left');
                    if (choiceTip) {
                        choiceTip.innerHTML = `← ${currentEvent.choiceA.text}`;
                        choiceTip.style.opacity = '1';
                    }
                    previewEffects(currentEvent.choiceA.effects || {});
                } else {
                    eventCard.classList.add('slide-right');
                    if (choiceTip) {
                        choiceTip.innerHTML = `${currentEvent.choiceB.text} →`;
                        choiceTip.style.opacity = '1';
                    }
                    previewEffects(currentEvent.choiceB.effects || {});
                }
                playCardSlide();
            }
        }

        function confirmSelection() {
            if (isAnimating || !currentSide) return;
            
            const choice = currentSide === 'left' ? currentEvent.choiceA : currentEvent.choiceB;
            isAnimating = true;
            eventCard.classList.add(currentSide === 'left' ? 'exit-left' : 'exit-right');
            clearHover();
            
            setTimeout(() => {
                makeChoice(choice);
                isAnimating = false;
            }, 260);
        }

        eventCard.addEventListener('mousemove', (e) => updateHoverSide(e.clientX));
        eventCard.addEventListener('mouseleave', clearHover);
        eventCard.addEventListener('click', confirmSelection);
    }
}

// ========== 核心选择逻辑 ==========
function makeChoice(choice) {
    if (gameState.gameOver && gameMode !== 'consultation') return;
    
    // 咨询模式
    if (gameMode === 'consultation') {
        const question = consultationQuestions.find(q => q.choiceA === choice || q.choiceB === choice);
        if (question) {
            const selectedValue = choice.value;
            tempPersonality[question.dim] = selectedValue;
            unlockedDimensions[question.dim] = true;
            gameState[question.dim] = selectedValue;
            gameState.startPersonality[question.dim] = selectedValue;
        }
        
        if (choice.nextEventId === 'consult_end') {
            const teachChoiceEvent = {
                id: "teach_choice",
                title: "   心理咨询师",
                desc: "那么... 我们直接开始模拟？还是先快速了解一下操作方法？",
                choiceA: { text: "🎮 直接开始", value: null, nextEventId: "start_simulation", effects: {} },
                choiceB: { text: "📖 教学", value: null, nextEventId: "start_tutorial", effects: {} }
            };
            insertEventToFront(teachChoiceEvent);
            currentEvent = getNextEvent();
            renderUI();
            return;
        } else if (choice.nextEventId === 'start_simulation') {
            gameMode = 'simulation';
            gameState.startTime = Date.now();
            gameState.totalEvents = 0;
            eventQueue = [];
            currentEvent = getNextEvent();
            renderUI();
            return;
        } else if (choice.nextEventId === 'start_tutorial') {
            gameMode = 'tutorial';
            tutorialStep = 0;
            gameState.startTime = Date.now();
            gameState.totalEvents = 0;
            eventQueue = [];
            currentEvent = getNextEvent();
            renderUI();
            return;
        } else {
            const nextEvent = findEventById(choice.nextEventId);
            if (nextEvent) insertEventToFront(nextEvent);
        }
        currentEvent = getNextEvent();
        renderUI();
        return;
    }
    
    // 正常模拟模式
    applyEffects(choice.effects);
    playCardConfirm();
    
    if (checkGameOver()) {
        renderUI(); // 这里会触发 showConclusion
        return;
    }
    // 先检查胜利
if (checkGameWin()) {
    showVictory();
    return;
}
    
    if (choice.nextEventId) {
        let nextEvent = findEventById(choice.nextEventId);
        if (nextEvent) insertEventToFront(nextEvent);
    }
    
    currentEvent = getNextEvent();
    renderUI();
}

// ========== 启动游戏 ==========
function loadEventsAndStart() {
    const eventData = window.EVENT_DATA;
    
    if (eventData) {
        // 只把 mainEvents 放进随机池
        fullEventLibrary = eventData.mainEvents || [];
        // 同时保留后续事件的索引（用于 findEventById）
        window.followUpEvents = eventData.followUpEvents || [];
        poolSize = eventData.poolSize || 8;
        initTutorialEvents();
        initBGM();
        resetGame();
    } else {
        console.error('事件数据加载失败');
        const root = getRoot();
        if (root) root.innerHTML = '<div class="game-over">事件数据加载失败</div>';
    }
}

loadEventsAndStart();

// ========== 粒子背景效果 ==========
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // 粒子数量（移动设备减少）
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
            // 随机颜色（柔和暖色系）
            const colors = ['#e58e3c', '#6ba86a', '#7dafd4', '#e38b84', '#f5a65b'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界重置（从哪边出去，从对侧回来）
            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    function init() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    }
    
    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        // 重新调整粒子位置适应新尺寸
        for (let particle of particles) {
            particle.x = Math.random() * width;
            particle.y = Math.random() * height;
        }
    });
    
    init();
    
    // 返回清理函数（可选，用于页面卸载时停止动画）
    return () => {
        if (animationId) cancelAnimationFrame(animationId);
    };
}

// 页面加载完成后启动粒子效果
window.addEventListener('DOMContentLoaded', initParticles);

// ========== 点击粒子效果（蔚蓝档案风格）==========
let clickParticlesEnabled = true;

function createClickParticle(x, y) {
    if (!clickParticlesEnabled) return;
    
    // 粒子数量：3-6 个
    const particleCount = Math.floor(Math.random() * 4) + 3;
    
    // 柔和色彩（与 MBTI 四维配色呼应）
    const colors = ['#e58e3c', '#6ba86a', '#7dafd4', '#e38b84', '#f5a65b', '#f4c542'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        // 随机大小：4px ~ 12px
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // 随机颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        // 随机方向：-30px ~ 30px 的水平偏移，-50px ~ -10px 的垂直偏移（向上飘）
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = -Math.random() * 40 - 10;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--offset-x', offsetX + 'px');
        particle.style.setProperty('--offset-y', offsetY + 'px');
        
        // 随机延迟，让粒子不同时飘散
        particle.style.animationDelay = (Math.random() * 0.1) + 's';
        
        document.body.appendChild(particle);
        
        // 动画结束后移除
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// 监听全局点击
function initClickParticles() {
    document.addEventListener('click', (e) => {
        // 排除对按钮等交互元素的干扰（可选，让点击按钮也有反馈其实更好）
        createClickParticle(e.clientX, e.clientY);
        playBaseClick();
    });
}

// 启动点击粒子效果
initClickParticles();