const THREE = require('three');
const controls = require('../controls');
const getRenderer = require('./getRenderer');
const getLight = require('./getLight');
const getFloor = require('./getFloor');
const cubes = require('../cubes');

var player = {
  height: 1.8,
  speed: 0.2,
  turnSpeed: Math.PI * 0.02
};

// create the scene

const init = () => {
  //let's create the scene
  const scene = new THREE.Scene();
  //and our camera
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0, player.height, 0)); // direction camera is looking


  // create cubes
  const obj1 = cubes.getObj1();
  const obj2 = cubes.getObj2();
  const obj3 = cubes.getObj3();;
  const obj4 = cubes.getObj4();
  const obj5 = cubes.getObj5();

  scene.add(obj1, obj2, obj3, obj4, obj5);

  //let's get the floor

  const floor = getFloor();
  scene.add(floor);
  const objects = [floor];

  //lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);

  const renderer = getRenderer();
  document.body.appendChild(renderer.domElement);

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
}


module.exports = init;
