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
      res.json({ ok: false, message: "existed email" });
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
      console.log(user);
      res.json({ ok: true, message: "created account", user });
    }
  }

  // user = await client.user.upsert({
  //   where: {
  //     email: email,
  //   },
  //   create: {
  //     name,
  //     password,
  //     phone: +phone,
  //     email,
  //     introduce,
  //   },
  //   update: {},
  // });
}

export default withHandler("POST", handler);
