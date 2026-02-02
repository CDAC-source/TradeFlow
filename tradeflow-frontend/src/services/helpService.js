const API_BASE = "https://localhost:7007"; // 👈 use your actual port

export async function getHelpContent() {
  const res = await fetch(`${API_BASE}/help`);

  if (!res.ok) {
    throw new Error("Failed to load help content");
  }

  return res.json();
}
