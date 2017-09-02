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
        if(movements.canJump){
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

  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
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
