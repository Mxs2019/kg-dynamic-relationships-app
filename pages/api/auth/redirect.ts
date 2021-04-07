import axios from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = process.env.BASE_URL;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.API_KEY;

  const code = req.query.code;
  const redirect_uri = req.query.state;
  if (code && redirect_uri) {
    const authRes = await axios.post(
      "https://api.yext.com/oauth2/accesstoken",
      qs.stringify({
        client_id,
        client_secret,
        code,
        redirect_uri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, appSpecificAccountId, accountName } = authRes.data;
    res.setHeader("Set-Cookie", [
      serialize("access_token", access_token, { path: "/" }),
      serialize("appSpecificAccountId", appSpecificAccountId, { path: "/" }),
      serialize("accountName", accountName, { path: "/" }),
    ]);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
};
