import {
  getEntities,
  getNearbyLocations,
  LocationType,
  updateEntity,
} from "./yext";

export type NearbyConfig = {
  entityTypes: string[];
  maxNearbyLocations: number;
  fieldApiName: string;
};

export const syncSelectedLocation = async (
  access_token: string,
  { maxNearbyLocations, fieldApiName, entityTypes }: NearbyConfig,
  location: LocationType
) => {
  try {
    const { locations: nearbyLocations } = await getNearbyLocations(
      access_token,
      entityTypes,
      location.geocodedCoordinate
    );

    await updateEntity(access_token, location.meta.id, {
      [fieldApiName]: nearbyLocations
        .filter((nb) => nb.meta.uid !== location.meta.uid)
        .filter((_, i) => i < maxNearbyLocations)
        .map((l) => l.meta.id),
    });
    return true;
  } catch (e) {
    console.log("Unable to Sync Location");
    return false;
  }
};

export const syncAllLocations = async (
  access_token: string,
  config: NearbyConfig
) => {
  let entitiesRes = await getEntities(access_token, config.entityTypes);
  let totalLocationsUpdated = 0;
  do {
    const locations = entitiesRes.entities as LocationType[];
    await Promise.all(
      locations.map(async (l) => {
        const success = await syncSelectedLocation(access_token, config, l);
        if (success) {
          totalLocationsUpdated += 1;
          console.log("Successly Updated");
        }
      })
    );
    if (entitiesRes.nextPage) {
      entitiesRes = await entitiesRes.nextPage();
    } else {
      entitiesRes = undefined;
    }
  } while (entitiesRes);

  console.log(totalLocationsUpdated);
  return totalLocationsUpdated;
};
