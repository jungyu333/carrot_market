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
    body: { answer },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id,
    },
  });

  if (!post) return res.json({ ok: false });
  const newAnswer = await client.answer.create({
    data: {
      answer,
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id,
        },
      },
    },
  });

  res.json({ ok: true, newAnswer });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
