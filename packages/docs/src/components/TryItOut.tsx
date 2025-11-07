import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";

interface TryItOutProps {
  endpoint: string;
  title?: string;
  defaultLimit?: number;
}

/**
 * 🔬 TryItOut - Theme-aware API tester for Datly Docs
 */
export default function TryItOut({
  endpoint,
  title = "Try It Out (Live API Test)",
  defaultLimit = 3,
}: TryItOutProps) {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode(); // 👈 detect dark/light theme

  const baseUrl = siteConfig.customFields?.apiBase ?? "http://localhost:3125";

  const [limit, setLimit] = useState<number>(defaultLimit);
  const [format, setFormat] = useState<string>("json");
  const [nulls, setNulls] = useState<boolean>(false);
  const [response, setResponse] = useState(
    "Click “Fetch Data” to preview response..."
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleFetch = async () => {
    if (!endpoint.startsWith("/")) {
      setResponse("❌ Invalid endpoint format. Use '/endpoint'.");
      return;
    }

    setLoading(true);
    setStatus("fetching");
    setResponse("⏳ Fetching data...");

    try {
      const qs = `?limit=${limit}&format=${encodeURIComponent(
        format
      )}&nulls=${nulls}`;
      const res = await fetch(`${baseUrl}${endpoint}${qs}`);
      const text = await res.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
      setResponse(JSON.stringify(data, null, 2));
      setStatus(res.ok ? "success" : "error");
    } catch (err: any) {
      console.log(err);

      setResponse(`❌ Error: ${err.message || "Request failed"}`);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  const statusColor =
    status === "success"
      ? "#22c55e"
      : status === "error"
      ? "#ef4444"
      : "#3b82f6";

  // 🎨 Adaptive theme styling
  const isDark = colorMode === "dark";
  const bg = isDark ? "#1f2937" : "#f9fafb";
  const border = isDark ? "#374151" : "#e5e7eb";
  const text = isDark ? "#f3f4f6" : "#111827";
  const preBg = isDark ? "#111827" : "#f3f4f6";

  return (
    <div
      style={{
        padding: "1.25rem",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "10px",
        marginTop: "1.5rem",
        fontFamily: "Inter, sans-serif",
        color: text,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.1rem",
            margin: 0,
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontSize: "0.8rem",
            color: statusColor,
            backgroundColor: isDark ? "#1e3a8a" : "#eef2ff",
            padding: "2px 8px",
            borderRadius: "6px",
            border: `1px solid ${statusColor}`,
          }}
        >
          {status === "idle"
            ? "Idle"
            : status === "fetching"
            ? "Fetching..."
            : status === "success"
            ? "Success"
            : "Error"}
        </span>
      </div>

      <label
        htmlFor="limit"
        style={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: 500,
          marginBottom: "0.4rem",
        }}
      >
        Records Limit
      </label>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          id="limit"
          type="tel"
          min={1}
          max={50}
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: `1px solid ${border}`,
            backgroundColor: isDark ? "#374151" : "#fff",
            color: text,
            width: "80px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          style={{
            padding: "8px 14px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {loading ? "Fetching..." : "Fetch Data"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: "0.75rem",
        }}
      >
        <label style={{ fontSize: "0.85rem", color: text }}>Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: `1px solid ${border}`,
          }}
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginLeft: "8px",
            fontSize: "0.9rem",
          }}
        >
          <input
            type="checkbox"
            checked={nulls}
            onChange={(e) => setNulls(e.target.checked)}
          />
          Inject nulls
        </label>
      </div>

      <pre
        style={{
          background: preBg,
          color: text,
          padding: "1rem",
          marginTop: "1rem",
          borderRadius: "8px",
          fontSize: "0.9rem",
          overflowX: "auto",
          position: "relative",
          maxHeight: "500px",
        }}
      >
        <button
          onClick={handleCopy}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            fontSize: "0.75rem",
            background: isDark ? "#374151" : "#e5e7eb",
            border: "none",
            borderRadius: "4px",
            padding: "3px 7px",
            cursor: "pointer",
          }}
        >
          Copy
        </button>
        {response}
      </pre>
    </div>
  );
}
