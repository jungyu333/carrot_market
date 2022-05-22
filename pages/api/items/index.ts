import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { page },
  } = req;
  const productCount = await client.product.count();
  const products = await client.product.findMany({
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    take: 10,
    skip: (+page - 1) * 10,
  });
  res.json({ ok: true, products, pages: Math.ceil(productCount / 10) });
}

export default withApiSession(
  withHandler({
    method: "GET",
    handler,
  })
);
