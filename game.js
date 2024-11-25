class Dino {
  constructor() {
    this.x = 50;
    this.y = 200;
    this.width = 50;
    this.height = 50;
    this.jumping = false;
    this.velocity = 0;
    this.gravity = 0.8;
    this.jumpPower = 15;
    this.jumpCount = 0;
    this.maxJumps = 2;
    this.animationFrame = 0;
    this.animationSpeed = 0.15;
    this.groundY = 250;
    this.fireBreathCount = 5;  // 火炎放射の残り回数
    this.isBreathingFire = false;  // 火炎放射中かどうか
    this.fireBreathWidth = 100;  // 火炎の範囲
    this.fireBreathHeight = 30;  // 火炎の高さ
    this.fireBreathX = 0;  // 火炎の現在のX位置
    this.fireBreathSpeed = 10;  // 火炎の移動速度
  }

  jump() {
    if (this.jumpCount < this.maxJumps) {
      this.velocity = -this.jumpPower;
      this.jumping = true;
      this.jumpCount++;
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > this.groundY - this.height) {
      this.y = this.groundY - this.height;
      this.jumping = false;
      this.velocity = 0;
      this.jumpCount = 0;
    }

    if (!this.jumping) {
      this.animationFrame += this.animationSpeed;
      if (this.animationFrame > 4) {
        this.animationFrame = 0;
      }
    }

    // 火炎の位置更新
    if (this.isBreathingFire) {
      this.fireBreathX += this.fireBreathSpeed;
    }
  }

  draw(ctx) {
    const mainColor = "#FF9ED2";
    const accentColor = "#FF6BB3";
    const bellyColor = "#FFF4E3";
    const tailWag = Math.sin(this.animationFrame * Math.PI) * 5;
    
    // 尻尾（より曲線的に）
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(this.x + 15, this.y + 20);
    ctx.bezierCurveTo(
      this.x + 5, this.y + 15 + tailWag,
      this.x - 10, this.y + 15 + tailWag,
      this.x - 15, this.y + 20 + tailWag
    );
    ctx.bezierCurveTo(
      this.x - 10, this.y + 25 + tailWag,
      this.x + 5, this.y + 25 + tailWag,
      this.x + 15, this.y + 30
    );
    ctx.fill();

    // 後ろ足
    if (!this.jumping) {
      const legOffset = Math.sin(this.animationFrame * Math.PI) * 10;
      this.drawLeg(ctx, this.x + 20, this.y + 35, legOffset > 0 ? legOffset : 0, 1.2);
    } else {
      this.drawLeg(ctx, this.x + 20, this.y + 35, 0, 1.2);
    }
    
    // 胴体（より自然な曲線で）
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(this.x + 15, this.y + 5);
    ctx.bezierCurveTo(
      this.x + 25, this.y - 5,
      this.x + 35, this.y,
      this.x + 45, this.y + 10
    );
    ctx.bezierCurveTo(
      this.x + 50, this.y + 20,
      this.x + 45, this.y + 35,
      this.x + 35, this.y + 40
    );
    ctx.bezierCurveTo(
      this.x + 25, this.y + 45,
      this.x + 15, this.y + 40,
      this.x + 15, this.y + 35
    );
    ctx.closePath();
    ctx.fill();

    // お腹（より自然な形状に）
    ctx.fillStyle = bellyColor;
    ctx.beginPath();
    ctx.ellipse(this.x + 32, this.y + 25, 15, 18, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 前足
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(this.x + 35, this.y + 15);
    ctx.quadraticCurveTo(
      this.x + 40, this.y + 20,
      this.x + 35, this.y + 25
    );
    ctx.quadraticCurveTo(
      this.x + 30, this.y + 20,
      this.x + 35, this.y + 15
    );
    ctx.fill();

    // 首（より自然な曲線で）
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.moveTo(this.x + 40, this.y + 5);
    ctx.bezierCurveTo(
      this.x + 45, this.y - 10,
      this.x + 50, this.y - 20,
      this.x + 55, this.y - 25
    );
    
    // 頭（より恐竜らしい形状に）
    ctx.bezierCurveTo(
      this.x + 60, this.y - 30,
      this.x + 70, this.y - 28,
      this.x + 75, this.y - 22
    );
    ctx.bezierCurveTo(
      this.x + 75, this.y - 18,
      this.x + 70, this.y - 15,
      this.x + 65, this.y - 12
    );
    ctx.bezierCurveTo(
      this.x + 55, this.y - 8,
      this.x + 45, this.y,
      this.x + 40, this.y + 5
    );
    ctx.fill();

    // 背中のトゲ（より立体的に）
    for(let i = 0; i < 4; i++) {
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(this.x + 25 + (i * 7), this.y);
      ctx.bezierCurveTo(
        this.x + 27 + (i * 7), this.y - 12,
        this.x + 31 + (i * 7), this.y - 12,
        this.x + 33 + (i * 7), this.y
      );
      ctx.fill();
    }

    // 目（より表情豊かに）
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(this.x + 65, this.y - 20, 5, 4, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 瞳
    ctx.fillStyle = "#FF69B4";
    ctx.beginPath();
    ctx.ellipse(this.x + 66, this.y - 20, 2.5, 2, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 瞳のハイライト
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x + 67, this.y - 21, 1, 0, Math.PI * 2);
    ctx.fill();

    // 頬の赤み
    ctx.fillStyle = "rgba(255, 150, 150, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x + 70, this.y - 15, 4, 0, Math.PI * 2);
    ctx.fill();

    // 鼻
    ctx.fillStyle = "#FF6BB3";
    ctx.beginPath();
    ctx.ellipse(this.x + 72, this.y - 22, 1.5, 1, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // 前足
    if (!this.jumping) {
      const legOffset = Math.sin(this.animationFrame * Math.PI) * 10;
      this.drawLeg(ctx, this.x + 35, this.y + 35, legOffset < 0 ? -legOffset : 0, 0.8);
    } else {
      this.drawLeg(ctx, this.x + 35, this.y + 35, 0, 0.8);
    }

    // 火炎放射のエフェクト
    if (this.isBreathingFire) {
      const gradient = ctx.createLinearGradient(
        this.fireBreathX, this.y - 20,
        this.fireBreathX + this.fireBreathWidth, this.y - 20
      );
      gradient.addColorStop(0, '#ff4500');
      gradient.addColorStop(0.6, '#ffa500');
      gradient.addColorStop(1, 'rgba(255, 165, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(this.fireBreathX, this.y - 25);
      ctx.lineTo(this.fireBreathX + this.fireBreathWidth, this.y - 35);
      ctx.lineTo(this.fireBreathX + this.fireBreathWidth, this.y - 5);
      ctx.lineTo(this.fireBreathX, this.y - 15);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawLeg(ctx, x, y, offset, scale = 1) {
    ctx.fillStyle = "#FF9ED2";
    // 足首
    ctx.beginPath();
    ctx.ellipse(x, y + 7 + offset, 4 * scale, 5 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 脚
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + 3 * scale, y + 7 + offset,
      x + 2 * scale, y + 12 + offset,
      x, y + 15 + offset
    );
    ctx.bezierCurveTo(
      x - 2 * scale, y + 12 + offset,
      x - 3 * scale, y + 7 + offset,
      x, y
    );
    ctx.fill();
  }

  breathFire() {
    if (this.fireBreathCount > 0) {
      this.isBreathingFire = true;
      this.fireBreathCount--;
      this.fireBreathX = this.x + 75;  // 火炎の初期位置
      setTimeout(() => {
        this.isBreathingFire = false;
      }, 1000);  // 1秒間火炎放射
    }
  }
}

class Cactus {
  constructor(x, type = 'normal') {
    this.x = x;
    this.y = 250;
    this.type = type;
    
    // タイプに応じてサイズを設定
    switch(type) {
      case 'tall':
        this.width = 32;
        this.height = 60;
        break;
      case 'short':
        this.width = 32;
        this.height = 30;
        break;
      default:
        this.width = 32;
        this.height = 40;
    }
    
    this.speed = 5;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    const scale = this.type === 'tall' ? 1.5 : 
                 this.type === 'short' ? 0.75 : 1;
    
    ctx.fillStyle = "#2d5";

    // メンの茎
    ctx.beginPath();
    ctx.roundRect(this.x + 8, this.y - this.height, 8, this.height, 4);
    ctx.fill();

    // 左の枝（高さに応じて位置調整）
    ctx.beginPath();
    ctx.roundRect(
      this.x, 
      this.y - (this.height * 0.75), 
      8, 
      this.height * 0.6, 
      4
    );
    ctx.fill();

    // 右の枝
    ctx.beginPath();
    ctx.roundRect(
      this.x + 16, 
      this.y - (this.height * 0.6), 
      8, 
      this.height * 0.5, 
      4
    );
    ctx.fill();

    // サボテンの模様（縦線）
    ctx.strokeStyle = "#1a3";
    ctx.lineWidth = 2;

    // メインの茎の線
    ctx.beginPath();
    ctx.moveTo(this.x + 12, this.y - this.height + 5);
    ctx.lineTo(this.x + 12, this.y);
    ctx.stroke();

    // トゲの数を高さに応じて調整
    const spineCount = Math.floor(this.height / 15);
    
    // メインの茎のトゲ
    for (let i = 0; i < spineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x + 16, this.y - this.height + (i * 15));
      ctx.lineTo(this.x + 20, this.y - this.height + 3 + (i * 15));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.x + 8, this.y - this.height + (i * 15));
      ctx.lineTo(this.x + 4, this.y - this.height + 3 + (i * 15));
      ctx.stroke();
    }
  }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const dino = new Dino();
let cacti = [];
let score = 0;
let gameOver = false;
let gameState = 'start';  // 'start', 'playing', 'gameOver'

function spawnCactus() {
  const score10 = Math.floor(score / 10);
  
  if (Math.random() < 0.02) {
    let type = 'normal';
    
    if (score10 >= 200) {
      // スコア200以上: 3種類全て
      const rand = Math.random();
      if (rand < 0.33) {
        type = 'short';
      } else if (rand < 0.66) {
        type = 'tall';
      }
    } else if (score10 >= 100) {
      // スコア100以上: normal と tall
      type = Math.random() < 0.5 ? 'normal' : 'tall';
    }
    
    cacti.push(new Cactus(canvas.width, type));
  }
}

function checkCollision(dino, cactus) {
  const dinoHitbox = {
    x: dino.x + 15,
    y: dino.y,
    width: dino.width - 20,
    height: dino.height
  };

  const cactusHitbox = {
    x: cactus.x,
    y: cactus.y - cactus.height,
    width: cactus.width,
    height: cactus.height
  };

  return (
    dinoHitbox.x < cactusHitbox.x + cactusHitbox.width &&
    dinoHitbox.x + dinoHitbox.width > cactusHitbox.x &&
    dinoHitbox.y < cactusHitbox.y + cactusHitbox.height &&
    dinoHitbox.y + dinoHitbox.height > cactusHitbox.y
  );
}

function drawBackground(ctx) {
    // 空
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, '#87CEEB');  // 空色
    gradient.addColorStop(1, '#E6B98D');  // 地平線付近
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 250);

    // 遠景のピラミッド
    ctx.fillStyle = '#C2956E';
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(200, 150);
    ctx.lineTo(300, 250);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(500, 250);
    ctx.lineTo(600, 180);
    ctx.lineTo(700, 250);
    ctx.fill();

    // 砂丘
    ctx.fillStyle = '#E6B98D';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-50 + i * 300, 250);
        ctx.quadraticCurveTo(
            100 + i * 300, 220,
            250 + i * 300, 250
        );
        ctx.fill();
    }

    // サボテン（装飾用、固定位置）
    const decorativeCactus = (x, scale = 1) => {
        ctx.fillStyle = '#2d5';
        ctx.beginPath();
        ctx.roundRect(x, 235, 6 * scale, 15 * scale, 2);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(x - 4 * scale, 240, 4 * scale, 8 * scale, 2);
        ctx.fill();
    };

    decorativeCactus(450, 1.2);
    decorativeCactus(50, 0.8);
    decorativeCactus(750, 1);

    // 地面
    ctx.fillStyle = '#DEB887';  // 砂色
    ctx.fillRect(0, 250, canvas.width, 50);
}

function drawStartScreen() {
    // タイトル
    ctx.fillStyle = "#FF6BB3";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("DINO RUNNER", canvas.width/2, 120);

    // サブタイトル
    ctx.fillStyle = "#666";
    ctx.font = "24px Arial";
    ctx.fillText("Press SPACE to Start", canvas.width/2, 160);

    // 操作説明
    ctx.font = "20px Arial";
    ctx.fillText("SPACE: Jump (Double Jump available)", canvas.width/2, 200);
    ctx.fillText("F or Left Click: Breathe Fire (5 times only)", canvas.width/2, 230);
    ctx.fillText("R: Reset Game", canvas.width/2, 260);

    ctx.textAlign = "left";
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx);

    switch(gameState) {
        case 'start':
            drawStartScreen();
            break;

        case 'playing':
            dino.update();
            dino.draw(ctx);

            spawnCactus();

            cacti = cacti.filter((cactus) => {
                cactus.update();
                cactus.draw(ctx);

                if (checkCollision(dino, cactus)) {
                    gameState = 'gameOver';
                }

                // 火炎放射との当たり判定を更新
                if (dino.isBreathingFire && 
                    cactus.x > dino.fireBreathX && 
                    cactus.x < dino.fireBreathX + dino.fireBreathWidth) {
                    return false;  // サボテンを消滅
                }

                return cactus.x > -20;
            });

            score++;
            
            // スコア表示
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${Math.floor(score / 10)}`, 650, 50);

            // 残りの火炎放射回数を表示
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText(`Fire Breath: ${dino.fireBreathCount}`, 650, 80);
            break;

        case 'gameOver':
            // 現在の状態を描画
            dino.draw(ctx);
            cacti.forEach(cactus => cactus.draw(ctx));
            
            // ゲームオーバー表示
            ctx.fillStyle = "#000";
            ctx.font = "40px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width/2, 150);
            ctx.textAlign = "left";
            
            // スコア表示
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${Math.floor(score / 10)}`, 650, 50);
            
            drawRestartButton();
            break;
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    gameState = 'playing';
    gameOver = false;
    score = 0;
    cacti = [];
    dino = new Dino();
    dino.fireBreathCount = 5;
}

function drawRestartButton() {
    const buttonX = 300;
    const buttonY = 180;
    const buttonWidth = 200;
    const buttonHeight = 50;

    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    ctx.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("RESTART", buttonX + buttonWidth/2, buttonY + 33);
    ctx.textAlign = "left";
}

canvas.addEventListener("click", (event) => {
    if (gameState === 'gameOver') {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const buttonX = 300;
        const buttonY = 180;
        const buttonWidth = 200;
        const buttonHeight = 50;

        if (x >= buttonX && x <= buttonX + buttonWidth &&
            y >= buttonY && y <= buttonY + buttonHeight) {
            resetGame();
        }
    } else if (gameState === 'playing') {
        // プレイ中は左クリックで火炎放射
        dino.breathFire();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        switch(gameState) {
            case 'start':
                gameState = 'playing';
                resetGame();
                break;
            case 'playing':
                dino.jump();
                break;
            case 'gameOver':
                resetGame();
                break;
        }
    } else if (event.code === "KeyR" || event.key === "r") {
        event.preventDefault();
        resetGame();
    } else if (event.code === "KeyF" && gameState === 'playing') {
        dino.breathFire();
    }
});

gameLoop();
