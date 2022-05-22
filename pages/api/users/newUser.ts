import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

import client from "../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, phone, introduce, password } = req.body;

  let user;
  if (email) {
    user = await client.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.json({ ok: false, message: "existed email" });
    }
    if (!user) {
      console.log("did not found");
      user = await client.user.create({
        data: {
          name,
          introduce,
          email,
          phone: +phone,
          password,
        },
      });

      return res.json({ ok: true, message: "created account" });
    }
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
