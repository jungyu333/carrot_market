import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "POST" | "GET" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(404).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
