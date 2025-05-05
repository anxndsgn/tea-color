import React from "react";
import { useStore } from "zustand";
import { paletteStore } from "../store/palette";
import { Color } from "../type/type";
import { getColorContrast } from "../lib/color-contrast";
import { Input } from "./ui/input";
import { selectionStore } from "@/store/selected-color";

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
      className={`relative flex aspect-square w-full cursor-pointer items-center justify-center transition-all duration-200 ${isSelected ? "scale-105" : ""} `}
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

interface EditableLabelProps {
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  className?: string;
}

const EditableLabel: React.FC<EditableLabelProps> = ({
  value,
  isEditing,
  onEdit,
  onSave,
  className,
}) => {
  const [editValue, setEditValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(editValue);
    } else if (e.key === "Escape") {
      setEditValue(value);
      onSave(value);
    }
  };

  const handleBlur = () => {
    onSave(editValue);
  };

  if (isEditing) {
    return (
      <div className={`relative flex h-6 items-center ${className}`}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="absolute inset-0 h-6 min-w-[60px] border-0 p-0 text-center text-sm font-medium text-gray-500 focus-visible:ring-1 focus-visible:ring-offset-0"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      onClick={onEdit}
      className={`flex h-6 cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-gray-700 ${className}`}
    >
      {value}
    </div>
  );
};

interface ColorGridProps {
  onColorSelect?: (color: Color) => void;
}

const ColorGrid: React.FC<ColorGridProps> = ({ onColorSelect }) => {
  const { colors, hues, tones, updateHue, updateTone } = useStore(paletteStore);
  const { selectedColor, setSelectedColor } = useStore(selectionStore);
  const [editingHueIndex, setEditingHueIndex] = React.useState<number | null>(
    null,
  );
  const [editingToneIndex, setEditingToneIndex] = React.useState<number | null>(
    null,
  );

  const handleHueEdit = (index: number) => {
    setEditingHueIndex(index);
  };

  const handleToneEdit = (index: number) => {
    setEditingToneIndex(index);
  };

  const handleHueSave = (index: number, value: string) => {
    updateHue(index, value);
    setEditingHueIndex(null);
  };

  const handleToneSave = (index: number, value: string) => {
    updateTone(index, value);
    setEditingToneIndex(null);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* 色调标题行 */}
        <div className="mb-1 grid grid-cols-[100px_repeat(10,1fr)] gap-1">
          <div className="flex h-6 items-center text-sm font-medium text-gray-500">
            色相 \ 色调
          </div>
          {tones.map((tone, index) => (
            <EditableLabel
              key={index}
              value={tone}
              isEditing={editingToneIndex === index}
              onEdit={() => handleToneEdit(index)}
              onSave={(value) => handleToneSave(index, value)}
              className="justify-center text-center"
            />
          ))}
        </div>

        {/* 颜色网格 */}
        {colors.map((row, rowIndex) => (
          <div
            key={hues[rowIndex]}
            className="mb-1 grid grid-cols-[100px_repeat(10,1fr)]"
          >
            <EditableLabel
              value={hues[rowIndex]}
              isEditing={editingHueIndex === rowIndex}
              onEdit={() => handleHueEdit(rowIndex)}
              onSave={(value) => handleHueSave(rowIndex, value)}
              className="justify-start"
            />
            {row.map((color, colIndex) => (
              <ColorCell
                key={`${rowIndex}-${colIndex}`}
                color={color}
                isSelected={selectedColor === color}
                onClick={() => {
                  setSelectedColor(color, rowIndex, colIndex);
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
