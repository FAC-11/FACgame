const pickBy = require('lodash/pickBy'); // like filter but for objects
// keys are socket ids and values are player data objects
// eg.
// SK37fc7CN1j_ntQCAAAA: {
//   position: {x: 2, y: 10, z:8},
//   rotation: {x: 1, y: 3, z:2}
// }
let playerData = {};

const get = (id) =>
  id ? playerData[id] : playerData;

const set = (id, data) =>
  playerData[id] = data;

const update = (id, data) =>
  Object.assign(playerData[id], data)

// const setAll = (_playerData) => {
//   playerData = _playerData;
// };

const remove = (id) => {
  playerData = pickBy(playerData, (value, key) =>
    key !== id
  );
};

module.exports = {
  set,
  get,
  update,
  remove
};
