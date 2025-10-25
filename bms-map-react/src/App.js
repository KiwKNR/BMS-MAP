import React, { useState } from "react";
import Welcome from "./Welcome";
import CommandCenter from "./CommandCenter";
import MapPage from "./MapPage";

export default function App() {
  const [stage, setStage] = useState("welcome"); // welcome | command | map

  return (
    <>
      {stage === "welcome" && (
        <Welcome onEnter={() => setStage("command")} />
      )}

      {stage === "command" && (
        <CommandCenter
          onLaunch={() => setStage("map")}
          onBack={() => setStage("welcome")}
        />
      )}

      {stage === "map" && (
        <MapPage onBackToCommand={() => setStage("command")} />
      )}
    </>
  );
}
