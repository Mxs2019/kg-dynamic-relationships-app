import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

type Props = {
  //Insert Props Here
  className?: string;
};

const LoggedIn = ({ className }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { access_token, accountName, appSpecificAccountId } = cookies;

  const [isSyncing, setIsSyncing] = useState(false);
  const syncNearbyLocations = async () => {
    setIsSyncing(true);
    const res = await axios.post("/api/updateAllLocations");
    setIsSyncing(false);
    console.log(res);
  };
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1>Knowledge Graph Dynamic Relationships</h1>
        <p>
          This app makes it easy to build dynamic relationships in the Knowledge
          Graph without manually keeping them up to date.
        </p>
        <div>{accountName}</div>
        <div>{access_token}</div>
        <button onClick={syncNearbyLocations}>Sync Nearby Locations</button>
      </div>
    </div>
  );
};

export default LoggedIn;
