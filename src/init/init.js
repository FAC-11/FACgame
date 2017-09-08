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

// const OBJLoader = require('three-obj-loader');
// OBJLoader(THREE);
// const MTLLoader = require('three-mtl-loader');


// var player = {
//   height: 1.8,
//   speed: 0.2,
//   turnSpeed: Math.PI * 0.02
// };

const bullet = () => {
  const bullet = new THREE.Mesh(
    new THREE.SphereGeometry(5, 8, 8),
    new THREE.MeshBasicMaterial(),
  );
  bullet.alive = true;
  setTimeout(() => {
    bullet.alive = false;
    scene.remove(bullet);
  }, 1000);
  scene.add(bullet);
};

// create the scene

const init = () => {

  const timeStep = 1 / 60;

  // Cannon init
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;
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
  world.addBody(body);

  var groundShape = new CANNON.Plane();
             var groundBody = new CANNON.Body({ mass: 0 });
             groundBody.addShape(groundShape);
             groundBody.position.set(0,-14,0);
             groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
             world.add(groundBody);



  // const camera = new THREE.PerspectiveCamera(75, -50, 1, 1000);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  // let's create the scene
  const scene = new THREE.Scene();
  // and our camera

  // camera.position.set(0, 0, -5);
  // camera.lookAt(0, 500, 0); // direction camera is looking
  getScene.init(scene);
  const pointerLockControls = new PointerLockControls(camera);
  blocker(pointerLockControls);
  scene.add(pointerLockControls.getObject());
  controls.init(scene, pointerLockControls);
  pointerLocks.init(pointerLockControls);

  const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  // create cubes
  const obj1 = cubes.getObj1();
  const obj2 = cubes.getObj2();
  const obj3 = cubes.getObj3();
  const obj4 = cubes.getObj4();
  const obj5 = cubes.getObj5();
  const obj6 = cubes.getObj6();

  scene.add(obj1, obj2, obj3, obj4, obj5, obj6);


  // objects
  // const loader = new MTLLoader();
  // loader.load('images/Oak_Green_01.mtl', function(materials) {
  //   materials.preload();
  //   const objLoader = new THREE.OBJLoader();
  //   objLoader.setMaterials(materials);
  //
  //   objLoader.load('images/Oak_Green_01.obj', function(tree) {
  //     scene.add(tree)
  //   })
  //
  // })

  // lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = getLight();
  scene.add(light);

  // let's get the floor

  const floor = getFloor();
  scene.add(floor);
  const objects = [floor];

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
  };
};


module.exports = init;
