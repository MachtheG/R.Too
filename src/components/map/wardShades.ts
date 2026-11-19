// Sequential laterite ramp, light → dark. Verified contrast (WCAG):
// steps 0–3 carry ink text (≥ 6.2:1); step 4 carries mist text (5.3:1).
const ramp = ["#efd9cf", "#dcb09e", "#cf9a84", "#c88a72", "#a4472c"];

export function shadeFor(value: number, min: number, max: number) {
  const i = max === min ? ramp.length - 1 : Math.round(((value - min) / (max - min)) * (ramp.length - 1));
  return { fill: ramp[i], text: i === ramp.length - 1 ? "#f4f1ea" : "#16181a" };
}

export const legendRamp = ramp;
