import { NextApiRequest, NextApiResponse } from "next";
import { yextApi } from "../../yext";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const config = req.body;
  console.log(config);

  const { access_token, appSpecificAccountId, accountName } = req.cookies;
  const { pageToken } = config;
  if (access_token) {
    console.log("Making API Request");
    const yextRes = await yextApi.get("/entities", {
      params: { access_token, pageToken, limit: 50 },
    });

    res.send(yextRes.data.response);
  } else {
    res.send(400);
  }
};
