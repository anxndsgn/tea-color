export enum spaceName {
  oklch = "oklch",
}

export type Palette = {
  mode: spaceName;
  name: string;
  hues: string[];
  tones: string[];
  colors: Color[][];
};

export type Color = {
  mode: spaceName;
  l: number;
  c: number;
  h: number;
  r: number;
  g: number;
  b: number;
  hex: string;
  within_sRGB: boolean;
  within_P3: boolean;
  within_Rec2020: boolean;
};
