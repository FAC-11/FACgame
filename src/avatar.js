const THREE = require('three');

const create = (options) => {

  options = options || {};
  const avatar = {};

  avatar.sizeRatio = options.sizeRatio || 1;
  avatar.scale = options.scale || new THREE.Vector3(1, 1, 1);
  avatar.fallbackImage = options.fallbackImage || 'avatar.png';
  createCanvases(avatar);
  avatar.mesh = createPlayerObject(avatar);
  avatar.mesh.scale.set(avatar.sizeRatio, avatar.sizeRatio * 0.75, avatar.sizeRatio);

  avatar.walkSpeed = 0.6;
  avatar.startedWalking = 0.0;
  avatar.stoppedWalking = 0.0;
  avatar.walking = false;
  avatar.acceleration = 0.5;

  return avatar;
};

const createCanvases = (avatar) => {
  avatar.avatarBig = document.createElement('canvas');
  avatar.avatarBigContext = avatar.avatarBig.getContext('2d');
  avatar.avatarBig.width = 64 * avatar.sizeRatio;
  avatar.avatarBig.height = 32 * avatar.sizeRatio;

  avatar.avatar = document.createElement('canvas');
  avatar.avatarContext = avatar.avatar.getContext('2d');
  avatar.avatar.width = 64;
  avatar.avatar.height = 32;
};

const createPlayerObject = (avatar) => {
  new THREE.Object3D();
  const upperbody = avatar.upperbody = new THREE.Object3D();
  new THREE.MeshBasicMaterial({color: new THREE.Color('grey')});

  const armMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/arm.png')});
  const bodyMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/body.png')});
  const bottomMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/bottom.png')});
  const handMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/hand.png')});
  const legMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/leg.png')});
  const shoeMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/shoe.png')});
  const shoulderMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/shoulder.png')});
  const sideMaterial =
     new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('images/bodyTextures/defaultPerson/side.png')});

  const armMatFull = new THREE.MeshFaceMaterial([
    armMaterial,
    armMaterial,
    shoulderMaterial,
    handMaterial,
    armMaterial,
    armMaterial
  ]);
  const bodyMatFull = new THREE.MeshFaceMaterial([
    bodyMaterial,
    bodyMaterial,
    bottomMaterial,
    bottomMaterial,
    sideMaterial,
    sideMaterial
  ]);
  const legMatFull = new THREE.MeshFaceMaterial([
    legMaterial,
    legMaterial,
    shoeMaterial,
    shoeMaterial,
    legMaterial,
    legMaterial
  ]);
  // Left leg
  const leftleggeo = new THREE.BoxGeometry(4, 12, 4);
  for (let i = 0; i < 8; i += 1) {
    leftleggeo.vertices[i].y -= 6;
  }

  const leftleg = avatar.leftLeg = new THREE.Mesh(leftleggeo, legMatFull);
  leftleg.position.z = -2;
  leftleg.position.y = -6;

  // Right leg
  const rightleggeo = new THREE.BoxGeometry(4, 12, 4);
  for (let i = 0; i < 8; i += 1) {
    rightleggeo.vertices[i].y -= 6;
  }
  const rightleg = avatar.rightLeg = new THREE.Mesh(rightleggeo, legMatFull);
  rightleg.position.z = 2;
  rightleg.position.y = -6;

  // Body
  const bodygeo = new THREE.BoxGeometry(4, 12, 8);
  const bodymesh = avatar.body = new THREE.Mesh(bodygeo, bodyMatFull);
  upperbody.add(bodymesh);

  // Left arm
  const leftarmgeo = new THREE.BoxGeometry(4, 12, 4);
  for (let i = 0; i < 8; i += 1) {
    leftarmgeo.vertices[i].y -= 4;
  }
  const leftarm = avatar.leftArm = new THREE.Mesh(leftarmgeo, armMatFull);
  leftarm.position.z = -6;
  leftarm.position.y = 4;
  leftarm.rotation.x = Math.PI / 32;
  upperbody.add(leftarm);

  // Right arm
  const rightarmgeo = new THREE.BoxGeometry(4, 12, 4);
  for (let i = 0; i < 8; i += 1) {
    rightarmgeo.vertices[i].y -= 4;
  }
  const rightarm = avatar.rightArm = new THREE.Mesh(rightarmgeo, armMatFull);
  rightarm.position.z = 6;
  rightarm.position.y = 4;
  rightarm.rotation.x = -Math.PI / 32;

  upperbody.add(rightarm);

  const head = createHead();
  head.position.y += 10;

  const playerModel = avatar.playerModel = new THREE.Object3D();

  playerModel.add(leftleg);
  playerModel.add(rightleg);
  playerModel.add(upperbody);
  playerModel.add(head);

  const playerRotation = new THREE.Object3D();
  playerRotation.rotation.y = Math.PI / 2;
  playerRotation.position.y = 12;
  playerRotation.add(playerModel);

  playerModel.position.y = -12;

  const playerGroup = new THREE.Object3D();

  playerGroup.add(playerRotation);
  playerGroup.scale.set(avatar.scale);

  return playerGroup;
};

const createHead = () => {
  const geometry = new THREE.BoxGeometry( 4, 7, 7 );

  const plainMaterial = new THREE.MeshBasicMaterial( {color: 'lightgrey'} );

  const materialArray = [
    new THREE.MeshBasicMaterial( { color:'white', map: THREE.ImageUtils.loadTexture( 'images/trump-face.jpg' ) }),
    plainMaterial,
    plainMaterial,
    plainMaterial,
    plainMaterial,
    plainMaterial
  ];

  const material = new THREE.MeshFaceMaterial(materialArray);

  const head = new THREE.Mesh( geometry, material );

  return head;
};

const render = (avatar) => {
  var time = Date.now() / 1000;
  if (avatar.walking && time < avatar.startedWalking + avatar.acceleration) {
    avatar.walkSpeed = (time - avatar.startedWalking) / avatar.acceleration;
  }
  if (!avatar.walking) {
    if (time < avatar.stoppedWalking + avatar.acceleration)
      avatar.walkSpeed = -1 / avatar.acceleration * (time - avatar.stoppedWalking) + 1;
    else if (avatar.walkSpeed > 0.02)
      avatar.walkSpeed *= 0.95;
    else {
      avatar.walkSpeed = 0;
    }
  }

  avatar.rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI) * avatar.walkSpeed;
  avatar.rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1) * avatar.walkSpeed;
  avatar.leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10) * avatar.walkSpeed;
  avatar.leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1) * avatar.walkSpeed;

  avatar.rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10) * avatar.walkSpeed;
  avatar.leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI) * avatar.walkSpeed;
};

const startWalking = (avatar) => {

  var now = Date.now() / 1000;
  avatar.walking = true;
  if (avatar.stoppedWalking + avatar.acceleration > now){
    avatar.startedWalking = now - (avatar.stoppedWalking + avatar.acceleration - now);
  } else {
    avatar.startedWalking = Date.now() / 1000;
  }
};

const stopWalking = (avatar) => {
  var now = Date.now() / 1000;
  avatar.walking = false;
  if (avatar.startedWalking + avatar.acceleration > now){
    avatar.stoppedWalking = now - (avatar.startedWalking + avatar.acceleration - now);
  } else {
    avatar.stoppedWalking = Date.now() / 1000;
  }
};

module.exports = {
  create,
  startWalking,
  stopWalking,
  render
};
