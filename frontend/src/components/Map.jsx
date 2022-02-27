import { useRef, useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function MapWrapper({ plants }) {
  return (
    <Wrapper apiKey={"AIzaSyCwMnKBuTc1wSU_6OhgJlLj9_LnYCvoGWQ"}>
      <Map
        center={{ lat: 41.0164, lng: -104.220477 }}
        zoom={4}
        plants={plants}
      />
    </Wrapper>
  );
}

function Map({ center, zoom, plants: plantsList }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const [plants, setPlants] = useState(null);

  useEffect(async () => {
    setPlants(await plantsList);
  }, [plantsList]);

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      // disableDefaultUI: true,
      // zoomControl: false,
      // draggable: false,
      // fullscreenControl: true,
    });

    setMap(map);
  }, []);

  useEffect(async () => {
    if (map && plants) {
      plants.map((plant) => {
        new window.google.maps.Marker({
          position: plant.location,
          map,
          title: plant["Plant name"],
          draggable: true,
        });
      });
    }
  }, [map, plants]);

  return <div ref={ref} id="map" style={{ width: "700px", height: "700px" }} />;
}
