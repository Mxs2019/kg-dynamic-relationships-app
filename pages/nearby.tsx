import { Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";

const { Option } = Select;

const entityTypeOptions = [
  "location",
  "event",
  "healthcareFacility",
  "healthcareProfessional",
  "atm",
  "restaurant",
];

const defaultEntityType = ["location"];
const defaultFieldApiName = "c_nearbyLocations";
const defaultMaxNeabyLocations = 5;

export default function Home() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncMessage, setLastSyncMessage] = useState<string>();

  const [entityTypes, setEntityTypes] = useState(defaultEntityType);
  const [maxNearbyLocations, setMaxNearbyLocations] = useState(
    defaultMaxNeabyLocations
  );
  const [fieldApiName, setFieldApiName] = useState(defaultFieldApiName);

  const syncNearbyLocations = async () => {
    setIsSyncing(true);
    const res = await axios.post("/api/updateAllLocations", {
      entityTypes,
      maxNearbyLocations,
      fieldApiName,
    });
    setIsSyncing(false);
    setLastSyncMessage(`${res.data.totalLocationsUpdated} Locations Updated`);
  };

  return (
    <div>
      <div className="">
        <BreadCrumbs>Nearby Locations</BreadCrumbs>
        <h1>Nearby Locations</h1>
        <p>
          Use this dynamic relationship to automatically add nearby locations to
          each location-like entity in the platform.
        </p>
        <form>
          <label>Entity Types</label>
          <Select
            mode="tags"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select which entity types to manage"
            defaultValue={defaultEntityType}
            value={entityTypes}
            onChange={(e) => setEntityTypes(e)}
          >
            {entityTypeOptions.map((o) => (
              <Option key={o} value={o}>
                {o}
              </Option>
            ))}
          </Select>
          <label>Maximum Nearby Locations</label>
          <InputNumber
            min={1}
            max={10}
            defaultValue={defaultMaxNeabyLocations}
            value={maxNearbyLocations}
            onChange={(e) => setMaxNearbyLocations(e)}
          />
          <label>Field API Name to Update</label>
          <Input
            placeholder="Basic usage"
            defaultValue={defaultFieldApiName}
            value={fieldApiName}
            onChange={(e) => setFieldApiName(e.target.value)}
          />
        </form>

        {isSyncing && <div className="mt-2">Syncing...</div>}
        {!isSyncing && lastSyncMessage && (
          <div className="text-green-700 border border-green-200 bg-green-50 py-1 px-2 rounded-sm w-full mt-4 text-center">
            {lastSyncMessage}
          </div>
        )}
        {!isSyncing && (
          <button onClick={syncNearbyLocations} className="mt-4 w-full">
            Sync Nearby Locations
          </button>
        )}
      </div>
    </div>
  );
}
