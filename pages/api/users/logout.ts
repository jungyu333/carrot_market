import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  req.session.destroy();
  if (!req.session.user) {
    return res.json({ ok: true });
  } else {
    return res.json({ ok: false });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
