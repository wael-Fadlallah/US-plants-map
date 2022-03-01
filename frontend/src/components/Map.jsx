import { useRef, useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import mapStyle from "./style";
import {
  mouseInToRegion,
  mouseOutOfRegion,
  addMarker,
  makeContentBox,
} from "./utils";
import beachflag from "./../assets/beachflag.png";

export default function MapWrapper({ plants, states }) {
  return (
    <Wrapper apiKey={"AIzaSyCwMnKBuTc1wSU_6OhgJlLj9_LnYCvoGWQ"}>
      <Map
        center={{ lat: 41.0164, lng: -104.220477 }}
        zoom={4}
        plants={plants}
        states={states}
      />
    </Wrapper>
  );
}

function Map({ center, zoom, plants: plantsList, states: statesList }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const [plants, setPlants] = useState(null);
  const [states, setStates] = useState(null);
  const [state, setState] = useState(null);

  useEffect(async () => {
    setPlants(await plantsList);
  }, [plantsList]);

  useEffect(async () => {
    setStates(await statesList);
  }, [statesList]);

  useEffect(async () => {
    if (map && states && plants)
      states.forEach((state) => {
        const plantsNumber = plants.filter(
          (plant) => plant["Plant state abbreviation"] === state.key
        );
        const pt = ((plantsNumber.length / plants.length) * 100).toFixed(2);
        const contentString = makeContentBox({
          name: state.state,
          plantsNumber: plantsNumber.length,
          pt,
        });

        const marker = addMarker(map, state.location, state.state, beachflag);
        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });
        if (marker)
          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
      });
  }, [states]);

  // loop through the plants and add the markers
  useEffect(async () => {
    if (map && plants) {
      plants.map((plant) => {
        const contentString = makeContentBox({
          name: plant["Plant name"],
          genNet: plant["Generator annual net generation (MWh)"],
        });
        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });
        const marker = addMarker(map, plant.location, plant["Plant name"]);
        if (marker)
          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
      });
    }
  }, [map, plants]);

  // load the map
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      styles: mapStyle,
      // disableDefaultUI: true,
      // zoomControl: false,
      // draggable: false,
      // fullscreenControl: true,
    });
    map.data.addListener("mouseover", (e) => mouseInToRegion(e, setState));
    map.data.addListener("mouseout", (e) => mouseOutOfRegion(e, setState));

    setMap(map);
  }, []);

  // Loads the state boundary polygons from a GeoJSON source.
  useEffect(() => {
    if (!map) return;
    // load US state outline polygons from a GeoJson file
    map.data.loadGeoJson(
      "https://storage.googleapis.com/mapsdevsite/json/states.js",
      { idPropertyName: "STATE" }
    );
    // wait for the request to complete by listening for the first feature to be added
    window.google.maps.event.addListenerOnce(map.data, "addfeature", () => {
      google.maps.event.trigger(
        document.getElementById("census-variable"),
        "change"
      );
    });
  }, [map]);

  return (
    <div className="flex flex-col">
      <div ref={ref} id="map" style={{ width: "700px", height: "700px" }} />
      <p> {state ?? "hover over a state"} </p>
      {/* <select>
        {states?.map((state) => (
          <option> {state.state} </option>
        ))}
      </select> */}
    </div>
  );
}
