const oni = document.getElementById('oni');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('time');
const message = document.getElementById('message');

// ゲーム設定
let isFacingPlayer = false;
let score = 0;
let timeLeft = 10; // 制限時間（秒）
let gameInterval, timerInterval;
let gameActive = true;

// プレイヤーの移動速度
const playerSpeed = 5;

// プレイヤーを動かす
document.addEventListener('keydown', (e) => {
  if (gameActive && !isFacingPlayer) {
    const playerLeft = parseInt(window.getComputedStyle(player).left);
    const playerBottom = parseInt(window.getComputedStyle(player).bottom);

    if (e.key === 'ArrowRight') {
      player.style.left = Math.min(playerLeft + playerSpeed, 470) + 'px';
    } else if (e.key === 'ArrowLeft') {
      player.style.left = Math.max(playerLeft - playerSpeed, 0) + 'px';
    } else if (e.key === 'ArrowUp') {
      player.style.bottom = Math.min(playerBottom + playerSpeed, 260) + 'px';
    } else if (e.key === 'ArrowDown') {
      player.style.bottom = Math.max(playerBottom - playerSpeed, 0) + 'px';
    }

    checkCollision();
  }
});

// 鬼が振り向く状態を切り替える
function toggleOniState() {
  isFacingPlayer = !isFacingPlayer;

  if (isFacingPlayer) {
    oni.classList.add('facing');
  } else {
    oni.classList.remove('facing');
  }
}

// プレイヤーが鬼に触れたか確認
function checkCollision() {
  const oniRect = oni.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();

  const isTouching =
    Math.abs(oniRect.left - playerRect.left) < 30 &&
    Math.abs(oniRect.top - playerRect.top) < 30;

  if (isTouching) {
    endGame(true);
  }
}

// ゲーム終了処理
function endGame(isCleared) {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameActive = false;

  if (isCleared) {
    const finalScore = Math.floor(timeLeft * 10); // 時間に応じたスコア
    score += finalScore;
    updateScore();
    message.textContent = `クリア！スコア: ${finalScore}`;
  } else {
    message.textContent = '時間切れ！';
  }

  message.style.display = 'block';
}

// スコアを更新する
function updateScore() {
  scoreDisplay.textContent = score;
}

// 制限時間をカウントダウン
function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
    } else {
      endGame(false);
    }
  }, 1000);
}

// ゲーム開始
function startGame() {
  gameActive = true;
  message.style.display = 'none';
  score = 0;
  timeLeft = 10;
  updateScore();
  timerDisplay.textContent = timeLeft;

  gameInterval = setInterval(toggleOniState, 3000);
  startTimer();
}

// ゲームをリセットして開始
startGame();