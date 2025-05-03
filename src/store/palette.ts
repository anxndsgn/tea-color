import { Palette, spaceName, Color } from "../type/type";
import { create } from "zustand";

const initialPalette: Palette = {
  mode: spaceName.oklch,
  name: "initial",
  hues: ["Hue1"],
  tones: ["100"],
  colors: [
    [
      {
        mode: spaceName.oklch,
        r: 0,
        g: 0,
        b: 0,
        hex: "#000000",
        l: 0,
        c: 0,
        h: 0,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
    ],
  ],
};

export const paletteStore = create<Palette>((set) => ({
  ...initialPalette,
  setPalette: (palette: Palette) => set({ ...palette }),
  setMode: (mode: spaceName) => set({ mode }),
  setName: (name: string) => set({ name }),
  setHues: (hues: string[]) => set({ hues }),
  setTones: (tones: string[]) => set({ tones }),
  setColors: (colors: Color[][]) => set({ colors }),
}));
