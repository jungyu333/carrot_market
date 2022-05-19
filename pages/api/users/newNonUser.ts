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
  // if (email) {
  //   const sendEmail = await transporter
  //     .sendMail({
  //       from: `Carrot Market`,
  //       to: email,
  //       subject: "token",
  //       text: `your login token is ${payload}`,
  //       html: `
  //       <div style="text-align: center;">
  //         <h3 style="color: #FA5882">Carrot Market</h3>
  //         <br />
  //         <p>your login token is ${payload}</p>
  //       </div>
  //   `,
  //     })
  //     .then((result: any) => console.log(result))
  //     .catch((err: any) => console.log(err));
  // }

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
