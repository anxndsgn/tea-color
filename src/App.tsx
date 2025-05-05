import ColorGrid from "./components/color-grid";
import { Color } from "./type/type";

function App() {
  const handleColorSelect = (color: Color) => {
    console.log("Selected color:", color);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        <ColorGrid onColorSelect={handleColorSelect} />
      </div>
    </div>
  );
}

export default App;
