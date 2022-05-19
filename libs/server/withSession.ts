import { withIronSessionApiRoute } from "iron-session/next";

const cookieOption = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PWD!,
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOption);
}
