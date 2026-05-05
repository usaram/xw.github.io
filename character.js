const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 400;

document.getElementById("character").appendChild(canvas);

const ctx = canvas.getContext("2d");

let blink = 0;
let blinkTimer = 0;

let talking = false;
let mouth = 0;

// simular fala aleatória
setInterval(() => {
  talking = true;
  setTimeout(() => talking = false, 2000);
}, 4000);

function drawFace() {

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const centerX = 150;
  const centerY = 200;

  // CABEÇA
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#000";
  ctx.stroke();

  // OLHOS
  ctx.fillStyle = "#000";

  let eyeHeight = 10;

  if(blink > 0){
    eyeHeight = 2; // piscando
  }

  // olho esquerdo
  ctx.fillRect(centerX - 40, centerY - 20, 20, eyeHeight);

  // olho direito
  ctx.fillRect(centerX + 20, centerY - 20, 20, eyeHeight);

  // BOCA
  if(talking){
    mouth = Math.sin(Date.now() * 0.02) * 10;
  } else {
    mouth = 2;
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY + 30, 10 + mouth, 0, Math.PI);
  ctx.stroke();
}

// BLINK automático
function updateBlink(){
  blinkTimer++;

  if(blinkTimer > 200){
    blink = 5;
    blinkTimer = 0;
  }

  if(blink > 0){
    blink--;
  }
}

// LOOP
function animate(){
  requestAnimationFrame(animate);

  updateBlink();
  drawFace();
}

animate();
