import axios from "axios";
import { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import BreadCrumbs from "../components/BreadCrumbs";

export default function GraphViewer() {
  const [fetchingEntities, setFetchingEntities] = useState(false);

  const [entities, setEntities] = useState([]);

  const getAllEntities = async () => {
    console.log("GETTING ENTITIES");
    setFetchingEntities(true);
    const res = await axios.post("/api/getAllEntities");
    setFetchingEntities(false);
    setEntities(res.data.entities);
  };

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  console.log("ENTITIES", entities);

  const nodes = (entities ?? []).map((e) => {
    return {
      id: e.meta.id,
      label: e.name,
    };
  });

  const nodeIds = nodes.map((n) => n.id);
  console.log(nodeIds);

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

  console.log("NODES", nodes);
  console.log("EDGES", edges);

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
        <BreadCrumbs>Graph Viewer</BreadCrumbs>
        <Graph graph={graph} options={options} />
      </div>
    </div>
  );
}
