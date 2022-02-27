import { useState, useEffect } from "react";
import MapWrapper from "./components/Map";
import { getPlants } from "./service/Api";

function App() {
  const [plants, setPlants] = useState();
  const [n, setN] = useState(10);

  useEffect(() => {
    setPlants(getPlants(n));
  }, [n]);

  const handlePlantsNumberChange = (e) => {
    const NthPlants = e.target.value;
    setN(NthPlants);
  };
  return (
    <div className="flex justify-center items-start">
      <input
        type="number"
        placeholder="plants"
        className="border-2 border-slate-500 border-solid"
        onChange={handlePlantsNumberChange}
      />
      <MapWrapper plants={plants} />

      {/* {states} */}
    </div>
  );
}

export default App;
