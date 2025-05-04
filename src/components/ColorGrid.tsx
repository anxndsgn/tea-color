import React from "react";
import { useStore } from "zustand";
import { paletteStore } from "../store/palette";
import { Color } from "../type/type";
import { getColorContrast } from "../utils/colorContrast";

interface ColorCellProps {
  color: Color;
  isSelected?: boolean;
  onClick?: () => void;
}

const ColorCell: React.FC<ColorCellProps> = ({
  color,
  isSelected,
  onClick,
}) => {
  const contrast = getColorContrast(color);

  return (
    <div
      onClick={onClick}
      className={`relative flex aspect-square w-full cursor-pointer items-center justify-center transition-all duration-200 ${isSelected ? "ring-2 ring-blue-500" : ""} `}
      style={{
        backgroundColor: color.hex,
      }}
    >
      <span
        className={`font-mono text-sm ${contrast > 4.5 ? "text-white" : "text-black"} `}
      >
        {contrast.toFixed(2)}
      </span>
    </div>
  );
};

interface ColorGridProps {
  onColorSelect?: (color: Color) => void;
}

const ColorGrid: React.FC<ColorGridProps> = ({ onColorSelect }) => {
  const { colors, hues, tones } = useStore(paletteStore);
  const [selectedColor, setSelectedColor] = React.useState<Color | null>(null);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* 色调标题行 */}
        <div className="mb-1 grid grid-cols-[100px_repeat(10,1fr)] gap-1">
          <div className="text-sm font-medium text-gray-500">色相 \ 色调</div>
          {tones.map((tone) => (
            <div
              key={tone}
              className="text-center text-sm font-medium text-gray-500"
            >
              {tone}
            </div>
          ))}
        </div>

        {/* 颜色网格 */}
        {colors.map((row, rowIndex) => (
          <div
            key={hues[rowIndex]}
            className="mb-1 grid grid-cols-[100px_repeat(10,1fr)] gap-1"
          >
            <div className="flex items-center text-sm font-medium text-gray-500">
              {hues[rowIndex]}
            </div>
            {row.map((color, colIndex) => (
              <ColorCell
                key={`${rowIndex}-${colIndex}`}
                color={color}
                isSelected={selectedColor === color}
                onClick={() => {
                  setSelectedColor(color);
                  onColorSelect?.(color);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorGrid;
