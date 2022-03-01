import { useState, useEffect } from "react";
import MapWrapper from "./components/Map";
import { getPlants, getStates } from "./service/Api";

function App() {
  const [plants, setPlants] = useState();
  const [states, setStates] = useState();
  const [n, setN] = useState(500);

  useEffect(async () => {
    setPlants(await getPlants(n));
    setStates(await getStates());
  }, [n]);

  const handlePlantsNumberChange = (e) => {
    const NthPlants = e.target.value;
    setN(NthPlants);
  };
  return (
    <div className="flex justify-center items-start ">
      <div className="h-screen overflow-scroll">
        <p className="">Plants number</p>
        <input
          type="number"
          placeholder="plants"
          className="border-2 border-slate-500 border-solid"
          defaultValue={n}
          onChange={handlePlantsNumberChange}
        />

        <div>
          {plants &&
            plants.map((plant) => {
              return (
                <div className="">
                  <p> name : {plant["Plant name"]} </p>
                </div>
              );
            })}
        </div>
      </div>
      <MapWrapper plants={plants} states={states} />

      {/* {states} */}
    </div>
  );
}

export default App;
