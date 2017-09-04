const THREE = require('three');
const init = require('./init/init');

const controls = (keyboard, camera, player) => {

  if (keyboard[87]) { //W key
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }

  if (keyboard[83]) { //S key
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }

  if (keyboard[65]) { //A key
    camera.position.x -= -Math.sin(camera.rotation.y + Math.PI / 2) * player.speed; //changing the angle of the camera rotation with math.pi 90 degrees
    camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
  }

  if (keyboard[68]) { //D key
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
  }

  if (keyboard[37]) { //left arrow key
    camera.rotation.y -= player.turnSpeed;
  }

  if (keyboard[39]) { //right arrow key
    camera.rotation.y += player.turnSpeed;
  }

  const keyDown = (event) => {
    keyboard[event.keyCode] = true;
  }

  const keyUp = (event) => {
    keyboard[event.keyCode] = false;
  }

  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);

}


module.exports = controls;
