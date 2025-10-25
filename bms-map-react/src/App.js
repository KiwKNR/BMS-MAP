import React, { useState } from "react";
import Welcome from "./Welcome";
import CommandCenter from "./CommandCenter";
import MapPage from "./MapPage";

function App() {
  const [stage, setStage] = useState("welcome"); // welcome → command → map

  if (stage === "welcome") return <Welcome onEnter={() => setStage("command")} />;
  if (stage === "command") return <CommandCenter onEnterMap={() => setStage("map")} />;
  if (stage === "map") return <MapPage />;
}

export default App;
