// =========================

  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedY: Math.random() * 0.5 + 0.15,
    speedX: (Math.random() - 0.5) * 0.2
  });
}

function animateParticles(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = 'rgba(255,255,255,0.8)';

  particles.forEach(p => {

    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;

    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){
      p.x += dx * 0.01;
      p.y += dy * 0.01;
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

  requestAnimationFrame(animateParticles);
}

animateParticles();

// =========================
// PERSONAGEM SEGUE MOUSE
// =========================

const anime = document.getElementById('anime');

window.addEventListener('mousemove', e => {

  const moveX = (window.innerWidth / 2 - e.clientX) / 60;
  const moveY = (window.innerHeight / 2 - e.clientY) / 80;

  anime.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// =========================
// RESPONSIVO
// =========================

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
