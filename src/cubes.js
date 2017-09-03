const THREE = require('three');

const getObj1 = () => {
  const obj1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  obj1.position.set(-2, 0, 0);
  obj1.receiveShadow = true;
  obj1.castShadow = true;
  return obj1
};

const getObj2 = () => {
  const obj2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  obj2.position.set(2, 0, 0);
  obj2.receiveShadow = true;
  obj2.castShadow = true;
  return obj2;
};


const getObj3 = () => {
  const obj3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false
    })
  );
  obj3.position.set(0, 2, 0);
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
