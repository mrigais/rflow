import React, { useCallback, useState } from "react";
import MessageIcon from '../src/assets/message-icon.svg';

const NodePanel = () => {
    console.log('hello tehre node panel')

    const onDragStart = useCallback((e, type) => {
        console.log('he')
        e.dataTransfer.setData('type', type);
    }, []);
    return (
        <>
            <view
                style={{
                    display: 'flex', margin: 20, flexDirection: 'column', justifyContent: 'center', gap: 5, height: 50, width: 100,
                    borderRadius: 3, backgroundColor: '#ccd1d9', borderWidth: 10
                }}
                draggable={true}
                onDragStart={(event) => onDragStart(event, 'message')}>

                <img
                    src={MessageIcon}
                    style={{ height: 15, width: 15, alignSelf: 'center' }}
                />
                <text style={{ color: 'blue', fontSize: 12, }}>
                    Message
                </text>
            </view >
        </>

    )
}
export default React.memo(NodePanel); 