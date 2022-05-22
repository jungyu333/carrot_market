import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const products = await client.product.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
  res.json({ ok: true, products });
}

export default withApiSession(
  withHandler({
    method: "GET",
    handler,
  })
);
