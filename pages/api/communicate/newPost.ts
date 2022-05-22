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
    body: { title, question },
  } = req;

  const newPost = await client.post.create({
    data: {
      title,
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
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
  console.log(newPost);
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
