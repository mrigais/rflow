import React, { useState } from "react";
import { Handle, Position, getConnectedEdges, } from "reactflow";
import MessageIcon from '../assets/message-icon.svg';
import WhatsappIcon from '../assets/whatsapp.svg';


const MessageNode = (props) => {
    return (
        <div >
            <div style={{
                display: 'flex', flexDirection: 'column', height: 100, width: 300, borderRadius: 12, boxShadow: '0 4px 8px 0 grey, 0 6px 20px 0 grey'
            }}>
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: '#a3d6ce',
                        alignItems: 'center',
                        height: '3.5vh',
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12
                    }}>
                    <Handle type="target" position={Position.Left} isConnectable={true} />
                    <img
                        src={MessageIcon}
                        style={{
                            flex: 0.1,
                            height: 15,
                            width: 15,
                        }}
                    />
                    <text style={{
                        flex: 0.8,
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                        marginLeft: -120
                    }}>Send Message</text>
                    <img
                        src={WhatsappIcon}
                        style={{ height: 15, width: 15, flex: 0.1, }}
                    />
                </div>
                <text style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 15,
                    textAlign: 'left',
                    paddingTop: 15,
                    paddingLeft: 15
                }}>{props.data.label}</text>
                <Handle type="source" position={Position.Right} />
            </div>
        </div >

    )
}

export default React.memo(MessageNode);