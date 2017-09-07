let playerData = {};

const get = (id) => {
    return id ? playerData[id] : playerData;
}

const set = (id, data) =>{
  return playerData[id] = data;
}

const update = (id, data) =>{
  return Object.assign(playerData[id], data);
}

const remove = (id) => {
  const keysPlayerData = Object.keys(playerData);

   const filteredKeys = (id, arr) => {
    const array = arr.filter(function(x) {
      return x != id;
    });
    return array;
  }

  const allowed = filteredKeys(id, keysPlayerData);

  const newObject = (arr, playerData) => {
    let obj = {};
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = playerData[arr[i]];
    }
    return obj;
  }
  newObject(allowed, playerData);

}


module.exports = {get, set, update, remove};
