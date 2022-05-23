import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { id },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        userId: user?.id,
        postId: +id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({ ok: true, post, isWondering });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
