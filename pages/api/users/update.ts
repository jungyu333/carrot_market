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
    body: { name, email, phone, introduce },
  } = req;

  if (email) {
    const existeduser = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existeduser) {
      return res.json({ ok: false, message: "existed email" });
    }
    if (!existeduser) {
      const updateUser = await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
          email,
          phone,
          introduce,
        },
      });
      console.log(updateUser);
      res.json({ ok: true, message: "updated account" });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
