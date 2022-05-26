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

  const favProducts = await client.favorite.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          user: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              favorite: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    favProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
