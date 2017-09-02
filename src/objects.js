const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: USE_WIREFRAME
  })
);
mesh.receiveShadow = true;
mesh.castShadow = true;

const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: USE_WIREFRAME
  })
);
mesh1.position.set(-2, 0, 0);
mesh1.receiveShadow = true;
mesh1.castShadow = true;

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: USE_WIREFRAME
  })
);
mesh2.position.set(2, 0, 0);
mesh2.receiveShadow = true;
mesh2.castShadow = true;

const mesh3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: USE_WIREFRAME
  })
);
mesh3.position.set(0, 2, 0);
mesh3.receiveShadow = true;
mesh3.castShadow = true;

const mesh4 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: USE_WIREFRAME
  })
);
mesh4.position.set(0, -2, 0);
mesh4.receiveShadow = true;
mesh4.castShadow = true;
