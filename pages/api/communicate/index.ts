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
  const postCount = await client.post.count();
  const posts = await client.post.findMany({
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

  res.json({ ok: true, posts, pages: Math.ceil(postCount / 10) });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
