import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password, token } = req.body;

  if (token) {
    const exists = await client.token.findUnique({
      where: {
        payload: token,
      },
      include: {
        user: true,
      },
    });
    if (!exists)
      return res.json({ ok: false, message: "token is not correct" });
    req.session.user = {
      id: exists?.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
      where: {
        userId: exists.userId,
      },
    });
    res.json({ ok: true, message: "token is correct" });
  }

  if (email && password) {
    const exists = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!exists) return res.json({ ok: true, message: "email is not correct" });
    if (exists?.password !== password)
      return res.json({ ok: false, message: "password is not correct" });

    req.session.user = {
      id: exists.id,
    };
    await req.session.save();
    res.json({ ok: true, message: "email is correct" });
  }
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "1364139846912846128946128923523523523523524435345344619",
});
