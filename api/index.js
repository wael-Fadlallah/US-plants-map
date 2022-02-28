const express = require("express");
const app = express();
const port = 3000;
const GeoCoder = require("./src/services/NodeGeocoder");
const States = require("./src/services/States");
var cors = require("cors");

app.use(cors());
app.get("/top/:number", GeoCoder.getPlants);
app.get("/states", States.getStatesLocations);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
