import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";

export const alt = "Robert Too: A New Chapter for Sotik";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  en: { head: "A New Chapter for Sotik.", sub: "Sura Mpya kwa Sotik.", meta: "SOTIK · MEMBER OF PARLIAMENT · 10 AUG 2027" },
  sw: { head: "Sura Mpya kwa Sotik.", sub: "A New Chapter for Sotik.", meta: "SOTIK · MBUNGE · 10 AGO 2027" },
};

/** Share card in Preset A: mist background, gold kicker rule, ink headline, the candidate's portrait. */
export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = locale === "sw" ? copy.sw : copy.en;
  const portrait = await readFile(join(process.cwd(), "public/images/portrait/robert-too-portrait-lapel.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: tokens.mist, color: tokens.ink }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 3, color: tokens.primary, fontWeight: 600 }}>
            <div style={{ width: 48, height: 5, borderRadius: 3, background: tokens.accent }} />
            {c.meta}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, lineHeight: 1.02, fontWeight: 700, letterSpacing: -1 }}>{c.head}</div>
            <div style={{ fontSize: 34, marginTop: 20, color: tokens.primary, fontStyle: "italic" }}>{c.sub}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 40, fontWeight: 700 }}>Robert Too</div>
            <div style={{ display: "flex", background: tokens.accent, color: tokens.ink, borderRadius: 6, padding: "8px 20px", fontSize: 22, fontWeight: 600 }}>UDA</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, padding: "40px 48px 40px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={src} alt="" width={392} height={550} style={{ width: 392, height: 550, objectFit: "cover", objectPosition: "50% 20%", borderRadius: 12 }} />
        </div>
      </div>
    ),
    size,
  );
}
