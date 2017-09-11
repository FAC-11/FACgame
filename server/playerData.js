const playerData = {};

const get = id => (id ? playerData[id] : playerData);

const set = (id, data) => playerData[id] = data;

const update = (id, data) => Object.assign(playerData[id], data);

const remove = (id) => {
  const keysPlayerData = Object.keys(playerData);

  const filteredKeys = (id, arr) => {
    const array = arr.filter(x => x != id);
    return array;
  };

  const allowed = filteredKeys(id, keysPlayerData);

  const newObject = (arr, playerData) => {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = playerData[arr[i]];
    }
    return obj;
  };
  newObject(allowed, playerData);
};


module.exports = {
  get, set, update, remove,
};
