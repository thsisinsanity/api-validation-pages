import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "CheckLicensed";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9fafb",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: "64px",
            height: "6px",
            backgroundColor: "#059669",
            borderRadius: "3px",
            marginBottom: "40px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? "44px" : "52px",
            fontWeight: "700",
            color: "#111827",
            lineHeight: "1.2",
            maxWidth: "900px",
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {/* Shield logo */}
          <div
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#059669",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>✓</div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "600", color: "#374151" }}>
            CheckLicensed
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "18px",
              color: "#9ca3af",
            }}
          >
            checklicensed.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
