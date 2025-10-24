import React, { useState } from "react";
import Welcome from "./Welcome";
import MapPage from "./MapPage";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered ? (
        <Welcome onEnter={() => setEntered(true)} />
      ) : (
        <MapPage />
      )}
    </>
  );
}

export default App;
