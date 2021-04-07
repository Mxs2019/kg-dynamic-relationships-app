import { NextApiRequest, NextApiResponse } from "next";
import { syncAllLocations } from "../../syncNearbyLocations";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const config = req.body;
  console.log(req.body);
  const { access_token, appSpecificAccountId, accountName } = req.cookies;
  if (access_token) {
    const totalLocationsUpdated = await syncAllLocations(
      access_token as string,
      config
    );
    console.log(totalLocationsUpdated);
    res.json({ totalLocationsUpdated });
  } else {
    res.send(400);
  }
};
