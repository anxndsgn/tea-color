import React from "react";
import ColorGrid from "./components/ColorGrid";
import { Color } from "./type/type";

function App() {
  const handleColorSelect = (color: Color) => {
    console.log("Selected color:", color);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">色彩调色板</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <ColorGrid onColorSelect={handleColorSelect} />
      </div>
    </div>
  );
}

export default App;
