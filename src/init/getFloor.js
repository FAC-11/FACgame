const THREE = require('three');
// const OBJLoader = require('three-obj-loader');
// const MTLLoader = require('three-mtl-loader');


const getFloor = () => {
  const floorTexture = new THREE.ImageUtils.loadTexture('images/grid.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(50, 50);
  const geometry = new THREE.PlaneBufferGeometry(2500, 2500, 5, 5);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  const material = new THREE.MeshLambertMaterial({map: floorTexture});
  const floor = new THREE.Mesh(geometry, material);
  floor.position.y = -25;

  floor.castShadow = false;
  floor.receiveShadow = true;
  return floor;
  // const floor = new THREE.Mesh(
  //   new THREE.PlaneGeometry(2500, 2500, 10, 10),
  //   new THREE.MeshPhongMaterial({
  //     color: 0xffffff,
  //     wireframe: false
  //   })
  // );
  // // floor.position.y = -5;
  // floor.rotation.x -= Math.PI / 2;
  // floor.receiveShadow = true;
  // return floor;
};




module.exports = getFloor;
