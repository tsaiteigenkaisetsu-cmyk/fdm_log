// グローバル変数
let currentMode = 'normal'; // normal, challenge, category, weak
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentQuestion = null;
let correctCount = 0;
let results = [];
let challengeMode = false;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    selectAccounts();
    loadQuestion();
});

// ページ初期化
function initializePage() {
    const params = new URLSearchParams(window.location.search);
    currentMode = params.get('mode') || 'normal';

    // モード表示
    const modeDisplay = document.getElementById('modeDisplay');
    switch(currentMode) {
        case 'normal':
            modeDisplay.textContent = '通常練習モード';
            currentQuestions = getRandomQuestions(20);
            break;
        case 'challenge':
            modeDisplay.textContent = '10問チャレンジモード';
            currentQuestions = getRandomQuestions(10);
            challengeMode = true;
            break;
        case 'category':
            modeDisplay.textContent = '分野別モード';
            currentQuestions = getRandomQuestions(15);
            break;
        case 'weak':
            modeDisplay.textContent = '苦手克服モード';
            currentQuestions = getRandomQuestions(10);
            break;
        default:
            currentMode = 'normal';
            currentQuestions = getRandomQuestions(20);
    }

    document.getElementById('totalQuestions').textContent = currentQuestions.length;
}

// 勘定科目プルダウンを設定
function selectAccounts() {
    const debitSelect = document.getElementById('debitAccount');
    const creditSelect = document.getElementById('creditAccount');

    accounts.forEach(account => {
        const option1 = document.createElement('option');
        option1.value = account;
        option1.textContent = account;
        debitSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = account;
        option2.textContent = account;
        creditSelect.appendChild(option2);
    });
}

// 問題を読み込んで表示
function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showCompletion();
        return;
    }

    currentQuestion = currentQuestions[currentQuestionIndex];
    
    // 問題表示
    document.getElementById('problemId').textContent = `【第${currentQuestionIndex + 1}問】${currentQuestion.category}`;
    document.getElementById('problemText').textContent = currentQuestion.text;
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;

    // フォーム初期化
    clearForm();
    
    // 回答セクション・結果セクション表示/非表示
    document.getElementById('answerSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('navigationButtons').style.display = 'none';
    document.getElementById('answerBtn').style.display = 'block';

    // プログレスバー更新
    updateProgressBar();
}

// フォームをクリア
function clearForm() {
    document.getElementById('debitAccount').value = '';
    document.getElementById('debitAmount').value = '';
    document.getElementById('creditAccount').value = '';
    document.getElementById('creditAmount').value = '';
}

// プログレスバーを更新
function updateProgressBar() {
    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// 回答をチェック
function checkAnswer() {
    const debitAccount = document.getElementById('debitAccount').value;
    const debitAmount = parseInt(document.getElementById('debitAmount').value) || 0;
    const creditAccount = document.getElementById('creditAccount').value;
    const creditAmount = parseInt(document.getElementById('creditAmount').value) || 0;

    // バリデーション
    if (!debitAccount || !debitAmount || !creditAccount || !creditAmount) {
        alert('すべての項目を入力してください');
        return;
    }

    // 判定
    const isCorrect = 
        debitAccount === currentQuestion.debitAccount &&
        debitAmount === currentQuestion.debitAmount &&
        creditAccount === currentQuestion.creditAccount &&
        creditAmount === currentQuestion.creditAmount;

    // 結果を記録
    const result = {
        questionId: currentQuestion.id,
        text: currentQuestion.text,
        correct: isCorrect,
        userAnswer: {
            debitAccount,
            debitAmount,
            creditAccount,
            creditAmount
        },
        correctAnswer: {
            debitAccount: currentQuestion.debitAccount,
            debitAmount: currentQuestion.debitAmount,
            creditAccount: currentQuestion.creditAccount,
            creditAmount: currentQuestion.creditAmount
        },
        explanation: currentQuestion.explanation,
        point: currentQuestion.point
    };

    results.push(result);
    if (isCorrect) correctCount++;

    // 結果表示
    showResult(result);

    // 回答ボタン非表示、ナビゲーションボタン表示
    document.getElementById('answerBtn').style.display = 'none';
    document.getElementById('navigationButtons').style.display = 'flex';

    // チャレンジモードの場合、最後の問題以外は自動で次へ
    if (challengeMode && currentQuestionIndex < currentQuestions.length - 1) {
        document.getElementById('navigationButtons').style.display = 'none';
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 2000);
    }
}

