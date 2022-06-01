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

  const cartProducts = await client.cart.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          avatar: true,
          price: true,
          user: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    cartProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
