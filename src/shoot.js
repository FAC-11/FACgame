// try to call this functions from letsMove later...a

const bullet = (scene) => {
var bullet = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 8, 8),
  new THREE.MeshBasicMaterial());

bullet.position.set(player.position.x,player.position.y,player.position.z);
  bullet.alive = true;
  setTimeout(function() {
    bullet.alive = false;
    scene.remove(bullet);
  }, 1000);
  scene.add(bullet);
}



module.exports = bullet;
