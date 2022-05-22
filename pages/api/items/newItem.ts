import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  if (isNaN(price)) {
    return res.json({ ok: false });
  }

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      avatar: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