// 結果を表示
function showResult(result) {
    const resultSection = document.getElementById('resultSection');
    const isCorrect = result.correct;

    let html = `<div class="result-section ${isCorrect ? 'correct' : 'incorrect'}">`;
    
    if (isCorrect) {
        html += '<div class="result-title">✓ 正解です！</div>';
    } else {
        html += '<div class="result-title">✗ 不正解です</div>';
    }

    html += '<div class="correct-answer">';
    html += '<h4>正しい仕訳</h4>';
    html += '<div class="answer-display">';
    html += `
        <div class="answer-item">
            <div class="answer-label">借方科目</div>
            <div class="answer-value">${result.correctAnswer.debitAccount}</div>
            <div class="answer-label">金額</div>
            <div class="answer-value">¥${result.correctAnswer.debitAmount.toLocaleString()}</div>
        </div>
        <div class="answer-item credit">
            <div class="answer-label">貸方科目</div>
            <div class="answer-value">${result.correctAnswer.creditAccount}</div>
            <div class="answer-label">金額</div>
            <div class="answer-value">¥${result.correctAnswer.creditAmount.toLocaleString()}</div>
        </div>
    `;
    html += '</div></div>';

    if (!isCorrect) {
        html += '<div class="correct-answer">';
        html += '<h4>あなたの回答</h4>';
        html += '<div class="answer-display">';
        html += `
            <div class="answer-item">
                <div class="answer-label">借方科目</div>
                <div class="answer-value">${result.userAnswer.debitAccount}</div>
                <div class="answer-label">金額</div>
                <div class="answer-value">¥${result.userAnswer.debitAmount.toLocaleString()}</div>
            </div>
            <div class="answer-item credit">
                <div class="answer-label">貸方科目</div>
                <div class="answer-value">${result.userAnswer.creditAccount}</div>
                <div class="answer-label">金額</div>
                <div class="answer-value">¥${result.userAnswer.creditAmount.toLocaleString()}</div>
            </div>
        `;
        html += '</div></div>';
    }

    html += '<div class="explanation">';
    html += '<h4>解説</h4>';
    html += `<p>${result.explanation}</p>`;
    html += `<p><strong>ポイント：</strong>${result.point}</p>`;
    html += '</div>';

    html += '</div>';

    resultSection.innerHTML = html;
    resultSection.style.display = 'block';
}

// 次の問題へ
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentQuestions.length) {
        if (challengeMode) {
            showFinalResult();
        } else {
            showCompletion();
        }
    } else {
        loadQuestion();
    }
}

// 完了画面を表示
function showCompletion() {
    document.getElementById('problemSection').style.display = 'none';
    document.getElementById('answerSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('navigationButtons').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';

    const accuracy = (correctCount / currentQuestions.length * 100).toFixed(1);
    document.getElementById('finalScore').innerHTML = `
        <div>正答数: <strong>${correctCount}</strong> / ${currentQuestions.length}</div>
        <div>正答率: <strong>${accuracy}%</strong></div>
    `;
}

// 最終結果を表示（チャレンジモード用）
function showFinalResult() {
    const resultSection = document.getElementById('resultSection');
    const accuracy = (correctCount / currentQuestions.length * 100).toFixed(1);

    let html = `
        <div class="result-section ${correctCount >= 7 ? 'correct' : 'incorrect'}">
            <div class="result-title">${correctCount >= 7 ? '🎉 合格！' : '💪 もう一度挑戦'}</div>
            <div style="text-align: center; padding: 20px;">
                <p>正答数: <strong style="font-size: 1.5rem; color: var(--primary-color);">${correctCount} / 10</strong></p>
                <p>正答率: <strong style="font-size: 1.3rem; color: var(--primary-color);">${accuracy}%</strong></p>
    `;

    if (correctCount >= 7) {
        html += '<p style="color: var(--success-color); margin-top: 15px;">素晴らしい成績です！</p>';
    } else {
        html += '<p style="color: var(--danger-color); margin-top: 15px;">もう一度チャレンジして目指せ7問以上正解！</p>';
    }

    html += '</div></div>';

    resultSection.innerHTML = html;
    resultSection.style.display = 'block';
    document.getElementById('problemSection').style.display = 'none';
    document.getElementById('answerSection').style.display = 'none';
    document.getElementById('navigationButtons').innerHTML = `
        <button class="btn btn-next secondary" onclick="location.href='index.html'">モード選択に戻る</button>
        <button class="btn secondary" onclick="location.href='practice.html?mode=challenge'">もう一度チャレンジ</button>
    `;
    document.getElementById('navigationButtons').style.display = 'flex';
}

// トップページへ戻る
function goHome() {
    location.href = 'index.html';
}
