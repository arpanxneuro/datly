---
id: examples
title: Example Integrations
sidebar_position: 4
---

# 🧰 Example Usage

Welcome to **Datly Integration Examples** — below are some practical snippets showing how to consume Datly’s mock JSON APIs across different environments.

---

## ⚛️ React Integration

Here’s a minimal React example that fetches and renders users from your local Datly API.

```tsx
import { useEffect, useState } from "react";

/**
 * Example component showcasing how to fetch mock data
 * from Datly's local API endpoint.
 */
export default function DatlyExample() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("
        https://datly.onrender.com/api/users?limit=3");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h3>👥 Users (via Datly API)</h3>
      <pre
        style={{
          background: "#f3f4f6",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.9rem",
        }}
      >
        {JSON.stringify(users, null, 2)}
      </pre>
    </section>
  );
}
```
