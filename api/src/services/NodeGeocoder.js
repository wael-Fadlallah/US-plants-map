const NodeGeocoder = require("node-geocoder");
const PlantsData = require("./../data/plants.json");
const plantsAddress = require("./../data/plantsAddress.json");
const fs = require("fs");
const path = require("path");

const options = {
  provider: "google",

  // Optional depending on the providers
  apiKey: "AIzaSyCwMnKBuTc1wSU_6OhgJlLj9_LnYCvoGWQ", // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);

const searchLocation = async (name) => {
  const res = await geocoder.geocode({
    address: name,
    country: "USA",
  });
  console.log(`looking for ${name} address`);
  return res ? { lat: res[0]?.latitude, lng: res[0]?.longitude } : false;
};

const searchAddress = async (req, res) => {
  for (let i = 0; i < 2100; i++) {
    const plant = PlantsData[i];
    const plantName = plant["Plant name"];

    if (plantsAddress[plantName]) continue;

    let address = await searchLocation(plantName);
    if (!address)
      address = await searchLocation(plant["Plant state abbreviation"]);
    plantsAddress[plantName] = address;
  }

  fs.writeFileSync(
    "src/data/plantsAddress.json",
    JSON.stringify(plantsAddress)
  );
  res.send(plantsAddress);
};

// const getAddress = async (plant) => {
//   const address = fs.readFileSync(
//     path.resolve(__dirname, "./../data/plantsAddress.json")
//   );
//   if (!address) throw new Error("Address file not found");

//   if (address[plant["Plant name"]]) return address[plant["Plant name"]];
//   else {
//     const search = await searchLocation(plant["Plant name"]);
//     if (search) {
//       address[plant["Plant name"]] = search;
//       fs.writeFileSync("src/data/plantsAddress.json", JSON.stringify(address));
//       return search;
//     } else {
//       if (address[plant["Plant state abbreviation"]])
//         return address[plant["Plant state abbreviation"]];

//       const search = await searchLocation(plant["Plant state abbreviation"]);
//       if (search) {
//         address[plant["Plant state abbreviation"]] = search;
//         fs.writeFileSync(
//           "src/data/plantsAddress.json",
//           JSON.stringify(address)
//         );
//         return search;
//       }
//     }
//   }
// };

const getPlants = async (req, res) => {
  const plants = [];
  const n = req.params.number ?? 100;
  for (let i = 0; i < n; i++) {
    const plant = PlantsData[i];
    if (plantsAddress[plant["Plant name"]])
      plant["location"] = plantsAddress[plant["Plant name"]];
    else plant["location"] = plantsAddress[plant["Plant state abbreviation"]];
    plants.push(plant);
  }

  res.send(plants);
};

module.exports = { searchAddress, searchLocation, getPlants };

// Using callback
