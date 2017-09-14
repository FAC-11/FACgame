const THREE = require('three');
const init = require('./init/init');

const min = Math.ceil(10);
const max = Math.floor(100);
const min2 = Math.ceil(-700);
const max2 = Math.floor(700);

const cubeMap = (scene) => {
  for (let i = 0; i <= 300; i++) {
    const obj = new THREE.Mesh(
      new THREE.BoxGeometry(
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min,
      ),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: false,
      }),
    );
    obj.position.set(
      Math.floor(Math.random() * (max2 - min2 + 1)) + min,
      -Math.floor(Math.random() * (max2 - min2 + 1)) + min,
      Math.floor(Math.random() * (max2 - min2 + 1)) + min,
    );
    obj.receiveShadow = true;
    obj.castShadow = true;
    scene.add(obj);
  }
};
module.exports = {
  cubeMap,
};
