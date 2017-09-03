const THREE = require('three');
const controls = require('./controls');
const getRenderer = require('./getRenderer');
const getLight = require('./getLight');


var meshFloor, mesh
var keyboard = {};
var player = {
  height: 1.8,
  speed: 0.2,
  turnSpeed: Math.PI * 0.02
};

// create the scene

const init = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0)); // direction camera is looking


  // create cubes
  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh1.position.set(-2, 0, 0);
  mesh1.receiveShadow = true;
  mesh1.castShadow = true;

  const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh2.position.set(2, 0, 0);
  mesh2.receiveShadow = true;
  mesh2.castShadow = true;

  const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh3.position.set(0, 2, 0);
  mesh3.receiveShadow = true;
  mesh3.castShadow = true;

  const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
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
      wireframe: false
    })
  );
  meshFloor.rotation.x -= Math.PI / 2;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);


  //lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);


  const renderer = getRenderer();
  document.body.appendChild(renderer.domElement);

  return {
    camera,
    scene,
    renderer
  };
}


module.exports = init;
