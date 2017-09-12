const THREE = require('three');
const PointerLockControls = require('three-pointerlock');
const OBJLoader = require('three-obj-loader');

OBJLoader(THREE);


const getObj1 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/crate0_diffuse.png');
  const crateBumpMap = textureLoader.load('images/crate/crate0_bump.png');
  const crateNormalMap = textureLoader.load('images/crate/crate0_normal.png');
  const obj1 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false,
    }),
  );
  obj1.position.set(180, 50, 25);
  obj1.receiveShadow = true;
  obj1.castShadow = true;
  return obj1;
};

const getObj2 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/crate0_diffuse.png');
  const crateBumpMap = textureLoader.load('images/crate/crate0_bump.png');
  const crateNormalMap = textureLoader.load('images/crate/crate0_normal.png');
  const obj2 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false,
    }),
  );
  obj2.position.set(200, -5, -100);
  obj2.receiveShadow = true;
  obj2.castShadow = true;
  return obj2;
};


const getObj3 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/crate0_diffuse.png');
  const crateBumpMap = textureLoader.load('images/crate/crate0_bump.png');
  const crateNormalMap = textureLoader.load('images/crate/crate0_normal.png');
  const obj3 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false,
    }),
  );
  obj3.position.set(160, -5, -100);
  obj3.receiveShadow = true;
  obj3.castShadow = true;
  return obj3;
};

const getObj4 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/crate0_diffuse.png');
  const crateBumpMap = textureLoader.load('images/crate/crate0_bump.png');
  const crateNormalMap = textureLoader.load('images/crate/crate0_normal.png');
  const obj4 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false,
    }),
  );
  obj4.position.set(50, -5, -100);
  obj4.receiveShadow = true;
  obj4.castShadow = true;
  return obj4;
};
const getObj5 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/crate0_diffuse.png');
  const crateBumpMap = textureLoader.load('images/crate/crate0_bump.png');
  const crateNormalMap = textureLoader.load('images/crate/crate0_normal.png');
  const obj5 = new THREE.Mesh(
    new THREE.BoxGeometry(40, 40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false,
    }),
  );

  obj5.position.set(10, -5, -100);
  obj5.receiveShadow = true;
  obj5.castShadow = true;
  return obj5;
};

const getObj7 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load('images/crate/healthpack.png');
  const obj7 = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      wireframe: false,
    }),
  );
  obj7.position.set(60, -5, 2);
  obj7.receiveShadow = true;
  obj7.castShadow = true;
  return obj7;
};

// prepare loader and load the model
const getGun = () => {
  const gun = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 1),
    new THREE.MeshStandardMaterial({
      color: 0xe2679f,
      wireframe: false,
    }),
  );
  gun.position.set(20, 20, 20);
  gun.receiveShadow = true;
  gun.castShadow = false;
  return gun;
};
const objload = () => {
// prepare loader and load the model
  const oLoader = new THREE.OBJLoader();
  oLoader.load('images/Tall_Rock_1_01.obj', (object, materials) => {
    // var material = new THREE.MeshFaceMaterial(materials);
    const material2 = new THREE.MeshStandardMaterial();
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
      // apply custom material
        child.material = material2;
        // enable casting shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    object.scale.set(1, 1, 1);
    return object;
  });
};

module.exports = {
  getObj1,
  getObj2,
  getObj3,
  getObj4,
  getObj5,
  getObj7,
  getGun,
  objload,
};
