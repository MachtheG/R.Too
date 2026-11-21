// Sequential green ramp, light → dark, for registered voters per ward. Verified contrast (WCAG):
// steps 0–3 carry black text (≥ 7:1); step 4 carries white text (≥ 6.5:1).
const ramp = ["#e4f2e7", "#c3e3cb", "#97cda5", "#5fae78", "#1d6b38"];

export function shadeFor(value: number, min: number, max: number) {
  const i = max === min ? ramp.length - 1 : Math.round(((value - min) / (max - min)) * (ramp.length - 1));
  return { fill: ramp[i], text: i === ramp.length - 1 ? "#ffffff" : "#0a0a0a" };
}

/** Selected ward: UDA yellow with black text. */
export const SELECTED = { fill: "#ffcc00", text: "#0a0a0a" };

export const legendRamp = ramp;
