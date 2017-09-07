// keys are socket ids and values are player data objects
// eg. SK37fc7CN1j_ntQCAAAA: { position: {x: 2, y: 10, z:8}, avatar:...}
let otherPlayers = {};

const get = () => otherPlayers;
const set = (_otherPlayers) => {
  otherPlayers = _otherPlayers;
};
const addPlayer = (id, player) => {
  otherPlayers[id] = player;
};

module.exports = {
  get,
  set,
  addPlayer
};
