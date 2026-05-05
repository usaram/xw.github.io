const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snow = [];

for(let i=0;i<200;i++){
  snow.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2 + 1,
    speed:Math.random()*1 + 0.5
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="white";

  snow.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fill();

    f.y += f.speed;

    if(f.y > canvas.height){
      f.y = 0;
      f.x = Math.random()*canvas.width;
    }
  });
}

setInterval(draw, 30);
