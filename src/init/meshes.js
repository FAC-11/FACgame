const THREE = require('three');

const getMeshOne = () => {
  const meshOne = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  meshOne.receiveShadow = true;
  meshOne.castShadow = true;
  return meshOne;
}

const getMeshTwo = () => {
  const meshTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  meshTwo.position.set(-2, 0, 0);
  meshTwo.receiveShadow = true;
  meshTwo.castShadow = true;
  return meshTwo;
}
const getMesh3 = () => {
  const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh3.position.set(2, 0, 0);
  mesh3.receiveShadow = true;
  mesh3.castShadow = true;
  return mesh3;
}
const getMeshFour = () => {
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
  return mesh4;
}
const getMeshFive = () => {

  const mesh5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  mesh5.position.set(0, 2, 0);
  mesh5.receiveShadow = true;
  mesh5.castShadow = true;
  return mesh5;
}

module.exports = {
  getMeshOne,
  getMeshTwo,
  getMesh3,
  getMeshFour,
  getMeshFive
};
