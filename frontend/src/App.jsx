import { useState } from "react";
import Map from "./components/Map";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Map />
    </div>
  );
}

export default App;
