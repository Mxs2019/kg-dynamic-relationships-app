import {
  getEntities,
  getNearbyLocations,
  LocationType,
  updateEntity,
} from "./yext";

const maxLength = 5;

export const syncSelectedLocation = async (
  access_token: string,
  location: LocationType
) => {
  try {
    const { locations: nearbyLocations } = await getNearbyLocations(
      access_token,
      location.geocodedCoordinate
    );

    await updateEntity(location.meta.id, {
      c_nearbyLocations: nearbyLocations
        .filter((nb) => nb.meta.uid !== location.meta.uid)
        .filter((_, i) => i < maxLength)
        .map((l) => l.meta.id),
    });
    console.log(`Added Nearby Locations to ${location.meta.id}`);
  } catch (e) {
    console.log(e);
    console.log("Nearby Location Error");
  }
};

export const syncAllLocations = async (access_token: string) => {
  let entitiesRes = await getEntities(access_token, "location");
  let totalLocationsUpdated = 0;
  do {
    const locations = entitiesRes.entities as LocationType[];
    locations.forEach(async (l) => {
      totalLocationsUpdated += 1;
      syncSelectedLocation(access_token, l);
    });
    if (entitiesRes.nextPage) {
      entitiesRes = await entitiesRes.nextPage();
      console.log("Getting Next Page");
    } else {
      entitiesRes = undefined;
    }
  } while (entitiesRes);

  return totalLocationsUpdated;
};
