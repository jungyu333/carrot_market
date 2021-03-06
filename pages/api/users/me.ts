import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const currentUser = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({ ok: true, currentUser });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
