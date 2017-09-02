const getMeshes = require('../init/meshes.js')

const start = (options) => {
  const {
    camera,
    scene,
    renderer,
    raycaster,
    objects
  } = options;


  const animate = () => {
    requestAnimationFrame(animate);
    const meshOne = getMeshes.getMeshOne()
    meshOne.rotation.x += 0.1;
    meshOne.rotation.y += 0.1;
  };
  animate();
};



module.exports = {
  start
};
