import { Color } from "../type/type";

// 将 sRGB 值转换为相对亮度
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// 计算两个颜色之间的 WCAG 对比度
export function calculateContrast(color1: Color, color2: Color): number {
  const l1 = getLuminance(color1.r, color1.g, color1.b);
  const l2 = getLuminance(color2.r, color2.g, color2.b);

  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// 计算颜色与白色和黑色的对比度
export function getColorContrast(color: Color): number {
  const whiteColor: Color = {
    r: 255,
    g: 255,
    b: 255,
    hex: "#FFFFFF",
    mode: color.mode,
    l: 100,
    c: 0,
    h: 0,
    within_sRGB: true,
    within_P3: true,
    within_Rec2020: true,
  };

  const blackColor: Color = {
    r: 0,
    g: 0,
    b: 0,
    hex: "#000000",
    mode: color.mode,
    l: 0,
    c: 0,
    h: 0,
    within_sRGB: true,
    within_P3: true,
    within_Rec2020: true,
  };

  const whiteContrast = calculateContrast(color, whiteColor);
  const blackContrast = calculateContrast(color, blackColor);

  return Math.max(whiteContrast, blackContrast);
}
