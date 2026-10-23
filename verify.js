export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.PAYSTACK_SECRET_KEY) return res.status(500).json({ error: "PAYSTACK_SECRET_KEY is not configured" });

  const reference = req.query?.reference;
  if (!reference) return res.status(400).json({ error: "Missing payment reference" });

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: "Payment verification failed" });
  }
}
