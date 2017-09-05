const THREE = require('three');
const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
const MTLLoader = require('three-mtl-loader');


const getObj1 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load("images/crate/crate0_diffuse.png");
  const crateBumpMap = textureLoader.load("images/crate/crate0_bump.png");
  const crateNormalMap = textureLoader.load("images/crate/crate0_normal.png");
  const obj1 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false
    })
  );
  obj1.position.set(3, 1, 0);
  obj1.receiveShadow = true;
  obj1.castShadow = true;
  return obj1;
};

const getObj2 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load("images/crate/crate0_diffuse.png");
  const crateBumpMap = textureLoader.load("images/crate/crate0_bump.png");
  const crateNormalMap = textureLoader.load("images/crate/crate0_normal.png");
  const obj2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false
    })
  );
  obj2.position.set(5, 1, 0);
  obj2.receiveShadow = true;
  obj2.castShadow = true;
  return obj2;
};


const getObj3 = () => {
  const textureLoader = new THREE.TextureLoader();
  const crateTexture = textureLoader.load("images/crate/crate0_diffuse.png");
  const crateBumpMap = textureLoader.load("images/crate/crate0_bump.png");
  const crateNormalMap = textureLoader.load("images/crate/crate0_normal.png");
  const obj3 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: crateTexture,
      bumpMap: crateBumpMap,
      normalMap: crateNormalMap,
      wireframe: false
    })
  );
  obj3.position.set(4, 3, 0);
  obj3.receiveShadow = true;
  obj3.castShadow = true;
  return obj3;
};

const getObj4 = () => {
  const obj4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  obj4.position.set(0, -2, 0);
  obj4.receiveShadow = true;
  obj4.castShadow = true;
  return obj4;

};
const getObj5 = () => {
  const obj5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  obj5.receiveShadow = true;
  obj5.castShadow = true;
  return obj5;
}

module.exports = {
  getObj1,
  getObj2,
  getObj3,
  getObj4,
  getObj5
};




//objects
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
