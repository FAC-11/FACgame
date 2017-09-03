const THREE = require('three');
const OBJLoader = require('three-obj-loader');

const getFloor = () => {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 20, 20),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false
    })
  );
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  return floor;
};

// const getFloor = () => {
//   const floor = new THREE.OBJLoader2.WWOBJLoader2();
//   floor.load('images/MountainTerrain.obj', function(object, materials) {
//   // var material = new THREE.MeshFaceMaterial(materials);
//   var material2 = new THREE.MeshStandardMaterial();
//   object.traverse( function(child) {
//   if (child instanceof THREE.Mesh) {
//   // apply custom material
//   child.material = material2;
//   // enable casting shadows
//   child.castShadow = true;
//   child.receiveShadow = true;
//   }
//   });
//   object.position.x = 0;
//   object.position.y = -10;
//   object.position.z = -30;
//   object.scale.set(0.1, 0.1, 0.1);
//   return object
//   });
// }



module.exports = getFloor;
