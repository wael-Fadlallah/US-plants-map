const Location = require("./NodeGeocoder");
const NodeGeocoder = require("node-geocoder");
const states = require("./../data/states.json");

const getStatesLocations = async (req, res) => {
  res.send(states);
};

module.exports = { getStatesLocations };
