const THREE = require('three');
const CANNON = require('cannon');
const PointerLockControls = require('three-pointerlock');
const getScene = require('../getScene');
const pointerLocks = require('../pointLockers');
const controls = require('../controls');
const getRenderer = require('./getRenderer');
const getLight = require('./getLight');
const getFloor = require('./getFloor');
const cubes = require('../cubes');
const blocker = require('../blocker');
const getRaycaster = require('../getRaycaster');

// create the scene

const init = () => {
// attempt to create a HUD but need to know how to render in the DOM.
  const hud = document.createElement('div');
  hud.innerHTML = '<p>Health: <span id="health"></span><br />Score: <span id="score">0</span></p>';
  document.body.appendChild(hud);


  const timeStep = 1 / 60;

  // Cannon init
  const world = new CANNON.World();
  world.gravity.set(0, -20, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  // quaternians and performance
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;

  world.solver = new CANNON.SplitSolver(new CANNON.GSSolver());
  // shape is shape of geometry/wireframe
  const shape = new CANNON.Box(new CANNON.Vec3(10, 10, 10));
  // body is it being effected by forces.
  const body = new CANNON.Body({
    mass: 1,
  });
  body.addShape(shape);
  body.angularVelocity.set(0, 50, 0);
  body.angularDamping = 0.5;
  body.position.set(0, 50, 0);


  // Create a slippery material (friction coefficient = 0.0)
  const physicsMaterial = new CANNON.Material('slipperyMaterial');
  const physicsContactMaterial = new CANNON.ContactMaterial(
    physicsMaterial,
    physicsMaterial,
    0.0, // friction coefficient
    0.3, // restitution
  );
  // We must add the contact materials to the world
  world.addContactMaterial(physicsContactMaterial);


  world.addBody(body);


  // const camera = new THREE.PerspectiveCamera(75, -50, 1, 1000);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // let's create the scene
  const scene = new THREE.Scene();
  // and our camera

  getScene.init(scene);
  const pointerLockControls = new PointerLockControls(camera);
  blocker(pointerLockControls);
  scene.add(pointerLockControls.getObject());
  controls.init(scene, pointerLockControls);
  pointerLocks.init(pointerLockControls);

  const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  getRaycaster.init(raycaster);
  // create cubes
  const obj1 = cubes.getObj1();
  const obj2 = cubes.getObj2();
  const obj3 = cubes.getObj3();
  const obj4 = cubes.getObj4();
  const obj5 = cubes.getObj5();
  // create health pack
  const health = cubes.getObj7();
  // create gun objects
  const gun = cubes.getGun();
  console.log('init', gun);
  // const objload = cubes.objload();


  scene.add(obj1, obj2, obj3, obj4, obj5, health, gun);


  // lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);

  // let's get the floor

  const floor = getFloor();
  world.add(floor.groundBody);
  scene.add(floor.floor);

  const objects = [floor.floor];

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
    raycaster,
    objects,
    pointerLockControls,
    world,
    timeStep,
    health,
    gun,
    // objload,
  };
};


module.exports = init;
