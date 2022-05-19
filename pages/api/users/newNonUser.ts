import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            phone: +phone,
          },
          create: {
            name: "Anonymous",
            phone: +phone,
            password: "111111",
          },
        },
      },
    },
  });
  console.log(token);
  return res.status(200).end();
}

export default withHandler("POST", handler);
