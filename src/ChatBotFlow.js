import { React, useCallback, useEffect, useMemo, useState } from 'react';
import Settings from './Settings';
import NP from './NodePanel';
import ReactFlow, { Controls, Background, useNodesState, applyEdgeChanges, applyNodeChanges, addEdge, getConnectedEdges, useEdgesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import nodeTypes from '../src/utils/NodeTypes';
let id = 0;
const getId = () => `dndnode_${id++}`;
// const nodeTypes = { text: CustomTextNode };
// const height = window.innerHeight();


function Flow() {
    const [nodeSelected, setNodeSelected] = useState(false);//to check if a node is selected
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [nodeText, setNodeText] = useState('testing');
    const [nodeDetails, setNodeDetails] = useState(null);
    const [error, setError] = useState('');
    const [rfInstance, setRfInstance] = useState(null);
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
    );

    const onNodeClick = useCallback((event, node) => {
        setNodeDetails(node)
        setNodeText(node.data.label)
        setNodeSelected(true)//for displaying our settings panel.
    }, [])



    const onConnect = useCallback((params) => {
        let existing_edges = getConnectedEdges(nodes, edges);
        let sources = existing_edges.map((item) => item.source)

        //check for an edge having two sources
        if (!sources.includes(params.source)) {
            setEdges((eds) => addEdge(params, eds))
        } else {
            setError('Different connections can not have same sources')
            setTimeout(() => {
                setError('');
            }, 3000)
        }
    },
        [edges],
    );

    //Function for appending/adding nodes to our view 
    const onDrop = useCallback((e) => {
        e.preventDefault();
        let type = e.dataTransfer.getData('type');
        let newNode = {
            id: getId(),
            type: type,
            position: {
                x: e.clientX,
                y: e.clientY
            },
            data: {
                label: nodeText,
            },
        }
        setNodes((nds) => nds.concat(newNode));
    }, [])
    const onDragOver = (e) => {
        e.preventDefault();
        return;
    }

    const updateNodeDetails = (nodeText) => {
        setNodes((nodes) =>
            nodes.filter((node) => {
                if (node.id === nodeDetails.id) {
                    node.data = {
                        ...node.data,
                        label: nodeText
                    }
                }
                return node;
            })
        )
    }

    useEffect(() => {
        updateNodeDetails(nodeText)
    }, [nodeText])

    const checkFlowValidity = (nodes, edges) => {
        let node_ids = nodes.map((item) => item.id)
        const connected_edges = getConnectedEdges(nodes, edges)
        let targets = connected_edges.map((edge) => edge.target)

        let empty_targets = node_ids.length - targets.length;
        let flowValidity = true;
        if (empty_targets > 1) {
            flowValidity = false;
        }
        return flowValidity;
    }

    //ON CLICK SAVE BUTTON
    const saveFlow = () => {
        setNodeSelected(false)
        setNodeDetails(null)
        let isFlowValid = checkFlowValidity(nodes, edges)
        if (isFlowValid) {
            const flow = rfInstance.toObject();
        } else {
            setError('Can not save Flow')
            setTimeout(() => {
                setError('');
            }, 3000)
        }
    }
    return (
        <>
            <div style={{ flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#D3D3D3' }}>
                    <text style={{ flex: 1, color: 'red', justifyItems: 'center', }}>{error ? error : ''}</text>
                    <button style={{ flex: 0.1, height: '3.5vh', width: '20vh', borderWidth: 2, borderRadius: 8, borderColor: 'blue' }} onClick={saveFlow}>Save Changes</button>
                </div>
                <div style={{ display: 'flex', height: '100vh' }}>
                    <div style={{ flex: 3 }}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onInit={setRfInstance}
                            fitView
                            nodeTypes={nodeTypes}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}>
                            <Background variant="lines" gap={12} size={1} />
                            <Controls />
                        </ReactFlow>

                    </div>
                    <div style={{ flex: 0.9, flexDirection: 'row' }}>
                        {nodeSelected ?
                            <Settings nodeText={nodeText} setNodeText={setNodeText} /> :
                            <NP />
                        }
                    </div>
                </div >
            </div>

        </>

    );
}


const checkFlowValidity = (nodes, edges) => {
    let node_ids = nodes.map((item) => item.id)
    const connected_edges = getConnectedEdges(nodes, edges)
    let targets = connected_edges.map((edge) => edge.target)

    let empty_targets = node_ids.length - targets.length;
    let flowValidity = true;
    if (empty_targets > 1) {
        flowValidity = false;
        // setError('Can not save Flow')
        // setTimeout(() => {
        //     setError('');
        // }, 3000)
    }
    return flowValidity;
}
export default Flow;
