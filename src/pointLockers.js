let _pointerLockControls;

module.exports = () =>
  _pointerLockControls.getObject();

module.exports.init = (pointerLockControls) => {
  _pointerLockControls = pointerLockControls;
};
