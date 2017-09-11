let otherBullets = {};

const get = () => otherBullets;

const addBullets = (randomid, bullet) => {
  otherBullets[randomid] = bullet;

};

module.exports ={
  get,
  addBullets
}
