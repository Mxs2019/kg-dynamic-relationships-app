import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const baseURL = process.env.BASE_URL;
  const clientId = process.env.CLIENT_ID;
  const redirectURI = `${baseURL}/api/auth/redirect`;
  res.redirect(
    `https://www.yext.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&state=${redirectURI}`
  );
};
