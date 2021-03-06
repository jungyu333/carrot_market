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
          id: true,
        },
      },
      answer: {
        select: {
          answer: true,
          createdAt: true,
          id: true,

          user: {
            select: {
              avatar: true,
              name: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          answer: true,
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
