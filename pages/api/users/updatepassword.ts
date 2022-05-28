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
    body: { currentPassword, newPassword, checkPassword },
  } = req;
  const currentUser = await client.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      password: true,
    },
  });

  if (currentPassword !== currentUser?.password) {
    return res.json({ ok: false, message: "password is not correct" });
  }
  if (newPassword !== checkPassword) {
    return res.json({ ok: false, message: "password is not equal" });
  } else {
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        password: newPassword,
      },
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
