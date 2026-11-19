import { ImageResponse } from "next/og";

export const alt = "Robert Too: A New Chapter for Sotik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  en: { head: "A New Chapter for Sotik.", sub: "Sura Mpya kwa Sotik.", meta: "SOTIK · MEMBER OF PARLIAMENT · 10 AUG 2027" },
  sw: { head: "Sura Mpya kwa Sotik.", sub: "A New Chapter for Sotik.", meta: "SOTIK · MBUNGE · 10 AGO 2027" },
};

/** Share card: Ledger palette, tea-row stripe on the right where the portrait will go. */
export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = locale === "sw" ? copy.sw : copy.en;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F4F1EA", color: "#16181A" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 780 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#A4472C" }}>{c.meta}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, lineHeight: 1, color: "#1F3D2B", fontFamily: "serif" }}>{c.head}</div>
            <div style={{ fontSize: 36, marginTop: 20, color: "#3E6B4A", fontStyle: "italic", fontFamily: "serif" }}>{c.sub}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 40, fontFamily: "serif", color: "#1F3D2B" }}>Robert Too</div>
            <div style={{ display: "flex", background: "#F2C200", borderRadius: 999, padding: "8px 20px", fontSize: 22 }}>UDA</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, backgroundImage: "repeating-linear-gradient(-32deg, #1F3D2B 0px, #1F3D2B 3px, #2A4D37 3px, #2A4D37 20px)" }} />
      </div>
    ),
    size,
  );
}
