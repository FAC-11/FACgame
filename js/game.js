var scene, camera, renderer, mesh;
var meshFloor;
var torch;


var keyboard = {};
var player = {
  height: 1.8,
  speed: 0.2,
  turnSpeed: Math.PI * 0.02
};
var USE_WIREFRAME = false;
// create the scene

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);


  // create cubes
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh1.position.set(-2, 0, 0);
  mesh1.receiveShadow = true;
  mesh1.castShadow = true;

  mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh2.position.set(2, 0, 0);
  mesh2.receiveShadow = true;
  mesh2.castShadow = true;

  mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh3.position.set(0, 2, 0);
  mesh3.receiveShadow = true;
  mesh3.castShadow = true;

  mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh4.position.set(0, -2, 0);
  mesh4.receiveShadow = true;
  mesh4.castShadow = true;

  scene.add(mesh, mesh1, mesh2, mesh3, mesh4);

  //camera positions here

  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 20, 20),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: USE_WIREFRAME
    })
  );
  meshFloor.rotation.x -= Math.PI / 2;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);


  //lighting
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xffffff, 0.2);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  //trying to greate a torch here.
  // torch = new THREE.SpotLight(0xffffff,0.5,100);
  // torch.position.set(0, 0, 0);
  // torch.castShadow = true;
  // torch.shadow.camera.near = 0.1;
  // torch.shadow.camera.far = 25;
  // scene.add(torch);

  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0)); // direction camera is looking

  renderer = new THREE.WebGLRenderer(0, 0, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  document.body.appendChild(renderer.domElement);


  animate();
}

//render loop at 60fps
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.1;
  mesh.rotation.y += 0.1;

  //trying to create a torch
  // torch.position.set(camera.position.x,camera.position.y,camera.position.z);
  // torch.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);

  if (keyboard[87]) { //W key
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }

  if (keyboard[83]) { //S key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }

  if (keyboard[65]) { //A key
    camera.position.x -= -Math.sin(camera.rotation.y + Math.PI / 2) * player.speed; //changing the angle of the camera rotation with math.pi 90 degrees
    camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
  }

  if (keyboard[68]) { //D key
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
  }

  if (keyboard[37]) { //left arrow key
    camera.rotation.y -= player.turnSpeed;
  }

  if (keyboard[39]) { //right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  renderer.render(scene, camera);
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
