import faunadb, { query as q } from "faunadb";

const apiKey = process.env.FAUNA_API_KEY;
const client = new faunadb.Client({ secret: apiKey });

export type RelationshipConfig = {
  id: string;
  type: "NEARBY_LOCATIONS";
  access_token: string;
};

export type NewRelationshipConfig = Omit<RelationshipConfig, "id">;

const addConfig = (config: NewRelationshipConfig) => {
  client.query(
    q.Create(q.Collection("configs"), {
      data: config,
    })
  );
};

const fetchConfig = (id: string) => {};

export type Session = {
  id: string;
  access_token: string;
  appSpecificAccountId: string;
};

export type NewSession = Omit<Session, "id">;

const sessionsCollection = "sessions";

const addSession = (session: NewSession) => {
  client.query(
    q.Create(q.Collection(sessionsCollection), {
      data: session,
    })
  );
};

const fetchSession = (id: string) => {
  client.query(q.Get(q.Ref(q.Collection(sessionsCollection), id)));
};
