import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PWD,
  },
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (email) {
    const token = await client.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              name: "Anonymous",
              email,
              password: "111111",
            },
          },
        },
      },
    });
    return res.json({ ok: true });
  } else if (!email) {
    return res.json({ ok: false });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
