import { NextApiRequest, NextApiResponse } from "next";
import { getAllEntities } from "../../yext";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const config = req.body;
  console.log(req.body);
  const { access_token, appSpecificAccountId, accountName } = req.cookies;
  if (access_token) {
    const entitiesRes = await getAllEntities(access_token);
    res.send(entitiesRes);
  } else {
    res.send(400);
  }
};
