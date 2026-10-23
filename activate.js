export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const required = ["HOTSPOT_TYPE", "HOTSPOT_HOST", "HOTSPOT_USERNAME", "HOTSPOT_PASSWORD"];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    return res.status(501).json({
      error: "Hotspot integration is not configured",
      missing
    });
  }

  // Router-specific activation must be implemented for the exact hotspot model/API.
  return res.status(501).json({
    error: "Router adapter not configured",
    hotspotType: process.env.HOTSPOT_TYPE
  });
}
