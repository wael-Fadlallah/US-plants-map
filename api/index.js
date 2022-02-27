const express = require("express");
const app = express();
const port = 3000;
const GeoCoder = require("./src/services/NodeGeocoder");
var cors = require("cors");

app.use(cors());
app.get("/top/:number", GeoCoder.getPlants);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
