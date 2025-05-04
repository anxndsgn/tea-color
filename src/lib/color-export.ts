export function exportToToken(color: string) {
  return color.replace("#", "").toUpperCase();
}

export function exportToCssVariable(color: string) {
  return `--color-${color.replace("#", "").toLowerCase()}`;
}
