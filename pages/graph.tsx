import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { FaRedo } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";
import { yextApi } from "../yext";

export default function GraphViewer() {
  const [fetchingEntities, setFetchingEntities] = useState(false);

  const [entities, setEntities] = useState([]);
  const [selectedNode, setSelectedNode] = useState<any>(undefined);
  const [percentLoaded, setPercentLoaded] = useState(0);

  const getAllEntities = async () => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      const res = await yextApi.get("/entities", {
        params: { access_token },
      });

      const { entities, count, pageToken } = res.data;
      console.log(entities, count, pageToken);

      // setFetchingEntities(true);
      // setEntities([]);
      // setFetchingEntities(false);
      // if (res.data.entities) {
      //   setEntities(res.data.entities);
      // }
    }
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  const events = {
    click: (e) => {
      if (e.nodes.length > 0) {
        const nodeId = e.nodes[0];
        const entity = entities.find((e) => e.meta.id === nodeId);
        if (entity) {
          setSelectedNode(entity);
          console.log(entity);
        }
      } else {
        setSelectedNode(undefined);
      }
    },
  };

  const colors = [
    "#1D4ED8",
    "#6D28D9",
    "#BE185D",
    "#B91C1C",
    "#B45309",
    "#047857",
  ];

  const entityTypeColors = {};

  const nodes = (entities ?? []).map((e) => {
    const entityType = e.meta.entityType;
    let color: string = undefined;
    if (entityType in entityTypeColors) {
      color = entityTypeColors[entityType];
    } else {
      entityTypeColors[entityType] =
        colors[Object.keys(entityTypeColors).length];
      color = entityTypeColors[entityType];
    }

    return {
      id: e.meta.id,
      label: e.name,
      color: color ?? "blue",
      shape: "ellipse",
      font: {
        color: "white",
      },
    };
  });

  const nodeIds = nodes.map((n) => n.id);
  const edges = [];
  entities.forEach((e) => {
    Object.values(e).forEach((val) => {
      if (nodeIds.includes(val)) {
        edges.push({
          from: e.meta.id,
          to: val,
        });
      } else if (Array.isArray(val)) {
        val.forEach((v) => {
          if (nodeIds.includes(v)) {
            edges.push({
              from: e.meta.id,
              to: v,
            });
          }
        });
      }
    });
  });

  const graph = {
    nodes,
    edges,
  };

  useEffect(() => {
    getAllEntities();
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex items-center gap-2 mb-4">
          {!fetchingEntities && (
            <>
              <div className="flex gap-2 items-center border rounded py-1 px-2 bg-gray-100 text-gray-700">
                <div className="font-medium">Legend</div>
                {Object.keys(entityTypeColors).map((key) => (
                  <div
                    key={key}
                    style={{ backgroundColor: entityTypeColors[key] }}
                    className="text-white px-2 py-1 rounded"
                  >
                    {key}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center rounded border py-1 px-2 bg-gray-100 text-gray-700">
                <div className="font-medium">Graph Size</div>
                <div className="text-white px-2 py-1 rounded bg-gray-500">
                  {nodes.length} Nodes
                </div>
                <div className="text-white px-2 py-1 rounded bg-gray-500">
                  {edges.length} Edges
                </div>
              </div>
            </>
          )}
          <div className="flex-grow"></div>
          <button onClick={getAllEntities} className="p-2">
            <FaRedo />
          </button>
        </div>
        <div
          className="flex items-center w-full justify-center "
          style={{ height: "500px" }}
        >
          {!fetchingEntities && (
            <div className="flex w-full">
              <div className="flex-grow w-full bg-gray-100 border  rounded">
                <Graph graph={graph} options={options} events={events} />
              </div>

              <div className="w-72 ml-4 p-4 bg-gray-100  border rounded overflow-hidden">
                <div className="uppercase tracking-wider text-xs text-gray-500 pb-1 mb-1 border-b">
                  Selected Node
                </div>
                {selectedNode && (
                  <div className="flex flex-col gap-1">
                    <div>ID: {selectedNode.meta.id}</div>
                    <div>Name: {selectedNode.name}</div>
                    <div>Entity Type: {selectedNode.meta.entityType}</div>
                    <a
                      className="px-2 py-1 text-center bg-blue-700 flex items-center justify-center text-white"
                      target="_blank"
                      href={`https://www.yext.com/s/${selectedNode.meta.accountId}/entity/edit3?externalEntityIds=${selectedNode.meta.id}`}
                    >
                      Edit Entity
                    </a>
                  </div>
                )}
                {!selectedNode && (
                  <div className="p-2 text-gray-500 text-center">
                    Select a node to explore details
                  </div>
                )}
              </div>
            </div>
          )}
          {fetchingEntities && (
            <div className="flex items-center gap-4 flex-col">
              <div className="text-3xl text-gray-700 font-bold">
                Loading Graph
              </div>
              <div className="text-gray-500 text-sm">
                This might take a minute
              </div>
              <HashLoader size={40} color="gray" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
