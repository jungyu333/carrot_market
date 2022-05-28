import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, phone, introduce, avatarId },
  } = req;

  if (avatarId) {
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name,
        phone,
        introduce,
        avatar: avatarId,
      },
    });
  } else if (avatarId === "") {
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name,
        phone,
        introduce,
        avatar: "",
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
