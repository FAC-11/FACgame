const bulletData = {};

const getId = id => (id ? bulletData[id] : bulletData);

const set = (id, data) => bulletData[id] = data;

module.exports = { getId, set };
