const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

for(let i=0;i<150;i++){
  snowflakes.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*3,
    d:Math.random()*1
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="white";
  ctx.beginPath();

  snowflakes.forEach(f=>{
    ctx.moveTo(f.x,f.y);
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
  });

  ctx.fill();
  update();
}

function update(){
  snowflakes.forEach(f=>{
    f.y += f.d;
    if(f.y > canvas.height){
      f.y = 0;
      f.x = Math.random()*canvas.width;
    }
  });
}

setInterval(draw,30);
