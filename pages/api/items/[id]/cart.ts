import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const cartProduct = await client.cart.findFirst({
    where: {
      userId: user?.id,
      productId: +id,
    },
  });
  if (cartProduct) {
    return res.json({ ok: false });
  } else if (!cartProduct) {
    const newCartProduct = await client.cart.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id,
          },
        },
      },
    });

    return res.json({ ok: true, newCartProduct });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
