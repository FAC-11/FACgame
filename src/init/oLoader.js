var oLoader = new THREE.OBJLoader2();
oLoader.load('../meshes/MountainTerrain.obj', function(object, materials) {
// var material = new THREE.MeshFaceMaterial(materials);
var material2 = new THREE.MeshStandardMaterial();
object.traverse( function(child) {
if (child instanceof THREE.Mesh) {
// apply custom material
child.material = material2;
// enable casting shadows
child.castShadow = true;
child.receiveShadow = true;
}
});
object.position.x = 0;
object.position.y = 10;
object.position.z = -30;
object.scale.set(0.1, 0.1, 0.1);
scene.add(object);
});
