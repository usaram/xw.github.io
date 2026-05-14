// =========================

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let particles = [];

for(let i = 0; i < 180; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedY: Math.random() * 0.7 + 0.2,
    speedX: (Math.random() - 0.5) * 0.4
  });
}

function drawParticles(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.8)';

  particles.forEach(p => {

    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;

    let dist = Math.sqrt(dx * dx + dy * dy);

    if(dist < 120){
      p.x += dx * 0.015;
      p.y += dy * 0.015;
    }

    p.y += p.speedY;
    p.x += p.speedX;

    if(p.y > canvas.height){
      p.y = -5;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

// =========================
// PERSONAGEM SEGUE MOUSE
// =========================

const character = document.getElementById('character');

window.addEventListener('mousemove', e => {

  const x = (window.innerWidth / 2 - e.clientX) / 50;
  const y = (window.innerHeight / 2 - e.clientY) / 60;

  character.style.transform = `translate(${x}px, ${y}px)`;
});

// RESPONSIVO
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
