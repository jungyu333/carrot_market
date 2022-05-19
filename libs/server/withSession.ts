import { withIronSessionApiRoute } from "iron-session/next";

const cookieOption = {
  cookieName: "carrotsession",
  password:
    "UdQ%(%xeUsQ=)Y9LeX6>kcuhv$k$Afquh8sdgwerewefwegvsghwrrwer52141241232131252",
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
