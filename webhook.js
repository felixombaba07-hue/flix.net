import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  if (!process.env.PAYSTACK_SECRET_KEY) return res.status(500).send("PAYSTACK_SECRET_KEY is not configured");

  const signature = req.headers["x-paystack-signature"];
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
  const expected = crypto.createHmac("sha512", process.env.PAYSTACK_SECRET_KEY).update(raw).digest("hex");

  if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return res.status(401).send("Invalid signature");
  }

  // Production flow: persist successful payment, then call the hotspot activation service.
  return res.status(200).json({ received: true });
}
