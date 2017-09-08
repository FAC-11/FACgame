let bulletData = {};

const getId = (id) => {
  return id ? bulletData[id] : bulletData;
}

const set = (id, bulletData) =>{
  return bulletData[id] = data;
}

module.exports = { getId, set};
