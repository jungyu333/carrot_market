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

  const sellProducts = await client.product.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      _count: {
        select: {
          favorite: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    sellProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
