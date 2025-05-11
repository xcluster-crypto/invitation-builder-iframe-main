import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // Pastikan REDIS_URL diatur di .env

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, attending, guests, message } = req.body;

      // Validasi input
      if (!name || !attending) {
        return res.status(400).json({ error: "Name and attending status are required." });
      }

      // Simpan data RSVP ke Redis
      const rsvpData = { name, email, phone, attending, guests, message };
      await redis.lpush("rsvp_list", JSON.stringify(rsvpData));

      return res.status(200).json({ message: "RSVP saved successfully." });
    } catch (error) {
      console.error("Error saving RSVP:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}