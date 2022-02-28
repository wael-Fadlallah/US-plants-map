import { useState, useEffect } from "react";
import MapWrapper from "./components/Map";
import { getPlants, getStates } from "./service/Api";

function App() {
  const [plants, setPlants] = useState();
  const [states, setStates] = useState();
  const [n, setN] = useState(500);

  useEffect(() => {
    setPlants(getPlants(n));
    setStates(getStates());
  }, [n]);

  const handlePlantsNumberChange = (e) => {
    const NthPlants = e.target.value;
    setN(NthPlants);
  };
  return (
    <div className="flex justify-center items-start">
      <div>
        <p className="">Plants number</p>
        <input
          type="number"
          placeholder="plants"
          className="border-2 border-slate-500 border-solid"
          defaultValue={n}
          onChange={handlePlantsNumberChange}
        />
      </div>
      <MapWrapper plants={plants} states={states} />

      {/* {states} */}
    </div>
  );
}

export default App;
