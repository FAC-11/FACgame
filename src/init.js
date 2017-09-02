const THREE = require('three');
const getMeshes = require('./meshes.js')
const controls = require('../controls');
const getFloor = require('./getFloor');
const getLight = require('./getLight');
const getRenderer = require('./getRenderer');

module.exports = () => {
  const scene = new THREE.Scene();
  //our camera
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0)); // direction camera is looking

  // this needs to be refactored in another folder

  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh1.position.set(-2, 0, 0);
  mesh1.receiveShadow = true;
  mesh1.castShadow = true;

  const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh2.position.set(2, 0, 0);
  mesh2.receiveShadow = true;
  mesh2.castShadow = true;

  const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: USE_WIREFRAME
    })
  );
  mesh3.position.set(0, 2, 0);
  mesh3.receiveShadow = true;
  mesh3.castShadow = true;

  const mesh4 = new THREE.Mesh(
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

  //now let's get the floor
  const floor = getFloor();
  scene.add(getFloor());
  const objects = [floor];

  //and the lights

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);

  //now the renderer
  const renderer = getRenderer();
  document.body.appendChild(renderer.domElement);
  //

  window.addEventListener('resize', onWindowResize, false);


  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    camera,
    scene,
    renderer,
    objects
  };
};
