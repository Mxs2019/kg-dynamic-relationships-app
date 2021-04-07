import axios from "axios";
const v = "20210101";

const rootURL = `https://api.yext.com/v2/accounts/me`;

const yextApi = axios.create({
  baseURL: "https://api.yext.com/v2/accounts/me",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
  params: {
    v,
  },
});

export type LocationType = {
  name: string;
  geocodedCoordinate: {
    latitude: number;
    longitude: number;
  };
  meta: {
    uid: string;
    id: string;
  };
  address: {
    line1: string;
    line2: string;
  };
};

export type EntitiesResponse = {
  count: number;
  entities: object[];
  nextPage?: () => Promise<EntitiesResponse>;
};

export const getEntities = async (
  access_token: string,
  entityTypes: string[],
  pageToken?: string
): Promise<EntitiesResponse> => {
  const res = await yextApi.get("/entities", {
    params: { access_token, pageToken, entityTypes: entityTypes.join(",") },
  });

  const response: EntitiesResponse = {
    count: res.data.response.count,
    entities: res.data.response.entities as object[],
  };

  if (res.data.response.pageToken) {
    console.log("Adding Next Page");
    response.nextPage = () =>
      getEntities(access_token, entityTypes, res.data.response.pageToken);
  }
  return response;
};

export type LocationsResponse = {
  count: number;
  locations: LocationType[];
  nextPage?: () => Promise<LocationsResponse>;
};

export const getNearbyLocations = async (
  access_token: string,
  entityTypes: string[],
  cooridinates: {
    latitude: number;
    longitude: number;
  }
) => {
  const { latitude, longitude } = cooridinates;
  try {
    const res = await axios.get(
      `https://liveapi.yext.com/v2/accounts/me/entities/geosearch`,
      {
        params: {
          access_token,
          v,
          location: `${latitude}, ${longitude}`,
          entityTypes: entityTypes.join(","),
        },
      }
    );
    return {
      locations: res.data.response.entities as LocationType[],
    };
  } catch (e) {
    throw e;
    // console.log(e);
  }
};

export const updateEntity = (
  access_token: string,
  entityId: string,
  update: object
) => {
  return yextApi.put(`/entities/${entityId}`, update, {
    params: { access_token },
  });
};

export const createNearbyLocationsCustomField = async (
  access_token: string,
  entityTypes: string[]
) => {
  yextApi.post(
    `/customfields`,
    {
      name: {
        value: "Nearby Locations",
      },
      id: "c_nearbyLocations",
      type: "ENTITY_LIST",
      entityAvailability: entityTypes,
    },
    { params: { access_token } }
  );
};
