import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const deleteItemId = req.body;
  await client.product.delete({
    where: {
      id: deleteItemId,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
