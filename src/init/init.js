const THREE = require('three');
const PointerLockControls = require('three-pointerlock');
const getMeshes = require('./meshes.js')
const controls = require('../controls');
const getFloor = require('./getFloor');
const getLight = require('./getLight');
const getRenderer = require('./getRenderer');

module.exports = () => {

  const scene = new THREE.Scene();
  //our camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  const pointerLockControls = new PointerLockControls(camera); // direction camera is looking

  scene.add(pointerLockControls.getObject());
  controls.init(scene, pointerLockControls);
  // our meshesObjects

  const meshOne = getMeshes.getMeshOne();
  const meshTwo = getMeshes.getMeshTwo();
  const meshThree = getMeshes.getMesh3();
  const meshFour = getMeshes.getMeshFour();
  const meshFive = getMeshes.getMeshFive();

  scene.add(meshOne, meshTwo, meshThree, meshFour, meshFive);

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
