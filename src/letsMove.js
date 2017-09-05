const THREE = require('three');
const pointLockers = require('./pointLockers');

const {movements} = require('./controls');

const velocity = new THREE.Vector3();

module.exports = function(objects, raycaster, prevTime, time){

  raycaster.ray.origin.copy(pointLockers().position);
  raycaster.ray.origin.y -= 10;
  const intersections = raycaster.intersectObjects(objects);
  const isOnObject = intersections.length > 0;
  const delta = (time - prevTime) / 1000;
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

  if (movements.forward)
    velocity.z -= 2000.0 * delta;

  if (movements.backward)
    velocity.z += 1000.0 * delta;

  if (movements.left)
    velocity.x -= 1000.0 * delta;

  if (movements.right)
    velocity.x += 1000.0 * delta;

  if (isOnObject === true) {
    velocity.y = Math.max(0, velocity.y);
    movements.canJump = true;

    // prevents resting position y of players from changing after jump
    if (pointLockers().position.y < 20 && velocity.y <= 0) {
      pointLockers().position.y = 10;
    }
  }

  if (movements.jumping){
    velocity.y = 350;
    movements.jumping = false;
    movements.canJump = false;
  }

  velocity.x = stopIfSlow(velocity.x);
  velocity.z = stopIfSlow(velocity.z);

  pointLockers().translateX(velocity.x * delta);
  pointLockers().translateY(velocity.y * delta);
  pointLockers().translateZ(velocity.z * delta);

  if (pointLockers().position.y < 10) {
    velocity.y = 0;
    pointLockers().position.y = 10;
    movements.canJump = true;
  }
};

// this is to stop lots of tiny movements from being sent to server once
// player has stopped moving but continues to slightly slide
const stopIfSlow = (velocity) =>
  Math.abs(velocity) < 0.1
    ? 0
    : velocity;
