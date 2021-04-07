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
  const [lastSyncMessage, setLastSyncMessage] = useState<string>();
  const syncNearbyLocations = async () => {
    setIsSyncing(true);
    const res = await axios.post("/api/updateAllLocations");
    setIsSyncing(false);
    setLastSyncMessage(`${res.data.totalLocationsUpdated} Locations Updated`);
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

        {!isSyncing && (
          <button onClick={syncNearbyLocations} className="mt-4">
            Sync Nearby Locations
          </button>
        )}
        {isSyncing && <div>Syncing...</div>}
        {!isSyncing && lastSyncMessage && (
          <div className="text-green-700 border border-green-200 bg-green-50 py-1 px-2 rounded-sm w-full mt-4 text-center">
            {lastSyncMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedIn;
