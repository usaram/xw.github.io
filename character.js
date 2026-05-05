const container = document.getElementById("character");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, 320/420, 0.1, 20);
camera.position.set(0,1.4,2);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(320,420);
container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(1,1,1);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.7));

const loader = new THREE.GLTFLoader();

let vrm;

loader.load("model.vrm",(gltf)=>{
  THREE.VRM.from(gltf).then(v=>{
    vrm=v;
    scene.add(vrm.scene);
    vrm.scene.rotation.y=Math.PI;
  });
});

function animate(){
  requestAnimationFrame(animate);

  if(vrm){

    // piscar
    const blink = Math.sin(Date.now()*0.002);
    vrm.expressionManager.setValue("blink", blink>0.95?1:0);

    // falar
    const talk = Math.abs(Math.sin(Date.now()*0.01));
    vrm.expressionManager.setValue("aa", talk);

    // idle
    vrm.scene.rotation.y += 0.002;
  }

  renderer.render(scene,camera);
}

animate();
