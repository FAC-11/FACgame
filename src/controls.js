const THREE = require('three');
//const init = require('./init/init');

const init = () => {
  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        movements.forward = true;
        break;
      case 37: // left
      case 65: // a
        movements.left = true;
        break;
      case 40: // down
      case 83: // s
        movements.backward = true;
        break;
      case 39: // right
      case 68: // d
        movements.right = true;
        break;
      case 32: // space
        if (movements.canJump) {
          movements.jumping = true;
          movements.canJump = false;
        }
        break;
    }
  };
  const onKeyUp = (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        movements.forward = false;
        break;
      case 37: // left
      case 65: // a
        movements.left = false;
        break;
      case 40: // down
      case 83: // s
        movements.backward = false;
        break;
      case 39: // right
      case 68: // d
        movements.right = false;
        break;
    }
  };

  //document.addEventListener( 'mousemove', onMouseMove, false );
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  // document.addEventListener('click', shoot, false);

}
const movements = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jumping: false,
  canJump: true
};
module.exports = {
  init,
  movements
};


// let velocity = new THREE.Vector3();
//
// const controls = (keyboard, camera, player) => {
//   camera.position.x = 0.5;
//
//  let canJump = false;
//
//   if (keyboard[32]) { //space
//     if ( canJump === true ) velocity.y += 10;
//         canJump = false;
//   }
//
//   if (keyboard[87]) { //W key
//     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
//     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
//   }
//
//   if (keyboard[83]) { //S key
//     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
//     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
//   }
//
//   if (keyboard[65]) { //A key
//     camera.position.x -= -Math.sin(camera.rotation.y + Math.PI / 2) * player.speed; //changing the angle of the camera rotation with math.pi 90 degrees
//     camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
//   }
//
//   if (keyboard[68]) { //D key
//     camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
//     camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
//   }
//
//   if (keyboard[37]) { //left arrow key
//     camera.rotation.y -= player.turnSpeed;
//   }
//
//   if (keyboard[39]) { //right arrow key
//     camera.rotation.y += player.turnSpeed;
//   }
//
//   const keyDown = (event) => {
//     keyboard[event.keyCode] = true;
//   }
//
//   const keyUp = (event) => {
//     keyboard[event.keyCode] = false;
//   }

//document.addEventListener('mousemove', mouseMove, false);
// document.addEventListener('keydown', keyDown, false);
// document.addEventListener('keyup', keyUp, false);
//
// }
//
//
// module.exports = controls;
