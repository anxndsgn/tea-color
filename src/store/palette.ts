import { Palette, spaceName, Color } from "../type/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// hue: row
// tone: column
// color array: row * column
const initialPalette: Palette = {
  mode: spaceName.oklch,
  name: "initial",
  hues: ["Blue"],
  tones: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  colors: [
    [
      {
        mode: spaceName.oklch,
        r: 239,
        g: 246,
        b: 255,
        hex: "#EFF6FF",
        l: 96,
        c: 0.02,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 219,
        g: 234,
        b: 254,
        hex: "#DBEAFE",
        l: 91,
        c: 0.05,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 191,
        g: 219,
        b: 254,
        hex: "#BFDBFE",
        l: 85,
        c: 0.1,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 147,
        g: 197,
        b: 253,
        hex: "#93C5FD",
        l: 77,
        c: 0.15,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 96,
        g: 165,
        b: 250,
        hex: "#60A5FA",
        l: 67,
        c: 0.2,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 59,
        g: 130,
        b: 246,
        hex: "#3B82F6",
        l: 57,
        c: 0.25,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 37,
        g: 99,
        b: 235,
        hex: "#2563EB",
        l: 47,
        c: 0.28,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 29,
        g: 78,
        b: 216,
        hex: "#1D4ED8",
        l: 38,
        c: 0.3,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 30,
        g: 64,
        b: 175,
        hex: "#1E40AF",
        l: 31,
        c: 0.25,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
      {
        mode: spaceName.oklch,
        r: 30,
        g: 58,
        b: 138,
        hex: "#1E3A8A",
        l: 25,
        c: 0.2,
        h: 240,
        within_sRGB: true,
        within_P3: true,
        within_Rec2020: true,
      },
    ],
  ],
};

export const paletteStore = create<
  Palette & {
    setPalette: (palette: Palette) => void;
    setMode: (mode: spaceName) => void;
    setName: (name: string) => void;
    setHues: (hues: string[]) => void;
    setTones: (tones: string[]) => void;
    setColors: (colors: Color[][]) => void;
    updateHue: (index: number, value: string) => void;
    updateTone: (index: number, value: string) => void;
  }
>()(
  devtools(
    (set) => ({
      ...initialPalette,
      setPalette: (palette: Palette) => set({ ...palette }),
      setMode: (mode: spaceName) => set({ mode }),
      setName: (name: string) => set({ name }),
      setHues: (hues: string[]) => set({ hues }),
      setTones: (tones: string[]) => set({ tones }),
      setColors: (colors: Color[][]) => set({ colors }),
      updateHue: (index: number, value: string) =>
        set((state) => {
          const newHues = [...state.hues];
          newHues[index] = value;
          return { hues: newHues };
        }),
      updateTone: (index: number, value: string) =>
        set((state) => {
          const newTones = [...state.tones];
          newTones[index] = value;
          return { tones: newTones };
        }),
    }),
    {
      name: "Palette Store",
    },
  ),
);
