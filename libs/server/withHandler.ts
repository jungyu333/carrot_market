import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface configtype {
  method: "POST" | "GET" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
}

export default function withHandler({ method, handler }: configtype) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(404).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
