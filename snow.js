const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {x:0,y:0};

document.onmousemove = e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

let snow=[];

for(let i=0;i<300;i++){
  snow.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*3,
    speed:Math.random()+0.5
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

    let dx=f.x-mouse.x;
    let dy=f.y-mouse.y;
    let dist=Math.sqrt(dx*dx+dy*dy);

    if(dist<100){
      f.x += dx/10;
      f.y += dy/10;
    }

    if(f.y>canvas.height){
      f.y=0;
      f.x=Math.random()*canvas.width;
    }
  });
}

setInterval(draw,30);
