import { getConnectedEdges } from "reactflow";

export const checkFlowValidity = (nodes, edges) => {
    console.log('bhetly but utils')
    let node_ids = nodes.map((item) => item.id)
    const connected_edges = getConnectedEdges(nodes, edges)
    let targets = connected_edges.map((edge) => edge.target)

    let empty_targets = node_ids.length - targets.length;
    let flowValidity = true;
    if (empty_targets > 1) {
        flowValidity = false;
    }
    return flowValidity;
};
