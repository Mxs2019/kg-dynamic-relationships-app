import { NextApiRequest, NextApiResponse } from "next";
import { syncAllLocations } from "../../syncNearbyLocations";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { access_token, appSpecificAccountId, accountName } = req.cookies;
  if (access_token) {
    const totalLocationsUpdated = await syncAllLocations(
      access_token as string
    );
    res.json({ totalLocationsUpdated });
  }
  res.json({});
};
