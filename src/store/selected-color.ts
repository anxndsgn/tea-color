import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Color } from "../type/type";

interface SelectionState {
  selectedColor: Color | null;
  selectedHueIndex: number | null;
  selectedToneIndex: number | null;
  setSelectedColor: (
    color: Color | null,
    hueIndex: number | null,
    toneIndex: number | null,
  ) => void;
  clearSelection: () => void;
}

export const selectionStore = create<SelectionState>()(
  devtools(
    (set) => ({
      selectedColor: null,
      selectedHueIndex: null,
      selectedToneIndex: null,
      setSelectedColor: (color, hueIndex, toneIndex) =>
        set({
          selectedColor: color,
          selectedHueIndex: hueIndex,
          selectedToneIndex: toneIndex,
        }),
      clearSelection: () =>
        set({
          selectedColor: null,
          selectedHueIndex: null,
          selectedToneIndex: null,
        }),
    }),
    {
      name: "Selection Store",
    },
  ),
);
