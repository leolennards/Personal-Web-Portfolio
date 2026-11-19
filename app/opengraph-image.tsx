import { ImageResponse } from "next/og";

export const alt = "Leo Lennards · IT Support & Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#04060a",
          color: "#e6edf3",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8b98a8" }}>
          <span style={{ color: "#3dff9a" }}>LEO//OS</span>
          <span style={{ marginLeft: 20 }}>· STATUS: OPEN TO OPPORTUNITIES</span>
        </div>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 700, letterSpacing: -6, marginTop: 30 }}>
          Leo Lennards<span style={{ color: "#3dff9a" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#8b98a8", marginTop: 20 }}>
          IT Support · Microsoft 365 · Entra ID · Security
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#3dff9a", marginTop: 14 }}>Cape Town, South Africa</div>
      </div>
    ),
    size,
  );
}
